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

          <div className="letter-aside">
            <div className="letter-aside-label">Bonus idea — deliverable within a year</div>
            <h4>The STOL Cub Experience</h4>
            <p>
              True backcountry bush plane flying — the safest, most adventurous aircraft
              platform there is. I know the owner of one of the premier STOL training
              schools in the US. A 1-hour thrill ride into gorgeous wilderness near Las Vegas,
              as a Kickstarter tier, is absolutely doable within a year. Starting around $250.
            </p>
            <p>
              It would also give Fly-IRL real manned flight operations on the books —
              something the FAA smiles on for anyone pushing into the autonomy space.
            </p>
            <a href="https://www.thecubexperience.com/kickstarter" target="_blank" rel="noreferrer">
              See The Cub Experience →
            </a>
          </div>

          <div className="letter-aside letter-aside--dark">
            <div className="letter-aside-label">Wildcard #1</div>
            <h4>There&rsquo;s no purpose-built plane for this. Yet.</h4>
            <p>
              There is exactly one aircraft in the world designed for this kind of
              activity. It&rsquo;s made in China, and the company doesn&rsquo;t appear to be
              pursuing it seriously.{" "}
              <em>(Look up the EHang VT30 if you&rsquo;re curious.)</em>
            </p>
            <p>
              Which means: we&rsquo;re going to have to build it here. And honestly —
              that&rsquo;s not a problem, it&rsquo;s an opportunity. This is not an inherently
              expensive aircraft. Sub-$1M, designed and built American: rugged,
              reliable, high-performance, with overengineered safety. I have the
              aerospace connections to make it happen. A similar $500K Kickstarter
              goal could get that rolling.
            </p>
            <p>
              The distinction worth making: FlyIRL is a <strong>business</strong>.
              A new plane is <strong>bread and butter</strong>. Designing and building
              aircraft to open up general aviation was born in this country — we know
              how to do that. And of course, other nations with proven aero industries
              and general aviation cultures are part of this story too. The point is:
              one of these is a vision, the other is an engineering project.
            </p>
          </div>

          <div className="letter-aside">
            <div className="letter-aside-label">Wildcard #2 — smallest ask, biggest leverage</div>
            <h4>An X-Prize for university aero teams</h4>
            <p>
              Here&rsquo;s an interesting crowdfunding option with a much smaller target:
              ~$50,000 to fund a Moonshot challenge for aerospace engineering departments.
              Student and professor teams compete to do the design work we&rsquo;d otherwise
              fund internally at $500K.
            </p>
            <p>
              Yes, we&rsquo;d share IP. But again — FlyIRL is a business, not a product.
              Whatever gets it off the ground.
            </p>
          </div>

          <div className="letter-divider">
            <hr /><div className="letter-divider-dot" /><hr />
          </div>

          <div className="letter-signoff">
            <p>That&rsquo;s it for now.</p>
            <p>
              You&rsquo;ve already played a real part in moving this dream forward.
              A million thank-yous.
            </p>
            <p className="sig-name">— Aaron</p>
            <p className="sig-title">Founder, FlyIRL / SkyPark</p>
            <button className="letter-email-btn" onClick={copyEmail}>
              {copied ? "✓ Copied!" : "aaron@fly-irl.com"}
            </button>
          </div>

          {/* Survey CTA */}
          <div className="letter-survey-cta">
            <h3>Take the survey</h3>
            <p>
              2 minutes. Shapes the entire campaign.<br />
              Suggest a tier that makes it in and you get it free.
            </p>
            <Link href="/survey" className="letter-cta-btn">
              Fill Out the Survey →
            </Link>
            <span className="letter-cta-secondary">
              Or browse the{" "}
              <Link href="/kickstarter">full Kickstarter draft</Link>{" "}
              and reward tiers first.
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
    </>
  );
}
