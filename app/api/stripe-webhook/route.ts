import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import crypto from "crypto";

export const runtime = "nodejs";

// Add VIP tag to Mailchimp contact
async function tagMailchimpVIP(email: string) {
  console.log("[STRIPE WEBHOOK] Tagging Mailchimp VIP for:", email);
  
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) {
    console.log("[STRIPE WEBHOOK] Mailchimp not configured, skipping tag");
    return { ok: true, skipped: true };
  }

  const dc = MAILCHIMP_API_KEY.split('-')[1];
  if (!dc) {
    console.log("[STRIPE WEBHOOK] Invalid Mailchimp API key format");
    return { ok: false, error: "Invalid API key format" };
  }

  // Mailchimp uses MD5 hash of lowercase email as subscriber ID
  const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  
  try {
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${subscriberHash}/tags`;
    console.log("[STRIPE WEBHOOK] Mailchimp tag URL:", url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: [
          { name: "vip-reserved", status: "active" },
          { name: "$1-reservation", status: "active" }
        ]
      }),
    });

    console.log("[STRIPE WEBHOOK] Mailchimp tag response status:", response.status);
    
    if (!response.ok) {
      const data = await response.json();
      console.log("[STRIPE WEBHOOK] Mailchimp tag error:", JSON.stringify(data));
      return { ok: false, error: data };
    }

    console.log("[STRIPE WEBHOOK] Successfully tagged as VIP!");
    return { ok: true };
  } catch (error) {
    console.log("[STRIPE WEBHOOK] Mailchimp tag exception:", error);
    return { ok: false, error };
  }
}

// IMPORTANT: webhook needs raw body
export async function POST(req: Request) {
  console.log("[STRIPE WEBHOOK] Received webhook");
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("[STRIPE WEBHOOK] Signature verification failed:", err.message);
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  console.log("[STRIPE WEBHOOK] Event type:", event.type);

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const reservationId = session.metadata?.reservation_id;
      const paymentIntent = session.payment_intent?.toString() || null;
      const customerEmail = session.customer_details?.email || session.metadata?.email;

      console.log("[STRIPE WEBHOOK] Reservation ID:", reservationId);
      console.log("[STRIPE WEBHOOK] Customer email:", customerEmail);

      if (reservationId) {
        // Update Supabase
        await supabaseAdmin
          .from("prelaunch_reservations")
          .update({
            status: "paid",
            stripe_payment_intent_id: paymentIntent,
          })
          .eq("id", reservationId);
        
        console.log("[STRIPE WEBHOOK] Supabase updated");
      }

      // Tag in Mailchimp for VIP email automation
      if (customerEmail) {
        await tagMailchimpVIP(customerEmail);
      } else {
        console.log("[STRIPE WEBHOOK] No customer email found, skipping Mailchimp tag");
      }
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("[STRIPE WEBHOOK] Handler error:", e);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
