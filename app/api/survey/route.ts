import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export async function POST(req: Request) {
  console.log("[SURVEY API] POST request received");
  
  try {
    const body = await req.json();
    console.log("[SURVEY API] Request body:", JSON.stringify(body));

    const email = String(body.email || "").trim().toLowerCase();
    
    // Build the survey payload
    const payload = {
      email: email || null,
      submitted_at: body.submitted_at || new Date().toISOString(),
      
      // Demographics
      age_range: body.ageRange || null,
      gender: body.gender || null,
      location: body.location || null,
      
      // About You
      user_type: body.userType || [],
      industry_area: body.industryArea || null,
      company_name: body.companyName || null,
      
      // The Experience
      excited_about: body.excitedAbout || [],
      price_range: body.priceRange || null,
      pay_more_for: body.payMoreFor || [],
      
      // Get Involved
      involvement: body.involvement || [],
      
      // Comments
      comments: body.comments || null,
      
      // Metadata
      user_agent: req.headers.get("user-agent") || null,
    };

    console.log("[SURVEY API] Inserting payload:", JSON.stringify(payload));

    const { error } = await supabaseAdmin.from("survey_responses").insert(payload);
    
    if (error) {
      console.error("[SURVEY API] Insert error:", error);
      return bad("Could not save survey.", 500);
    }

    console.log("[SURVEY API] Success!");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[SURVEY API] Exception:", e);
    return bad("Server error.", 500);
  }
}
