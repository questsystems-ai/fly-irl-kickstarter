"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type Status = "idle" | "saving" | "done" | "error";

export default function CampaignSurveyPage() {
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
          stol_interest: stol || null,
          plane_interest: plane || null,
          xprize_interest: xprize || null,
          ideas: ideas.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      if (email) localStorage.setItem("flyirl_email", email.trim().toLowerCase());
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

        /* ── Standard radio options ── */
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
          box-sizing: border-box;
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
          box-sizing: border-box;
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
        }
      `}</style>

      <div className="sv-wrap">

        <div className="sv-topbar">
          <Link href="/" className="sv-logo">Fly<span>IRL</span></Link>
          <div className="sv-topbar-label">Campaign Survey</div>
        </div>

        <div className="sv-hero">
          <div className="sv-eyebrow">2 minutes · This decides what gets launched</div>
          <h1>Which campaign do you want to see?</h1>
          <p>
            Three real options. Three real funding goals. Each one moves the SkyPark forward.{" "}
            <strong>Your vote shapes which one launches first.</strong>
          </p>
        </div>

        <div className="sv-form-wrap">
          {status === "done" ? (
            <div className="sv-done">
              <div className="sv-done-check">✓</div>
              <h2>Vote cast — thank you.</h2>
              <p>
                Aaron reads every response personally. You&rsquo;ll hear from him when the campaign is ready to launch.
              </p>
              <Link href="/update" className="sv-done-link">
                Back to the updates →
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit}>

              {/* Q1 — STOL Cub */}
              <div className="sv-q">
                <div className="sv-q-label" style={{ marginBottom: 16 }}>
                  Kickstarter-ready option: available within a year
                </div>
                <div className="sv-concept-card sv-concept--cub">
                  <div className="sv-concept-tag">Campaign Option 2 · Deliverable within a year</div>
                  <div className="sv-concept-goal">Available Now</div>
                  <h4>The STOL Cub Experience</h4>
                  <p>
                    A 1-hour discovery flight in a backcountry bush plane — near Las Vegas, no license required.
                    Real stick, real terrain, a master CFI co-flying the whole time. Starting ~$250.
                    This one is deliverable within a year and proves demand for everything that follows.
                  </p>
                </div>
                <div className="sv-options">
                  {[
                    { val: "yes", label: "Yes — that sounds amazing" },
                    { val: "maybe", label: "Maybe — tell me more" },
                    { val: "no", label: "Not for me" },
                    { val: "wtf-is-stol", label: "What's a STOL Cub? (we'll explain)" },
                  ].map((opt) => (
                    <label key={opt.val} className={`sv-option${stol === opt.val ? " selected" : ""}`}>
                      <input type="radio" name="stol" checked={stol === opt.val} onChange={() => setStol(opt.val)} />
                      <div className="sv-option-main">{opt.label}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q2 — The Plane */}
              <div className="sv-q">
                <div className="sv-q-label" style={{ marginBottom: 16 }}>
                  Kickstarter-ready option: build the aircraft nobody built yet
                </div>
                <div className="sv-concept-card sv-concept--plane">
                  <div className="sv-concept-tag">Campaign Option 1 · $500K goal</div>
                  <div className="sv-concept-goal">Rural Air Mobility</div>
                  <h4>The Aircraft That Makes It All Possible</h4>
                  <p>
                    The tech exists — quadcopter-style safety, autonomous landing — it&rsquo;s just not being
                    built for this use case. As work goes virtual and people leave big cities, Rural Air Mobility
                    is the real opportunity. A single-occupant, affordable sky uber. We build it here: sub-$1M,
                    American-made, rugged. $500K gets the design team rolling.
                  </p>
                </div>
                <div className="sv-options">
                  {[
                    { val: "yes", label: "Yes — that's actually exciting" },
                    { val: "maybe", label: "Maybe — depends on the details" },
                    { val: "focus", label: "Stick to the SkyPark first" },
                    { val: "no", label: "No" },
                  ].map((opt) => (
                    <label key={opt.val} className={`sv-option${plane === opt.val ? " selected" : ""}`}>
                      <input type="radio" name="plane" checked={plane === opt.val} onChange={() => setPlane(opt.val)} />
                      <div className="sv-option-main">{opt.label}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q3 — X-Prize */}
              <div className="sv-q">
                <div className="sv-q-label" style={{ marginBottom: 16 }}>
                  Kickstarter-ready option: the smallest ask with the biggest leverage
                </div>
                <div className="sv-concept-card sv-concept--xprize">
                  <div className="sv-concept-tag">Campaign Option 3 · $50K goal</div>
                  <div className="sv-concept-goal">Smallest Ask, Biggest Leverage</div>
                  <h4>A University X-Prize</h4>
                  <p>
                    $50K to run a Moonshot competition for aerospace engineering departments at top universities.
                    Student and faculty teams compete to design what we&rsquo;d otherwise fund internally at $500K.
                    Yes, we&rsquo;d share IP — but FlyIRL is a business, not a product. Whatever gets
                    the right aircraft designed is a win.
                  </p>
                </div>
                <div className="sv-options">
                  {[
                    { val: "yes", label: "Love it — students and professors are underrated" },
                    { val: "maybe", label: "Interesting — I'd want to know more" },
                    { val: "skeptical", label: "Skeptical about the IP tradeoff" },
                    { val: "no", label: "No opinion" },
                  ].map((opt) => (
                    <label key={opt.val} className={`sv-option${xprize === opt.val ? " selected" : ""}`}>
                      <input type="radio" name="xprize" checked={xprize === opt.val} onChange={() => setXprize(opt.val)} />
                      <div className="sv-option-main">{opt.label}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q4 — Ideas */}
              <div className="sv-q">
                <div className="sv-q-label">Thoughts, feedback, or anything else you want Aaron to see?</div>
                <div className="sv-q-hint">All input welcome.</div>
                <textarea
                  className="sv-textarea"
                  placeholder="e.g. &quot;I'd back the STOL Cub but only if the location is accessible&quot;"
                  value={ideas}
                  onChange={(e) => setIdeas(e.target.value.slice(0, 500))}
                />
                <div className="sv-char-count">{ideas.length}/500</div>
              </div>

              {/* Q5 — Email */}
              <div className="sv-q">
                <div className="sv-q-label">Your email address</div>
                <div className="sv-q-hint">
                  Optional — but needed to be notified when the campaign goes live.
                </div>
                <input
                  type="email"
                  className="sv-email-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="sv-submit-wrap">
                <button type="submit" className="sv-submit-btn" disabled={status === "saving"}>
                  {status === "saving" ? "Sending..." : "Cast My Vote →"}
                </button>
                {status === "error" && errorMsg && (
                  <div className="sv-error">{errorMsg}</div>
                )}
              </div>

            </form>
          )}
        </div>

        <div className="sv-footer">
          <p>
            <Link href="/update">Back to updates</Link>
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
