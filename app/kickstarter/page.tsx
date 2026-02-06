"use client";

import React, { useState } from "react";
import Nav from "@/components/Nav";

export default function KickstarterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const em = email.trim().toLowerCase();
    if (!em || !em.includes("@")) return;
    setStatus("saving");
    try {
      // Placeholder — wire to your lead API
      await new Promise((r) => setTimeout(r, 600));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

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
          margin: 0 auto;
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
          border: 1px solid rgba(255,255,255,0.2);
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

        /* ===== NAV BACK LINKS ===== */
        .ks-back-links {
          display: flex;
          gap: 14px;
          justify-content: center;
          margin-top: 28px;
        }
        .ks-back-link {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.15s;
        }
        .ks-back-link:hover { color: rgba(255,255,255,0.9); }

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

        @media (max-width: 768px) {
          .proof-grid { grid-template-columns: 1fr; }
          .tier-grid { grid-template-columns: 1fr; }
          .funds-grid { grid-template-columns: 1fr 1fr; }
          .converge-tracks { grid-template-columns: 1fr; }
          .founder-header { flex-direction: column; text-align: center; }
        }
      `}</style>

      <Nav />

      {/* HERO */}
      <section className="ks-hero">
        <div className="ks-hero-inner">
          <div className="ks-badge">Kickstarter Pre-Launch</div>
          <h1>Back the <span>SkyPark</span></h1>
          <p>
            What this Kickstarter funds, how your money is used, and what you get for backing the dream.
          </p>
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
                <li>SkyZone definition, traffic coordination</li>
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
              the guest experience, the operations — all in software. This is the "hard" product of this Kickstarter:
              pure software that proves the entire concept before anything goes airborne.
            </p>
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
              <div className="fund-label">FAA & Regulatory Groundwork</div>
            </div>
            <div className="fund-card">
              <div className="fund-amount">$40K</div>
              <div className="fund-label">Demo & Marketing</div>
            </div>
            <div className="fund-card">
              <div className="fund-amount">$30K</div>
              <div className="fund-label">Legal & Admin</div>
            </div>
          </div>
        </div>
      </section>

      {/* REWARD TIERS */}
      <section className="ks-section">
        <h2 className="ks-section-title">Backer Rewards</h2>
        <p className="ks-section-sub">
          This isn't just a donation — it's participation. Every tier gives you access to
          the build process and a role in the future of flight.
        </p>

        <div className="tier-grid">
          {/* Tier 1 */}
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

          {/* Tier 2 */}
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

          {/* Tier 3 — Featured */}
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

          {/* Tier 4 */}
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

          {/* Tier 5 — Limited */}
          <div className="tier-card featured">
            <div className="tier-featured-badge">Limited — 50 Available</div>
            <div className="tier-price">$10,000</div>
            <div className="tier-name">Ranch Pioneer</div>
            <p className="tier-desc">
              A deposit toward a personal flight system. When ranch installations
              begin, Ranch Pioneers are first in line — with $10,000 credited
              toward the purchase price of their system.
            </p>
            <ul className="tier-perks">
              <li>Everything in Founding Pilot</li>
              <li>$10K credited toward personal system purchase</li>
              <li>Priority position in the ranch installation queue</li>
              <li>Direct input on personal system design</li>
              <li>Private quarterly briefings with founder</li>
            </ul>
          </div>
        </div>
      </section>

      {/* EMAIL CTA */}
      <section className="ks-email-section">
        <div className="ks-email-inner">
          <h2>Get launch-day priority</h2>
          <p>
            Join the pre-launch list for early access, behind-the-scenes updates,
            and first notification when the Kickstarter goes live.
          </p>

          {status === "done" ? (
            <div className="ks-done">You're in. We'll be in touch.</div>
          ) : (
            <form className="ks-email-form" onSubmit={onSubmit}>
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" disabled={status === "saving"}>
                {status === "saving" ? "Saving..." : "Reserve My Spot"}
              </button>
            </form>
          )}
          {status === "error" && (
            <div style={{ color: "#ffd1d1", fontSize: 14, marginTop: 10 }}>
              Something went wrong. Please try again.
            </div>
          )}

          <div className="ks-back-links">
            <a href="/story" className="ks-back-link">← My Story</a>
            <a href="/vision" className="ks-back-link">← The Vision</a>
          </div>
        </div>
      </section>
    </>
  );
}
