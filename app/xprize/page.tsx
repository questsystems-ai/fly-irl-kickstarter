"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LikeWidget from "@/components/LikeWidget";

// Accent: academic purple
const ACCENT = "#a855f7";
const DARK_BG = "#0c080f";

type EmailStatus = "idle" | "saving" | "done" | "error";

export default function XPrizePage() {
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
          source: "flyirl-xprize-interest",
          page_path: "/xprize",
          user_agent: navigator.userAgent,
          audience_mode: "xprize",
          _timing: timeElapsed,
        }),
      });
      await res.json();
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
          --x-accent: ${ACCENT};
          --x-dark: ${DARK_BG};
          --x-dark2: #080610;
          --x-muted: #6b7280;
          --x-border: #e5e7eb;
          --x-ink: #1f2937;
          --x-max: 1100px;
        }

        .x-wrap { background: #f9f8f6; min-height: 100vh; }

        /* ── Back bar ── */
        .x-backbar {
          background: #1a1a1a;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .x-backbar-inner {
          max-width: var(--x-max);
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .x-back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.15s;
        }
        .x-back-link:hover { color: #fff; }
        .x-back-arrow { font-size: 18px; line-height: 1; color: var(--x-accent); }
        .x-topbar-logo {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: rgba(255,255,255,0.4);
          letter-spacing: -0.5px;
        }
        .x-topbar-logo span { color: var(--x-accent); opacity: 0.8; }

        /* ── Hero ── */
        .x-hero {
          background: var(--x-dark);
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
        .x-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 60%, rgba(168,85,247,0.13) 0%, transparent 70%);
          z-index: 1;
        }
        .x-hero-inner {
          position: relative;
          max-width: 780px;
          margin: 0 auto;
          z-index: 2;
        }
        .x-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--x-accent);
          border: 1px solid rgba(168,85,247,0.35);
          padding: 7px 16px;
          border-radius: 50px;
          margin-bottom: 24px;
        }
        .x-hero h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(30px, 5.5vw, 52px);
          font-weight: 800;
          margin-bottom: 18px;
          letter-spacing: -1px;
          line-height: 1.1;
        }
        .x-hero h1 span { color: var(--x-accent); }
        .x-hero p {
          font-size: 18px;
          color: rgba(255,255,255,0.72);
          max-width: 560px;
          margin: 0 auto;
          font-weight: 300;
          line-height: 1.65;
        }

        /* ── Sections ── */
        .x-section {
          padding: 72px 24px;
          max-width: var(--x-max);
          margin: 0 auto;
        }
        .x-section-dark {
          background: var(--x-dark);
          color: #fff;
          max-width: none;
        }
        .x-section-dark2 {
          background: var(--x-dark2);
          color: #fff;
          max-width: none;
        }
        .x-section-inner {
          max-width: var(--x-max);
          margin: 0 auto;
          padding: 72px 24px;
        }
        .x-section-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .x-section-sub {
          font-size: 17px;
          color: var(--x-muted);
          max-width: 620px;
          margin-bottom: 40px;
          line-height: 1.65;
        }
        .x-section-dark .x-section-sub,
        .x-section-dark2 .x-section-sub { color: rgba(255,255,255,0.65); }

        /* ── How it works ── */
        .x-how-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 32px;
          counter-reset: how-counter;
        }
        .x-how-card {
          background: #fff;
          border: 1px solid var(--x-border);
          border-radius: 10px;
          padding: 28px 24px 28px 28px;
          border-left: 4px solid var(--x-accent);
          counter-increment: how-counter;
          position: relative;
        }
        .x-how-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: rgba(168,85,247,0.15);
          line-height: 1;
          margin-bottom: 10px;
        }
        .x-how-card h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--x-ink);
          margin-bottom: 8px;
        }
        .x-how-card p {
          font-size: 14px;
          color: var(--x-muted);
          line-height: 1.62;
          margin: 0;
        }

        /* ── Why university ── */
        .x-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .x-why-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 24px;
          border-top: 4px solid var(--x-accent);
        }
        .x-why-card h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #fff;
        }
        .x-why-card p {
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Use of funds ── */
        .x-funds-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .x-fund-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 24px;
          text-align: center;
        }
        .x-fund-amount {
          font-family: 'Montserrat', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--x-accent);
        }
        .x-fund-pct { font-size: 12px; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
        .x-fund-label { font-size: 13px; color: rgba(255,255,255,0.75); margin-top: 6px; line-height: 1.4; }
        .x-fund-total { text-align: center; margin-top: 32px; }
        .x-fund-total-val {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(40px, 6vw, 60px);
          font-weight: 800;
          color: var(--x-accent);
        }
        .x-fund-total-label { font-size: 15px; color: rgba(255,255,255,0.5); margin-top: 4px; }

        /* ── IP note ── */
        .x-ip-note {
          margin-top: 32px;
          padding: 20px 24px;
          background: rgba(168,85,247,0.1);
          border: 1px solid rgba(168,85,247,0.25);
          border-radius: 8px;
        }
        .x-ip-note p {
          font-size: 15px;
          color: rgba(255,255,255,0.8);
          margin: 0;
          line-height: 1.65;
        }
        .x-ip-note strong { color: var(--x-accent); }

        /* ── Tiers ── */
        .x-tier-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .x-tier-card {
          background: #fff;
          border: 1px solid var(--x-border);
          border-radius: 10px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .x-tier-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .x-tier-card.featured { border-color: var(--x-accent); border-width: 2px; }
        .x-tier-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--x-dark);
          color: var(--x-accent);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 5px 14px;
          border-radius: 50px;
          white-space: nowrap;
        }
        .x-tier-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: var(--x-ink);
          margin-bottom: 4px;
        }
        .x-tier-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: var(--x-accent);
          margin-bottom: 12px;
        }
        .x-tier-desc {
          font-size: 14px;
          color: var(--x-muted);
          line-height: 1.62;
          flex: 1;
        }
        .x-tier-perks {
          list-style: none;
          padding: 0;
          margin: 18px 0 0;
          border-top: 1px solid var(--x-border);
          padding-top: 16px;
        }
        .x-tier-perks li {
          font-size: 13px;
          color: var(--x-ink);
          padding: 5px 0 5px 20px;
          position: relative;
          line-height: 1.4;
        }
        .x-tier-perks li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--x-accent);
          font-weight: 700;
        }

        /* ── Interest CTA ── */
        .x-interest-section {
          background: var(--x-dark2);
          padding: 64px 24px;
          text-align: center;
        }
        .x-interest-inner {
          max-width: 480px;
          margin: 0 auto;
        }
        .x-interest-inner h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(20px, 3.5vw, 28px);
          font-weight: 800;
          color: #fff;
          margin-bottom: 10px;
        }
        .x-interest-inner p {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          margin-bottom: 24px;
          line-height: 1.65;
        }
        .x-interest-inner p em {
          color: rgba(255,255,255,0.3);
          font-style: normal;
          font-size: 13px;
          display: block;
          margin-top: 6px;
        }
        .x-interest-form {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .x-interest-form input[type="email"] {
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
        .x-interest-form input:focus { border-color: var(--x-accent); }
        .x-interest-form input::placeholder { color: rgba(255,255,255,0.3); }
        .x-interest-form button {
          padding: 13px 22px;
          background: var(--x-accent);
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
        .x-interest-form button:hover { opacity: 0.88; transform: translateY(-1px); }
        .x-interest-form button:disabled { opacity: 0.5; cursor: not-allowed; }
        .x-interest-done { color: var(--x-accent); font-size: 15px; margin-top: 14px; }

        /* ── Bottom back ── */
        .x-bottom-back {
          text-align: center;
          padding: 40px 24px;
          background: #f9f8f6;
        }
        .x-bottom-back a {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        @media (max-width: 768px) {
          .x-how-grid { grid-template-columns: 1fr; }
          .x-why-grid { grid-template-columns: 1fr; }
          .x-tier-grid { grid-template-columns: 1fr; }
          .x-funds-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="x-wrap">

        {/* ── Back bar ── */}
        <div className="x-backbar">
          <div className="x-backbar-inner">
            <Link href="/update" className="x-back-link">
              <span className="x-back-arrow">←</span>
              Back to the update
            </Link>
            <div className="x-topbar-logo">Fly<span>IRL</span></div>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="x-hero">
          <div className="x-hero-inner">
            <div className="x-badge">Wildcard Campaign · $50K Goal</div>
            <h1>Let the <span>Universities</span><br />Build the Plane</h1>
            <p>
              Instead of hiring a team internally, fund a national competition —
              aerospace engineering departments compete to design the SkyPark aircraft.
              $50K prize pool. Real IP. Probably the cleverest path to the same outcome.
            </p>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="x-section">
          <h2 className="x-section-title">How the X-Prize works</h2>
          <p className="x-section-sub">
            Modeled on the Ansari X-Prize and DARPA Grand Challenges — structured competition
            unlocks capabilities that a funded team might take twice as long to find.
          </p>

          <div className="x-how-grid">
            <div className="x-how-card">
              <div className="x-how-num">01</div>
              <h4>Define the design brief</h4>
              <p>
                FlyIRL publishes detailed specs: the SkyPark aircraft requirements,
                safety standards, performance envelope, certifiability constraints.
                The brief is the product of existing internal R&D.
              </p>
            </div>
            <div className="x-how-card">
              <div className="x-how-num">02</div>
              <h4>Open the competition</h4>
              <p>
                Aerospace engineering departments at universities across the US (and allied nations)
                register teams. Student-professor collaborations. Real engineering, real stakes,
                real motivation — a national prize, plus a path to production.
              </p>
            </div>
            <div className="x-how-card">
              <div className="x-how-num">03</div>
              <h4>12-month design sprint</h4>
              <p>
                Teams produce a certifiable design: CAD, structural analysis, safety systems
                architecture, propulsion selection, FAA Part 23 compliance roadmap.
                Quarterly check-ins, public updates, backer access to progress.
              </p>
            </div>
            <div className="x-how-card">
              <div className="x-how-num">04</div>
              <h4>Demo Day + judging</h4>
              <p>
                Finalists present to a panel of aerospace engineers, FAA-adjacent advisors,
                and industry judges. Backers at the Judging Panel tier attend live.
                Winner gets the prize. FlyIRL gets the design.
              </p>
            </div>
            <div className="x-how-card">
              <div className="x-how-num">05</div>
              <h4>IP is shared — openly</h4>
              <p>
                Winning team co-owns the IP. FlyIRL holds a perpetual license for commercial
                production. The design is published. This is a feature, not a bug: open IP
                accelerates the entire eVTOL ecosystem, not just us.
              </p>
            </div>
            <div className="x-how-card">
              <div className="x-how-num">06</div>
              <h4>The next $500K is easier</h4>
              <p>
                A validated, certifiable design in hand changes everything about the
                follow-on funding conversation. VCs, strategic partners, SBIR grants —
                all of it becomes dramatically more accessible.
              </p>
            </div>
          </div>
        </section>

        {/* ── Why university teams ── */}
        <section className="x-section-dark">
          <div className="x-section-inner">
            <h2 className="x-section-title">Why university teams?</h2>
            <p className="x-section-sub">
              This is not a consolation prize. Some of the most innovative aerospace
              work of the last 20 years came out of exactly this kind of structure.
            </p>

            <div className="x-why-grid">
              <div className="x-why-card">
                <h4>They&rsquo;re motivated differently</h4>
                <p>
                  Students and professors competing for a national prize, a production path,
                  and career-defining credit work with a focus that salaried engineers rarely match.
                </p>
              </div>
              <div className="x-why-card">
                <h4>The talent is genuinely world-class</h4>
                <p>
                  MIT, Georgia Tech, Embry-Riddle, Cal Poly, UT Austin, University of Michigan.
                  These programs produce the engineers who go on to build Joby, Archer,
                  Wisk, and Overair.
                </p>
              </div>
              <div className="x-why-card">
                <h4>10x the ideas for the price</h4>
                <p>
                  Multiple competing teams means multiple design approaches explored simultaneously.
                  The winning solution emerges from actual competition, not committee consensus.
                </p>
              </div>
              <div className="x-why-card">
                <h4>Open IP is actually strategic</h4>
                <p>
                  FlyIRL is a business — an experience, an operations platform, a brand.
                  Sharing the aircraft design accelerates the ecosystem and positions FlyIRL
                  as the organization that made it happen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Use of Funds ── */}
        <section className="x-section-dark2">
          <div className="x-section-inner">
            <h2 className="x-section-title">Use of Funds</h2>
            <p className="x-section-sub">
              $50K is a tiny number for what it could unlock. Most of it goes
              directly to the prize pool — the rest administers a real competition.
            </p>

            <div className="x-fund-total">
              <div className="x-fund-total-val">$50K</div>
              <div className="x-fund-total-label">Kickstarter Goal</div>
            </div>

            <div className="x-funds-grid">
              <div className="x-fund-card">
                <div className="x-fund-amount">$30K</div>
                <div className="x-fund-pct">60%</div>
                <div className="x-fund-label">Prize Pool (1st, 2nd, 3rd place)</div>
              </div>
              <div className="x-fund-card">
                <div className="x-fund-amount">$10K</div>
                <div className="x-fund-pct">20%</div>
                <div className="x-fund-label">Competition Admin &amp; Judging Panel</div>
              </div>
              <div className="x-fund-card">
                <div className="x-fund-amount">$6K</div>
                <div className="x-fund-pct">12%</div>
                <div className="x-fund-label">Demo Day Event</div>
              </div>
              <div className="x-fund-card">
                <div className="x-fund-amount">$4K</div>
                <div className="x-fund-pct">8%</div>
                <div className="x-fund-label">Outreach to Aerospace Departments</div>
              </div>
            </div>

            <div className="x-ip-note">
              <p>
                <strong>On the IP tradeoff:</strong> The winning team co-owns the design.
                FlyIRL holds a perpetual commercial production license. Yes, we share IP —
                but FlyIRL is a business, not a product. Whatever gets a certifiable aircraft
                design into our hands faster is the right call.
              </p>
            </div>
          </div>
        </section>

        {/* ── Reward Tiers ── */}
        <section className="x-section">
          <h2 className="x-section-title">Backer Tiers</h2>
          <p className="x-section-sub">
            You&rsquo;re funding a national aerospace competition — and getting a front row
            seat to one of the more interesting engineering stories in general aviation.
          </p>

          <div className="x-tier-grid">
            <div className="x-tier-card">
              <div className="x-tier-price">$25</div>
              <div className="x-tier-name">Prize Supporter</div>
              <p className="x-tier-desc">
                You believe students and professors can solve this. Your name goes into
                the prize materials and you get updates as competing teams progress.
              </p>
              <ul className="x-tier-perks">
                <li>Name in prize documentation</li>
                <li>Quarterly updates on competing teams</li>
                <li>Digital backer badge</li>
              </ul>
            </div>

            <div className="x-tier-card">
              <div className="x-tier-price">$100</div>
              <div className="x-tier-name">Team Follower</div>
              <p className="x-tier-desc">
                Adopt a university team and follow their journey directly. Get updates
                from the team, access to their design blog, and a shoutout at Demo Day.
              </p>
              <ul className="x-tier-perks">
                <li>Everything in Prize Supporter</li>
                <li>Direct updates from one competing team</li>
                <li>Access to team design blog</li>
                <li>Named at Demo Day as a team supporter</li>
              </ul>
            </div>

            <div className="x-tier-card featured">
              <div className="x-tier-badge">Most Interesting</div>
              <div className="x-tier-price">$500</div>
              <div className="x-tier-name">Category Sponsor</div>
              <p className="x-tier-desc">
                Sponsor a specific judging category — Safety Systems, Propulsion Architecture,
                Guest Experience Design, or FAA Certification Pathway. Your name goes on the
                category. You help define the judging criteria for it.
              </p>
              <ul className="x-tier-perks">
                <li>Everything in Team Follower</li>
                <li>Sponsor a named judging category</li>
                <li>Input on category judging criteria</li>
                <li>Credited in all competition materials</li>
              </ul>
            </div>

            <div className="x-tier-card">
              <div className="x-tier-price">$1,000</div>
              <div className="x-tier-name">Judging Panel Access</div>
              <p className="x-tier-desc">
                Attend Demo Day — in person or virtual — as an observer to the judging panel.
                See the finalist presentations and the deliberation process firsthand.
              </p>
              <ul className="x-tier-perks">
                <li>Everything in Category Sponsor</li>
                <li>Demo Day access (in person or virtual)</li>
                <li>Finalist presentation access</li>
                <li>Quarterly founder calls</li>
              </ul>
            </div>

            <div className="x-tier-card">
              <div className="x-tier-price">$5,000</div>
              <div className="x-tier-name">Presenting Sponsor</div>
              <p className="x-tier-desc">
                Your name or company featured prominently across all competition materials,
                the Demo Day event, and the final published design. The kind of aerospace
                community visibility money normally can&rsquo;t buy.
              </p>
              <ul className="x-tier-perks">
                <li>Everything in Judging Panel Access</li>
                <li>Prominent credit across all competition materials</li>
                <li>Logo on Demo Day stage and published design</li>
                <li>Direct access to winning team post-competition</li>
              </ul>
            </div>

            <div className="x-tier-card featured">
              <div className="x-tier-badge">Limited — 1 Available</div>
              <div className="x-tier-price">$10,000</div>
              <div className="x-tier-name">Title Sponsor</div>
              <p className="x-tier-desc">
                Name the prize. The competition becomes &ldquo;The [Your Name] FlyIRL
                Aircraft Design Prize.&rdquo; Your name is on this permanently — in the
                competition, the design, and whatever gets built from it.
              </p>
              <ul className="x-tier-perks">
                <li>Everything in Presenting Sponsor</li>
                <li>Your name on the prize — in perpetuity</li>
                <li>Seat at the judging table</li>
                <li>Equity conversation option with FlyIRL</li>
                <li>Monthly access to Aaron throughout competition</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Interest signal ── */}
        <section className="x-interest-section">
          <div className="x-interest-inner">
            <h2>Interested? Drop your email.</h2>
            <p>
              This one isn&rsquo;t live yet. Your signal is what makes it happen.
              <em>Already on the list? That&rsquo;s fine — you won&rsquo;t be added twice ;)</em>
            </p>

            {emailStatus === "done" ? (
              <div className="x-interest-done">✓ Got it. You&rsquo;ll hear from Aaron directly.</div>
            ) : (
              <form className="x-interest-form" onSubmit={onInterest}>
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
                  {emailStatus === "saving" ? "Saving..." : "I'm interested →"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── Bottom back ── */}
        <div className="x-bottom-back">
          <Link href="/update">← Back to the full update</Link>
        </div>

      </div>

      <LikeWidget campaign="xprize" accent={ACCENT} />
    </>
  );
}
