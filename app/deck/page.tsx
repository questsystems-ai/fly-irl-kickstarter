"use client";

import Nav from "@/components/Nav";

/* ─── tiny helper components ─── */
function Placeholder({ label, h = "220px" }: { label: string; h?: string }) {
  return (
    <div className="ph" style={{ height: h }}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

function BulletRow({ items }: { items: string[] }) {
  return (
    <ul className="deck-bullets">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

export default function DeckPage() {
  return (
    <>
      <style>{`
        /* ===================================================
           POWERPOINT-STYLE DECK
           Calibri family · 4:3 aspect cards · white/dark slides
           =================================================== */
        @import url('https://fonts.googleapis.com/css2?family=Carlito:wght@400;700&display=swap');
        /* Carlito is the metric-compatible open-source Calibri substitute */

        .deck-page {
          background: #e2e2e2;
          min-height: 100vh;
          padding: 80px 24px 64px;
          font-family: 'Carlito', 'Calibri', 'Segoe UI', Arial, sans-serif;
        }

        /* Individual "slide" card */
        .deck-slide {
          max-width: 960px;
          margin: 0 auto 28px;
          background: #fff;
          border-radius: 4px;
          box-shadow:
            0 1px 4px rgba(0,0,0,0.12),
            0 4px 16px rgba(0,0,0,0.06);
          aspect-ratio: 4 / 3;
          padding: 48px 56px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: relative;
          overflow: hidden;
        }
        .deck-slide.dark {
          background: #1e2a3a;
          color: #fff;
        }
        .deck-slide.title-slide {
          justify-content: center;
          align-items: center;
          text-align: center;
          background: linear-gradient(135deg, #1a2740 0%, #0f1926 100%);
          color: #fff;
        }

        /* Slide number chip */
        .deck-slide-num {
          position: absolute;
          bottom: 20px;
          right: 28px;
          font-size: 12px;
          color: #999;
        }
        .deck-slide.dark .deck-slide-num { color: rgba(255,255,255,0.35); }

        /* Typography */
        .deck-h1 {
          font-size: 38px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin: 0 0 12px;
          line-height: 1.15;
        }
        .deck-h2 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px;
          line-height: 1.2;
          color: #1a2740;
        }
        .deck-slide.dark .deck-h2 { color: #fff; }
        .deck-h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 6px;
          color: #1a2740;
        }
        .deck-slide.dark .deck-h3 { color: #fff; }
        .deck-sub {
          font-size: 18px;
          color: #555;
          margin: 0 0 28px;
          line-height: 1.5;
          max-width: 680px;
        }
        .deck-slide.dark .deck-sub,
        .deck-slide.title-slide .deck-sub { color: rgba(255,255,255,0.7); }
        .deck-body {
          font-size: 16px;
          color: #444;
          line-height: 1.55;
          margin: 0 0 12px;
        }
        .deck-slide.dark .deck-body { color: rgba(255,255,255,0.8); }
        .deck-small {
          font-size: 13px;
          color: #888;
        }

        /* Title slide extras */
        .deck-logo {
          font-size: 48px;
          font-weight: 700;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }
        .deck-logo span { color: #c9b98a; }
        .deck-tagline {
          font-size: 20px;
          color: rgba(255,255,255,0.65);
          margin-bottom: 40px;
        }
        .deck-title-meta {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
        }

        /* Placeholder box for visuals */
        .ph {
          background: #f0eeeb;
          border: 2px dashed #ccc;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 16px;
        }
        .deck-slide.dark .ph {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.15);
        }
        .ph-label {
          font-size: 13px;
          color: #999;
          font-style: italic;
          max-width: 260px;
          line-height: 1.4;
        }
        .deck-slide.dark .ph-label { color: rgba(255,255,255,0.4); }

        /* 2-column layout */
        .deck-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          flex: 1;
          align-items: start;
        }
        .deck-cols-60-40 {
          grid-template-columns: 3fr 2fr;
        }
        .deck-cols-40-60 {
          grid-template-columns: 2fr 3fr;
        }

        /* 3-column */
        .deck-3col {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* 4-column */
        .deck-4col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* Stat boxes */
        .deck-stat-box {
          background: #f6f5f3;
          border: 1px solid #e4e2de;
          border-radius: 4px;
          padding: 20px 16px;
          text-align: center;
        }
        .deck-slide.dark .deck-stat-box {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.1);
        }
        .deck-stat-val {
          font-size: 32px;
          font-weight: 700;
          color: #1a2740;
          line-height: 1;
        }
        .deck-slide.dark .deck-stat-val { color: #c9b98a; }
        .deck-stat-label {
          font-size: 13px;
          font-weight: 700;
          color: #555;
          margin-top: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .deck-slide.dark .deck-stat-label { color: rgba(255,255,255,0.6); }
        .deck-stat-desc {
          font-size: 12px;
          color: #888;
          margin-top: 4px;
          line-height: 1.35;
        }

        /* Bullet lists */
        .deck-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .deck-bullets li {
          font-size: 15px;
          color: #444;
          padding: 6px 0 6px 20px;
          position: relative;
          line-height: 1.5;
        }
        .deck-slide.dark .deck-bullets li { color: rgba(255,255,255,0.8); }
        .deck-bullets li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #1a2740;
          font-weight: 700;
        }
        .deck-slide.dark .deck-bullets li::before { color: #c9b98a; }

        /* Table */
        .deck-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .deck-table th {
          text-align: left;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #888;
          padding: 8px 10px;
          border-bottom: 2px solid #ddd;
        }
        .deck-table td {
          padding: 8px 10px;
          border-bottom: 1px solid #eee;
          color: #444;
        }
        .deck-table .val { font-weight: 700; text-align: right; color: #1a2740; }
        .deck-table .highlight-row td {
          background: #1a2740;
          color: #fff;
          font-weight: 700;
          border: none;
        }
        .deck-table .highlight-row .val { color: #c9b98a; }

        /* Layer / numbered rows */
        .deck-layer {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .deck-layer:last-child { border-bottom: none; }
        .deck-layer-num {
          font-size: 24px;
          font-weight: 700;
          color: #c9b98a;
          line-height: 1;
          flex-shrink: 0;
          width: 32px;
        }
        .deck-layer p { margin: 0; }

        /* Timeline for roadmap */
        .deck-tl-row {
          display: grid;
          grid-template-columns: 100px 1fr 100px;
          gap: 16px;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          align-items: start;
        }
        .deck-tl-row:last-child { border-bottom: none; }
        .deck-tl-year {
          font-size: 14px;
          font-weight: 700;
          color: #1a2740;
          background: #f0eeeb;
          padding: 4px 10px;
          border-radius: 3px;
          text-align: center;
        }
        .deck-tl-cost {
          font-size: 14px;
          font-weight: 700;
          color: #1a2740;
          text-align: right;
        }

        /* Callout box */
        .deck-callout {
          background: #1a2740;
          color: #fff;
          padding: 20px 24px;
          border-radius: 4px;
          margin-top: 16px;
          text-align: center;
        }
        .deck-callout-val {
          font-size: 36px;
          font-weight: 700;
          color: #c9b98a;
        }
        .deck-callout-label {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          margin-top: 4px;
        }

        /* Track cards for parallel workstreams */
        .track-card {
          background: #fff;
          border: 1px solid #e4e2de;
          border-radius: 4px;
          padding: 20px;
          border-top: 4px solid #1a2740;
        }
        .track-card.accent { border-top-color: #c9b98a; }
        .track-card.green { border-top-color: #4a8c6f; }
        .deck-slide.dark .track-card {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.1);
        }

        @media (max-width: 768px) {
          .deck-slide {
            aspect-ratio: auto;
            min-height: auto;
            padding: 32px 24px;
          }
          .deck-cols, .deck-cols-60-40, .deck-cols-40-60 { grid-template-columns: 1fr; }
          .deck-3col { grid-template-columns: 1fr; }
          .deck-4col { grid-template-columns: 1fr 1fr; }
          .deck-tl-row { grid-template-columns: 80px 1fr 80px; }
        }
      `}</style>

      <Nav />

      <div className="deck-page">

        {/* ========== SLIDE 1: TITLE ========== */}
        <div className="deck-slide title-slide">
          <div className="deck-logo">Fly<span>IRL</span></div>
          <div className="deck-tagline">The SkyPark</div>
          <div className="deck-h1" style={{ fontSize: 28, maxWidth: 600, marginBottom: 16 }}>
            The world's first autonomous safety-enabled flight experience park
          </div>
          <div className="deck-sub" style={{ marginBottom: 48 }}>
            Real aircraft · Real skies · Impossible to crash
          </div>
          <div className="deck-title-meta">
            Kickstarter Pre-Launch · 2026
          </div>
          <div className="deck-slide-num">1</div>
        </div>

        {/* ========== SLIDE 2: THE PROBLEM ========== */}
        <div className="deck-slide">
          <div className="deck-h2">The Problem</div>
          <div className="deck-sub">
            Flying is the ultimate human dream. But it's locked behind cost, time, and risk.
          </div>
          <div className="deck-4col" style={{ flex: 1 }}>
            <div className="deck-stat-box">
              <div className="deck-stat-val">$15K+</div>
              <div className="deck-stat-label">Cost Barrier</div>
              <div className="deck-stat-desc">Minimum for a private pilot license, plus 6–12 months training</div>
            </div>
            <div className="deck-stat-box">
              <div className="deck-stat-val">1,000+</div>
              <div className="deck-stat-label">Fatalities / Year</div>
              <div className="deck-stat-desc">GA remains one of the deadliest forms of transportation</div>
            </div>
            <div className="deck-stat-box">
              <div className="deck-stat-val">0.2%</div>
              <div className="deck-stat-label">Access Rate</div>
              <div className="deck-stat-desc">Fewer than 1 in 500 Americans hold a pilot certificate</div>
            </div>
            <div className="deck-stat-box">
              <div className="deck-stat-val">∞</div>
              <div className="deck-stat-label">Demand</div>
              <div className="deck-stat-desc">Every kid dreams of flight. Then adult reality kicks in.</div>
            </div>
          </div>
          <div className="deck-slide-num">2</div>
        </div>

        {/* ========== SLIDE 3: THE SOLUTION ========== */}
        <div className="deck-slide dark">
          <div className="deck-h2">The Solution</div>
          <div className="deck-sub">
            A flight experience park where anyone can fly a real aircraft — with autonomous safety
            that makes dangerous outcomes physically impossible.
          </div>
          <div className="deck-3col" style={{ flex: 1 }}>
            <div style={{ textAlign: 'center' }}>
              <Placeholder label="Visual: Guest in cockpit, hands on real controls, desert sky visible" h="140px" />
              <div className="deck-h3" style={{ marginTop: 14 }}>1. You Fly</div>
              <div className="deck-body">Real stick, real rudder, real G-forces. You're actually piloting through real skies.</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Placeholder label="Visual: Digital twin split-screen — real aircraft + predicted trajectory overlay" h="140px" />
              <div className="deck-h3" style={{ marginTop: 14 }}>2. AI Watches</div>
              <div className="deck-body">Digital twin predicts every possible outcome 10 seconds ahead in real-time.</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Placeholder label="Visual: Aircraft in gentle recovery arc, subtle safety-net overlay" h="140px" />
              <div className="deck-h3" style={{ marginTop: 14 }}>3. Safety Catches</div>
              <div className="deck-body">Push past the envelope? System smoothly takes over, recovers, and hands control back.</div>
            </div>
          </div>
          <div className="deck-slide-num">3</div>
        </div>

        {/* ========== SLIDE 4: THE AIRCRAFT ========== */}
        <div className="deck-slide">
          <div className="deck-h2">The Aircraft</div>
          <div className="deck-sub">
            Like a theme park ride, we need a purpose-built vehicle — optimized for fun and safety, not range.
          </div>
          <div className="deck-cols deck-cols-60-40">
            <div>
              <BulletRow items={[
                "Hybrid fixed-wing + quadcopter: traditional controls for the experience, rotors for takeoff, landing, and failsafe recovery",
                "Takeoff and landing are automated — the two hardest and most dangerous phases eliminated from the guest experience entirely",
                "Ultra-rugged airframe designed for 1,000s of hours of repeated high-load sessions, fast turnaround, minimal maintenance",
                "Short range by design: purpose-built for a bounded SkyZone, not cross-country. Every ounce goes to safety and fun",
                "Quadcopters act as both training wheels and parachute — recovery from ANY attitude, including traditionally unrecoverable spins",
              ]} />
            </div>
            <div>
              <Placeholder label="Visual: Cutaway or 3-view of hybrid aircraft concept — fixed wing body with integrated quad rotors at corners. Clean, rugged, not flashy. Annotation callouts for: rotor pods, rugged landing gear, composite airframe, safety systems bay" h="280px" />
            </div>
          </div>
          <div className="deck-slide-num">4</div>
        </div>

        {/* ========== SLIDE 5: THREE SAFETY LAYERS ========== */}
        <div className="deck-slide dark">
          <div className="deck-h2">Three Layers of Safety</div>
          <div className="deck-sub">
            Redundant systems ensure dangerous outcomes are physically impossible — not just unlikely.
          </div>
          <div style={{ flex: 1 }}>
            <div className="deck-layer">
              <div className="deck-layer-num">01</div>
              <div>
                <div className="deck-h3">Digital Twin</div>
                <div className="deck-body">Physics-accurate simulation running in real-time. Predicts all trajectories and potential conflicts before they happen. Full state knowledge of every aircraft in the SkyZone.</div>
              </div>
            </div>
            <div className="deck-layer">
              <div className="deck-layer-num">02</div>
              <div>
                <div className="deck-h3">Envelope Protection</div>
                <div className="deck-body">AI continuously monitors position, attitude, airspeed, G-load, energy state, and boundary proximity. Intervenes smoothly before any danger threshold — the guest feels guidance, not override.</div>
              </div>
            </div>
            <div className="deck-layer">
              <div className="deck-layer-num">03</div>
              <div>
                <div className="deck-h3">Quadcopter Failsafe</div>
                <div className="deck-body">Hybrid aircraft can recover from ANY attitude. No such thing as an unrecoverable spin. Automated takeoff and landing remove the two most dangerous phases of flight from the guest experience entirely.</div>
              </div>
            </div>
          </div>
          <div className="deck-slide-num">5</div>
        </div>

        {/* ========== SLIDE 6: THREE PARALLEL TRACKS ========== */}
        <div className="deck-slide">
          <div className="deck-h2">Three Parallel Development Tracks</div>
          <div className="deck-sub">
            Building a SkyPark requires simultaneous progress on three fronts.
          </div>
          <div className="deck-3col" style={{ flex: 1 }}>
            <div className="track-card">
              <div className="deck-h3" style={{ fontSize: 16 }}>🏛️ Regulatory</div>
              <BulletRow items={[
                "FAA engagement: Part 91 → experimental → type certificate path",
                "Closely parallels Urban Air Mobility (UAM) regulatory framework",
                "Closed, controlled airspace simplifies approval",
                "Safety case built on simulation data before any physical flight",
              ]} />
            </div>
            <div className="track-card accent">
              <div className="deck-h3" style={{ fontSize: 16 }}>🏗️ Park & Systems</div>
              <BulletRow items={[
                "SkyZone definition, traffic coordination, digital twin",
                "Guest pilot interface: AR HUD, simplified controls",
                "Collision avoidance, envelope protection logic",
                "Operations: briefing flow, session management, maintenance",
              ]} />
            </div>
            <div className="track-card green">
              <div className="deck-h3" style={{ fontSize: 16 }}>✈️ Aircraft Design</div>
              <BulletRow items={[
                "Hybrid fixed-wing + quad: fun to fly, ultra-safe",
                "Automated takeoff & landing (hardest parts eliminated)",
                "Ultra-rugged: 1,000s of hours, fast turnaround",
                "Range sacrificed for safety margin and durability",
              ]} />
            </div>
          </div>
          <div className="deck-slide-num">6</div>
        </div>

        {/* ========== SLIDE 7: MARKET ========== */}
        <div className="deck-slide">
          <div className="deck-h2">Market Opportunity</div>
          <div className="deck-sub">
            First-mover in a category that doesn't exist yet — at the intersection of aviation, entertainment, and training.
          </div>
          <div className="deck-4col" style={{ flex: 1, alignItems: 'start' }}>
            <div className="deck-stat-box">
              <div className="deck-stat-val">$683B</div>
              <div className="deck-stat-label">Adventure Tourism</div>
              <div className="deck-stat-desc">Skydiving, zip lines, bungee — flight is the missing category</div>
            </div>
            <div className="deck-stat-box">
              <div className="deck-stat-val">15M+</div>
              <div className="deck-stat-label">Flight Sim Users</div>
              <div className="deck-stat-desc">MSFS players hungry for the real thing</div>
            </div>
            <div className="deck-stat-box">
              <div className="deck-stat-val">$12B</div>
              <div className="deck-stat-label">Pilot Training</div>
              <div className="deck-stat-desc">Emergency maneuver training is currently life-threatening</div>
            </div>
            <div className="deck-stat-box">
              <div className="deck-stat-val">$400B+</div>
              <div className="deck-stat-label">Corporate Events</div>
              <div className="deck-stat-desc">Team building, retreats, incentive travel</div>
            </div>
          </div>
          <Placeholder label="Chart placeholder: TAM / SAM / SOM funnel diagram. TAM $683B adventure tourism → SAM $2.8B accessible flight experiences → SOM $50M first 5 parks" h="100px" />
          <div className="deck-slide-num">7</div>
        </div>

        {/* ========== SLIDE 8: UNIT ECONOMICS ========== */}
        <div className="deck-slide">
          <div className="deck-h2">Unit Economics — Per Park</div>
          <div className="deck-sub">
            $300 per 15-minute flight. Six aircraft per park. 50% margins at scale.
          </div>
          <div className="deck-cols">
            <div>
              <table className="deck-table">
                <thead>
                  <tr><th>Revenue Drivers</th><th className="val"></th></tr>
                </thead>
                <tbody>
                  <tr><td>Price per flight</td><td className="val">$300</td></tr>
                  <tr><td>Flights per aircraft / day</td><td className="val">24</td></tr>
                  <tr><td>Aircraft per park</td><td className="val">6</td></tr>
                  <tr><td>Operating days / year</td><td className="val">300</td></tr>
                  <tr className="highlight-row"><td>Annual Revenue</td><td className="val">$12.96M</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="deck-table">
                <thead>
                  <tr><th>Operating Costs</th><th className="val"></th></tr>
                </thead>
                <tbody>
                  <tr><td>Staff (10 people)</td><td className="val">$1.5M</td></tr>
                  <tr><td>Maintenance &amp; parts</td><td className="val">$1.2M</td></tr>
                  <tr><td>Insurance</td><td className="val">$2.0M</td></tr>
                  <tr><td>Site, energy, software, G&amp;A</td><td className="val">$1.8M</td></tr>
                  <tr className="highlight-row"><td>EBITDA (50% margin)</td><td className="val">~$6.5M</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="deck-slide-num">8</div>
        </div>

        {/* ========== SLIDE 9: RANCH MVP ========== */}
        <div className="deck-slide dark">
          <div className="deck-h2">Early Adopter MVP: Personal Ranch System</div>
          <div className="deck-sub">
            Before a public SkyPark, a private ranch installation de-risks the full concept with real flight operations.
          </div>
          <div className="deck-cols deck-cols-60-40">
            <div>
              <div className="deck-h3" style={{ color: '#c9b98a' }}>What it is</div>
              <div className="deck-body">
                A single-aircraft, private-property installation for a high-net-worth ranch or estate owner.
                Closed airspace over private land. One aircraft. One SkyZone. Full safety stack.
                Think "personal roller coaster" — but in the sky.
              </div>

              <div className="deck-h3" style={{ color: '#c9b98a', marginTop: 20 }}>Why it works as a stepping stone</div>
              <BulletRow items={[
                "Private land = simpler FAA path (no public airspace coordination)",
                "Single aircraft = no traffic management complexity",
                "Validates full safety stack in real-world conditions",
                "Generates operational data for public park certification",
                "Revenue from ultra-premium early adopters funds continued development",
              ]} />
            </div>
            <div>
              <div className="deck-stat-box" style={{ marginBottom: 12 }}>
                <div className="deck-stat-val">$2–5M</div>
                <div className="deck-stat-label">System Price</div>
                <div className="deck-stat-desc">Aircraft + ground systems + installation + training</div>
              </div>
              <div className="deck-stat-box" style={{ marginBottom: 12 }}>
                <div className="deck-stat-val">1 Aircraft</div>
                <div className="deck-stat-label">Configuration</div>
                <div className="deck-stat-desc">Single SkyZone, private property, closed airspace</div>
              </div>
              <div className="deck-stat-box">
                <div className="deck-stat-val">$50K+/yr</div>
                <div className="deck-stat-label">Service Contract</div>
                <div className="deck-stat-desc">Maintenance, software updates, insurance support</div>
              </div>
              <Placeholder label="Visual: Aerial view of ranch property with SkyZone boundary overlay, single aircraft in flight, small hangar/ops building" h="100px" />
            </div>
          </div>
          <div className="deck-slide-num">9</div>
        </div>

        {/* ========== SLIDE 10: PHASED ROADMAP ========== */}
        <div className="deck-slide">
          <div className="deck-h2">Phased Roadmap</div>
          <div className="deck-sub">
            Simulation-first development. Credible timeline, credible costs.
          </div>

          <div className="deck-tl-row" style={{ fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: '#888', borderBottom: '2px solid #ddd', letterSpacing: 0.5 }}>
            <span>Phase</span><span>Milestone</span><span style={{ textAlign: 'right' }}>Capital</span>
          </div>
          <div className="deck-tl-row">
            <div className="deck-tl-year">2026</div>
            <div>
              <div className="deck-h3" style={{ fontSize: 15 }}>Phase 0: Simulation &amp; Safety Proof</div>
              <div className="deck-small">Digital twin, physics-accurate flight models, investor-flyable demo. Kickstarter funds this phase.</div>
            </div>
            <div className="deck-tl-cost">$500K–$1M</div>
          </div>
          <div className="deck-tl-row">
            <div className="deck-tl-year">2027–28</div>
            <div>
              <div className="deck-h3" style={{ fontSize: 15 }}>Phase 1: Scale Aircraft &amp; Ranch MVP</div>
              <div className="deck-small">R/C scale validation, autonomous override testing, first ranch installation, FAA relationship development.</div>
            </div>
            <div className="deck-tl-cost">$5M–$15M</div>
          </div>
          <div className="deck-tl-row">
            <div className="deck-tl-year">2029–31</div>
            <div>
              <div className="deck-h3" style={{ fontSize: 15 }}>Phase 2: Full-Scale Aircraft &amp; Certification</div>
              <div className="deck-small">Custom hybrid aircraft development, ranch fleet expansion, public SkyPark certification process.</div>
            </div>
            <div className="deck-tl-cost">~$50M</div>
          </div>
          <div className="deck-tl-row">
            <div className="deck-tl-year">2032–36</div>
            <div>
              <div className="deck-h3" style={{ fontSize: 15 }}>Phase 3: First Public SkyPark</div>
              <div className="deck-small">First public facility, multi-aircraft operations, pilot training program, international licensing begins.</div>
            </div>
            <div className="deck-tl-cost">~$50M+</div>
          </div>

          <Placeholder label="Chart placeholder: Gantt-style timeline bar chart showing three parallel tracks (Regulatory, Park & Systems, Aircraft) across 2026–2036, with phase gates and funding milestones marked" h="90px" />
          <div className="deck-slide-num">10</div>
        </div>

        {/* ========== SLIDE 11: THE ASK ========== */}
        <div className="deck-slide dark" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div className="deck-h2" style={{ marginBottom: 4 }}>The Ask</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: '#c9b98a', margin: '8px 0' }}>$500K</div>
          <div className="deck-sub" style={{ margin: '0 auto 32px', textAlign: 'center' }}>
            Kickstarter · Phase 0 · Simulation &amp; Safety Proof
          </div>

          <div className="deck-3col" style={{ maxWidth: 700, margin: '0 auto' }}>
            <div className="deck-stat-box">
              <div className="deck-stat-val" style={{ fontSize: 24 }}>$280K</div>
              <div className="deck-stat-label">Core Simulation</div>
            </div>
            <div className="deck-stat-box">
              <div className="deck-stat-val" style={{ fontSize: 24 }}>$100K</div>
              <div className="deck-stat-label">Safety Systems</div>
            </div>
            <div className="deck-stat-box">
              <div className="deck-stat-val" style={{ fontSize: 24 }}>$120K</div>
              <div className="deck-stat-label">FAA, Legal, Demo, Ops</div>
            </div>
          </div>

          <div style={{ marginTop: 36 }}>
            <div className="deck-body" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 520, margin: '0 auto' }}>
              This funds the integrated SkyPark simulation — the proof that this experience
              is real, safe, and worth scaling. Not the end. The beginning.
            </div>
          </div>
          <div className="deck-slide-num">11</div>
        </div>

        {/* ========== SLIDE 12: CLOSING ========== */}
        <div className="deck-slide title-slide">
          <div className="deck-logo">Fly<span>IRL</span></div>
          <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, maxWidth: 500 }}>
            I've given this everything I have.<br />
            I'm not going anywhere.
          </div>
          <div className="deck-tagline" style={{ marginBottom: 32 }}>
            Now I need to know: is it just me?<br />
            Or is this something we all want?
          </div>
          <div className="deck-title-meta">
            flyirl.com &nbsp;·&nbsp; hello@flyirl.com
          </div>
          <div className="deck-slide-num">12</div>
        </div>

      </div>{/* end deck-page */}
    </>
  );
}
