"use client";

import React from "react";
import Link from "next/link";
import LikeWidget from "@/components/LikeWidget";

const ACCENT = "#d4a85c";
const DARK_BG = "#1c1712";
const DARK2 = "#0e0b08";

export default function CubPage() {
  return (
    <>
      <style>{`
        :root {
          --cub-accent: ${ACCENT};
          --cub-dark: ${DARK_BG};
          --cub-dark2: ${DARK2};
          --cub-muted: #6b5d4d;
          --cub-border: #d9cdb8;
          --cub-ink: #2c2418;
          --cub-max: 1100px;
        }

        .cub-wrap { background: #f5f0e8; min-height: 100vh; font-family: 'Poppins', system-ui, sans-serif; }

        /* ── Back bar ── */
        .cub-backbar {
          background: var(--cub-dark);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .cub-backbar-inner {
          max-width: var(--cub-max);
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .cub-back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.15s;
        }
        .cub-back-link:hover { color: #fff; }
        .cub-back-arrow { font-size: 18px; color: var(--cub-accent); line-height: 1; }
        .cub-topbar-logo {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: rgba(255,255,255,0.4);
          letter-spacing: -0.5px;
        }
        .cub-topbar-logo span { color: var(--cub-accent); opacity: 0.8; }

        /* ── Hero ── */
        .cub-hero {
          background: var(--cub-dark2);
          color: #fff;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 72px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cub-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
          opacity: 0.45;
        }
        .cub-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(14,11,8,0.5) 0%, rgba(14,11,8,0.2) 40%, rgba(14,11,8,0.65) 100%);
          z-index: 1;
        }
        .cub-hero-inner {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          z-index: 2;
        }
        .cub-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--cub-accent);
          border: 1px solid rgba(212,168,92,0.4);
          padding: 8px 18px;
          border-radius: 50px;
          margin-bottom: 24px;
        }
        .cub-hero h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(32px, 5.5vw, 52px);
          font-weight: 800;
          margin-bottom: 18px;
          letter-spacing: -1px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.6);
          line-height: 1.1;
        }
        .cub-hero h1 span { color: var(--cub-accent); }
        .cub-hero p {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          max-width: 560px;
          margin: 0 auto;
          font-weight: 300;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5);
          line-height: 1.65;
        }

        /* ── Sections ── */
        .cub-section {
          padding: 72px 24px;
          max-width: var(--cub-max);
          margin: 0 auto;
        }
        .cub-section-dark {
          background: var(--cub-dark);
          color: #fff;
          max-width: none;
        }
        .cub-section-dark2 {
          background: var(--cub-dark2);
          color: #fff;
          max-width: none;
        }
        .cub-section-inner {
          max-width: var(--cub-max);
          margin: 0 auto;
          padding: 72px 24px;
        }
        .cub-section-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(26px, 4vw, 36px);
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .cub-section-sub {
          font-size: 17px;
          color: var(--cub-muted);
          max-width: 600px;
          margin-bottom: 40px;
          line-height: 1.65;
        }
        .cub-section-dark .cub-section-sub,
        .cub-section-dark2 .cub-section-sub { color: rgba(255,255,255,0.7); }

        /* ── Experience grid ── */
        .cub-exp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 32px;
        }
        .cub-exp-card {
          background: #fff;
          border: 1px solid var(--cub-border);
          border-radius: 10px;
          overflow: hidden;
          border-top: 4px solid var(--cub-accent);
        }
        .cub-exp-card-img {
          width: 100%;
          height: 180px;
          background: #e0ddd8;
          overflow: hidden;
        }
        .cub-exp-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .cub-exp-card-body { padding: 20px 24px 24px; }
        .cub-exp-card-body h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--cub-ink);
        }
        .cub-exp-card-body p {
          font-size: 14px;
          color: var(--cub-muted);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Safety grid ── */
        .cub-safety-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .cub-safety-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 24px;
          border-left: 4px solid var(--cub-accent);
        }
        .cub-safety-card h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #fff;
        }
        .cub-safety-card p {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Use of funds ── */
        .cub-funds-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .cub-fund-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 24px;
          text-align: center;
        }
        .cub-fund-amount {
          font-family: 'Montserrat', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: var(--cub-accent);
        }
        .cub-fund-pct {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 4px;
        }
        .cub-fund-label {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          margin-top: 6px;
        }
        .cub-fund-total { text-align: center; margin-top: 32px; }
        .cub-fund-total-val {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(42px, 6vw, 64px);
          font-weight: 800;
          color: var(--cub-accent);
        }
        .cub-fund-total-label {
          font-size: 16px;
          color: rgba(255,255,255,0.6);
          margin-top: 4px;
        }
        .cub-refund-notice {
          margin-top: 32px;
          padding: 20px 24px;
          background: rgba(212,168,92,0.12);
          border: 1px solid rgba(212,168,92,0.3);
          border-radius: 8px;
          text-align: center;
        }
        .cub-refund-notice p {
          font-size: 15px;
          color: rgba(255,255,255,0.85);
          margin: 0;
          line-height: 1.6;
        }
        .cub-refund-notice strong { color: var(--cub-accent); }

        /* ── Tier grid ── */
        .cub-tier-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .cub-tier-card {
          background: #fff;
          border: 1px solid var(--cub-border);
          border-radius: 10px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .cub-tier-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .cub-tier-card.featured {
          border-color: var(--cub-accent);
          border-width: 2px;
        }
        .cub-tier-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--cub-dark);
          color: var(--cub-accent);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 5px 14px;
          border-radius: 50px;
          white-space: nowrap;
        }
        .cub-tier-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: var(--cub-ink);
          margin-bottom: 4px;
        }
        .cub-tier-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--cub-accent);
        }
        .cub-tier-desc {
          font-size: 15px;
          color: var(--cub-muted);
          line-height: 1.6;
          flex: 1;
        }
        .cub-tier-perks {
          list-style: none;
          padding: 0;
          margin: 18px 0 0;
          border-top: 1px solid var(--cub-border);
          padding-top: 16px;
        }
        .cub-tier-perks li {
          font-size: 14px;
          color: var(--cub-ink);
          padding: 5px 0 5px 20px;
          position: relative;
          line-height: 1.4;
        }
        .cub-tier-perks li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--cub-accent);
          font-weight: 700;
        }

        /* ── Bottom back ── */
        .cub-bottom-back {
          text-align: center;
          padding: 40px 24px;
          background: #f5f0e8;
        }
        .cub-bottom-back a {
          font-size: 15px;
          font-weight: 600;
          color: var(--cub-ink);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        @media (max-width: 768px) {
          .cub-exp-grid { grid-template-columns: 1fr; }
          .cub-safety-grid { grid-template-columns: 1fr; }
          .cub-tier-grid { grid-template-columns: 1fr; }
          .cub-funds-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="cub-wrap">

        {/* Back bar */}
        <div className="cub-backbar">
          <div className="cub-backbar-inner">
            <Link href="/update" className="cub-back-link">
              <span className="cub-back-arrow">←</span>
              Back to the update
            </Link>
            <div className="cub-topbar-logo">Fly<span>IRL</span></div>
          </div>
        </div>

        {/* Hero */}
        <section className="cub-hero">
          <video
            className="cub-hero-video"
            src="/videos/cub-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="cub-hero-inner">
            <div className="cub-badge">Kickstarter Campaign Option · Available Within a Year</div>
            <h1>Hands on the Stick. <span>You Fly.</span></h1>
            <p>
              Fly a legendary bush plane over stunning desert terrain with a master CFI co-flying every second.
              Real backcountry. Real aircraft. Real flying — no license required.
            </p>
          </div>
        </section>

        {/* The Experience */}
        <section className="cub-section">
          <h2 className="cub-section-title">The Experience</h2>
          <p className="cub-section-sub">
            The Cub Experience is the world&rsquo;s first curated backcountry bush flying adventure.
            You take the controls of a legendary aircraft while an expert ensures you never leave the safety envelope.
          </p>

          <div className="cub-exp-grid">
            <div className="cub-exp-card">
              <div className="cub-exp-card-img">
                <img src="/images/exp-take-the-stick.png" alt="Customer taking the stick of a Super Cub" />
              </div>
              <div className="cub-exp-card-body">
                <h4>You Take the Stick</h4>
                <p>
                  Sit in the front seat of a legendary Piper Super Cub or similar STOL bush plane.
                  Real stick, real rudder, real flying — you are the pilot.
                </p>
              </div>
            </div>

            <div className="cub-exp-card">
              <div className="cub-exp-card-img">
                <img src="/images/exp-cfi-controls.png" alt="CFI with hands on dual controls" />
              </div>
              <div className="cub-exp-card-body">
                <h4>CFI Always on the Controls</h4>
                <p>
                  Your expert CFI sits behind you (tandem) or beside you (side-by-side) with hands always
                  on the dual controls. You won&rsquo;t notice the safety net unless you push the envelope —
                  just like a future AI copilot.
                </p>
              </div>
            </div>

            <div className="cub-exp-card">
              <div className="cub-exp-card-img">
                <img src="/images/exp-desert-terrain.png" alt="Stunning desert canyon flying" />
              </div>
              <div className="cub-exp-card-body">
                <h4>Stunning Desert Terrain</h4>
                <p>
                  Fly low altitude over breathtaking Arizona/Nevada desert. Canyon runs, river valley flying,
                  short-field takeoffs and landings on backcountry strips.
                </p>
              </div>
            </div>

            <div className="cub-exp-card">
              <div className="cub-exp-card-img">
                <img src="/images/exp-flight-time.png" alt="Bush plane flying over desert landscape" />
              </div>
              <div className="cub-exp-card-body">
                <h4>30-Minute or 1-Hour Flights</h4>
                <p>
                  Choose your adventure — a 30-minute taster or a full 60-minute backcountry expedition.
                  Every flight is unique, guided by terrain and your comfort level.
                </p>
              </div>
            </div>

            <div className="cub-exp-card">
              <div className="cub-exp-card-img">
                <img src="/images/exp-legendary-aircraft.png" alt="Hot-rodded Piper Super Cub on a backcountry strip" />
              </div>
              <div className="cub-exp-card-body">
                <h4>Legendary Aircraft</h4>
                <p>
                  The fleet: hot-rodded, meticulously maintained Super Cubs and similar STOL aircraft — flown
                  by a master bush pilot with thousands of hours in these exact planes.
                </p>
              </div>
            </div>

            <div className="cub-exp-card">
              <div className="cub-exp-card-img">
                <img src="/images/exp-no-license.png" alt="First-time flyer smiling in cockpit" />
              </div>
              <div className="cub-exp-card-body">
                <h4>No License Required</h4>
                <p>
                  You don&rsquo;t need any flight experience. The dual-control setup with an expert CFI means
                  anyone can experience the thrill of real bush flying from day one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety */}
        <section className="cub-section-dark">
          <div className="cub-section-inner">
            <h2 className="cub-section-title">Safety First, Always</h2>
            <p className="cub-section-sub">
              The Cub Experience is designed to be the safest way to fly a real airplane.
              Multiple layers of safety ensure you can focus on the thrill.
            </p>

            <div className="cub-safety-grid">
              <div className="cub-safety-card">
                <h4>The Most Proven Airframe in History</h4>
                <p>
                  The Super Cub has been flying since 1949 — over 75 years of proven backcountry performance.
                  It&rsquo;s essentially a flying parachute, capable of landing slower than highway driving speed.
                </p>
              </div>
              <div className="cub-safety-card">
                <h4>Forgiving Flight Envelope</h4>
                <p>
                  Low-speed, low-altitude flying over flat desert terrain. Stall speed of 37 knots (~43 mph).
                  The Super Cub was designed for exactly this kind of flying — it&rsquo;s in its element.
                </p>
              </div>
              <div className="cub-safety-card">
                <h4>Expert Maintenance</h4>
                <p>
                  All aircraft maintained to the highest standards by experienced A&amp;P mechanics.
                  Every component tracked, every quirk known across thousands of flight hours.
                </p>
              </div>
              <div className="cub-safety-card">
                <h4>You&rsquo;re Never Alone</h4>
                <p>
                  An expert CFI is co-flying with you every second of every flight.
                  The experience feels like total freedom — the safety is invisible until you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use of Funds */}
        <section className="cub-section-dark2">
          <div className="cub-section-inner">
            <h2 className="cub-section-title">Use of Funds</h2>
            <p className="cub-section-sub">
              Every dollar goes toward getting aircraft in the air and customers in seats.
              This is a proven business model — we just need the capital to launch.
            </p>

            <div className="cub-fund-total">
              <div className="cub-fund-total-val">$500K</div>
              <div className="cub-fund-total-label">Kickstarter Goal</div>
            </div>

            <div className="cub-funds-grid">
              <div className="cub-fund-card">
                <div className="cub-fund-amount">$200K</div>
                <div className="cub-fund-pct">40%</div>
                <div className="cub-fund-label">Aircraft Acquisition</div>
              </div>
              <div className="cub-fund-card">
                <div className="cub-fund-amount">$100K</div>
                <div className="cub-fund-pct">20%</div>
                <div className="cub-fund-label">Land Acquisition / Lease</div>
              </div>
              <div className="cub-fund-card">
                <div className="cub-fund-amount">$75K</div>
                <div className="cub-fund-pct">15%</div>
                <div className="cub-fund-label">Personnel Recruitment</div>
              </div>
              <div className="cub-fund-card">
                <div className="cub-fund-amount">$75K</div>
                <div className="cub-fund-pct">15%</div>
                <div className="cub-fund-label">Licensing, Insurance, Legal</div>
              </div>
              <div className="cub-fund-card">
                <div className="cub-fund-amount">$50K</div>
                <div className="cub-fund-pct">10%</div>
                <div className="cub-fund-label">Marketing &amp; Launch</div>
              </div>
            </div>

            <div className="cub-refund-notice">
              <p>
                <strong>Full Refund Guarantee:</strong> If we raise $500K but can&rsquo;t secure the
                business financing needed to begin operations, every backer gets a full refund. We
                don&rsquo;t spend the Kickstarter funds until we have a viable path to launch.
              </p>
            </div>
          </div>
        </section>

        {/* Reward Tiers */}
        <section className="cub-section">
          <h2 className="cub-section-title">Pre-Order Your Flight</h2>
          <p className="cub-section-sub">
            These are pre-sale flight passes, not donations.
            You&rsquo;re buying a real experience at founders pricing.
          </p>

          <div className="cub-tier-grid">
            <div className="cub-tier-card">
              <div className="cub-tier-price">$25</div>
              <div className="cub-tier-name">Dreamer</div>
              <p className="cub-tier-desc">
                You believe bush flying should be for everyone. Get your name on the Founders Wall
                and exclusive updates from inside the build.
              </p>
              <ul className="cub-tier-perks">
                <li>Founders Wall listing</li>
                <li>Private build updates</li>
                <li>Digital backer badge</li>
              </ul>
            </div>

            <div className="cub-tier-card">
              <div className="cub-tier-price">$150</div>
              <div className="cub-tier-name">Single Flight Pass</div>
              <p className="cub-tier-desc">
                One 30-minute Cub Experience flight over stunning desert terrain.
                Priority booking and founders pricing locked in.
              </p>
              <ul className="cub-tier-perks">
                <li>One 30-minute flight</li>
                <li>Priority booking</li>
                <li>Founders pricing</li>
              </ul>
            </div>

            <div className="cub-tier-card featured">
              <div className="cub-tier-badge">Most Popular</div>
              <div className="cub-tier-price">$250</div>
              <div className="cub-tier-name">Extended Flight Pass</div>
              <p className="cub-tier-desc">
                The full backcountry experience. One 60-minute Cub Experience flight — canyon runs,
                short-field landings, river valley flying. The works.
              </p>
              <ul className="cub-tier-perks">
                <li>One 60-minute flight</li>
                <li>Priority booking</li>
                <li>Founders pricing</li>
              </ul>
            </div>

            <div className="cub-tier-card">
              <div className="cub-tier-price">$500</div>
              <div className="cub-tier-name">Flight Pack</div>
              <p className="cub-tier-desc">
                Three 30-minute flights. Bring friends, spread them out, or fly them
                back-to-back for a full day of bush flying.
              </p>
              <ul className="cub-tier-perks">
                <li>Three 30-minute flights</li>
                <li>Bring friends</li>
                <li>Priority booking</li>
                <li>Founders pricing</li>
              </ul>
            </div>

            <div className="cub-tier-card">
              <div className="cub-tier-price">$1,000</div>
              <div className="cub-tier-name">Founding Pilot</div>
              <p className="cub-tier-desc">
                A serious commitment to bush flying. Founding Pilots get five full-hour flights,
                a lifetime discount, and their name on the hangar wall.
              </p>
              <ul className="cub-tier-perks">
                <li>Five 60-minute flights</li>
                <li>Lifetime 15% discount on all bookings</li>
                <li>Name on the hangar wall</li>
                <li>Quarterly founder calls</li>
              </ul>
            </div>

            <div className="cub-tier-card">
              <div className="cub-tier-price">$5,000</div>
              <div className="cub-tier-name">Charter Pioneer</div>
              <p className="cub-tier-desc">
                The ultimate commitment. Unlimited flights for the entire first year of operations,
                private sessions, and a seat at the table shaping the experience.
              </p>
              <ul className="cub-tier-perks">
                <li>Unlimited flights — first year of operations</li>
                <li>Private sessions</li>
                <li>Input on experience design</li>
                <li>VIP access to all events</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom back link */}
        <div className="cub-bottom-back">
          <Link href="/update">← Back to the full update</Link>
        </div>

      </div>

      <LikeWidget campaign="cub" accent={ACCENT} />
    </>
  );
}
