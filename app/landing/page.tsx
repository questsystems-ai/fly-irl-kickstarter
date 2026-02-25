"use client";

import React, { useMemo, useState } from "react";
import Nav from "@/components/Nav";
import { trackMetaLeadSubmit } from "@/lib/metaPixel";
import { trackLeadSubmit as trackTikTokLeadSubmit } from "@/lib/tiktokPixel";
import { gtmTrackLead } from "@/lib/gtm";

type UTM = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid: string;
  fbclid: string;
  referrer: string;
};

function getUTM(): UTM {
  if (typeof window === "undefined") {
    return { utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "", gclid: "", fbclid: "", referrer: "" };
  }
  const p = new URL(window.location.href).searchParams;
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
    gclid: p.get("gclid") || "",
    fbclid: p.get("fbclid") || "",
    referrer: document.referrer || "",
  };
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formLoadTime] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const utm = useMemo(() => (typeof window !== "undefined" ? getUTM() : null), []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (honeypot) { window.location.href = "/reserve"; return; }

    const timeElapsed = Date.now() - formLoadTime;
    if (timeElapsed < 2000) { window.location.href = "/reserve"; return; }

    const em = email.trim().toLowerCase();
    if (!em || !em.includes("@")) {
      setErrorMsg("Please enter a valid email.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    try {
      localStorage.setItem("flyirl_email", em);

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: em,
          source: "flyirl-landing",
          page_path: "/landing",
          user_agent: navigator.userAgent,
          utm: utm || getUTM(),
          audience_mode: "general",
          _timing: timeElapsed,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Couldn't save your email.");

      trackMetaLeadSubmit(em, "general");
      trackTikTokLeadSubmit(em, "general");
      gtmTrackLead("general");

      window.location.href = "/reserve";
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Couldn't save your email. Please try again.");
      setStatus("error");
    }
  }

  const emailForm = (
    <>
      {status === "done" ? (
        <div className="lp-done">You're in. We'll be in touch.</div>
      ) : (
        <form className="lp-email-form" onSubmit={onSubmit}>
          <input
            type="text"
            name="company_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ position: "absolute", left: "-9999px", tabIndex: -1 } as any}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="neon-input-wrap">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Saving..." : "Get Early Access"}
          </button>
          <div className="cta-arrow">
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
              <path d="M40 16 L10 16" stroke="#e63946" strokeWidth="3" strokeLinecap="round" />
              <path d="M18 6 L6 16 L18 26" stroke="#e63946" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </form>
      )}
      {status === "error" && errorMsg && (
        <div style={{ color: "#ffd1d1", fontSize: 14, marginTop: 10 }}>
          {errorMsg}
        </div>
      )}
    </>
  );

  return (
    <>
      <style>{`
        /* ===== HERO ===== */
        .lp-hero {
          background: #0d0d0d;
          color: #fff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .lp-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
          opacity: 0.45;
        }
        .lp-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(13,13,13,0.5) 0%,
            rgba(13,13,13,0.2) 40%,
            rgba(13,13,13,0.6) 100%
          );
          z-index: 1;
        }
        .lp-hero-inner {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          z-index: 2;
        }
        .lp-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--accent);
          border: 1px solid rgba(247,243,234,0.3);
          padding: 8px 18px;
          border-radius: 50px;
          margin-bottom: 24px;
        }
        .lp-hero h1 {
          font-size: clamp(32px, 5.5vw, 52px);
          font-weight: 800;
          margin-bottom: 18px;
          letter-spacing: -1px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4);
        }
        .lp-hero h1 span { color: var(--accent); }
        .lp-hero p {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          max-width: 560px;
          margin: 0 auto 32px;
          font-weight: 300;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5);
        }

        /* ===== SECTION WRAPPER ===== */
        .lp-section {
          padding: 72px 24px;
          max-width: var(--max);
          margin: 0 auto;
        }
        .lp-section-dark {
          background: var(--dark);
          color: #fff;
          max-width: none;
        }
        .lp-section-dark .lp-section-inner {
          max-width: var(--max);
          margin: 0 auto;
          padding: 72px 24px;
        }
        .lp-section-title {
          font-size: clamp(26px, 4vw, 36px);
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .lp-section-sub {
          font-size: 17px;
          color: var(--muted);
          max-width: 600px;
          margin-bottom: 40px;
          line-height: 1.65;
        }
        .lp-section-dark .lp-section-sub { color: rgba(255,255,255,0.7); }

        /* ===== TWO-COLUMN LAYOUT ===== */
        .lp-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .lp-cols.reverse { direction: rtl; }
        .lp-cols.reverse > * { direction: ltr; }
        .lp-cols h2 {
          font-size: clamp(26px, 4vw, 36px);
          font-weight: 800;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }
        .lp-cols p {
          font-size: 17px;
          line-height: 1.7;
          color: var(--muted);
          margin-bottom: 14px;
        }
        .lp-cols strong {
          color: var(--ink);
        }
        .lp-cols img {
          width: 100%;
          border-radius: 10px;
          display: block;
        }

        /* ===== HOW IT WORKS 3-UP ===== */
        .lp-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 32px;
        }
        .lp-step-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          overflow: hidden;
          text-align: center;
        }
        .lp-step-card img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          display: block;
        }
        .lp-step-body {
          padding: 24px 20px;
        }
        .lp-step-num {
          width: 40px; height: 40px;
          background: var(--accent);
          color: var(--accentText);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 16px; font-weight: 700;
          margin: 0 auto 12px;
        }
        .lp-step-card h4 {
          font-size: 17px;
          margin-bottom: 8px;
          color: #fff;
        }
        .lp-step-card p {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          margin: 0;
          line-height: 1.55;
        }

        /* ===== STAT CARDS ===== */
        .lp-stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-top: 32px;
        }
        .lp-stat-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
        }
        .lp-stat-card img {
          width: 100%;
          height: 80px;
          object-fit: cover;
          display: block;
        }
        .lp-stat-body {
          padding: 20px;
        }
        .lp-stat-value {
          font-family: 'Montserrat', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: var(--dark);
          margin-bottom: 4px;
        }
        .lp-stat-label {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .lp-stat-body p {
          font-size: 14px;
          color: var(--muted);
          margin: 0;
          line-height: 1.55;
        }

        /* ===== EMAIL CTA ===== */
        .lp-email-section {
          background: var(--dark2);
          padding: 72px 24px;
          text-align: center;
        }
        .lp-email-inner {
          max-width: 520px;
          margin: 0 auto;
        }
        .lp-email-inner h2 {
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
        }
        .lp-email-inner p {
          color: rgba(255,255,255,0.65);
          font-size: 16px;
          margin-bottom: 28px;
        }
        .lp-email-form {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .lp-email-form input[type="email"] {
          width: 280px;
          max-width: 100%;
          padding: 14px 16px;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          background: rgba(255,255,255,0.08);
          color: #fff;
          outline: none;
        }
        .lp-email-form input::placeholder { color: rgba(255,255,255,0.4); }
        .lp-email-form button {
          padding: 14px 24px;
          background: var(--accent);
          color: var(--accentText);
          border: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.15s ease;
        }
        .lp-email-form button:hover { transform: translateY(-1px); }
        .lp-email-form button:disabled { opacity: 0.6; cursor: not-allowed; }
        .lp-done { color: var(--accent); font-size: 15px; margin-top: 14px; }

        /* ===== RED ARROW POINTING TO CTA ===== */
        .cta-arrow {
          display: flex;
          align-items: center;
          animation: arrowBounce 1.2s ease-in-out infinite;
        }
        .cta-arrow svg {
          filter: drop-shadow(0 2px 8px rgba(230, 57, 70, 0.5));
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-8px); }
        }

        /* ===== PULSING ROTATING NEON OUTLINE ===== */
        .neon-input-wrap {
          position: relative;
          width: 280px;
          max-width: 100%;
          border-radius: 8px;
          padding: 2px;
          background: conic-gradient(
            from var(--neon-angle, 0deg),
            #ff3366, #ff6633, #ffcc33, #33ff99, #3399ff, #cc33ff, #ff3366
          );
          animation: neonRotate 2.5s linear infinite, neonPulse 2s ease-in-out infinite;
        }
        .neon-input-wrap input[type="email"] {
          width: 100%;
          padding: 14px 16px;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          background: rgba(13, 13, 13, 0.95);
          color: #fff;
          outline: none;
        }
        .neon-input-wrap input::placeholder { color: rgba(255,255,255,0.4); }

        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(255, 51, 102, 0.4), 0 0 20px rgba(51, 153, 255, 0.2); }
          50% { box-shadow: 0 0 16px rgba(255, 51, 102, 0.6), 0 0 40px rgba(51, 153, 255, 0.4); }
        }

        @property --neon-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes neonRotate {
          to { --neon-angle: 360deg; }
        }

        /* ===== SAFETY LAYERS ===== */
        .lp-safety-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 32px;
        }
        .lp-safety-layer {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 24px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          border-left: 4px solid var(--accent);
        }
        .lp-safety-layer-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: var(--accent);
          line-height: 1;
          flex-shrink: 0;
        }
        .lp-safety-layer h4 {
          font-size: 17px;
          margin-bottom: 4px;
          color: #fff;
        }
        .lp-safety-layer p {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          margin: 0;
          line-height: 1.55;
        }

        /* ===== MID-PAGE CTA BAND ===== */
        .lp-mid-cta {
          background: var(--dark2);
          padding: 48px 24px;
          text-align: center;
        }
        .lp-mid-cta-inner {
          max-width: 520px;
          margin: 0 auto;
        }
        .lp-mid-cta h3 {
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
        }
        .lp-mid-cta p {
          color: rgba(255,255,255,0.6);
          font-size: 15px;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .lp-cols { grid-template-columns: 1fr; gap: 28px; }
          .lp-cols.reverse { direction: ltr; }
          .lp-steps-grid { grid-template-columns: 1fr; }
          .lp-stat-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Nav />

      {/* ══════════ HERO ══════════ */}
      <section className="lp-hero">
        <video
          className="lp-hero-video"
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="lp-hero-inner">
          <div className="lp-badge">Real Flight for Everyone</div>
          <h1>Feel Like a Pilot — <span>Without Becoming One</span></h1>
          <p>
            No license. No training. No risk. Just the pure, unforgettable feeling of flying a real aircraft through real skies.
          </p>
          <div className="lp-email-inner">
            {emailForm}
          </div>
        </div>
      </section>

      {/* ══════════ THE PROBLEM ══════════ */}
      <section className="lp-section">
        <h2 className="lp-section-title">Flying has always been out of reach</h2>
        <p className="lp-section-sub">
          For 99% of people, the dream of flight is locked behind years of training, high cost, and real danger.
        </p>
        <div className="lp-stat-grid">
          <div className="lp-stat-card">
            <img src="/images/problem-cost.jpg" alt="Cost barrier" />
            <div className="lp-stat-body">
              <div className="lp-stat-value">$15K+</div>
              <div className="lp-stat-label">Cost Barrier</div>
              <p>Minimum for a private pilot license, plus 6&ndash;12 months of training.</p>
            </div>
          </div>
          <div className="lp-stat-card">
            <img src="/images/problem-danger.jpg" alt="GA danger" />
            <div className="lp-stat-body">
              <div className="lp-stat-value">1,000+</div>
              <div className="lp-stat-label">Fatalities / Year</div>
              <p>General aviation remains one of the most dangerous forms of transportation.</p>
            </div>
          </div>
          <div className="lp-stat-card">
            <img src="/images/problem-access.jpg" alt="Access barrier" />
            <div className="lp-stat-body">
              <div className="lp-stat-value">0.2%</div>
              <div className="lp-stat-label">Access Rate</div>
              <p>Fewer than 1 in 500 Americans hold a pilot certificate.</p>
            </div>
          </div>
          <div className="lp-stat-card">
            <img src="/images/problem-dream.jpg" alt="Universal dream of flight" />
            <div className="lp-stat-body">
              <div className="lp-stat-value">&infin;</div>
              <div className="lp-stat-label">Demand</div>
              <p>Every kid dreams of flight. Then adult reality kicks in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ THE SOLUTION ══════════ */}
      <section className="lp-section" style={{ paddingTop: 0 }}>
        <div className="lp-cols">
          <div>
            <h2>What if flying was a ride?</h2>
            <p>
              FlyIRL is a completely new experience: theme-park safety and accessibility meets real aviation, inside a hard safety envelope.
            </p>
            <p>
              You sit in a real cockpit. You hold the real controls. You fly through real skies. But the system won&rsquo;t let you do anything unsafe.
            </p>
            <p>
              <strong>No license required. Just fly.</strong>
            </p>
          </div>
          <div>
            <img src="/images/hero-action.jpg" alt="FlyIRL flight experience" />
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="lp-section-dark">
        <div className="lp-section-inner">
          <h2 className="lp-section-title">How it works</h2>
          <p className="lp-section-sub">
            Ten minutes of prep, then a guided flight inside a controlled SkyZone. You&rsquo;re in control &mdash; the system handles the rest.
          </p>
          <div className="lp-steps-grid">
            <div className="lp-step-card">
              <img src="/images/step-you-fly.jpg" alt="You fly" />
              <div className="lp-step-body">
                <div className="lp-step-num">1</div>
                <h4>You Fly</h4>
                <p>Real stick, real rudder, real G-forces. You&rsquo;re actually piloting through real skies.</p>
              </div>
            </div>
            <div className="lp-step-card">
              <img src="/images/step-ai-watches.jpg" alt="AI watches" />
              <div className="lp-step-body">
                <div className="lp-step-num">2</div>
                <h4>AI Watches</h4>
                <p>A digital twin predicts every possible outcome 10 seconds ahead in real-time.</p>
              </div>
            </div>
            <div className="lp-step-card">
              <img src="/images/step-safety-catches.jpg" alt="Safety catches" />
              <div className="lp-step-body">
                <div className="lp-step-num">3</div>
                <h4>Safety Catches</h4>
                <p>Push past the envelope? The system smoothly takes over, recovers, and hands control back.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MID-PAGE CTA ══════════ */}
      <section className="lp-mid-cta">
        <div className="lp-mid-cta-inner">
          <h3>Want to be first to fly?</h3>
          <p>Join the pre-launch list for early access and behind-the-scenes updates.</p>
          {emailForm}
        </div>
      </section>

      {/* ══════════ FLYING ISN'T HARD ══════════ */}
      <section className="lp-section">
        <div className="lp-cols reverse">
          <div>
            <h2>Flying isn&rsquo;t hard. Landing is.</h2>
            <p>
              Most people think piloting an aircraft is extremely complex. It&rsquo;s not &mdash; basic flight is about as intuitive as driving. Stick forward, nose down. Pull back, nose up.
            </p>
            <p>
              The skills that take a long time to master &mdash; takeoff, landing, navigation, emergencies &mdash; are exactly the parts FlyIRL handles for you. You get the fun part.
            </p>
          </div>
          <div>
            <img src="/images/aircraft-concept.jpg" alt="FlyIRL aircraft concept" />
          </div>
        </div>
      </section>

      {/* ══════════ MAXIMUM FUN, HARD LIMITS ══════════ */}
      <section className="lp-section" style={{ paddingTop: 0 }}>
        <div className="lp-cols">
          <div>
            <h2>Maximum fun. Hard limits.</h2>
            <p>
              FlyIRL is designed around safety, fun, convenience, and affordability. This isn&rsquo;t about transportation &mdash; it&rsquo;s about the pure feeling of flight, safely contained by technology.
            </p>
            <p>
              Think of it like a roller coaster &mdash; except you&rsquo;re the one steering.
            </p>
          </div>
          <div>
            <img src="/images/safety-net.jpg" alt="Digital twin safety net" />
          </div>
        </div>
      </section>

      {/* ══════════ SAFETY ARCHITECTURE ══════════ */}
      <section className="lp-section-dark">
        <div className="lp-section-inner">
          <h2 className="lp-section-title">Three layers of safety</h2>
          <p className="lp-section-sub">
            Redundant systems ensure dangerous outcomes are effectively impossible &mdash; not just unlikely.
          </p>
          <div className="lp-safety-stack">
            <div className="lp-safety-layer">
              <div className="lp-safety-layer-num">01</div>
              <div>
                <h4>Digital Twin</h4>
                <p>Physics-accurate simulation running in real-time, predicting all trajectories and potential conflicts before they happen.</p>
              </div>
            </div>
            <div className="lp-safety-layer">
              <div className="lp-safety-layer-num">02</div>
              <div>
                <h4>Envelope Protection</h4>
                <p>AI continuously monitors position, attitude, airspeed, and proximity &mdash; intervening smoothly before any danger threshold.</p>
              </div>
            </div>
            <div className="lp-safety-layer">
              <div className="lp-safety-layer-num">03</div>
              <div>
                <h4>Quadcopter Failsafe</h4>
                <p>The hybrid aircraft can recover from any attitude, including traditionally &ldquo;unrecoverable&rdquo; spins. No unrecoverable situations exist.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ THE EXPERIENCE ══════════ */}
      <section className="lp-section">
        <div className="lp-cols reverse">
          <div>
            <h2>More than a flight. An experience.</h2>
            <p>
              Arrive at the SkyPark. Brief your session. Step into the cockpit. Fly through stunning desert landscapes inside a controlled zone &mdash; then debrief with your flight replay.
            </p>
            <p>
              Whether it&rsquo;s a solo adventure, a group outing, or just something you&rsquo;ve always wanted to try &mdash; this is the feeling of flight without the barriers.
            </p>
          </div>
          <div>
            <img src="/images/experience.jpg" alt="The SkyPark experience" />
          </div>
        </div>
      </section>

      {/* ══════════ BOTTOM CTA ══════════ */}
      <section className="lp-email-section">
        <div className="lp-email-inner">
          <h2>This starts with a list of people who want it to exist.</h2>
          <p>
            Add your name. The adventure starts today &mdash; and the more people who join, the faster we can make it real.
          </p>
          {emailForm}
        </div>
      </section>
    </>
  );
}
