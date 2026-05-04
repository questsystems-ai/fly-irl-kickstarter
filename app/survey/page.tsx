"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const TIERS = [
  {
    id: "dreamer",
    price: "$25",
    name: "Dreamer",
    desc: "You believe this should exist. Name on the Founders Wall plus direct updates as it's built.",
    perks: ["Founders Wall listing", "Private build updates", "Digital backer badge"],
  },
  {
    id: "crew",
    price: "$100",
    name: "Crew Member",
    desc: "Follow the design process in real time. Monthly reviews and a seat in the community.",
    perks: ["Monthly design reviews", "Backer Discord access", "Voting on design decisions"],
  },
  {
    id: "testpilot",
    price: "$300",
    name: "Test Pilot",
    desc: "Priority access to demos and the simulation beta. Plus a launch-day flight reservation.",
    perks: ["Priority demo access", "Simulation beta access", "Launch-day flight reservation"],
  },
  {
    id: "founding",
    price: "$1,000",
    name: "Founding Pilot",
    desc: "Serious commitment. Guaranteed first-year flight and your name on the aircraft.",
    perks: ["Guaranteed first-year flight", "Name on the aircraft", "Quarterly founder calls"],
  },
  {
    id: "pioneer",
    price: "$10,000",
    name: "Ranch Pioneer",
    desc: "$10K toward a personal ranch system — you're not just backing the SkyPark, you're building your own.",
    perks: ["$10K credit toward personal installation", "Private demo slot", "Direct founder access"],
  },
  {
    id: "ranchfounder",
    price: "$100K",
    name: "Ranch Founder",
    desc: "Deposit on one of the first 5 personal SkyPark installations. This is the real thing.",
    perks: ["Deposit on personal SkyPark", "One of first 5 installations", "Co-design input on your system"],
  },
];

type Status = "idle" | "saving" | "done" | "error";

