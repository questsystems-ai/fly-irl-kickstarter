import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

// Simple in-memory rate limiting (resets on server restart)
// For production, consider using Redis or a proper rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max 5 submissions per hour per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

function bad(msg: string, status = 400) {
  console.log(`[LEAD API] Bad request: ${msg} (status ${status})`);
  return NextResponse.json({ error: msg }, { status });
}

async function addToMailchimp(email: string, audienceMode: string) {
  console.log("========================================");
  console.log("[MAILCHIMP] Starting addToMailchimp");
  console.log("[MAILCHIMP] Email:", email);
  console.log("[MAILCHIMP] Audience Mode:", audienceMode);
  
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  
  console.log("[MAILCHIMP] API Key exists:", !!MAILCHIMP_API_KEY);
  console.log("[MAILCHIMP] API Key length:", MAILCHIMP_API_KEY?.length || 0);
  console.log("[MAILCHIMP] Audience ID:", MAILCHIMP_AUDIENCE_ID);
  
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    console.log("[MAILCHIMP] Missing config, skipping...");
    return { ok: true, skipped: true };
  }

  const dc = MAILCHIMP_API_KEY.split('-')[1];
  console.log("[MAILCHIMP] Datacenter:", dc);
  
  if (!dc) {
    console.log("[MAILCHIMP] ERROR: Invalid API key format - no datacenter suffix");
    return { ok: false, error: "Invalid API key format" };
  }

  try {
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;
    console.log("[MAILCHIMP] Request URL:", url);
    
    const requestBody = {
      email_address: email,
      status: 'subscribed',
      tags: [audienceMode || 'general', 'pre-launch'],
    };
    console.log("[MAILCHIMP] Request body:", JSON.stringify(requestBody));
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log("[MAILCHIMP] Response status:", response.status);
    console.log("[MAILCHIMP] Response body:", JSON.stringify(data));
    
    if (!response.ok) {
      if (data.title === 'Member Exists') {
        console.log("[MAILCHIMP] Member already exists, treating as success");
        return { ok: true, alreadyExists: true };
      }
      console.log("[MAILCHIMP] ERROR:", data.title, data.detail);
      return { ok: false, error: data };
    }

    console.log("[MAILCHIMP] SUCCESS - Added to list!");
    console.log("========================================");
    return { ok: true, data };
  } catch (error) {
    console.log("[MAILCHIMP] EXCEPTION:", error);
    return { ok: false, error };
  }
}

export async function POST(req: Request) {
  console.log("========================================");
  console.log("[LEAD API] POST request received");
  
  try {
    // Get IP for rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               req.headers.get("x-real-ip") ||
               "unknown";
    console.log("[LEAD API] IP:", ip);
    
    // Rate limit check
    if (!checkRateLimit(ip)) {
      console.log("[LEAD API] Rate limited:", ip);
      return bad("Too many requests. Please try again later.", 429);
    }

    const body = await req.json();
    console.log("[LEAD API] Request body:", JSON.stringify(body));

    // Timing check - reject if submitted too fast (likely bot)
    const timing = body._timing;
    if (typeof timing === 'number' && timing < 1500) {
      console.log("[LEAD API] Rejected - submitted too fast:", timing, "ms");
      // Return success to not alert bots
      return NextResponse.json({ ok: true });
    }

    const email = String(body.email || "").trim().toLowerCase();
    console.log("[LEAD API] Email:", email);
    
    if (!email || !email.includes("@")) {
      return bad("Valid email required.");
    }

    const audienceMode = body.audience_mode || "general";
    console.log("[LEAD API] Audience mode:", audienceMode);

    const utm = body.utm || {};
    const payload = {
      email,
      source: body.source || "flyirl-landing",
      page_path: body.page_path || "/",
      user_agent: body.user_agent || null,
      audience_mode: audienceMode,
      utm_source: utm.utm_source || null,
      utm_medium: utm.utm_medium || null,
      utm_campaign: utm.utm_campaign || null,
      utm_content: utm.utm_content || null,
      utm_term: utm.utm_term || null,
      gclid: utm.gclid || null,
      fbclid: utm.fbclid || null,
      referrer: utm.referrer || null,
    };
    console.log("[LEAD API] Supabase payload:", JSON.stringify(payload));

    // Save to Supabase
    console.log("[LEAD API] Inserting into Supabase...");
    const { error } = await supabaseAdmin.from("prelaunch_leads").insert(payload);
    
    if (error) {
      const msg = String((error as any).message || "");
      console.log("[LEAD API] Supabase error:", JSON.stringify(error));
      
      if (msg.toLowerCase().includes("duplicate") || msg.includes("23505")) {
        console.log("[LEAD API] Duplicate email, still trying Mailchimp...");
        await addToMailchimp(email, audienceMode);
        return NextResponse.json({ ok: true, deduped: true });
      }
      console.log("[LEAD API] Lead insert error:", error);
      return bad("Could not save lead.", 500);
    }
    
    console.log("[LEAD API] Supabase insert successful!");

    // Add to Mailchimp
    console.log("[LEAD API] Now adding to Mailchimp...");
    const mailchimpResult = await addToMailchimp(email, audienceMode);
    console.log("[LEAD API] Mailchimp result:", JSON.stringify(mailchimpResult));

    console.log("[LEAD API] All done, returning success");
    console.log("========================================");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.log("[LEAD API] EXCEPTION:", e);
    return bad("Server error.", 500);
  }
}
