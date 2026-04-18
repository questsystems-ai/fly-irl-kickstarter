import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = {
      email: String(body.email || "").trim().toLowerCase() || null,
      tier_interest: Array.isArray(body.tier_interest) ? body.tier_interest : [],
      day1_pledge: body.day1_pledge || null,
      referral: body.referral || null,
      stol_interest: body.stol_interest || null,
      plane_interest: body.plane_interest || null,
      xprize_interest: body.xprize_interest || null,
      ideas: body.ideas || null,
      user_agent: req.headers.get("user-agent") || null,
    };

    const { error } = await supabaseAdmin
      .from("kickstarter_survey_responses")
      .insert(payload);

    if (error) {
      console.error("[SURVEY API] Insert error:", error);
      return bad("Could not save survey.", 500);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[SURVEY API] Exception:", e);
    return bad("Server error.", 500);
  }
}
