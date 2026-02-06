"use client";

import Nav from "@/components/Nav";

function Slide({
  id,
  dark = false,
  children,
}: {
  id?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`slide ${dark ? "slide-dark" : "slide-light"}`}
    >
      <div className="slide-inner">{children}</div>
    </section>
  );
}

function SlideNum({ n, label }: { n: string; label: string }) {
  return (
    <div className="slide-num-row">
      <span className="slide-num">{n}</span>
      <span className="slide-label">{label}</span>
    </div>
  );
}

function StatCard({
  value,
  label,
  desc,
}: {
  value: string;
  label: string;
  desc: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <p className="stat-desc">{desc}</p>
    </div>
  );
}

function EconRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="econ-row">
      <span>{left}</span>
      <span className="econ-val">{right}</span>
    </div>
  );
}

export default function VisionPage() {
  return (
    <>
      <style>{`
        /* ===== SLIDE SYSTEM ===== */
        .slide {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px 80px;
          position: relative;
        }
        .slide-light { background: var(--bg); color: var(--ink); }
        .slide-dark { background: var(--dark); color: #fff; }
        .slide-inner {
          max-width: var(--max);
          width: 100%;
        }

        /* Slide numbering */
        .slide-num-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .slide-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--accent);
          background: var(--dark);
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
        }
        .slide-dark .slide-num {
          background: var(--accent);
          color: var(--accentText);
        }
        .slide-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--muted);
        }
        .slide-dark .slide-label { color: rgba(255,255,255,0.5); }

        /* Title slide */
        .title-slide {
          text-align: center;
          padding: 140px 24px 100px;
          background: linear-gradient(165deg, var(--dark2) 0%, #1a1a1a 50%, #2a2520 100%);
          color: #fff;
          position: relative;
        }
        .title-slide .title-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.25;
        }
        .title-slide::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(13,13,13,0.6) 0%, rgba(13,13,13,0.3) 50%, rgba(13,13,13,0.8) 100%);
        }
        .title-slide .slide-inner { position: relative; max-width: 900px; z-index: 1; }
        .title-slide h1 {
          font-size: clamp(36px, 6vw, 58px);
          font-weight: 800;
          margin-bottom: 20px;
          letter-spacing: -1.5px;
        }
        .title-slide h1 span { color: var(--accent); }
        .title-slide p {
          font-size: 20px;
          color: rgba(255,255,255,0.7);
          max-width: 600px;
          margin: 0 auto;
          font-weight: 300;
        }

        /* Problem card icons */
        .stat-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          font-size: 13px;
          color: var(--muted);
          font-style: italic;
          background: #e8e5e0;
          border: 2px dashed #ccc;
          text-align: center;
        }

        /* Two-column layout for slides */
        .slide-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .slide-cols h2 {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          margin-bottom: 18px;
          letter-spacing: -0.5px;
        }
        .slide-cols p {
          font-size: 17px;
          line-height: 1.7;
          color: var(--muted);
          margin-bottom: 14px;
        }
        .slide-dark .slide-cols p { color: rgba(255,255,255,0.75); }
        .slide-cols .accent-line {
          font-weight: 600;
          color: var(--ink);
          font-size: 15px;
        }
        .slide-dark .slide-cols .accent-line { color: var(--accent); }

        /* Image placeholder for slides */
        .slide-img-placeholder {
          width: 100%;
          aspect-ratio: 4/3;
          background: #e0ddd8;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: var(--muted);
          font-style: italic;
        }
        .slide-dark .slide-img-placeholder {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.4);
        }

        /* Stat grid */
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-top: 32px;
        }
        .stat-card {
          background: #fff;
          border: 1px solid var(--border);
          padding: 28px;
          border-radius: 10px;
        }
        .slide-dark .stat-card {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.1);
        }
        .stat-value {
          font-family: 'Montserrat', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: var(--dark);
        }
        .slide-dark .stat-value { color: var(--accent); }
        .stat-label {
          font-size: 16px;
          font-weight: 600;
          margin: 6px 0 4px;
        }
        .stat-desc {
          font-size: 14px;
          color: var(--muted);
          margin: 0;
        }
        .slide-dark .stat-desc { color: rgba(255,255,255,0.6); }

        /* Steps row */
        .steps-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 36px;
        }
        .step-card {
          text-align: center;
          padding: 32px 20px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
        }
        .slide-dark .step-card {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.1);
        }
        .step-num {
          width: 44px; height: 44px;
          background: var(--dark);
          color: var(--accent);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 18px; font-weight: 700;
          margin: 0 auto 14px;
        }
        .slide-dark .step-num {
          background: var(--accent);
          color: var(--accentText);
        }
        .step-card h4 { font-size: 17px; margin-bottom: 6px; }
        .step-card p { font-size: 14px; color: var(--muted); margin: 0; }
        .slide-dark .step-card p { color: rgba(255,255,255,0.65); }

        /* Safety layers */
        .safety-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 32px;
        }
        .safety-layer {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 24px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          border-left: 4px solid var(--accent);
        }
        .safety-layer-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: var(--accent);
          line-height: 1;
          flex-shrink: 0;
        }
        .safety-layer h4 { font-size: 17px; margin-bottom: 4px; }
        .safety-layer p { font-size: 14px; color: rgba(255,255,255,0.7); margin: 0; }

        /* Economics grid */
        .econ-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          margin-top: 32px;
        }
        .econ-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 28px;
        }
        .econ-card h4 {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--muted);
          margin-bottom: 20px;
        }
        .econ-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          font-size: 15px;
        }
        .econ-row:last-of-type { border-bottom: none; }
        .econ-val { font-weight: 600; }
        .econ-highlight {
          background: var(--dark);
          color: #fff;
          padding: 18px;
          border-radius: 8px;
          margin-top: 18px;
          text-align: center;
        }
        .econ-highlight-val {
          font-family: 'Montserrat', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: var(--accent);
        }
        .econ-highlight-label { font-size: 13px; color: rgba(255,255,255,0.7); margin-top: 4px; }

        /* Timeline */
        .timeline {
          position: relative;
          padding-left: 40px;
          margin-top: 36px;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 15px; top: 0; bottom: 0;
          width: 2px;
          background: var(--border);
        }
        .tl-item {
          position: relative;
          padding-bottom: 36px;
        }
        .tl-item:last-child { padding-bottom: 0; }
        .tl-dot {
          position: absolute;
          left: -33px; top: 4px;
          width: 12px; height: 12px;
          background: var(--dark);
          border: 3px solid var(--accent);
          border-radius: 50%;
        }
        .tl-year {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          color: var(--accent);
          background: var(--dark);
          padding: 4px 12px;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .tl-item h4 { font-size: 17px; margin-bottom: 6px; }
        .tl-item p { font-size: 14px; color: var(--muted); margin: 0 0 6px; }
        .tl-cost { font-size: 14px; font-weight: 600; color: var(--dark); }

        /* CTA at bottom */
        .vision-cta {
          background: var(--dark2);
          color: #fff;
          padding: 64px 24px;
          text-align: center;
        }
        .vision-cta-inner { max-width: 600px; margin: 0 auto; }
        .vision-cta h2 {
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 700;
          margin-bottom: 16px;
        }
        .vision-cta p {
          color: rgba(255,255,255,0.7);
          font-size: 17px;
          margin-bottom: 32px;
        }
        .vision-cta-btn {
          display: inline-block;
          background: var(--accent);
          color: var(--accentText);
          padding: 16px 32px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          transition: transform 0.15s ease;
        }
        .vision-cta-btn:hover { transform: translateY(-2px); }

        /* Slide two-column with text */
        .slide-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .slide-2col p {
          font-size: 16px;
          line-height: 1.65;
          color: var(--muted);
          margin: 0 0 12px;
        }
        .slide-dark .slide-2col p { color: rgba(255,255,255,0.75); }
        .slide-2col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .slide-2col ul li {
          font-size: 15px;
          line-height: 1.55;
          color: var(--muted);
          padding: 5px 0 5px 18px;
          position: relative;
        }
        .slide-dark .slide-2col ul li { color: rgba(255,255,255,0.75); }
        .slide-2col ul li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--dark);
          font-weight: 700;
        }
        .slide-dark .slide-2col ul li::before { color: var(--accent); }

        @media (max-width: 768px) {
          .slide { padding: 90px 20px 60px; min-height: auto; }
          .slide-cols { grid-template-columns: 1fr; gap: 28px; }
          .slide-2col { grid-template-columns: 1fr; gap: 28px; }
          .steps-row { grid-template-columns: 1fr; }
          .econ-grid { grid-template-columns: 1fr; }
          .timeline { padding-left: 32px; }
          .timeline::before { left: 11px; }
          .tl-dot { left: -29px; }
        }
      `}</style>

      <Nav />

      {/* SLIDE 0: TITLE */}
      <section className="slide title-slide">
        <div className="title-bg" style={{ backgroundImage: 'url(/images/title-bg.jpg)' }} />
        <div className="slide-inner">
          <h1>The Future of Flight is <span>Fearless</span></h1>
          <p>
            The world's first autonomous safety-enabled flight experience park.
            Real aircraft. Real skies. Impossible to crash.
          </p>
        </div>
      </section>

      {/* SLIDE 1: THE PROBLEM */}
      <Slide>
        <SlideNum n="01" label="The Problem" />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.5px' }}>
          Flying is the ultimate dream. But it's locked away.
        </h2>
        <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 600, marginBottom: 36 }}>
          The thrill of real flight — aerobatics, pushing limits, pure freedom — is reserved for the elite few.
        </p>
        <div className="stat-grid">
          <div className="stat-card">
            <div style={{
              width: '100%', height: 80, background: '#e8e5e0', borderRadius: 6,
              marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, color: 'var(--muted)', fontStyle: 'italic',
            }}>[Stack of bills / price tag visual]</div>
            <div className="stat-value">$15K+</div>
            <div className="stat-label">Cost Barrier</div>
            <p className="stat-desc">Minimum for a private pilot license, plus 6–12 months of training.</p>
          </div>
          <div className="stat-card">
            <div style={{
              width: '100%', height: 80, background: '#e8e5e0', borderRadius: 6,
              marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, color: 'var(--muted)', fontStyle: 'italic',
            }}>[NTSB crash data chart or wreckage photo]</div>
            <div className="stat-value">1,000+</div>
            <div className="stat-label">Fatalities / Year</div>
            <p className="stat-desc">GA remains one of the most dangerous forms of transportation.</p>
          </div>
          <div className="stat-card">
            <div style={{
              width: '100%', height: 80, background: '#e8e5e0', borderRadius: 6,
              marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, color: 'var(--muted)', fontStyle: 'italic',
            }}>[Locked gate / velvet rope visual]</div>
            <div className="stat-value">0.2%</div>
            <div className="stat-label">Access Rate</div>
            <p className="stat-desc">Fewer than 1 in 500 Americans hold a pilot certificate.</p>
          </div>
          <div className="stat-card">
            <div style={{
              width: '100%', height: 80, background: '#e8e5e0', borderRadius: 6,
              marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, color: 'var(--muted)', fontStyle: 'italic',
            }}>[Kid looking up at sky / paper airplane]</div>
            <div className="stat-value">∞</div>
            <div className="stat-label">Demand</div>
            <p className="stat-desc">Every kid at some point dreams of flight. Then adult reality kicks in.</p>
          </div>
        </div>
      </Slide>

      {/* SLIDE 2: THE SOLUTION */}
      <Slide dark>
        <SlideNum n="02" label="The Solution" />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.5px' }}>
          Real flight. Real controls. Impossible to crash.
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', maxWidth: 640, marginBottom: 36 }}>
          FlyIRL is a flight experience park where anyone can fly a real aircraft — with autonomous safety that makes dangerous outcomes effectively impossible.
        </p>
        <div className="steps-row">
          <div className="step-card">
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              border: '2px dashed rgba(255,255,255,0.15)',
              borderRadius: 6,
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
              fontSize: 12,
              color: 'rgba(255,255,255,0.35)',
              fontStyle: 'italic',
              textAlign: 'center',
              padding: 8,
            }}>[Guest hands on stick, sky through canopy]</div>
            <div className="step-num">1</div>
            <h4>You Fly</h4>
            <p>Real stick, real rudder, real G-forces. You're actually piloting through real skies.</p>
          </div>
          <div className="step-card">
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              border: '2px dashed rgba(255,255,255,0.15)',
              borderRadius: 6,
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
              fontSize: 12,
              color: 'rgba(255,255,255,0.35)',
              fontStyle: 'italic',
              textAlign: 'center',
              padding: 8,
            }}>[Digital twin overlay — predicted trajectory arcs]</div>
            <div className="step-num">2</div>
            <h4>AI Watches</h4>
            <p>Digital twin predicts every possible outcome 10 seconds ahead in real-time.</p>
          </div>
          <div className="step-card">
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              border: '2px dashed rgba(255,255,255,0.15)',
              borderRadius: 6,
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
              fontSize: 12,
              color: 'rgba(255,255,255,0.35)',
              fontStyle: 'italic',
              textAlign: 'center',
              padding: 8,
            }}>[Aircraft in smooth recovery arc]</div>
            <div className="step-num">3</div>
            <h4>Safety Catches</h4>
            <p>Push past the envelope? On a collision course? System smoothly takes over, recovers, and hands control back.</p>
          </div>
        </div>
      </Slide>

      {/* SLIDE 3: THE AIRCRAFT */}
      <Slide>
        <SlideNum n="03" label="The Aircraft" />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 14 }}>
          A purpose-built flying machine
        </h2>
        <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 640, marginBottom: 28 }}>
          Like a theme park ride, we need a purpose-built vehicle — optimized for fun and safety, not range.
        </p>
        <div className="slide-2col">
          <div>
            <ul>
              <li>Hybrid fixed-wing + quadcopter: traditional controls for the experience, rotors for takeoff, landing, and failsafe recovery</li>
              <li>Takeoff and landing are automated — the two hardest and most dangerous phases eliminated from the guest experience entirely</li>
              <li>Ultra-rugged airframe designed for 1,000s of hours of repeated high-load sessions, fast turnaround, minimal maintenance</li>
              <li>Short range by design: every ounce goes to safety and fun, not cross-country capability</li>
              <li>Quadcopters act as both training wheels and parachute — recovery from ANY attitude, including traditionally unrecoverable spins</li>
            </ul>
          </div>
          <div>
            <img
              src="/images/aircraft-concept.png"
              alt="FlyIRL hybrid VTOL aircraft concept"
              style={{
                width: '100%',
                borderRadius: 8,
                display: 'block',
              }}
            />
          </div>
        </div>
      </Slide>

      {/* SLIDE 4: SAFETY */}
      <Slide dark>
        <SlideNum n="04" label="Safety Architecture" />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 14 }}>
          Three layers of safety
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', maxWidth: 600, marginBottom: 12 }}>
          Redundant systems ensure dangerous outcomes are effectively impossible — not just unlikely.
        </p>
        <div className="safety-stack">
          <div className="safety-layer">
            <div className="safety-layer-num">01</div>
            <div>
              <h4>Digital Twin</h4>
              <p>Physics-accurate simulation running in real-time, predicting all trajectories and potential conflicts before they happen.</p>
            </div>
          </div>
          <div className="safety-layer">
            <div className="safety-layer-num">02</div>
            <div>
              <h4>Envelope Protection</h4>
              <p>AI continuously monitors position, attitude, airspeed, and proximity — intervening smoothly before any danger threshold.</p>
            </div>
          </div>
          <div className="safety-layer">
            <div className="safety-layer-num">03</div>
            <div>
              <h4>Quadcopter Failsafe</h4>
              <p>Hybrid aircraft can recover from ANY attitude, including traditionally "unrecoverable" spins. No unrecoverable situations exist.</p>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 5: MARKET */}
      <Slide>
        <SlideNum n="05" label="Market Opportunity" />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 14 }}>
          $2.8B addressable market
        </h2>
        <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 600, marginBottom: 36 }}>
          First-mover in a category that doesn't exist yet — at the intersection of aviation, entertainment, and training.
        </p>
        <div className="stat-grid">
          <StatCard value="$683B" label="Adventure Tourism" desc="Skydiving, zip lines, bungee — flight is the missing category." />
          <StatCard value="15M+" label="Flight Sim Users" desc="Microsoft Flight Sim players hungry for the real thing." />
          <StatCard value="$12B" label="Pilot Training" desc="Emergency maneuver training is currently life-threatening." />
          <StatCard value="$400B+" label="Corporate Events" desc="Team building, executive retreats, incentive travel." />
        </div>
      </Slide>

      {/* SLIDE 6: UNIT ECONOMICS */}
      <Slide>
        <SlideNum n="06" label="Unit Economics" />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 14 }}>
          Economics that work
        </h2>
        <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 600, marginBottom: 12 }}>
          $300 per 15-minute flight. Six aircraft per park. 50% margins at scale.
        </p>
        <div className="econ-grid">
          <div className="econ-card">
            <h4>Revenue Drivers</h4>
            <EconRow left="Price per flight" right="$300" />
            <EconRow left="Flights per aircraft / day" right="24" />
            <EconRow left="Aircraft per park" right="6" />
            <EconRow left="Operating days / year" right="300" />
            <div className="econ-highlight">
              <div className="econ-highlight-val">$12.96M</div>
              <div className="econ-highlight-label">Annual Revenue per Park</div>
            </div>
          </div>
          <div className="econ-card">
            <h4>Operating Costs</h4>
            <EconRow left="Staff (10 people)" right="$1.5M" />
            <EconRow left="Maintenance & parts" right="$1.2M" />
            <EconRow left="Insurance" right="$2.0M" />
            <EconRow left="Site, energy, software, G&A" right="$1.8M" />
            <div className="econ-highlight">
              <div className="econ-highlight-val">~$6.5M</div>
              <div className="econ-highlight-label">EBITDA per Park (50% margin)</div>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 7: ROADMAP */}
      <Slide>
        <SlideNum n="07" label="Roadmap" />
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 14 }}>
          Phased roadmap
        </h2>
        <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 620, marginBottom: 24 }}>
          Simulation-first. Each phase de-risks the next. Credible timeline, credible costs.
        </p>

        {/* PHASE 0 HIGHLIGHT BOX */}
        <div style={{
          background: 'var(--dark)',
          color: '#fff',
          borderRadius: 10,
          padding: '28px 32px',
          marginBottom: 32,
          border: '2px solid var(--accent)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: -12,
            left: 24,
            background: 'var(--accent)',
            color: 'var(--accentText)',
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            padding: '4px 14px',
            borderRadius: 50,
          }}>
            This Kickstarter
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginBottom: 4 }}>2026</div>
              <h4 style={{ fontSize: 20, marginBottom: 6 }}>Phase 0: SkyPark Digital Twin</h4>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', margin: 0, maxWidth: 480 }}>
                Physics-accurate flight simulation, safety proof, investor-flyable demo.
                A complete digital replica of the SkyPark — the foundation everything else builds on.
              </p>
            </div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: 'var(--accent)',
              whiteSpace: 'nowrap',
            }}>
              $500K – $1M
            </div>
          </div>
        </div>

        {/* REMAINING PHASES */}
        <div className="timeline">
          <div className="tl-item">
            <div className="tl-dot" />
            <div className="tl-year">2027–2029</div>
            <h4>Phase 1: Scale Aircraft Testing</h4>
            <p>R/C scale validation, autonomous override testing, FAA relationship development, test facility buildout.</p>
            <div className="tl-cost">$5M – $15M</div>
          </div>
          <div className="tl-item">
            <div className="tl-dot" />
            <div className="tl-year">2029–2031</div>
            <h4>Phase 2: Full-Scale Aircraft, Certification & Personal Systems</h4>
            <p>
              Custom hybrid aircraft development, public SkyPark certification process.
              First personal ranch/estate installations — single aircraft, private land, closed airspace —
              validating the full safety stack in real-world operations and generating revenue from ultra-premium early adopters.
            </p>
            <div className="tl-cost">~$50M</div>
          </div>
          <div className="tl-item">
            <div className="tl-dot" />
            <div className="tl-year">2032–2036</div>
            <h4>Phase 3: First Public SkyPark</h4>
            <p>First public facility, multi-aircraft operations, pilot training program, international licensing begins.</p>
            <div className="tl-cost">~$50M+</div>
          </div>
        </div>
      </Slide>

      {/* BOTTOM CTA */}
      <section className="vision-cta">
        <div className="vision-cta-inner">
          <h2>Ready to back the dream?</h2>
          <p>See the Kickstarter Proof Kit, reward tiers, and how your funding gets used.</p>
          <a href="/kickstarter" className="vision-cta-btn">The Kickstarter →</a>
        </div>
      </section>
    </>
  );
}
