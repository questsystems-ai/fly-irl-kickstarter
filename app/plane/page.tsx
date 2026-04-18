"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LikeWidget from "@/components/LikeWidget";

// Accent: aerospace blue
const ACCENT = "#3b82f6";
const DARK_BG = "#080c14";

type EmailStatus = "idle" | "saving" | "done" | "error";

export default function PlanePage() {
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [honeypot, setHoneypot] = useState("");
  const [formLoadTime] = useState(() => Date.now());

  useEffect(() => {
    const saved = localStorage.getItem("flyirl_email");
    if (saved) setEmail(saved);
  }, []);

  async function onInterest(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return;
    const timeElapsed = Date.now() - formLoadTime;
    const em = email.trim().toLowerCase();
    if (!em || !em.includes("@")) return;

    setEmailStatus("saving");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: em,
          source: "flyirl-plane-interest",
          page_path: "/plane",
          user_agent: navigator.userAgent,
          audience_mode: "plane",
          _timing: timeElapsed,
        }),
      });
      await res.json(); // dedup handled server-side — always succeeds
      localStorage.setItem("flyirl_email", em);
      setEmailStatus("done");
    } catch {
      setEmailStatus("error");
    }
  }

  return (
    <>
      <style>{`
        :root {
          --p-accent: ${ACCENT};
          --p-dark: ${DARK_BG};
          --p-dark2: #050810;
          --p-muted: #6b7280;
          --p-border: #e5e7eb;
          --p-ink: #1f2937;
          --p-max: 1100px;
        }

        .p-wrap { background: #f9f8f6; min-height: 100vh; }

        /* ── Back bar ── */
        .p-backbar {
          background: #1a1a1a;
          padding: 0;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .p-backbar-inner {
          max-width: var(--p-max);
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .p-back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.15s;
        }
        .p-back-link:hover { color: #fff; }
        .p-back-arrow {
          font-size: 18px;
          line-height: 1;
          color: var(--p-accent);
        }
        .p-topbar-logo {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: rgba(255,255,255,0.4);
          letter-spacing: -0.5px;
        }
        .p-topbar-logo span { color: var(--p-accent); opacity: 0.8; }

        /* ── Hero ── */
        .p-hero {
          background: var(--p-dark);
          color: #fff;
          min-height: 72vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 72px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .p-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 60%, rgba(59,130,246,0.12) 0%, transparent 70%);
          z-index: 1;
        }
        .p-hero-inner {
          position: relative;
          max-width: 780px;
          margin: 0 auto;
          z-index: 2;
        }
        .p-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--p-accent);
          border: 1px solid rgba(59,130,246,0.35);
          padding: 7px 16px;
          border-radius: 50px;
          margin-bottom: 24px;
        }
        .p-hero h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(30px, 5.5vw, 52px);
          font-weight: 800;
          margin-bottom: 18px;
          letter-spacing: -1px;
          line-height: 1.1;
        }
        .p-hero h1 span { color: var(--p-accent); }
        .p-hero p {
          font-size: 18px;
          color: rgba(255,255,255,0.72);
          max-width: 560px;
          margin: 0 auto 0;
          font-weight: 300;
          line-height: 1.65;
        }

        /* ── Sections ── */
        .p-section {
          padding: 72px 24px;
          max-width: var(--p-max);
          margin: 0 auto;
        }
        .p-section-dark {
          background: var(--p-dark);
          color: #fff;
          max-width: none;
        }
        .p-section-dark2 {
          background: var(--p-dark2);
          color: #fff;
          max-width: none;
        }
        .p-section-inner {
          max-width: var(--p-max);
          margin: 0 auto;
          padding: 72px 24px;
        }
        .p-section-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .p-section-sub {
          font-size: 17px;
          color: var(--p-muted);
          max-width: 600px;
          margin-bottom: 40px;
          line-height: 1.65;
        }
        .p-section-dark .p-section-sub,
        .p-section-dark2 .p-section-sub { color: rgba(255,255,255,0.65); }

        /* ── Why card grid ── */
        .p-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 32px;
        }
        .p-why-card {
          background: #fff;
          border: 1px solid var(--p-border);
          border-radius: 10px;
          overflow: hidden;
          border-top: 4px solid var(--p-accent);
        }
        .p-why-card-body {
          padding: 22px 24px 24px;
        }
        .p-why-card-body h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--p-ink);
        }
        .p-why-card-body p {
          font-size: 14px;
          color: var(--p-muted);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Specs / credibility grid ── */
        .p-spec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .p-spec-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 24px;
          border-left: 4px solid var(--p-accent);
        }
        .p-spec-card h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #fff;
        }
        .p-spec-card p {
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Use of funds ── */
        .p-funds-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .p-fund-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 24px;
          text-align: center;
        }
        .p-fund-amount {
          font-family: 'Montserrat', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--p-accent);
        }
        .p-fund-pct {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 4px;
        }
        .p-fund-label {
          font-size: 13px;
          color: rgba(255,255,255,0.75);
          margin-top: 6px;
          line-height: 1.4;
        }
        .p-fund-total {
          text-align: center;
          margin-top: 32px;
        }
        .p-fund-total-val {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(40px, 6vw, 60px);
          font-weight: 800;
          color: var(--p-accent);
        }
        .p-fund-total-label {
          font-size: 15px;
          color: rgba(255,255,255,0.5);
          margin-top: 4px;
        }

        /* ── Tiers ── */
        .p-tier-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .p-tier-card {
          background: #fff;
          border: 1px solid var(--p-border);
          border-radius: 10px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .p-tier-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .p-tier-card.featured {
          border-color: var(--p-accent);
          border-width: 2px;
        }
        .p-tier-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--p-dark);
          color: var(--p-accent);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 5px 14px;
          border-radius: 50px;
          white-space: nowrap;
        }
        .p-tier-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: var(--p-ink);
          margin-bottom: 4px;
        }
        .p-tier-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: var(--p-accent);
          margin-bottom: 12px;
        }
        .p-tier-desc {
          font-size: 14px;
          color: var(--p-muted);
          line-height: 1.62;
          flex: 1;
        }
        .p-tier-perks {
          list-style: none;
          padding: 0;
          margin: 18px 0 0;
          border-top: 1px solid var(--p-border);
          padding-top: 16px;
        }
        .p-tier-perks li {
          font-size: 13px;
          color: var(--p-ink);
          padding: 5px 0 5px 20px;
          position: relative;
          line-height: 1.4;
        }
        .p-tier-perks li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--p-accent);
          font-weight: 700;
        }

        /* ── Interest email CTA ── */
        .p-interest-section {
          background: var(--p-dark2);
          padding: 64px 24px;
          text-align: center;
        }
        .p-interest-inner {
          max-width: 480px;
          margin: 0 auto;
        }
        .p-interest-inner h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(20px, 3.5vw, 28px);
          font-weight: 800;
          color: #fff;
          margin-bottom: 10px;
        }
        .p-interest-inner p {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          margin-bottom: 24px;
          line-height: 1.65;
        }
        .p-interest-inner p em {
          color: rgba(255,255,255,0.35);
          font-style: normal;
          font-size: 13px;
          display: block;
          margin-top: 6px;
        }
        .p-interest-form {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .p-interest-form input[type="email"] {
          width: 260px;
          max-width: 100%;
          padding: 13px 16px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 6px;
          font-size: 15px;
          background: rgba(255,255,255,0.06);
          color: #fff;
          outline: none;
          font-family: inherit;
          transition: border-color 0.15s;
        }
        .p-interest-form input:focus { border-color: var(--p-accent); }
        .p-interest-form input::placeholder { color: rgba(255,255,255,0.3); }
        .p-interest-form button {
          padding: 13px 22px;
          background: var(--p-accent);
          color: #fff;
          border: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          white-space: nowrap;
          font-family: 'Montserrat', sans-serif;
          transition: opacity 0.15s, transform 0.15s;
        }
        .p-interest-form button:hover { opacity: 0.88; transform: translateY(-1px); }
        .p-interest-form button:disabled { opacity: 0.5; cursor: not-allowed; }
        .p-interest-done {
          color: var(--p-accent);
          font-size: 15px;
          margin-top: 14px;
        }

        /* ── Back link at bottom ── */
        .p-bottom-back {
          text-align: center;
          padding: 40px 24px;
          background: #f9f8f6;
        }
        .p-bottom-back a {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        @media (max-width: 768px) {
          .p-why-grid { grid-template-columns: 1fr; }
          .p-spec-grid { grid-template-columns: 1fr; }
          .p-tier-grid { grid-template-columns: 1fr; }
          .p-funds-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="p-wrap">

        {/* ── Back bar ── */}
        <div className="p-backbar">
          <div className="p-backbar-inner">
            <Link href="/update" className="p-back-link">
              <span className="p-back-arrow">←</span>
              Back to the update
            </Link>
            <div className="p-topbar-logo">Fly<span>IRL</span></div>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="p-hero">
          <div className="p-hero-inner">
            <div className="p-badge">Wildcard Campaign · $500K Goal</div>
            <h1>Build the <span>American Plane</span><br />Nobody Built Yet</h1>
            <p>
              There is no purpose-built aircraft for what FlyIRL needs.
              The only one exists was made in China and abandoned.
              We have the connections to build it here — rugged, reliable,
              overengineered safe, and under $1M.
            </p>
          </div>
        </section>

        {/* ── Why this plane / The case ── */}
        <section className="p-section">
          <h2 className="p-section-title">Why this has to exist</h2>
          <p className="p-section-sub">
            The SkyPark needs a very specific aircraft — one that doesn&rsquo;t exist.
            Building it is a separate engineering project from the SkyPark business,
            but without it, neither gets off the ground.
          </p>

          <div className="p-why-grid">
            <div className="p-why-card">
              <div className="p-why-card-body">
                <h4>No existing aircraft fits the brief</h4>
                <p>
                  The SkyPark aircraft needs automated takeoff and landing, envelope protection,
                  1,000s of hours of rugged durability, and a hybrid fixed-wing + quad layout.
                  Nothing certified today checks all those boxes. The EHang VT30 came closest —
                  it&rsquo;s made in China, and the company isn&rsquo;t pursuing it.
                </p>
              </div>
            </div>
            <div className="p-why-card">
              <div className="p-why-card-body">
                <h4>It&rsquo;s not an inherently expensive aircraft</h4>
                <p>
                  This is not a commercial airliner. The design profile — short range, low altitude,
                  controlled airspace, repeated short-duration cycles — maps to a sub-$1M unit cost
                  at meaningful production volumes. Designed and built American.
                </p>
              </div>
            </div>
            <div className="p-why-card">
              <div className="p-why-card-body">
                <h4>Opening up general aviation is in America&rsquo;s DNA</h4>
                <p>
                  Piper, Cessna, Beechcraft — designing and manufacturing aircraft to make
                  flight accessible to everyday people was born here. The know-how, the supply
                  chain, the regulatory pathways: all of it exists. We just need the capital
                  to start.
                </p>
              </div>
            </div>
            <div className="p-why-card">
              <div className="p-why-card-body">
                <h4>FlyIRL is a business. A plane is a product.</h4>
                <p>
                  These are two different things. The SkyPark is the vision. The aircraft is
                  an engineering deliverable on a defined timeline. The connections exist in
                  aerospace to assemble a team and execute. $500K gets that team rolling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Specs / credibility ── */}
        <section className="p-section-dark">
          <div className="p-section-inner">
            <h2 className="p-section-title">What we&rsquo;re designing</h2>
            <p className="p-section-sub">
              The target spec is ambitious but not unprecedented. Every element
              has prior art in existing certified aircraft.
            </p>

            <div className="p-spec-grid">
              <div className="p-spec-card">
                <h4>Hybrid Fixed-Wing + Quad Layout</h4>
                <p>
                  VTOL capability for the SkyPark, fixed-wing efficiency for the flight zone.
                  Fun to fly, ultra-stable, designed for the guest experience first.
                </p>
              </div>
              <div className="p-spec-card">
                <h4>Automated Takeoff &amp; Landing</h4>
                <p>
                  The two hardest and most dangerous phases of flight — removed from the equation.
                  The guest just flies. The aircraft handles the margins.
                </p>
              </div>
              <div className="p-spec-card">
                <h4>Ultra-Rugged Airframe</h4>
                <p>
                  Designed for 1,000s of short-duration cycles. Fast turnaround. Minimal maintenance
                  complexity. Think military trainer durability, not commercial airliner fragility.
                </p>
              </div>
              <div className="p-spec-card">
                <h4>Overengineered Safety Systems</h4>
                <p>
                  Flight envelope protection, collision avoidance, emergency auto-landing.
                  Safety built into the airframe, not bolted on after. Certifiable under Part 23.
                </p>
              </div>
              <div className="p-spec-card">
                <h4>Sub-$1M Unit Price</h4>
                <p>
                  Range sacrificed for safety margin, durability, and repeatability.
                  The economic model demands an accessible purchase price for SkyPark operators.
                </p>
              </div>
              <div className="p-spec-card">
                <h4>The Connections to Execute</h4>
                <p>
                  Aerospace engineering leads, A&P mechanics, FAA DERs, composites manufacturers —
                  the network exists. $500K gets a team assembled and Phase 1 design underway.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Use of Funds ── */}
        <section className="p-section-dark2">
          <div className="p-section-inner">
            <h2 className="p-section-title">Use of Funds</h2>
            <p className="p-section-sub">
              $500K funds Phase 1: the engineering team, the toolchain, and the
              regulatory groundwork to get to a certifiable design.
            </p>

            <div className="p-fund-total">
              <div className="p-fund-total-val">$500K</div>
              <div className="p-fund-total-label">Kickstarter Goal</div>
            </div>

            <div className="p-funds-grid">
              <div className="p-fund-card">
                <div className="p-fund-amount">$220K</div>
                <div className="p-fund-pct">44%</div>
                <div className="p-fund-label">Engineering Team (lead + 2 junior)</div>
              </div>
              <div className="p-fund-card">
                <div className="p-fund-amount">$110K</div>
                <div className="p-fund-pct">22%</div>
                <div className="p-fund-label">CAD / Simulation / Wind Tunnel Access</div>
              </div>
              <div className="p-fund-card">
                <div className="p-fund-amount">$80K</div>
                <div className="p-fund-pct">16%</div>
                <div className="p-fund-label">Materials Testing &amp; Prototype Components</div>
              </div>
              <div className="p-fund-card">
                <div className="p-fund-amount">$60K</div>
                <div className="p-fund-pct">12%</div>
                <div className="p-fund-label">IP / Patent Legal Groundwork</div>
              </div>
              <div className="p-fund-card">
                <div className="p-fund-amount">$30K</div>
                <div className="p-fund-pct">6%</div>
                <div className="p-fund-label">FAA Part 23 Regulatory Path</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Reward Tiers ── */}
        <section className="p-section">
          <h2 className="p-section-title">Backer Tiers</h2>
          <p className="p-section-sub">
            You&rsquo;re not buying a plane. You&rsquo;re buying a stake in making one exist —
            and a front-row seat to the build.
          </p>

          <div className="p-tier-grid">
            <div className="p-tier-card">
              <div className="p-tier-price">$25</div>
              <div className="p-tier-name">Blueprint Backer</div>
              <p className="p-tier-desc">
                You believe America should build this plane. Your name goes into the
                design documentation, and you get direct updates from the engineering team.
              </p>
              <ul className="p-tier-perks">
                <li>Name in the design documentation</li>
                <li>Engineering build updates</li>
                <li>Digital backer badge</li>
              </ul>
            </div>

            <div className="p-tier-card">
              <div className="p-tier-price">$100</div>
              <div className="p-tier-name">Airframe Insider</div>
              <p className="p-tier-desc">
                Follow the design process in real time. Attend monthly engineering
                reviews and see the decisions as they&rsquo;re made.
              </p>
              <ul className="p-tier-perks">
                <li>Everything in Blueprint Backer</li>
                <li>Monthly engineering review access</li>
                <li>Backer-only Discord channel</li>
              </ul>
            </div>

            <div className="p-tier-card featured">
              <div className="p-tier-badge">Most Meaningful</div>
              <div className="p-tier-price">$500</div>
              <div className="p-tier-name">Wind Tunnel Pass</div>
              <p className="p-tier-desc">
                Weigh in on a specific design decision — propulsion layout, control surface
                geometry, cockpit ergonomics. Your input goes on the record. Plus a signed
                print of the Phase 1 design drawings.
              </p>
              <ul className="p-tier-perks">
                <li>Everything in Airframe Insider</li>
                <li>Input on one design decision</li>
                <li>Signed Phase 1 design print</li>
                <li>Named in the engineering log</li>
              </ul>
            </div>

            <div className="p-tier-card">
              <div className="p-tier-price">$1,000</div>
              <div className="p-tier-name">Co-Designer</div>
              <p className="p-tier-desc">
                A meaningful contribution to making this aircraft real. Co-Designers get
                quarterly calls with the engineering lead, input across multiple design phases,
                and permanent credit in the aircraft documentation.
              </p>
              <ul className="p-tier-perks">
                <li>Everything in Wind Tunnel Pass</li>
                <li>Quarterly calls with engineering lead</li>
                <li>Permanent credit in aircraft documentation</li>
                <li>Priority purchase option at production pricing</li>
              </ul>
            </div>

            <div className="p-tier-card">
              <div className="p-tier-price">$10,000</div>
              <div className="p-tier-name">Angel Sponsor</div>
              <p className="p-tier-desc">
                A serious financial commitment to getting this built. Angel Sponsors get a
                formal equity conversion option discussion, direct access to the founder,
                and the first right to purchase a production aircraft.
              </p>
              <ul className="p-tier-perks">
                <li>Everything in Co-Designer</li>
                <li>Equity conversion option discussion</li>
                <li>Direct monthly access to founder</li>
                <li>First right to purchase a production unit</li>
                <li>Name on the physical aircraft</li>
              </ul>
            </div>

            <div className="p-tier-card featured">
              <div className="p-tier-badge">Limited — 3 Available</div>
              <div className="p-tier-price">$50,000</div>
              <div className="p-tier-name">Founding Investor</div>
              <p className="p-tier-desc">
                One of three founding investment positions. Guaranteed equity conversation,
                co-designer credit in perpetuity, and a guaranteed slot in the first
                production run at founders pricing.
              </p>
              <ul className="p-tier-perks">
                <li>Everything in Angel Sponsor</li>
                <li>Guaranteed equity conversation</li>
                <li>Co-designer credit in perpetuity</li>
                <li>Guaranteed slot in first production run</li>
                <li>Monthly briefings with founder throughout development</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Interest signal ── */}
        <section className="p-interest-section">
          <div className="p-interest-inner">
            <h2>Interested? Let Aaron know.</h2>
            <p>
              This campaign isn&rsquo;t live yet — but knowing you&rsquo;d back it is exactly the
              signal needed to pull the trigger.
              <em>Already on the list? Drop your email anyway — you won&rsquo;t be added twice ;)</em>
            </p>

            {emailStatus === "done" ? (
              <div className="p-interest-done">✓ Got it. You&rsquo;ll hear from Aaron directly.</div>
            ) : (
              <form className="p-interest-form" onSubmit={onInterest}>
                <input
                  type="text"
                  name="url_check"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ position: "absolute", left: "-9999px" } as any}
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={emailStatus === "saving"}>
                  {emailStatus === "saving" ? "Saving..." : "I&rsquo;m interested →"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── Bottom back link ── */}
        <div className="p-bottom-back">
          <Link href="/update">← Back to the full update</Link>
        </div>

      </div>

      <LikeWidget campaign="plane" accent={ACCENT} />
    </>
  );
}
