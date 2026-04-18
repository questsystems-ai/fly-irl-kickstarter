import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const campaign = String(body.campaign || "").trim().slice(0, 60);
    const vote = body.vote === "yes" ? "yes" : "no";

    if (!campaign) {
      return NextResponse.json({ ok: false, error: "Missing campaign" }, { status: 400 });
    }

    // Best-effort insert — table may not exist yet, that's fine
    try {
      await supabaseAdmin.from("campaign_votes").insert({
        campaign,
        vote,
        created_at: new Date().toISOString(),
      });
    } catch {
      // graceful degradation — table may not exist yet
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // never surface errors to client
  }
}
