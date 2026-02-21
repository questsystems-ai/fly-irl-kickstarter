import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,);

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const utm = body.utm || {};
    if (!email || !email.includes("@")) return bad("Valid email required.");

    const amountCents = Number(process.env.STRIPE_RESERVATION_PRICE_CENTS || 100);
    const siteUrl = process.env.SITE_URL!;
    if (!siteUrl) return bad("Missing SITE_URL env var.", 500);

    // 1) Record reservation intent (server-side, so we can later update)
    const { data: row, error: insErr } = await supabaseAdmin
      .from("prelaunch_reservations")
      .insert({
        email,
        status: "intent",
        amount_cents: amountCents,
        source: "flyirl-landing",
        page_path: "/reserve",
        utm_source: utm.utm_source || null,
        utm_medium: utm.utm_medium || null,
        utm_campaign: utm.utm_campaign || null,
        utm_content: utm.utm_content || null,
        utm_term: utm.utm_term || null,
        gclid: utm.gclid || null,
        fbclid: utm.fbclid || null,
        referrer: utm.referrer || null,
      })
      .select("id")
      .single();

    // If you added the unique index (email_norm,status where status='intent'),
    // clicking twice may fail with a duplicate. That’s OK—just find the existing intent.
    let reservationId = row?.id as string | undefined;

    if (insErr) {
      // try to recover by fetching an existing intent
      const { data: existing, error: selErr } = await supabaseAdmin
        .from("prelaunch_reservations")
        .select("id")
        .eq("email", email)
        .eq("status", "intent")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (selErr || !existing?.id) {
        console.error("Insert error:", insErr);
        return bad("Could not create reservation intent.", 500);
      }
      reservationId = existing.id;
    }

    // 2) Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "FlyIRL $1 Reservation",
              description: "Pre-launch reservation signal (not a flight purchase).",
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: {
        reservation_id: reservationId!,
        email,
      },
    });

    // 3) Store session id on the reservation row
    await supabaseAdmin
      .from("prelaunch_reservations")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", reservationId!);

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error(e);
    return bad("Server error.", 500);
  }
}
