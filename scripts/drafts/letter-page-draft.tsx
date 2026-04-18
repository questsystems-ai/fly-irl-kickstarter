// DRAFT — not yet wired to any route
// Proposed route: /update  (general list)  or  /update/vip  (reservation holders)
//
// Mailchimp email header line:
//   "📱 Reading on your phone? View the web version →  [link]"
//
// Usage: copy this file to app/update/page.tsx when ready to ship.
// For the VIP version, duplicate and swap in the VIP letter content below.

"use client";

import React, { useState } from "react";
import Link from "next/link";

// ─── Toggle this to switch between letter variants ───────────────────
const IS_VIP = false;
// ─────────────────────────────────────────────────────────────────────

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
        /* ── Letter page — mobile-first reading layout ── */
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
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          white-space: nowrap;
        }

        /* ── Hero strip ── */
        .letter-hero {
          background: #1a1a1a;
          padding: 48px 24px 40px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .letter-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(247,243,234,0.6);
          margin-bottom: 14px;
        }
        .letter-hero h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(26px, 5vw, 40px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          margin-bottom: 12px;
          line-height: 1.15;
        }
        .letter-hero h1 em {
          font-style: normal;
          color: #f7f3ea;
        }
        .letter-hero-meta {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          margin-top: 10px;
        }
        .letter-hero-meta span {
          color: rgba(255,255,255,0.25);
          margin: 0 8px;
        }

        /* ── Stats strip (Phase 1 results) ── */
        .letter-stats {
          background: #fff;
          border-bottom: 1px solid #e8e5e0;
          display: flex;
          justify-content: center;
          gap: 0;
        }
        .letter-stat {
          flex: 1;
          max-width: 200px;
          padding: 24px 16px;
          text-align: center;
          border-right: 1px solid #e8e5e0;
        }
        .letter-stat:last-child { border-right: none; }
        .letter-stat-val {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1;
          margin-bottom: 4px;
        }
        .letter-stat-label {
          font-size: 12px;
          color: #888;
          line-height: 1.4;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ── Body ── */
        .letter-body {
          max-width: 660px;
          margin: 0 auto;
          padding: 48px 24px 16px;
        }
        .letter-salutation {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 24px;
        }
        .letter-body p {
          font-size: 17px;
          line-height: 1.75;
          color: #2f2f2f;
          margin-bottom: 22px;
        }
        .letter-body p.small {
          font-size: 15px;
          color: #5a5a5a;
        }
        .letter-body strong { color: #1a1a1a; }

        /* ── Pull quote / callout ── */
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

        /* ── Section divider ── */
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
          background: #ccc;
          flex-shrink: 0;
        }

        /* ── What I need section ── */
        .letter-needs {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 32px 28px;
          margin: 36px 0;
          color: #fff;
        }
        .letter-needs h3 {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #f7f3ea;
          margin-bottom: 20px;
        }
        .letter-need-item {
          display: flex;
          gap: 16px;
          margin-bottom: 18px;
          align-items: flex-start;
        }
        .letter-need-item:last-child { margin-bottom: 0; }
        .letter-need-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #f7f3ea;
          line-height: 1;
          flex-shrink: 0;
          width: 28px;
        }
        .letter-need-text {
          font-size: 15px;
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
        }
        .letter-need-text strong {
          color: #fff;
          display: block;
          font-size: 16px;
          margin-bottom: 2px;
        }

        /* ── STOL aside ── */
        .letter-aside {
          background: #f0ede8;
          border: 1px solid #e0ddd8;
          border-radius: 10px;
          padding: 24px 24px;
          margin: 36px 0;
        }
        .letter-aside-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #888;
          margin-bottom: 10px;
        }
        .letter-aside h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 17px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .letter-aside p {
          font-size: 15px !important;
          color: #5a5a5a !important;
          margin-bottom: 14px !important;
        }
        .letter-aside a {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ── Sign-off ── */
        .letter-signoff {
          margin: 40px 0 16px;
        }
        .letter-signoff p {
          margin-bottom: 6px !important;
        }
        .letter-signoff .name {
          font-family: 'Montserrat', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #1a1a1a;
          margin-top: 12px !important;
        }
        .letter-signoff .title {
          font-size: 14px !important;
          color: #888 !important;
          margin-bottom: 4px !important;
        }
        .letter-email-link {
          font-size: 14px;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
          padding: 0;
        }

        /* ── Survey CTA block ── */
        .letter-survey-cta {
          background: #fff;
          border: 2px solid #1a1a1a;
          border-radius: 12px;
          padding: 32px 28px;
          margin: 40px 0;
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
          color: #5a5a5a;
          margin-bottom: 24px;
          line-height: 1.6;
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
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .letter-cta-btn:hover { transform: translateY(-2px); opacity: 0.9; }
        .letter-cta-secondary {
          display: block;
          margin-top: 14px;
          font-size: 13px;
          color: #aaa;
        }
        .letter-cta-secondary a {
          color: #888;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ── Footer ── */
        .letter-footer {
          max-width: 660px;
          margin: 0 auto;
          padding: 0 24px 40px;
          text-align: center;
          font-size: 13px;
          color: #aaa;
          line-height: 1.7;
        }
        .letter-footer a { color: #888; text-decoration: underline; text-underline-offset: 3px; }

        /* ── Mobile tweaks ── */
        @media (max-width: 480px) {
          .letter-stats { flex-direction: column; }
          .letter-stat { border-right: none; border-bottom: 1px solid #e8e5e0; max-width: 100%; }
          .letter-stat:last-child { border-bottom: none; }
          .letter-body { padding: 32px 20px 16px; }
          .letter-needs { padding: 24px 20px; }
        }
      `}</style>

      <div className="letter-wrap">

        {/* ── Top bar ── */}
        <div className="letter-topbar">
          <div className="letter-logo">Fly<span>IRL</span></div>
          <div className="letter-topbar-label">Founder Update</div>
        </div>

        {/* ── Hero strip ── */}
        <div className="letter-hero">
          <div className="letter-eyebrow">Phase 1 Complete · April 2026</div>
          <h1>The results are in.<br /><em>And they're good.</em></h1>
          <div className="letter-hero-meta">
            From Aaron, Founder
            <span>·</span>
            2 min read
          </div>
        </div>

        {/* ── Stats strip ── */}
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

        {/* ── Body ── */}
        <div className="letter-body">
          <div className="letter-salutation">Hi — Aaron here, founder of Fly-IRL.</div>

          <p>
            I want to personally thank you{" "}
            <span style={{ color: "#888" }}>(…in a mass form email…? ;)</span>{" "}
            for signing up. You're part of why Phase 1 of the pre-launch campaign
            worked as well as it did.
          </p>

          <p>
            From a pure marketing metrics standpoint:{" "}
            <strong>it was a ringing success.</strong> Over 1,000 signups in under
            a month, at under $2 per lead — that's about as efficient as digital
            marketing gets.
          </p>

          <div className="letter-callout">
            <p>
              "It gave me something worth more than gold right now: market validation."
            </p>
          </div>

          <p>
            I couldn't talk to VCs without it. Now I have a foot in the door — the
            bare minimum needed to start building relationships, showing I can hit
            milestones, and eventually unlock real startup funding.
          </p>

          <div className="letter-divider">
            <hr /><div className="letter-divider-dot" /><hr />
          </div>

          <p>
            <strong>Here's the honest picture though.</strong> This is not a conventional
            Kickstarter. The &ldquo;product&rdquo; — flights at a real SkyPark — won't be
            available for 5–10 years. That's roughly the same timeline as the first
            commercial eVTOL air taxi routes from Archer and Joby.
          </p>

          <p>
            Conventional wisdom says: you can't pre-sell flight passes at $100 when
            the planes won't fly for a decade. So the real question isn't
            <em> can we raise money.</em> It's: <strong>what would people actually pay for?</strong>
          </p>

          <p>
            The number of people who took the time to fill out a survey is what
            converted my initial pitch into a small investment — enough for me to
            cut back on one of my part-time jobs and put more focus into this. So yes,
            surveys matter. A lot.
          </p>

          <div className="letter-divider">
            <hr /><div className="letter-divider-dot" /><hr />
          </div>

          {/* What I need */}
          <div className="letter-needs">
            <h3>What I need to pull the trigger on the full campaign</h3>

            <div className="letter-need-item">
              <div className="letter-need-num">1</div>
              <div className="letter-need-text">
                <strong>Survey data on which reward tiers resonate</strong>
                Which of the proposed tiers would you actually pay for? What's
                your realistic price ceiling? Your answers directly shape the campaign.
                Suggest a tier that makes it in → you get it free.
              </div>
            </div>

            <div className="letter-need-item">
              <div className="letter-need-num">2</div>
              <div className="letter-need-text">
                <strong>Day-1 pledges</strong>
                The first 24 hours determine a Kickstarter's algorithmic rank — and
                therefore whether strangers discover it at all. Knowing you'll back
                it on launch day is huge.
              </div>
            </div>

            <div className="letter-need-item">
              <div className="letter-need-num">3</div>
              <div className="letter-need-text">
                <strong>Referrals</strong>
                Send it to anyone who's ever said "I'd love to fly a plane someday."
                In particular: women. The data shows a massive underserved market —
                only 2% of certificated pilots are women, but anecdotally, most women
                I've talked to love this idea immediately.
              </div>
            </div>
          </div>

          <p>
            If crowdfunding succeeds, it gives me runway before I have to raise VC
            money. That means more leverage to push for my priorities —
            accessibility and affordability — versus theirs: maximum profitability
            through exclusivity. The longer we can self-finance, the more the vision
            stays about most people in the air, not the most money in the bank.
          </p>

          <div className="letter-divider">
            <hr /><div className="letter-divider-dot" /><hr />
          </div>

          {/* STOL Cub aside */}
          <div className="letter-aside">
            <div className="letter-aside-label">Bonus idea — deliverable within a year</div>
            <h4>The STOL Cub Experience</h4>
            <p>
              True backcountry bush plane flying — the safest, most adventurous platform
              there is. I know the owner of one of the premier STOL training schools in
              the US. A 1-hour thrill ride into gorgeous wilderness near Las Vegas, as a
              Kickstarter tier, is absolutely doable within a year. Starting around $250.
            </p>
            <p>
              It would also give me real manned flight operations on record — the FAA
              smiles on that for anyone trying to break into the autonomy space.
            </p>
            <a href="https://www.thecubexperience.com/kickstarter" target="_blank" rel="noreferrer">
              See The Cub Experience →
            </a>
          </div>

          <div className="letter-divider">
            <hr /><div className="letter-divider-dot" /><hr />
          </div>

          {/* Sign-off */}
          <div className="letter-signoff">
            <p>That's it for now.</p>
            <p>
              You've already played a real part in moving this dream forward. A million
              thank-yous.
            </p>
            <p className="name">— Aaron</p>
            <p className="title">Founder, FlyIRL / SkyPark</p>
            <button className="letter-email-link" onClick={copyEmail}>
              {copied ? "Copied!" : "aaron@fly-irl.com"}
            </button>
          </div>

          {/* Survey CTA */}
          <div className="letter-survey-cta">
            <h3>Take the survey</h3>
            <p>
              2 minutes. Shapes the entire campaign. Suggest a tier that makes it in
              and you get it free — or at a serious discount.
            </p>
            <Link href="/kickstarter#survey" className="letter-cta-btn">
              Fill Out the Survey →
            </Link>
            <span className="letter-cta-secondary">
              While you're there, check out the{" "}
              <Link href="/kickstarter">full Kickstarter draft</Link>{" "}
              and the proposed reward tiers.
            </span>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="letter-footer">
          <p>
            You're getting this because you signed up at fly-irl.com.
            <br />
            Questions? Email{" "}
            <a href="mailto:hello@fly-irl.com">hello@fly-irl.com</a>
            &nbsp;·&nbsp;
            <a href="#">Unsubscribe</a>
          </p>
        </div>

      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VIP VARIANT NOTES
// ─────────────────────────────────────────────────────────────────────────────
//
// For /update/vip (reservation holders), swap in:
//
// 1. Hero h1: "You were first. Here's what that means."
// 2. After the salutation, add:
//    "Only 2% of survey respondents entered 'female,' with a significant
//     percentage responding simply as 'dude.' Safe to say my slightly off-color
//     joke about my title isn't going to offend many of you. Moving on..."
// 3. Stats strip: add a 4th stat — "X%" reservation-to-survey conversion
// 4. Add a "Referral perks" section:
//    "Anyone you refer who signs up gets placed on the waitlist without the
//     reservation fee. You stay at the front. There's a delay window before
//     the campaign notification goes to the secondary list. If that's a
//     problem, email me directly."
// 5. Sign-off email: aaron@fly-irl.com (not hello@)
// ─────────────────────────────────────────────────────────────────────────────
