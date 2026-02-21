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

export default function KickstarterPage() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formLoadTime] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const utm = useMemo(() => (typeof window !== "undefined" ? getUTM() : null), []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // Honeypot check
    if (honeypot) { window.location.href = "/reserve"; return; }

    // Timing check
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
          source: "flyirl-kickstarter",
          page_path: "/kickstarter",
          user_agent: navigator.userAgent,
          utm: utm || getUTM(),
          audience_mode: "general",
          _timing: timeElapsed,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Couldn't save your email.");

      // Fire conversion events on all pixels + GTM
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

  // Reusable email form JSX
  const emailForm = (
    <>
      {status === "done" ? (
        <div className="ks-done">You're in. We'll be in touch.</div>
      ) : (
        <form className="ks-email-form" onSubmit={onSubmit}>
          {/* Honeypot — hidden from humans, bots fill it */}
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
            {status === "saving" ? "Saving..." : "Reserve My Spot"}
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
        .ks-hero {
          background: linear-gradient(165deg, var(--dark2) 0%, #1a1a1a 50%, #2a2520 100%);
          color: #fff;
          padding: 130px 24px 80px;
          text-align: center;
          position: relative;
        }
        .ks-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 120%, rgba(247,243,234,0.06) 0%, transparent 70%);
        }
        .ks-hero-inner {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }
        .ks-badge {
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
        .ks-hero h1 {
          font-size: clamp(32px, 5.5vw, 52px);
          font-weight: 800;
          margin-bottom: 18px;
          letter-spacing: -1px;
        }
        .ks-hero h1 span { color: var(--accent); }
        .ks-hero p {
          font-size: 18px;
          color: rgba(255,255,255,0.7);
          max-width: 560px;
          margin: 0 auto 32px;
          font-weight: 300;
        }

        /* ===== SECTION WRAPPER ===== */
        .ks-section {
          padding: 72px 24px;
          max-width: var(--max);
          margin: 0 auto;
        }
        .ks-section-dark {
          background: var(--dark);
          color: #fff;
          max-width: none;
        }
        .ks-section-dark .ks-section-inner {
          max-width: var(--max);
          margin: 0 auto;
          padding: 72px 24px;
        }
        .ks-section-title {
          font-size: clamp(26px, 4vw, 36px);
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .ks-section-sub {
          font-size: 17px;
          color: var(--muted);
          max-width: 600px;
          margin-bottom: 40px;
          line-height: 1.65;
        }
        .ks-section-dark .ks-section-sub { color: rgba(255,255,255,0.7); }

        /* ===== PROOF KIT 3-UP ===== */
        .proof-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .proof-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
        }
        .proof-card-img {
          width: 100%;
          aspect-ratio: 16/10;
          background: #e8e5e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: var(--muted);
          font-style: italic;
        }
        .proof-card-body {
          padding: 20px;
        }
        .proof-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: var(--dark);
          margin-bottom: 6px;
        }
        .proof-card-body h4 { font-size: 17px; margin-bottom: 6px; }
        .proof-card-body p { font-size: 14px; color: var(--muted); margin: 0; line-height: 1.55; }

        /* ===== USE OF FUNDS ===== */
        .funds-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .fund-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 24px;
          text-align: center;
        }
        .fund-amount {
          font-family: 'Montserrat', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: var(--accent);
        }
        .fund-label {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          margin-top: 6px;
        }
        .fund-total {
          text-align: center;
          margin-top: 32px;
        }
        .fund-total-val {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(42px, 6vw, 64px);
          font-weight: 800;
          color: var(--accent);
        }
        .fund-total-label {
          font-size: 16px;
          color: rgba(255,255,255,0.6);
          margin-top: 4px;
        }

        /* ===== REWARD TIERS ===== */
        .tier-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .tier-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .tier-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .tier-card.featured {
          border-color: var(--dark);
          border-width: 2px;
        }
        .tier-featured-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--dark);
          color: var(--accent);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 5px 14px;
          border-radius: 50px;
          white-space: nowrap;
        }
        .tier-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 4px;
        }
        .tier-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .tier-desc {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.6;
          flex: 1;
        }
        .tier-perks {
          list-style: none;
          padding: 0;
          margin: 18px 0 0;
          border-top: 1px solid var(--border);
          padding-top: 16px;
        }
        .tier-perks li {
          font-size: 14px;
          color: var(--ink);
          padding: 5px 0;
          padding-left: 20px;
          position: relative;
        }
        .tier-perks li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--dark);
          font-weight: 700;
        }

        /* ===== EMAIL CTA ===== */
        .ks-email-section {
          background: var(--dark2);
          padding: 72px 24px;
          text-align: center;
        }
        .ks-email-inner {
          max-width: 520px;
          margin: 0 auto;
        }
        .ks-email-inner h2 {
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
        }
        .ks-email-inner p {
          color: rgba(255,255,255,0.65);
          font-size: 16px;
          margin-bottom: 28px;
        }
        .ks-email-form {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .ks-email-form input[type="email"] {
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
        .ks-email-form input::placeholder { color: rgba(255,255,255,0.4); }
        .ks-email-form button {
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
        .ks-email-form button:hover { transform: translateY(-1px); }
        .ks-email-form button:disabled { opacity: 0.6; cursor: not-allowed; }
        .ks-done { color: var(--accent); font-size: 15px; margin-top: 14px; }

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

        /* ===== CONVERGENCE DIAGRAM ===== */
        .converge-section {
          background: var(--bg);
          padding: 72px 24px;
        }
        .converge-inner {
          max-width: var(--max);
          margin: 0 auto;
        }
        .converge-tracks {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 0;
        }
        .converge-track {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 24px 20px;
          border-top: 4px solid var(--dark);
        }
        .converge-track.t2 { border-top-color: #8a7a52; }
        .converge-track.t3 { border-top-color: #4a8c6f; }
        .converge-track h4 {
          font-size: 16px;
          margin-bottom: 10px;
        }
        .converge-track ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .converge-track ul li {
          font-size: 14px;
          line-height: 1.5;
          color: var(--muted);
          padding: 4px 0 4px 16px;
          position: relative;
        }
        .converge-track ul li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--dark);
          font-weight: 700;
          font-size: 12px;
        }
        .converge-arrow {
          display: flex;
          justify-content: center;
          padding: 20px 0 16px;
        }
        .converge-arrow svg {
          display: block;
        }
        .converge-target {
          background: var(--dark);
          color: #fff;
          border-radius: 12px;
          padding: 32px;
          text-align: center;
          border: 2px solid var(--accent);
        }
        .converge-target h3 {
          font-size: clamp(22px, 3vw, 28px);
          font-weight: 800;
          margin-bottom: 8px;
        }
        .converge-target h3 span { color: var(--accent); }
        .converge-target p {
          font-size: 15px;
          color: rgba(255,255,255,0.7);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.55;
        }

        /* ===== FOUNDER STORY ===== */
        .founder-section {
          padding: 72px 24px;
          background: var(--bg);
        }
        .founder-inner {
          max-width: 680px;
          margin: 0 auto;
        }
        .founder-header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
        }
        .founder-photo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #ddd;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: var(--muted);
          font-style: italic;
          text-align: center;
          border: 3px solid var(--border);
        }
        .founder-header h2 {
          font-size: clamp(24px, 3.5vw, 32px);
          font-weight: 800;
          margin-bottom: 4px;
        }
        .founder-header p {
          font-size: 15px;
          color: var(--muted);
          margin: 0;
        }
        .founder-body p {
          font-size: 16px;
          line-height: 1.72;
          color: var(--ink);
          margin-bottom: 16px;
        }
        .founder-body .crisis {
          background: var(--dark);
          color: #fff;
          padding: 28px 28px;
          margin: 28px 0;
          border-radius: 0;
          position: relative;
          border-left: 4px solid var(--accent);
        }
        .founder-body .crisis p {
          color: rgba(255,255,255,0.88);
          margin-bottom: 14px;
        }
        .founder-body .crisis p:last-child { margin-bottom: 0; }
        .founder-body .miracle {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(22px, 3vw, 28px);
          font-weight: 800;
          text-align: center;
          padding: 28px 0;
          color: var(--dark);
        }
        .founder-body .closing {
          font-weight: 600;
          color: var(--ink);
        }

        /* ===== PROOF KIT ===== */
        .proof-section {
          padding: 72px 24px;
          background: var(--offwhite, #f4f3f3);
        }
        .proof-inner {
          max-width: var(--max);
          margin: 0 auto;
          text-align: center;
        }
        .proof-inner .ks-section-sub {
          margin-left: auto;
          margin-right: auto;
        }
        .proof-section .proof-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 32px;
        }
        .proof-section .proof-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
        }
        .proof-section .proof-card-img {
          height: 180px;
          background: #e0ddd8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: var(--muted);
          font-style: italic;
          overflow: hidden;
        }
        .proof-section .proof-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .proof-section .proof-card-body {
          padding: 20px;
          text-align: left;
        }
        .proof-section .proof-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--dark);
          color: var(--accent);
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .proof-section .proof-card-body h4 {
          font-size: 16px;
          margin-bottom: 8px;
        }
        .proof-section .proof-card-body p {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
        }

        @media (max-width: 768px) {
          .proof-grid { grid-template-columns: 1fr; }
          .tier-grid { grid-template-columns: 1fr; }
          .funds-grid { grid-template-columns: 1fr 1fr; }
          .converge-tracks { grid-template-columns: 1fr; }
          .founder-header { flex-direction: column; text-align: center; }
          .proof-section .proof-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Nav />

      {/* ══════════ HERO + EMAIL CTA (bold, at top) ══════════ */}
      <section className="ks-hero">
        <div className="ks-hero-inner">
          <div className="ks-badge">Kickstarter Pre-Launch</div>
          <h1>Back the <span>SkyPark</span></h1>
          <p>
            What this Kickstarter funds, how your money is used, and what you get for backing the dream.
          </p>
          <div className="ks-email-inner">
            {emailForm}
          </div>
        </div>
      </section>

      {/* THREE TRACKS → DIGITAL TWIN */}
      <section className="converge-section">
        <div className="converge-inner">
          <h2 className="ks-section-title">Three development tracks, one deliverable</h2>
          <p className="ks-section-sub">
            Building a SkyPark requires simultaneous progress on three fronts. This Kickstarter
            funds the point where all three converge: the Digital Twin.
          </p>

          <div className="converge-tracks">
            <div className="converge-track">
              <h4>Regulatory</h4>
              <ul>
                <li>FAA engagement: Part 91 → experimental → type certificate path</li>
                <li>Closely parallels Urban Air Mobility (UAM) regulatory framework</li>
                <li>Closed, controlled airspace simplifies approval</li>
                <li>Safety case built on simulation data before any physical flight</li>
              </ul>
            </div>
            <div className="converge-track t2">
              <h4>Park and Systems</h4>
              <ul>
                <li>SkyPark definition, traffic coordination</li>
                <li>Guest pilot interface: AR HUD, simplified controls</li>
                <li>Collision avoidance, envelope protection logic</li>
                <li>Operations: briefing flow, session management, maintenance</li>
              </ul>
            </div>
            <div className="converge-track t3">
              <h4>Aircraft Design</h4>
              <ul>
                <li>Hybrid fixed-wing + quad: fun to fly, ultra-safe</li>
                <li>Automated takeoff and landing (hardest parts eliminated)</li>
                <li>Ultra-rugged: 1,000s of hours, fast turnaround</li>
                <li>Range sacrificed for safety margin and durability</li>
              </ul>
            </div>
          </div>

          <div className="converge-arrow">
            <svg width="120" height="48" viewBox="0 0 120 48" fill="none">
              <path d="M20 0 L60 40 L100 0" stroke="#ccc" strokeWidth="2" fill="none" />
              <path d="M52 32 L60 44 L68 32" fill="var(--dark)" />
            </svg>
          </div>

          <div className="converge-target">
            <h3>The <span>Digital Twin</span></h3>
            <p>
              A physics-accurate, fully integrated simulation of the SkyPark — the aircraft, the safety systems,
              the guest experience, the operations — all in software. This is the &ldquo;hard&rdquo; product of this Kickstarter:
              pure software that proves the entire concept before anything goes airborne.
            </p>
          </div>
        </div>
      </section>

      {/* PROOF KIT */}
      <section className="proof-section">
        <div className="proof-inner">
          <h2 className="ks-section-title">We&rsquo;re not starting from zero</h2>
          <p className="ks-section-sub">
            Working prototypes already exist for core pieces of the FlyIRL experience.
            This Kickstarter funds the integration of those pieces into a single, cohesive SkyPark
            simulation, with real flight physics and advanced aircraft design,
            structured like an open world MMO.
          </p>

          <div className="proof-grid">
            <div className="proof-card">
              <div className="proof-card-img">
                <img src="/images/proof-hud.jpg" alt="Guest pilot HUD prototype" />
              </div>
              <div className="proof-card-body">
                <div className="proof-num">1</div>
                <h4>Guest Pilot Interface</h4>
                <p>
                  A working AR / HUD prototype integrated with real flight physics — the in-cockpit
                  experience guests actually use.
                </p>
              </div>
            </div>

            <div className="proof-card">
              <div className="proof-card-img">
                <img src="/images/proof-digital-twin.jpg" alt="Digital twin safety simulation" />
              </div>
              <div className="proof-card-body">
                <div className="proof-num">2</div>
                <h4>Safety &amp; Coordination System</h4>
                <p>
                  A completed control system for safe, envelope-limited flight logic, without
                  compromising the radical freedom of the experience of flight, where YOU steer the plane.
                </p>
              </div>
            </div>

            <div className="proof-card">
              <div className="proof-card-img">
                <img src="/images/proof-skypark-world.jpg" alt="SkyPark world simulation" />
              </div>
              <div className="proof-card-body">
                <div className="proof-num">3</div>
                <h4>SkyPark World Simulation</h4>
                <p>
                  A navigable SkyPark multiplayer environment — lodge, runway, control tower,
                  and flight zone — tying the full experience together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USE OF FUNDS */}
      <section className="ks-section-dark">
        <div className="ks-section-inner">
          <h2 className="ks-section-title">Use of Funds</h2>
          <p className="ks-section-sub">
            Every dollar goes toward building the integrated SkyPark simulation — the proof
            that this experience is real, safe, and worth scaling.
          </p>

          <div className="fund-total">
            <div className="fund-total-val">$500K</div>
            <div className="fund-total-label">Kickstarter Goal</div>
          </div>

          <div className="funds-grid">
            <div className="fund-card">
              <div className="fund-amount">$280K</div>
              <div className="fund-label">Core Simulation Development</div>
            </div>
            <div className="fund-card">
              <div className="fund-amount">$100K</div>
              <div className="fund-label">Safety Systems Integration</div>
            </div>
            <div className="fund-card">
              <div className="fund-amount">$50K</div>
              <div className="fund-label">FAA &amp; Regulatory Groundwork</div>
            </div>
            <div className="fund-card">
              <div className="fund-amount">$40K</div>
              <div className="fund-label">Demo &amp; Marketing</div>
            </div>
            <div className="fund-card">
              <div className="fund-amount">$30K</div>
              <div className="fund-label">Legal &amp; Admin</div>
            </div>
          </div>
        </div>
      </section>

      {/* REWARD TIERS */}
      <section className="ks-section">
        <h2 className="ks-section-title">Backer Rewards</h2>
        <p className="ks-section-sub">
          This isn&rsquo;t just a donation — it&rsquo;s participation. Every tier gives you access to
          the build process and a role in the future of flight.
        </p>

        <div className="tier-grid">
          <div className="tier-card">
            <div className="tier-price">$25</div>
            <div className="tier-name">Dreamer</div>
            <p className="tier-desc">
              You believe flight should be for everyone. Get your name on the Founders Wall
              and exclusive updates from inside the build.
            </p>
            <ul className="tier-perks">
              <li>Founders Wall listing</li>
              <li>Private build updates</li>
              <li>Digital backer badge</li>
            </ul>
          </div>

          <div className="tier-card">
            <div className="tier-price">$100</div>
            <div className="tier-name">Crew Member</div>
            <p className="tier-desc">
              Join the design review community. Attend live sessions where we share progress,
              take feedback, and shape the experience together.
            </p>
            <ul className="tier-perks">
              <li>Everything in Dreamer</li>
              <li>Monthly design review access</li>
              <li>Vote on feature priorities</li>
              <li>Backer-only Discord</li>
            </ul>
          </div>

          <div className="tier-card featured">
            <div className="tier-featured-badge">Most Popular</div>
            <div className="tier-price">$300</div>
            <div className="tier-name">Test Pilot</div>
            <p className="tier-desc">
              Be first to fly. Get priority access to every demo, simulation test, and
              eventually — the real thing.
            </p>
            <ul className="tier-perks">
              <li>Everything in Crew Member</li>
              <li>Priority demo access</li>
              <li>Simulation beta testing</li>
              <li>Launch-day flight reservation</li>
            </ul>
          </div>

          <div className="tier-card">
            <div className="tier-price">$1,000</div>
            <div className="tier-name">Founding Pilot</div>
            <p className="tier-desc">
              A serious commitment to making this real. Founding Pilots get a guaranteed
              flight slot, lifetime priority, and your name on the first aircraft.
            </p>
            <ul className="tier-perks">
              <li>Everything in Test Pilot</li>
              <li>Guaranteed first-year flight</li>
              <li>Lifetime priority booking</li>
              <li>Quarterly founder calls</li>
              <li>Name on the first aircraft</li>
            </ul>
          </div>

          <div className="tier-card">
            <div className="tier-price">$10,000</div>
            <div className="tier-name">Ranch Pioneer</div>
            <p className="tier-desc">
              A deposit toward a personal flight system. When ranch installations
              begin, Ranch Pioneers are first on the wait list — with $10,000 credited
              toward the purchase price of their system.
            </p>
            <ul className="tier-perks">
              <li>Everything in Founding Pilot</li>
              <li>$10K credited toward personal system purchase</li>
              <li>First on the ranch installation wait list</li>
              <li>Direct input on personal system design</li>
              <li>Private quarterly briefings with founder</li>
            </ul>
          </div>

          <div className="tier-card featured">
            <div className="tier-featured-badge">Limited — 5 Available</div>
            <div className="tier-price">$100,000</div>
            <div className="tier-name">Ranch Founder</div>
            <p className="tier-desc">
              A deposit on one of the first five personal ranch installations.
              Ranch Founders are guaranteed a system in the first production run,
              with $100,000 credited toward the purchase price.
            </p>
            <ul className="tier-perks">
              <li>Everything in Ranch Pioneer</li>
              <li>$100K credited toward personal system purchase</li>
              <li>Guaranteed slot in first 5 ranch installations</li>
              <li>Co-design your installation with the engineering team</li>
              <li>Monthly direct access to founder throughout development</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BOTTOM EMAIL CTA */}
      <section className="ks-email-section">
        <div className="ks-email-inner">
          <h2>Get launch-day priority</h2>
          <p>
            Join the pre-launch list for early access, behind-the-scenes updates,
            and first notification when the Kickstarter goes live.
          </p>
          {emailForm}
        </div>
      </section>
    </>
  );
}
