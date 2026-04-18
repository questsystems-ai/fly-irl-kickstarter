"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const TIERS = [
  { id: "dreamer", label: "Dreamer — $25", sub: "Founders Wall, private build updates" },
  { id: "crew", label: "Crew Member — $100", sub: "Monthly design reviews, Discord, voting" },
  { id: "testpilot", label: "Test Pilot — $300", sub: "Priority demos, simulation beta, launch-day flight reservation" },
  { id: "founding", label: "Founding Pilot — $1,000", sub: "Guaranteed first-year flight, name on the aircraft" },
  { id: "pioneer", label: "Ranch Pioneer — $10,000", sub: "$10K toward a personal ranch system" },
  { id: "ranchfounder", label: "Ranch Founder — $100,000", sub: "Deposit on one of the first 5 personal installations" },
  { id: "none", label: "None of these — but I have ideas", sub: "Tell us below" },
];

type Status = "idle" | "saving" | "done" | "error";

export default function SurveyPage() {
  const [tiers, setTiers] = useState<string[]>([]);
  const [pricePoint, setPricePoint] = useState("");
  const [day1, setDay1] = useState("");
  const [referral, setReferral] = useState("");
  const [stol, setStol] = useState("");
  const [plane, setPlane] = useState("");
  const [xprize, setXprize] = useState("");
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
          stol_interest: stol || null,
          plane_interest: plane || null,
          xprize_interest: xprize || null,
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
        .survey-wrap {
          background: #f9f8f6;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        /* ── Top bar ── */
        .survey-topbar {
          background: #1a1a1a;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .survey-logo {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #fff;
          letter-spacing: -0.5px;
          text-decoration: none;
        }
        .survey-logo span { color: #f7f3ea; }
        .survey-topbar-label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        /* ── Hero ── */
        .survey-hero {
          background: #1a1a1a;
          padding: 52px 24px 44px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .survey-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(247,243,234,0.45);
          margin-bottom: 14px;
        }
        .survey-hero h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(26px, 5vw, 38px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 14px;
          line-height: 1.15;
        }
        .survey-hero p {
          font-size: 16px;
          color: rgba(255,255,255,0.55);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.65;
        }
        .survey-hero strong { color: rgba(247,243,234,0.85); font-weight: 500; }

        /* ── Form container ── */
        .survey-form-wrap {
          max-width: 640px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        /* ── Question block ── */
        .survey-q {
          background: #fff;
          border: 1px solid #e8e5e0;
          border-radius: 10px;
          padding: 28px 24px;
          margin-bottom: 16px;
        }
        .survey-q-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 6px;
          line-height: 1.35;
        }
        .survey-q-hint {
          font-size: 13px;
          color: #999;
          margin-bottom: 18px;
          line-height: 1.5;
        }

        /* ── Checkbox / radio options ── */
        .survey-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .survey-option {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 14px;
          border: 1.5px solid #e8e5e0;
          border-radius: 8px;
          cursor: pointer;
          transition: border-color 0.12s, background 0.12s;
          user-select: none;
        }
        .survey-option:hover {
          border-color: #1a1a1a;
          background: #fafafa;
        }
        .survey-option.selected {
          border-color: #1a1a1a;
          background: #f4f3f3;
        }
        .survey-option input {
          margin-top: 2px;
          flex-shrink: 0;
          accent-color: #1a1a1a;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
        .survey-option-text { flex: 1; }
        .survey-option-main {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.3;
        }
        .survey-option-sub {
          font-size: 12px;
          color: #999;
          margin-top: 2px;
          line-height: 1.4;
        }

        /* ── Textarea ── */
        .survey-textarea {
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
        .survey-textarea:focus { border-color: #1a1a1a; background: #fff; }
        .survey-textarea::placeholder { color: #bbb; }
        .survey-char-count {
          font-size: 12px;
          color: #bbb;
          text-align: right;
          margin-top: 6px;
        }

        /* ── Email input ── */
        .survey-email-input {
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
        .survey-email-input:focus { border-color: #1a1a1a; background: #fff; }
        .survey-email-input::placeholder { color: #bbb; }

        /* ── Submit ── */
        .survey-submit-wrap {
          margin-top: 8px;
          text-align: center;
        }
        .survey-submit-btn {
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
        .survey-submit-btn:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
        .survey-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .survey-error {
          color: #c0392b;
          font-size: 14px;
          margin-top: 12px;
          text-align: center;
        }

        /* ── Done state ── */
        .survey-done {
          background: #fff;
          border: 1px solid #e8e5e0;
          border-radius: 12px;
          padding: 52px 32px;
          text-align: center;
          margin-top: 48px;
        }
        .survey-done-check {
          font-size: 40px;
          margin-bottom: 16px;
        }
        .survey-done h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 12px;
        }
        .survey-done p {
          font-size: 16px;
          color: #666;
          line-height: 1.65;
          max-width: 420px;
          margin: 0 auto 28px;
        }
        .survey-done-link {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ── Footer ── */
        .survey-footer {
          max-width: 640px;
          margin: 0 auto;
          padding: 0 24px 48px;
          text-align: center;
          font-size: 13px;
          color: #bbb;
          line-height: 1.8;
        }
        .survey-footer a { color: #999; text-decoration: underline; text-underline-offset: 3px; }

        @media (max-width: 480px) {
          .survey-form-wrap { padding: 32px 16px; }
          .survey-q { padding: 22px 18px; }
        }
      `}</style>

      <div className="survey-wrap">

        {/* Top bar */}
        <div className="survey-topbar">
          <Link href="/" className="survey-logo">Fly<span>IRL</span></Link>
          <div className="survey-topbar-label">Kickstarter Survey</div>
        </div>

        {/* Hero */}
        <div className="survey-hero">
          <div className="survey-eyebrow">2 minutes · Shapes the campaign</div>
          <h1>Help build the Kickstarter</h1>
          <p>
            Phase 1 is done. Now I need to know what reward tiers you&rsquo;d
            actually back.{" "}
            <strong>Suggest a tier that makes it in and you get it free.</strong>
          </p>
        </div>

        <div className="survey-form-wrap">
          {status === "done" ? (
            <div className="survey-done">
              <div className="survey-done-check">✓</div>
              <h2>Got it — thank you.</h2>
              <p>
                Aaron reads every response personally. You&rsquo;ll hear from him
                when the campaign is ready to launch.
              </p>
              <Link href="/kickstarter" className="survey-done-link">
                Browse the Kickstarter draft and reward tiers →
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit}>

              {/* Q1 — Tier interest */}
              <div className="survey-q">
                <div className="survey-q-label">Which reward tiers sound interesting to you?</div>
                <div className="survey-q-hint">Check all that apply.</div>
                <div className="survey-options">
                  {TIERS.map((t) => (
                    <label
                      key={t.id}
                      className={`survey-option${tiers.includes(t.id) ? " selected" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={tiers.includes(t.id)}
                        onChange={() => toggleTier(t.id)}
                      />
                      <div className="survey-option-text">
                        <div className="survey-option-main">{t.label}</div>
                        <div className="survey-option-sub">{t.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q2 — Price ceiling */}
              <div className="survey-q">
                <div className="survey-q-label">
                  What&rsquo;s the most you&rsquo;d realistically pay — knowing delivery is 5–10 years out?
                </div>
                <div className="survey-q-hint">Single choice.</div>
                <div className="survey-options">
                  {[
                    "Under $50",
                    "$50–$150",
                    "$150–$500",
                    "$500–$2,000",
                    "$2,000+",
                    "Nothing — but I'd help in other ways",
                  ].map((opt) => (
                    <label
                      key={opt}
                      className={`survey-option${pricePoint === opt ? " selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="pricePoint"
                        checked={pricePoint === opt}
                        onChange={() => setPricePoint(opt)}
                      />
                      <div className="survey-option-text">
                        <div className="survey-option-main">{opt}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q3 — Day-1 pledge */}
              <div className="survey-q">
                <div className="survey-q-label">
                  Would you commit to backing on launch day?
                </div>
                <div className="survey-q-hint">
                  The first 24 hours determine a Kickstarter&rsquo;s algorithmic rank.
                </div>
                <div className="survey-options">
                  {[
                    { val: "yes", label: "Yes, definitely — just tell me when" },
                    { val: "probably", label: "Probably, if the tier feels right" },
                    { val: "maybe", label: "Maybe — depends on what else is going on" },
                    { val: "probably-not", label: "Probably not" },
                    { val: "no", label: "No" },
                  ].map((opt) => (
                    <label
                      key={opt.val}
                      className={`survey-option${day1 === opt.val ? " selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="day1"
                        checked={day1 === opt.val}
                        onChange={() => setDay1(opt.val)}
                      />
                      <div className="survey-option-text">
                        <div className="survey-option-main">{opt.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q4 — Referral */}
              <div className="survey-q">
                <div className="survey-q-label">
                  Would you share the campaign with your network when it goes live?
                </div>
                <div className="survey-options">
                  {[
                    { val: "yes", label: "Yes — I already know people who'd dig this" },
                    { val: "maybe", label: "Maybe — if there's an easy way to do it" },
                    { val: "probably-not", label: "Probably not" },
                    { val: "no", label: "No" },
                  ].map((opt) => (
                    <label
                      key={opt.val}
                      className={`survey-option${referral === opt.val ? " selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="referral"
                        checked={referral === opt.val}
                        onChange={() => setReferral(opt.val)}
                      />
                      <div className="survey-option-text">
                        <div className="survey-option-main">{opt.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q5 — STOL Cub */}
              <div className="survey-q">
                <div className="survey-q-label">
                  Bonus concept: a 1-hour backcountry bush plane thrill ride near Las Vegas, deliverable within a year, starting at ~$250. Interested?
                </div>
                <div className="survey-options">
                  {[
                    { val: "yes", label: "Yes — that sounds amazing" },
                    { val: "maybe", label: "Maybe — tell me more" },
                    { val: "no", label: "Not for me" },
                    { val: "wtf-is-stol", label: "What's a STOL Cub? (we'll explain)" },
                  ].map((opt) => (
                    <label
                      key={opt.val}
                      className={`survey-option${stol === opt.val ? " selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="stol"
                        checked={stol === opt.val}
                        onChange={() => setStol(opt.val)}
                      />
                      <div className="survey-option-text">
                        <div className="survey-option-main">{opt.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q6 — The plane */}
              <div className="survey-q">
                <div className="survey-q-label">
                  There&rsquo;s no purpose-built aircraft for this activity — the only one is made in China and going nowhere. We&rsquo;d have to build it here. Would you back a separate ~$500K campaign to design and build an American-made plane for the SkyPark?
                </div>
                <div className="survey-q-hint">
                  Sub-$1M aircraft. Rugged, reliable, overengineered safety. Aaron has the aerospace connections.
                </div>
                <div className="survey-options">
                  {[
                    { val: "yes", label: "Yes — that's actually exciting" },
                    { val: "maybe", label: "Maybe — depends on the details" },
                    { val: "focus", label: "Stick to the SkyPark first" },
                    { val: "no", label: "No" },
                  ].map((opt) => (
                    <label
                      key={opt.val}
                      className={`survey-option${plane === opt.val ? " selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="plane"
                        checked={plane === opt.val}
                        onChange={() => setPlane(opt.val)}
                      />
                      <div className="survey-option-text">
                        <div className="survey-option-main">{opt.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q7 — X-Prize */}
              <div className="survey-q">
                <div className="survey-q-label">
                  Wildcard: a $50K crowdfunding goal to fund a university X-Prize — aerospace engineering teams compete to design the aircraft. Much smaller ask, shared IP, same outcome.
                </div>
                <div className="survey-q-hint">
                  FlyIRL is a business, not a product. Whatever gets it off the ground.
                </div>
                <div className="survey-options">
                  {[
                    { val: "yes", label: "Love it — students and professors are underrated" },
                    { val: "maybe", label: "Interesting — I'd want to know more" },
                    { val: "skeptical", label: "Skeptical about the IP tradeoff" },
                    { val: "no", label: "No opinion" },
                  ].map((opt) => (
                    <label
                      key={opt.val}
                      className={`survey-option${xprize === opt.val ? " selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="xprize"
                        checked={xprize === opt.val}
                        onChange={() => setXprize(opt.val)}
                      />
                      <div className="survey-option-text">
                        <div className="survey-option-main">{opt.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q8 — Ideas */}
              <div className="survey-q">
                <div className="survey-q-label">
                  Tier ideas, feedback, or anything else you want Aaron to see?
                </div>
                <div className="survey-q-hint">
                  Wild ideas welcome. If it makes the campaign, you get it free or at cost.
                </div>
                <textarea
                  className="survey-textarea"
                  placeholder="e.g. &quot;I'd pay $200 for a quarterly livestream from inside development&quot;"
                  value={ideas}
                  onChange={(e) => setIdeas(e.target.value.slice(0, 500))}
                />
                <div className="survey-char-count">{ideas.length}/500</div>
              </div>

              {/* Q7 — Email */}
              <div className="survey-q">
                <div className="survey-q-label">Your email address</div>
                <div className="survey-q-hint">
                  Optional — but needed if you want credit for an idea that makes it in,
                  or to be notified on launch day.
                </div>
                <input
                  type="email"
                  className="survey-email-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Submit */}
              <div className="survey-submit-wrap">
                <button
                  type="submit"
                  className="survey-submit-btn"
                  disabled={status === "saving"}
                >
                  {status === "saving" ? "Sending..." : "Send My Answers →"}
                </button>
                {status === "error" && errorMsg && (
                  <div className="survey-error">{errorMsg}</div>
                )}
              </div>

            </form>
          )}
        </div>

        {/* Footer */}
        <div className="survey-footer">
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
