"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function UpdateLetterPage() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("aaron@fly-irl.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <style>{`
        .letter-wrap {
          background: #f9f8f6;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        /* ── Top bar ── */
        .letter-topbar {
          background: #1a1a1a;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .letter-logo {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #fff;
          letter-spacing: -0.5px;
        }
        .letter-logo span { color: #f7f3ea; }
        .letter-topbar-label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          white-space: nowrap;
        }

        /* ── Hero strip ── */
        .letter-hero {
          background: #1a1a1a;
          padding: 56px 24px 48px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .letter-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(247,243,234,0.5);
          margin-bottom: 16px;
        }
        .letter-hero h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 14px;
          line-height: 1.15;
        }
        .letter-hero h1 em {
          font-style: normal;
          color: #f7f3ea;
          opacity: 0.75;
        }
        .letter-hero-meta {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          margin-top: 12px;
        }
        .letter-hero-meta span {
          color: rgba(255,255,255,0.2);
          margin: 0 8px;
        }

        /* ── Stats strip ── */
        .letter-stats {
          background: #fff;
          border-bottom: 1px solid #e8e5e0;
          display: flex;
          justify-content: center;
        }
        .letter-stat {
          flex: 1;
          max-width: 220px;
          padding: 26px 16px;
          text-align: center;
          border-right: 1px solid #e8e5e0;
        }
        .letter-stat:last-child { border-right: none; }
        .letter-stat-val {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(26px, 4vw, 36px);
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1;
          margin-bottom: 5px;
        }
        .letter-stat-label {
          font-size: 11px;
          color: #999;
          line-height: 1.4;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ── Body ── */
        .letter-body {
          max-width: 660px;
          margin: 0 auto;
          padding: 52px 24px 16px;
        }
        .letter-salutation {
          font-family: 'Montserrat', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 24px;
        }
        .letter-body p {
          font-size: 17px;
          line-height: 1.78;
          color: #2f2f2f;
          margin-bottom: 22px;
        }
        .letter-body strong { color: #1a1a1a; font-weight: 600; }
        .letter-body em { color: #5a5a5a; font-style: italic; }

        /* ── Pull quote ── */
        .letter-callout {
          border-left: 4px solid #1a1a1a;
          background: #fff;
          padding: 20px 24px;
          margin: 32px 0;
          border-radius: 0 8px 8px 0;
        }
        .letter-callout p {
          font-size: 18px !important;
          font-weight: 600;
          color: #1a1a1a !important;
          font-style: italic;
          margin: 0 !important;
          line-height: 1.55 !important;
        }

        /* ── Divider ── */
        .letter-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 36px 0;
        }
        .letter-divider hr {
          flex: 1;
          border: none;
          border-top: 1px solid #e0ddd8;
        }
        .letter-divider-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d0cdc8;
          flex-shrink: 0;
        }

        /* ── What I need dark card ── */
        .letter-needs {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 32px 28px;
          margin: 36px 0;
        }
        .letter-needs h3 {
          font-family: 'Montserrat', sans-serif;
          font-size: 17px;
          font-weight: 800;
          color: #f7f3ea;
          margin-bottom: 24px;
          line-height: 1.3;
        }
        .letter-need-item {
          display: flex;
          gap: 18px;
          margin-bottom: 22px;
          align-items: flex-start;
        }
        .letter-need-item:last-child { margin-bottom: 0; }
        .letter-need-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: rgba(247,243,234,0.4);
          line-height: 1.1;
          flex-shrink: 0;
          width: 24px;
        }
        .letter-need-text {
          font-size: 15px;
          color: rgba(255,255,255,0.7);
          line-height: 1.65;
        }
        .letter-need-text strong {
          color: #fff;
          font-weight: 600;
          display: block;
          font-size: 15px;
          margin-bottom: 4px;
        }

        /* ── Campaigns section ── */
        .letter-campaigns-intro {
          margin: 44px 0 28px;
        }
        .letter-campaigns-intro h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(22px, 3.5vw, 30px);
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.2;
          margin-bottom: 14px;
        }
        .letter-campaigns-intro p {
          font-size: 17px !important;
          color: #3a3a3a !important;
          line-height: 1.78 !important;
          margin-bottom: 0 !important;
        }
        .letter-campaign-card {
          border: 2px solid #1a1a1a;
          border-radius: 12px;
          padding: 28px;
          margin: 28px 0;
          background: #fff;
        }
        .letter-campaign-card--blue {
          border-color: #2a7ab5;
          background: #f5f9fd;
        }
        .letter-campaign-card--purple {
          border-color: #6b47b8;
          background: #faf7ff;
        }
        .letter-campaign-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #888;
          margin-bottom: 12px;
        }
        .letter-campaign-tag--blue { color: #2a7ab5; }
        .letter-campaign-tag--purple { color: #6b47b8; }
        .letter-campaign-card h3 {
          font-family: 'Montserrat', sans-serif;
          font-size: 19px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .letter-campaign-card p {
          font-size: 15px !important;
          color: #3a3a3a !important;
          line-height: 1.72 !important;
          margin-bottom: 14px !important;
        }
        .letter-campaign-card p:last-of-type { margin-bottom: 0 !important; }
        .letter-campaign-imgs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin: 18px 0 14px;
          border-radius: 8px;
          overflow: hidden;
        }
        .letter-campaign-imgs img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          display: block;
          border-radius: 6px;
        }
        .letter-campaign-card a {
          display: inline-block;
          margin-top: 14px;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .letter-campaign-card--blue a { color: #2a7ab5; }
        .letter-campaign-card--purple a { color: #6b47b8; }
        .letter-campaign-goal {
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          background: #1a1a1a;
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 14px;
        }
        .letter-campaign-goal--blue { background: #2a7ab5; }
        .letter-campaign-goal--purple { background: #6b47b8; }
        .letter-campaign-goal--dark { background: #2e7d4f; }

        /* ── Movement section ── */
        .letter-movement {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 36px 28px;
          margin: 44px 0 36px;
          color: #fff;
        }
        .letter-movement h3 {
          font-family: 'Montserrat', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #f7f3ea;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        .letter-movement p {
          font-size: 15px;
          color: rgba(255,255,255,0.75);
          line-height: 1.72;
          margin-bottom: 16px;
        }
        .letter-movement p:last-child { margin-bottom: 0; }
        .letter-movement strong { color: #fff; font-weight: 600; }
        .letter-movement a {
          color: #f7f3ea;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ── STOL aside ── */
        .letter-aside {
          background: #f0ede8;
          border: 1px solid #e0ddd8;
          border-radius: 10px;
          padding: 24px;
          margin: 36px 0;
        }
        .letter-aside-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #aaa;
          margin-bottom: 10px;
        }
        .letter-aside h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .letter-aside p {
          font-size: 15px !important;
          color: #5a5a5a !important;
          margin-bottom: 12px !important;
          line-height: 1.65 !important;
        }
        .letter-aside a {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .letter-aside--dark {
          background: #1a1a1a;
          border-color: #1a1a1a;
        }
        .letter-aside--dark .letter-aside-label { color: rgba(247,243,234,0.35); }
        .letter-aside--dark h4 { color: #f7f3ea; }
        .letter-aside--dark p { color: rgba(255,255,255,0.65) !important; }
        .letter-aside--dark strong { color: #fff; }

        /* ── Sign-off ── */
        .letter-signoff {
          margin: 40px 0 16px;
        }
        .letter-signoff p { margin-bottom: 6px !important; }
        .letter-signoff .sig-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #1a1a1a;
          margin-top: 16px !important;
          margin-bottom: 4px !important;
        }
        .letter-signoff .sig-title {
          font-size: 14px !important;
          color: #999 !important;
          margin-bottom: 8px !important;
        }
        .letter-email-btn {
          font-size: 14px;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
          padding: 0;
          transition: color 0.15s;
        }
        .letter-email-btn:hover { color: #555; }

        /* ── Survey CTA block ── */
        .letter-survey-cta {
          background: #fff;
          border: 2px solid #1a1a1a;
          border-radius: 12px;
          padding: 36px 28px;
          margin: 44px 0;
          text-align: center;
        }
        .letter-survey-cta h3 {
          font-family: 'Montserrat', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .letter-survey-cta p {
          font-size: 15px;
          color: #666;
          margin-bottom: 26px;
          line-height: 1.65;
        }
        .letter-cta-btn {
          display: inline-block;
          background: #1a1a1a;
          color: #f7f3ea;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 15px;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .letter-cta-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .letter-cta-secondary {
          display: block;
          margin-top: 16px;
          font-size: 13px;
          color: #bbb;
        }
        .letter-cta-secondary a {
          color: #999;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ── Page footer ── */
        .letter-footer {
          max-width: 660px;
          margin: 0 auto;
          padding: 0 24px 48px;
          text-align: center;
          font-size: 13px;
          color: #bbb;
          line-height: 1.8;
        }
        .letter-footer a { color: #999; text-decoration: underline; text-underline-offset: 3px; }

        /* ── Fixed survey button ── */
        .update-survey-fab {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 9000;
          background: #1a1a1a;
          color: #f7f3ea;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 13px;
          padding: 12px 18px;
          border-radius: 50px;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          transition: opacity 0.15s, transform 0.15s;
          white-space: nowrap;
          animation: fab-slide-in 0.4s ease;
        }
        .update-survey-fab:hover { opacity: 0.88; transform: translateY(-2px); }
        @keyframes fab-slide-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 500px) {
          .update-survey-fab { font-size: 12px; padding: 10px 14px; bottom: 16px; left: 16px; }
        }

        /* ── Mobile ── */
        @media (max-width: 500px) {
          .letter-stats { flex-direction: column; }
          .letter-stat {
            border-right: none;
            border-bottom: 1px solid #e8e5e0;
            max-width: 100%;
          }
          .letter-stat:last-child { border-bottom: none; }
          .letter-body { padding: 36px 20px 16px; }
          .letter-needs { padding: 24px 20px; }
          .letter-survey-cta { padding: 28px 20px; }
        }
      `}</style>

      <div className="letter-wrap">

        {/* Top bar */}
        <div className="letter-topbar">
          <div className="letter-logo">Fly<span>IRL</span></div>
          <div className="letter-topbar-label">Founder Update</div>
        </div>

        {/* Hero */}
        <div className="letter-hero">
          <div className="letter-eyebrow">Phase 1 Complete · April 2026</div>
          <h1>The results are in.<br /><em>And they&rsquo;re good.</em></h1>
          <div className="letter-hero-meta">
            From Aaron, Founder
            <span>·</span>
            2 min read
          </div>
        </div>

        {/* Stats strip */}
        <div className="letter-stats">
          <div className="letter-stat">
            <div className="letter-stat-val">1,000+</div>
            <div className="letter-stat-label">Signups<br />Phase 1</div>
          </div>
          <div className="letter-stat">
            <div className="letter-stat-val">&lt;$2</div>
            <div className="letter-stat-label">Cost per<br />lead</div>
          </div>
          <div className="letter-stat">
            <div className="letter-stat-val">&lt;1 mo</div>
            <div className="letter-stat-label">To hit<br />target</div>
          </div>
        </div>

        {/* Body */}
        <div className="letter-body">
          <div className="letter-salutation">Hi — Aaron here, founder of Fly-IRL.</div>

          <p>
            I want to personally thank you{" "}
            <em>(…in a mass form email…? ;)</em>{" "}
            for signing up. You&rsquo;re part of why Phase 1 of the pre-launch campaign
            worked as well as it did.
          </p>

          <p>
            From a pure marketing metrics standpoint:{" "}
            <strong>it was a ringing success.</strong> Over 1,000 signups in under
            a month, at under $2 per lead. That&rsquo;s about as efficient as digital
            marketing gets.
          </p>

          <div className="letter-callout">
            <p>
              &ldquo;It gave me something worth (almost ;) more than gold right now: some form of market validation.&rdquo;
            </p>
          </div>

          <p>
            I couldn&rsquo;t talk to VCs without it. Now I have a foot in the door — the
            bare minimum needed to start building relationships, showing I can hit
            milestones, and eventually unlock real startup funding. I was even able to
            convert that validation into a small investment — enough to cut back on one
            of my part-time jobs and put more focus into this.
          </p>

          <div className="letter-divider">
            <hr /><div className="letter-divider-dot" /><hr />
          </div>

          <p>
            <strong>Here&rsquo;s the honest picture though.</strong> This is not a conventional
            Kickstarter. The product — flights at a real SkyPark — won&rsquo;t be available
            for 5–10 years. That&rsquo;s roughly the same timeline as when eVTOL
            companies like Archer and Joby expect to get FAA approval for
            commercially un-piloted operations.
          </p>

          <p>
            Conventional wisdom says you can&rsquo;t pre-sell $100 flight passes when the
            planes won&rsquo;t fly for a decade. So the real question isn&rsquo;t{" "}
            <em>can we raise money.</em> It&rsquo;s:{" "}
            <strong>what would people actually pay for?</strong>
          </p>

          <p>
            That&rsquo;s where you come in. I&rsquo;ve put together a set of proposed reward tiers —
            some accessible, some a Hail Mary — and I need to know which ones resonate
            before I commit to the full campaign. If you suggest a tier that makes it
            in, you get it free. Or at a serious discount.
          </p>

          <div className="letter-divider">
            <hr /><div className="letter-divider-dot" /><hr />
          </div>

          <div className="letter-needs">
            <h3>What I need to pull the trigger on the full campaign</h3>

            <div className="letter-need-item">
              <div className="letter-need-num">1</div>
              <div className="letter-need-text">
                <strong>Survey responses</strong>
                Which tiers would you actually pay for? What&rsquo;s your realistic price
                ceiling for a long-horizon investment like this? Your answers shape
                the entire campaign.
              </div>
            </div>

            <div className="letter-need-item">
              <div className="letter-need-num">2</div>
              <div className="letter-need-text">
                <strong>Day-1 backers</strong>
                The first 24 hours determine a Kickstarter&rsquo;s algorithmic rank — and
                whether strangers ever discover it. Knowing you&rsquo;ll back on launch day
                is as valuable as the pledge itself.
              </div>
            </div>

            <div className="letter-need-item">
              <div className="letter-need-num">3</div>
              <div className="letter-need-text">
                <strong>Referrals</strong>
                Send it to anyone who&rsquo;s ever said &ldquo;I&rsquo;d love to fly a plane someday.&rdquo;
                In particular: women. Only 2% of certificated pilots are female —
                but anecdotally, nearly every woman I&rsquo;ve talked to about this idea
                lights up immediately. There&rsquo;s a huge market there waiting to be unlocked.
              </div>
            </div>
          </div>

          <p>
            If crowdfunding succeeds, it gives me runway before I have to raise VC money.
            That means more leverage to push for my priorities — accessibility and
            affordability — versus theirs: maximum profitability through exclusivity.
            The longer we can self-finance, the more this stays about getting most
            people in the air, not extracting the most money from them.
          </p>

          <div className="letter-divider">
            <hr /><div className="letter-divider-dot" /><hr />
          </div>

          {/* Campaigns transition */}
          <div className="letter-campaigns-intro">
            <h2>There ARE some Kickstarter-ready options that would get us off the ground with existing products, existing markets, or existing affordable innovation models.</h2>
            <p>
              So I want to ask you — the people who actually have the power to make this happen:
              would any of these be worth backing? Each one is a real deliverable,
              a real market, a real funding goal. The FlyIRL vision is what connects them.
              Pick any one and it moves the whole thing forward.
            </p>
          </div>

          {/* Campaign 1 — Aircraft / RAM */}
          <div className="letter-campaign-card">
            <div className="letter-campaign-tag">Campaign Option 1 · $500K goal</div>
            <div className="letter-campaign-goal letter-campaign-goal--dark">Rural Air Mobility</div>
            <h3>The aircraft that makes it all possible — built for the people who actually need it</h3>
            <p>
              The technology to build this aircraft already exists. Quadcopter-style distributed
              lift for safety redundancy. Autonomous landing as a failsafe. These aren&rsquo;t moonshots
              — they&rsquo;re in production right now. They&rsquo;re just being chased almost exclusively
              by Urban Air Mobility: downtown-to-downtown, high-density, high-ticket.
            </p>
            <p>
              Which is fine. But it leaves an enormous gap. Most of America isn&rsquo;t downtown.
              And as work goes increasingly virtual — and as people continue leaving big cities
              for more rural areas — the gravity is shifting. Non-concentrated populations don&rsquo;t
              need a commuter air taxi. They need a <strong>sky uber</strong>: a single-occupant,
              affordable aircraft that can take off from a field and land in a driveway.
            </p>
            <p>
              There&rsquo;s a real Rural Air Mobility argument here that nobody&rsquo;s making loudly
              enough. There is exactly one purpose-built aircraft designed for this kind of
              experience — it&rsquo;s made in China, and the company doesn&rsquo;t appear to be taking
              it seriously.{" "}
              <em>(Look up the EHang VT30 if you&rsquo;re curious.)</em>{" "}
              So: we build it here. Sub-$1M. Rugged, reliable, American-made. $500K gets
              the design rolling. FlyIRL is a dream — a purpose-built aircraft is a product,
              Kickstarter bread and butter.
            </p>
            <div className="letter-campaign-imgs">
              <img src="/images/ehang-vt30-landing.jpg" alt="EHang VT30 on landing pad" />
              <img src="/images/ehang-vt30.jpg" alt="EHang VT30 top view" />
            </div>
            <Link href="/plane">
              See the full campaign page →
            </Link>
          </div>

          {/* Campaign 2 — STOL Cub */}
          <div className="letter-campaign-card letter-campaign-card--blue">
            <div className="letter-campaign-tag letter-campaign-tag--blue">Campaign Option 2 · Deliverable within a year</div>
            <div className="letter-campaign-goal letter-campaign-goal--blue">Available Now</div>
            <h3>The STOL Cub Experience — proving people want this right now</h3>
            <p>
              This is experiential entertainment that already exists. I know the owner of one
              of the premier STOL training schools in the country. A 1-hour discovery flight
              in a backcountry bush plane — into genuine wilderness near Las Vegas, as low and
              slow and alive as aviation gets — is doable as a Kickstarter tier within a year.
              Starting around $250.
            </p>
            <p>
              The pitch for this one isn&rsquo;t &ldquo;trust us, someday.&rdquo; It&rsquo;s:{" "}
              <strong>here&rsquo;s the full STOL backcountry experience, now.</strong>{" "}
              Extremely fun. Extremely safe. The kind of flight that converts a curious person
              into a lifelong aviation enthusiast in 60 minutes. That&rsquo;s the market signal
              FlyIRL needs — proof that when you make it accessible, people show up.
            </p>
            <p>
              It also gives FlyIRL real manned flight operations on the books. The FAA pays
              attention to that when you&rsquo;re eventually pushing into the autonomy space.
            </p>
            <div className="letter-campaign-imgs">
              <img src="/images/stol-drag.jpg" alt="STOL drag bush plane" />
              <img src="/images/stol-drag-field.jpg" alt="Bush planes on a backcountry field at sunset" />
            </div>
            <Link href="/cub">
              See the full campaign page →
            </Link>
          </div>

          {/* Campaign 3 — X Prize */}
          <div className="letter-campaign-card letter-campaign-card--purple">
            <div className="letter-campaign-tag letter-campaign-tag--purple">Campaign Option 3 · $50K goal</div>
            <div className="letter-campaign-goal letter-campaign-goal--purple">Smallest Ask, Biggest Leverage</div>
            <h3>A university X-Prize — outsource the hardest engineering to people paid to solve it</h3>
            <p>
              Here&rsquo;s the most efficient option on the table: $50,000 to run a Moonshot
              competition for aerospace engineering departments at top universities. Student
              and faculty teams compete to design the aircraft systems and infrastructure
              we&rsquo;d otherwise fund at $500K internally.
            </p>
            <p>
              Yes, we&rsquo;d share the IP. But FlyIRL is a business, not a product. Whatever
              gets the right aircraft designed — and gets the most brilliant aero minds in
              the country thinking about Rural Air Mobility — is a win. The design work
              gets done. The community builds. And the winning team gets something better
              than a grade: they build something real.
            </p>
            <div className="letter-campaign-imgs">
              <img src="/images/gt-capstone.png" alt="Georgia Tech aerospace engineering team winning a capstone design competition" />
              <img src="/images/hackathon-team.jpg" alt="University engineering team at a hackathon" />
            </div>
            <Link href="/xprize">
              See the full campaign page →
            </Link>
          </div>

          <div className="letter-divider">
            <hr /><div className="letter-divider-dot" /><hr />
          </div>

          {/* Movement section */}
          <div className="letter-movement">
            <h3>FlyIRL is a movement — not just a startup</h3>
            <p>
              At the end of the day, FlyIRL needs to become a <em>movement</em>. There
              are plenty of people who want to fly but can&rsquo;t. This is a human dream —
              probably as old as humans. It&rsquo;s more obvious and basic than any business
              argument. It has the potential to truly access &ldquo;people power&rdquo; that gets
              attention, drives markets, and shapes policy.
            </p>
            <p>
              So: spread the word. If you know anyone who&rsquo;s ever said &ldquo;I&rsquo;ve always wanted
              to fly&rdquo; — send them to{" "}
              <a href="https://fly-irl.com" target="_blank" rel="noreferrer">fly-irl.com</a>.
              Email signups are still open on the main site. Every person in that list
              is another vote that this matters.
            </p>
            <p>
              I&rsquo;ve also created a Discord. The more discussion, the more ideas, the more
              questions — the better. Come argue with me about aircraft design, ask anything,
              or just lurk.{" "}
              <a href="https://discord.gg/5vBd8YP8" target="_blank" rel="noreferrer">
                I&rsquo;ll be there for sure →
              </a>
            </p>
          </div>

          <div className="letter-signoff">
            <p>That&rsquo;s it for now.</p>
            <p>
              You signed up because you believe flying should be for everyone.
              So do I. Let&rsquo;s figure out which path gets us there first.
            </p>
            <p className="sig-name">— Aaron</p>
            <p className="sig-title">Founder, FlyIRL / SkyPark</p>
            <button className="letter-email-btn" onClick={copyEmail}>
              {copied ? "✓ Copied!" : "aaron@fly-irl.com"}
            </button>
          </div>

          {/* Survey CTA */}
          <div className="letter-survey-cta">
            <h3>Which path do you want to see?</h3>
            <p>
              2 minutes. Tells me which campaign to launch — and which tiers you&rsquo;d actually pay for.<br />
              Suggest a tier that makes it in and you get it free (or at a serious discount).
            </p>
            <Link href="/survey" className="letter-cta-btn">
              Take the Survey →
            </Link>
            <span className="letter-cta-secondary">
              Or browse{" "}
              <Link href="/kickstarter">reward tiers on the main page</Link>{" "}
              first.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="letter-footer">
          <p>
            You&rsquo;re getting this because you signed up at fly-irl.com.
            <br />
            Questions? <a href="mailto:hello@fly-irl.com">hello@fly-irl.com</a>
            &nbsp;·&nbsp;
            <a href="#">Unsubscribe</a>
          </p>
        </div>

      </div>

      {/* Fixed survey FAB */}
      <Link href="/survey" className="update-survey-fab">
        Help! Another survey! ;)
      </Link>
    </>
  );
}