export default function SurveyPage() {
  const [tiers, setTiers] = useState<string[]>([]);
  const [pricePoint, setPricePoint] = useState("");
  const [day1, setDay1] = useState("");
  const [referral, setReferral] = useState("");
  const [ideas, setIdeas] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("flyirl_email");
    if (saved) setEmail(saved);
  }, []);

  function toggleTier(id: string) {
    setTiers((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setErrorMsg("");
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase() || null,
          tier_interest: tiers,
          price_point: pricePoint || null,
          day1_pledge: day1 || null,
          referral: referral || null,
          ideas: ideas.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("done");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Couldn't save your response — please try again.");
      setStatus("error");
    }
  }

  return (
    <>
      <style>{`
        .sv-wrap {
          background: #f9f8f6;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        /* ── Top bar ── */
        .sv-topbar {
          background: #1a1a1a;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .sv-logo {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #fff;
          letter-spacing: -0.5px;
          text-decoration: none;
        }
        .sv-logo span { color: #f7f3ea; }
        .sv-topbar-label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        /* ── Hero ── */
        .sv-hero {
          background: #1a1a1a;
          padding: 52px 24px 44px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .sv-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(247,243,234,0.45);
          margin-bottom: 14px;
        }
        .sv-hero h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(26px, 5vw, 38px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 14px;
          line-height: 1.15;
        }
        .sv-hero p {
          font-size: 16px;
          color: rgba(255,255,255,0.55);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.65;
        }
        .sv-hero strong { color: rgba(247,243,234,0.85); font-weight: 500; }

        /* ── Form container ── */
        .sv-form-wrap {
          max-width: 700px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        /* ── Question block ── */
        .sv-q {
          background: #fff;
          border: 1px solid #e8e5e0;
          border-radius: 10px;
          padding: 28px 24px;
          margin-bottom: 20px;
        }
        .sv-q-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 6px;
          line-height: 1.35;
        }
        .sv-q-hint {
          font-size: 13px;
          color: #999;
          margin-bottom: 18px;
          line-height: 1.5;
        }

        /* ── Tier card grid ── */
        .sv-tier-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
          margin-top: 4px;
        }
        .sv-tier-card {
          position: relative;
          background: #fafafa;
          border: 2px solid #e8e5e0;
          border-radius: 10px;
          padding: 22px 20px 18px;
          cursor: pointer;
          transition: border-color 0.12s, background 0.12s, box-shadow 0.12s;
          user-select: none;
          display: flex;
          flex-direction: column;
        }
        .sv-tier-card:hover {
          border-color: #aaa;
          background: #fff;
        }
        .sv-tier-card.selected {
          border-color: #1a1a1a;
          background: #fff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        }
        .sv-tier-card input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }
        /* Checkmark badge */
        .sv-tier-check {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #e0e0e0;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.12s;
          flex-shrink: 0;
        }
        .sv-tier-card.selected .sv-tier-check {
          background: #1a1a1a;
          border-color: #1a1a1a;
        }
        .sv-tier-check-mark {
          display: none;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
        }
        .sv-tier-card.selected .sv-tier-check-mark { display: block; }

        .sv-tier-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 2px;
          padding-right: 28px;
        }
        .sv-tier-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 10px;
        }
        .sv-tier-desc {
          font-size: 13px;
          color: #555;
          line-height: 1.55;
          flex: 1;
          margin-bottom: 12px;
        }
        .sv-tier-perks {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid #f0ede8;
          padding-top: 10px;
        }
        .sv-tier-perks li {
          font-size: 12px;
          color: #777;
          padding: 3px 0 3px 16px;
          position: relative;
          line-height: 1.4;
        }
        .sv-tier-perks li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #1a1a1a;
          font-weight: 700;
          font-size: 11px;
        }
        .sv-tier-card.selected .sv-tier-perks li::before { color: #1a1a1a; }
        .sv-tier-none {
          grid-column: 1 / -1;
          flex-direction: row;
          align-items: center;
          padding: 16px 20px;
          gap: 12px;
        }
        .sv-tier-none .sv-tier-price { font-size: 15px; font-weight: 600; color: #555; margin: 0; padding: 0; }
        .sv-tier-none .sv-tier-check { position: static; flex-shrink: 0; }

        /* ── Standard radio/checkbox options ── */
        .sv-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }
        .sv-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border: 1.5px solid #e8e5e0;
          border-radius: 8px;
          cursor: pointer;
          transition: border-color 0.12s, background 0.12s;
          user-select: none;
        }
        .sv-option:hover { border-color: #1a1a1a; background: #fafafa; }
        .sv-option.selected { border-color: #1a1a1a; background: #f4f3f3; }
        .sv-option input { accent-color: #1a1a1a; width: 16px; height: 16px; cursor: pointer; flex-shrink: 0; }
        .sv-option-main { font-size: 14px; font-weight: 600; color: #1a1a1a; line-height: 1.3; }

        /* ── Concept card ── */
        .sv-concept-card {
          border-radius: 10px;
          padding: 22px 22px 18px;
          margin-bottom: 16px;
          border: 2px solid;
        }
        .sv-concept-tag {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
        }
        .sv-concept-goal {
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          padding: 3px 9px;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .sv-concept-card h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          font-weight: 800;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .sv-concept-card p {
          font-size: 13px;
          line-height: 1.65;
          margin: 0;
        }

        /* Cub — gold */
        .sv-concept--cub { border-color: #d4a85c; background: #fdf9f2; }
        .sv-concept--cub .sv-concept-tag { color: #b8893a; }
        .sv-concept--cub .sv-concept-goal { background: #d4a85c; }
        .sv-concept--cub h4 { color: #2c2418; }
        .sv-concept--cub p { color: #6b5d4d; }

        /* Plane — green */
        .sv-concept--plane { border-color: #2e7d4f; background: #f4fbf6; }
        .sv-concept--plane .sv-concept-tag { color: #2e7d4f; }
        .sv-concept--plane .sv-concept-goal { background: #2e7d4f; }
        .sv-concept--plane h4 { color: #1a1a1a; }
        .sv-concept--plane p { color: #444; }

        /* X-Prize — purple */
        .sv-concept--xprize { border-color: #6b47b8; background: #faf7ff; }
        .sv-concept--xprize .sv-concept-tag { color: #6b47b8; }
        .sv-concept--xprize .sv-concept-goal { background: #6b47b8; }
        .sv-concept--xprize h4 { color: #1a1a1a; }
        .sv-concept--xprize p { color: #444; }

        /* ── Textarea ── */
        .sv-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid #e8e5e0;
          border-radius: 8px;
          font-family: 'Poppins', system-ui, sans-serif;
          font-size: 15px;
          color: #2f2f2f;
          background: #fafafa;
          resize: vertical;
          min-height: 110px;
          outline: none;
          transition: border-color 0.12s;
          line-height: 1.6;
        }
        .sv-textarea:focus { border-color: #1a1a1a; background: #fff; }
        .sv-textarea::placeholder { color: #bbb; }
        .sv-char-count { font-size: 12px; color: #bbb; text-align: right; margin-top: 6px; }

        /* ── Email input ── */
        .sv-email-input {
          width: 100%;
          padding: 14px 16px;
          border: 1.5px solid #e8e5e0;
          border-radius: 8px;
          font-family: 'Poppins', system-ui, sans-serif;
          font-size: 15px;
          color: #2f2f2f;
          background: #fafafa;
          outline: none;
          transition: border-color 0.12s;
        }
        .sv-email-input:focus { border-color: #1a1a1a; background: #fff; }
        .sv-email-input::placeholder { color: #bbb; }

        /* ── Submit ── */
        .sv-submit-wrap { margin-top: 8px; text-align: center; }
        .sv-submit-btn {
          background: #1a1a1a;
          color: #f7f3ea;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 16px;
          padding: 16px 40px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: opacity 0.15s, transform 0.15s;
          width: 100%;
          max-width: 360px;
        }
        .sv-submit-btn:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
        .sv-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .sv-error { color: #c0392b; font-size: 14px; margin-top: 12px; text-align: center; }

        /* ── Done ── */
        .sv-done {
          background: #fff;
          border: 1px solid #e8e5e0;
          border-radius: 12px;
          padding: 52px 32px;
          text-align: center;
          margin-top: 48px;
        }
        .sv-done-check { font-size: 40px; margin-bottom: 16px; }
        .sv-done h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 12px;
        }
        .sv-done p { font-size: 16px; color: #666; line-height: 1.65; max-width: 420px; margin: 0 auto 28px; }
        .sv-done-link {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ── Footer ── */
        .sv-footer {
          max-width: 700px;
          margin: 0 auto;
          padding: 0 24px 48px;
          text-align: center;
          font-size: 13px;
          color: #bbb;
          line-height: 1.8;
        }
        .sv-footer a { color: #999; text-decoration: underline; text-underline-offset: 3px; }

        @media (max-width: 560px) {
          .sv-form-wrap { padding: 32px 16px; }
          .sv-q { padding: 22px 18px; }
          .sv-tier-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sv-wrap">

        {/* Top bar */}
        <div className="sv-topbar">
          <Link href="/" className="sv-logo">Fly<span>IRL</span></Link>
          <div className="sv-topbar-label">Kickstarter Survey</div>
        </div>

        {/* Hero */}
        <div className="sv-hero">
          <div className="sv-eyebrow">2 minutes · Shapes the campaign</div>
          <h1>Help build the Kickstarter</h1>
          <p>
            Phase 1 is done. Now I need to know what reward tiers you&rsquo;d
            actually back.{" "}
            <strong>Suggest a tier that makes it in and you get it free.</strong>
          </p>
        </div>

        <div className="sv-form-wrap">
          {status === "done" ? (
            <div className="sv-done">
              <div className="sv-done-check">✓</div>
              <h2>Got it — thank you.</h2>
              <p>
                Aaron reads every response personally. You&rsquo;ll hear from him
                when the campaign is ready to launch.
              </p>
              <Link href="/kickstarter" className="sv-done-link">
                Browse the Kickstarter draft and reward tiers →
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit}>

              {/* Q1 — Tier cards */}
              <div className="sv-q">
                <div className="sv-q-label">Which reward tiers sound interesting to you?</div>
                <div className="sv-q-hint">Select all that apply — click any card to check it.</div>
                <div className="sv-tier-grid">
                  {TIERS.map((t) => {
                    const sel = tiers.includes(t.id);
                    return (
                      <label key={t.id} className={`sv-tier-card${sel ? " selected" : ""}`}>
                        <input type="checkbox" checked={sel} onChange={() => toggleTier(t.id)} />
                        <div className="sv-tier-check">
                          <span className="sv-tier-check-mark">✓</span>
                        </div>
                        <div className="sv-tier-price">{t.price}</div>
                        <div className="sv-tier-name">{t.name}</div>
                        <div className="sv-tier-desc">{t.desc}</div>
                        <ul className="sv-tier-perks">
                          {t.perks.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                      </label>
                    );
                  })}
                  {/* None option */}
                  <label className={`sv-tier-card sv-tier-none${tiers.includes("none") ? " selected" : ""}`}>
                    <input type="checkbox" checked={tiers.includes("none")} onChange={() => toggleTier("none")} />
                    <div className="sv-tier-check">
                      <span className="sv-tier-check-mark">✓</span>
                    </div>
                    <div className="sv-tier-price">None of these — but I have ideas (tell us below)</div>
                  </label>
                </div>
              </div>

              {/* Q3 — Day-1 pledge */}
              <div className="sv-q">
                <div className="sv-q-label">Would you commit to backing on launch day?</div>
                <div className="sv-q-hint">The first 24 hours determine a Kickstarter&rsquo;s algorithmic rank.</div>
                <div className="sv-options">
                  {[
                    { val: "yes", label: "Yes, definitely — just tell me when" },
                    { val: "probably", label: "Probably, if the tier feels right" },
                    { val: "maybe", label: "Maybe — depends on what else is going on" },
                    { val: "probably-not", label: "Probably not" },
                    { val: "no", label: "No" },
                  ].map((opt) => (
                    <label key={opt.val} className={`sv-option${day1 === opt.val ? " selected" : ""}`}>
                      <input type="radio" name="day1" checked={day1 === opt.val} onChange={() => setDay1(opt.val)} />
                      <div className="sv-option-main">{opt.label}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q4 — Referral */}
              <div className="sv-q">
                <div className="sv-q-label">Would you share the campaign with your network when it goes live?</div>
                <div className="sv-options">
                  {[
                    { val: "yes", label: "Yes — I already know people who'd dig this" },
                    { val: "maybe", label: "Maybe — if there's an easy way to do it" },
                    { val: "probably-not", label: "Probably not" },
                    { val: "no", label: "No" },
                  ].map((opt) => (
                    <label key={opt.val} className={`sv-option${referral === opt.val ? " selected" : ""}`}>
                      <input type="radio" name="referral" checked={referral === opt.val} onChange={() => setReferral(opt.val)} />
                      <div className="sv-option-main">{opt.label}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q5 — Ideas */}
              <div className="sv-q">
                <div className="sv-q-label">Tier ideas, feedback, or anything else you want Aaron to see?</div>
                <div className="sv-q-hint">Wild ideas welcome. If it makes the campaign, you get it free or at cost.</div>
                <textarea
                  className="sv-textarea"
                  placeholder={'e.g. "I\'d pay $200 for a quarterly livestream from inside development"'}
                  value={ideas}
                  onChange={(e) => setIdeas(e.target.value.slice(0, 500))}
                />
                <div className="sv-char-count">{ideas.length}/500</div>
              </div>

              {/* Q6 — Email */}
              <div className="sv-q">
                <div className="sv-q-label">Your email address</div>
                <div className="sv-q-hint">
                  Optional — but needed if you want credit for an idea that makes it in,
                  or to be notified on launch day.
                </div>
                <input
                  type="email"
                  className="sv-email-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Submit */}
              <div className="sv-submit-wrap">
                <button type="submit" className="sv-submit-btn" disabled={status === "saving"}>
                  {status === "saving" ? "Sending..." : "Send My Answers →"}
                </button>
                {status === "error" && errorMsg && (
                  <div className="sv-error">{errorMsg}</div>
                )}
              </div>

            </form>
          )}
        </div>

        {/* Footer */}
        <div className="sv-footer">
          <p>
            <Link href="/kickstarter">Browse the Kickstarter draft</Link>
            &nbsp;·&nbsp;
            <a href="mailto:hello@fly-irl.com">hello@fly-irl.com</a>
            &nbsp;·&nbsp;
            <a href="#">Unsubscribe</a>
          </p>
        </div>

      </div>
    </>
  );
}
