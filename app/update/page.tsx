"use client";

import React, { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

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
        .update-wrap {
          background: #f2f0ec;
          min-height: 100vh;
          padding: 80px 16px 48px;
          font-family: Georgia, serif;
        }

        .update-card {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }

        /* ── Top bar ── */
        .u-topbar {
          background: #1a1a1a;
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .u-logo {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #fff;
          letter-spacing: -0.5px;
        }
        .u-logo span { color: #f7f3ea; }
        .u-topbar-label {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        /* ── Hero ── */
        .u-hero {
          background: #1a1a1a;
          padding: 52px 28px 44px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .u-eyebrow {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(247,243,234,0.45);
          margin-bottom: 18px;
        }
        .u-hero h1 {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: clamp(26px, 5vw, 34px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          margin: 0 0 14px;
          line-height: 1.15;
        }
        .u-hero h1 span {
          color: #f7f3ea;
          opacity: 0.72;
        }
        .u-hero-meta {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.32);
        }

        /* ── Stats strip ── */
        .u-stats {
          display: flex;
          border-bottom: 1px solid #e8e5e0;
        }
        .u-stat {
          flex: 1;
          text-align: center;
          padding: 24px 12px;
          border-right: 1px solid #e8e5e0;
        }
        .u-stat:last-child { border-right: none; }
        .u-stat-val {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1;
          margin-bottom: 5px;
        }
        .u-stat-label {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 10px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          line-height: 1.4;
        }

        /* ── Body text ── */
        .u-body {
          padding: 44px 36px 8px;
        }
        .u-salutation {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 22px;
        }
        .u-body p {
          font-family: Georgia, serif;
          font-size: 16px;
          line-height: 1.78;
          color: #2f2f2f;
          margin: 0 0 20px;
        }
        .u-body p strong { color: #1a1a1a; font-weight: 600; }

        /* Pull quote */
        .u-pullquote {
          border-left: 4px solid #1a1a1a;
          background: #f9f8f6;
          padding: 18px 22px;
          border-radius: 0 8px 8px 0;
          margin: 28px 0;
        }
        .u-pullquote p {
          font-family: Georgia, serif;
          font-size: 17px;
          font-weight: 600;
          color: #1a1a1a;
          font-style: italic;
          margin: 0 !important;
          line-height: 1.55;
        }

        /* Divider */
        .u-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 28px 0;
        }
        .u-divider hr {
          flex: 1;
          border: none;
          border-top: 1px solid #e0ddd8;
          margin: 0;
        }
        .u-divider-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d0cdc8;
          flex-shrink: 0;
        }

        /* ── Reward tiers ── */
        .u-tiers {
          padding: 0 36px 8px;
        }
        .u-tiers-label {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #aaa;
          margin: 0 0 16px;
        }
        .u-tier {
          border: 1px solid #e0ddd8;
          border-radius: 10px;
          background: #fff;
          padding: 18px 20px;
          margin-bottom: 10px;
        }
        .u-tier--featured {
          border: 2px solid #1a1a1a;
        }
        .u-tier-badge {
          display: inline-block;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #fff;
          background: #1a1a1a;
          padding: 3px 8px;
          border-radius: 3px;
          margin-bottom: 10px;
        }
        .u-tier-header {
          margin-bottom: 6px;
        }
        .u-tier-price {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #1a1a1a;
        }
        .u-tier-name {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          margin-left: 10px;
        }
        .u-tier-desc {
          font-family: Georgia, serif;
          font-size: 14px;
          color: #555;
          line-height: 1.65;
          margin: 8px 0 10px;
        }
        .u-tier-perks {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 12px;
          color: #888;
          margin: 0;
        }

        /* ── Now then ── */
        .u-now-then {
          padding: 28px 36px 4px;
          text-align: center;
        }
        .u-now-then p {
          font-family: Georgia, serif;
          font-size: 28px;
          font-style: italic;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.2;
        }

        /* ── Dark cards ── */
        .u-section {
          padding: 16px 36px;
        }
        .u-dark-card {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 30px 26px;
        }
        .u-dark-card h3 {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: #f7f3ea;
          margin: 0 0 22px;
          line-height: 1.3;
        }

        /* What I need — item 1 (highlighted) */
        .u-need-highlight {
          background: rgba(247,243,234,0.07);
          border-radius: 8px;
          border-left: 3px solid #f7f3ea;
          padding: 14px 16px;
          margin-bottom: 18px;
        }
        .u-need-highlight-title {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: #f7f3ea;
          margin: 0 0 6px;
          letter-spacing: -0.2px;
        }
        .u-need-highlight-title a {
          color: #f7f3ea;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .u-need-highlight p {
          font-family: Georgia, serif;
          font-size: 14px;
          color: rgba(255,255,255,0.72);
          margin: 0;
          line-height: 1.65;
        }
        .u-need-highlight p strong { color: #fff; }

        /* What I need — items 2 & 3 */
        .u-need-item {
          display: flex;
          gap: 14px;
          margin-bottom: 18px;
        }
        .u-need-num {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: rgba(247,243,234,0.35);
          line-height: 1.2;
          flex-shrink: 0;
          width: 20px;
        }
        .u-need-item-title {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 4px;
        }
        .u-need-item-text {
          font-family: Georgia, serif;
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          margin: 0;
          line-height: 1.65;
        }

        /* Discord bonus */
        .u-bonus {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 16px;
          margin-top: 4px;
        }
        .u-bonus-label {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: rgba(247,243,234,0.5);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0 0 8px;
        }
        .u-bonus p {
          font-family: Georgia, serif;
          font-size: 14px;
          color: rgba(255,255,255,0.72);
          margin: 0;
          line-height: 1.65;
        }
        .u-bonus a {
          color: #f7f3ea;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* Movement card */
        .u-dark-card p {
          font-family: Georgia, serif;
          font-size: 14px;
          color: rgba(255,255,255,0.72);
          line-height: 1.72;
          margin: 0 0 14px;
        }
        .u-dark-card p:last-child { margin-bottom: 0; }
        .u-dark-card a {
          color: #f7f3ea;
          font-weight: 600;
        }

        /* ── Survey CTA ── */
        .u-survey-cta {
          padding: 24px 36px 16px;
        }
        .u-survey-inner {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          border-radius: 14px;
          text-align: center;
          overflow: hidden;
          padding: 10px 28px 28px;
        }
        .u-survey-eyebrow {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(247,243,234,0.45);
          margin: 0 0 8px;
        }
        .u-survey-title {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 8px;
          letter-spacing: -0.3px;
        }
        .u-survey-arrows {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 22px;
          color: rgba(247,243,234,0.25);
          margin: 0 0 14px;
          letter-spacing: 6px;
        }
        .u-survey-btn {
          display: inline-block;
          background: #e8380d;
          color: #ffffff;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 800;
          font-size: 18px;
          padding: 18px 48px;
          border-radius: 10px;
          text-decoration: none;
          letter-spacing: 0.3px;
          box-shadow: 0 4px 20px rgba(232,56,13,0.45);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .u-survey-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(232,56,13,0.55);
        }
        .u-survey-fine {
          font-family: Georgia, serif;
          font-size: 13px;
          font-style: italic;
          color: rgba(247,243,234,0.45);
          margin: 16px 0 0;
        }

        /* ── Sign-off ── */
        .u-signoff {
          padding: 8px 36px 32px;
        }
        .u-signoff p {
          font-family: Georgia, serif;
          font-size: 16px;
          line-height: 1.78;
          color: #2f2f2f;
          margin: 0 0 6px;
        }
        .u-sig-name {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0 0 4px;
        }
        .u-sig-title {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          color: #999;
          margin: 0 0 8px;
        }
        .u-email-btn {
          background: none;
          border: none;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          color: #666;
          text-decoration: underline;
          cursor: pointer;
          padding: 0;
        }

        /* ── Footer ── */
        .u-footer {
          background: #f2f0ec;
          padding: 24px 36px;
          text-align: center;
          border-top: 1px solid #e8e5e0;
        }
        .u-footer p {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 12px;
          color: #bbb;
          line-height: 1.8;
          margin: 0;
        }
        .u-footer a { color: #999; text-decoration: underline; }

        /* ── FABs ── */
        .update-survey-fab {
          position: fixed;
          bottom: 28px;
          left: 24px;
          background: #e8380d;
          color: #fff;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 12px 18px;
          border-radius: 50px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(232,56,13,0.45);
          z-index: 50;
          animation: fabPulse 3.5s ease-in-out infinite;
        }
        .update-discord-fab {
          position: fixed;
          bottom: 28px;
          right: 24px;
          background: #5865F2;
          color: #fff;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 12px 18px;
          border-radius: 50px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(88,101,242,0.45);
          z-index: 50;
        }
        @keyframes fabPulse {
          0%, 100% { transform: translateY(0); box-shadow: 0 4px 16px rgba(232,56,13,0.45); }
          50% { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(232,56,13,0.6); }
        }

        /* ── Mobile ── */
        @media (max-width: 500px) {
          .u-body, .u-tiers, .u-section, .u-survey-cta, .u-signoff, .u-footer { padding-left: 20px; padding-right: 20px; }
          .u-stats { flex-direction: column; }
          .u-stat { border-right: none; border-bottom: 1px solid #e8e5e0; }
          .u-stat:last-child { border-bottom: none; }
        }
      `}</style>

      <Nav />

      <div className="update-wrap">
        <div className="update-card">

          {/* Top bar */}
          <div className="u-topbar">
            <div className="u-logo">Fly<span>IRL</span></div>
            <div className="u-topbar-label">Founder Update</div>
          </div>

          {/* Hero */}
          <div className="u-hero">
            <div className="u-eyebrow">Phase 1 Complete &nbsp;·&nbsp; April 2026</div>
            <h1>The results are in.<br /><span>And they&rsquo;re good.</span></h1>
            <div className="u-hero-meta">From Aaron, Founder &nbsp;·&nbsp; 2 min read</div>
          </div>

          {/* Stats strip */}
          <div className="u-stats">
            <div className="u-stat">
              <div className="u-stat-val">1,000+</div>
              <div className="u-stat-label">Signups<br />Phase 1</div>
            </div>
            <div className="u-stat">
              <div className="u-stat-val">&lt;$2</div>
              <div className="u-stat-label">Cost per<br />lead</div>
            </div>
            <div className="u-stat">
              <div className="u-stat-val">&lt;1 mo</div>
              <div className="u-stat-label">To hit<br />target</div>
            </div>
          </div>

          {/* Body */}
          <div className="u-body">
            <p className="u-salutation">Hi — Aaron here, founder of Fly-IRL.</p>

            <p>
              I want to personally thank you <em>(...in a mass form email...? ;)</em> for signing up. You&rsquo;re part of why Phase 1 worked as well as it did.
            </p>

            <p>
              From a pure marketing metrics standpoint: <strong>it was a ringing success.</strong> Over 1,000 signups in under a month, at under $2 per lead. That&rsquo;s about as efficient as digital marketing gets.
            </p>

            <div className="u-pullquote">
              <p>&ldquo;It gave me something worth (almost ;) more than gold right now: some form of market validation.&rdquo;</p>
            </div>

            <p>
              I couldn&rsquo;t talk to VCs without it. Now I have a foot in the door — enough to start building relationships and showing I can hit milestones. I even converted that into a small investment: enough to cut back on one of my part-time jobs and put more focus into this.
            </p>

            <div className="u-divider">
              <hr /><div className="u-divider-dot" /><hr />
            </div>

            <p>
              <strong>Here&rsquo;s the honest picture though.</strong> This is not a conventional Kickstarter. The product — flights at a real SkyPark — won&rsquo;t be available for 5–10 years. Conventional wisdom says you can&rsquo;t pre-sell $100 flight passes when the planes won&rsquo;t fly for a decade. So the real question isn&rsquo;t <em>can we raise money.</em> It&rsquo;s: <strong>what would people actually pay for?</strong>
            </p>

            <p>
              That&rsquo;s where you come in. I&rsquo;ve put together a set of proposed reward tiers and I need to know which ones resonate before I commit to the full campaign. <strong>If you suggest a tier that makes it in, you get it free — or at a serious discount.</strong>
            </p>
          </div>

          {/* Reward tiers */}
          <div className="u-tiers">
            <p className="u-tiers-label">Proposed Reward Tiers</p>

            <div className="u-tier">
              <div className="u-tier-header">
                <span className="u-tier-price">$25</span>
                <span className="u-tier-name">Dreamer</span>
              </div>
              <p className="u-tier-desc">You believe flight should be for everyone. Get your name on the Founders Wall and exclusive updates from inside the build.</p>
              <p className="u-tier-perks">✓ Founders Wall listing &nbsp;&nbsp;✓ Private build updates &nbsp;&nbsp;✓ Digital backer badge</p>
            </div>

            <div className="u-tier">
              <div className="u-tier-header">
                <span className="u-tier-price">$100</span>
                <span className="u-tier-name">Crew Member</span>
              </div>
              <p className="u-tier-desc">Join the design review community. Attend live sessions where we share progress, take feedback, and shape the experience together.</p>
              <p className="u-tier-perks">✓ Everything in Dreamer &nbsp;&nbsp;✓ Monthly design review access &nbsp;&nbsp;✓ Vote on feature priorities &nbsp;&nbsp;✓ Backer-only Discord</p>
            </div>

            <div className="u-tier u-tier--featured">
              <div className="u-tier-badge">Most Popular</div>
              <div className="u-tier-header">
                <span className="u-tier-price">$300</span>
                <span className="u-tier-name">Test Pilot</span>
              </div>
              <p className="u-tier-desc">Be first to fly. Get priority access to every demo, simulation test, and eventually — the real thing.</p>
              <p className="u-tier-perks">✓ Everything in Crew Member &nbsp;&nbsp;✓ Priority demo access &nbsp;&nbsp;✓ Simulation beta testing &nbsp;&nbsp;✓ Launch-day flight reservation</p>
            </div>

            <div className="u-tier">
              <div className="u-tier-header">
                <span className="u-tier-price">$1,000</span>
                <span className="u-tier-name">Founding Pilot</span>
              </div>
              <p className="u-tier-desc">A serious commitment to making this real. Guaranteed flight slot, lifetime priority, and your name on the first aircraft.</p>
              <p className="u-tier-perks">✓ Everything in Test Pilot &nbsp;&nbsp;✓ Guaranteed first-year flight &nbsp;&nbsp;✓ Lifetime priority booking &nbsp;&nbsp;✓ Quarterly founder calls &nbsp;&nbsp;✓ Name on the first aircraft</p>
            </div>

            <div className="u-tier">
              <div className="u-tier-header">
                <span className="u-tier-price">$10,000</span>
                <span className="u-tier-name">Ranch Pioneer</span>
              </div>
              <p className="u-tier-desc">A deposit toward a personal flight system. When ranch installations begin, Ranch Pioneers are first on the wait list — with $10,000 credited toward the purchase price.</p>
              <p className="u-tier-perks">✓ Everything in Founding Pilot &nbsp;&nbsp;✓ $10K credited toward system &nbsp;&nbsp;✓ First on ranch installation wait list &nbsp;&nbsp;✓ Private quarterly briefings</p>
            </div>

            <div className="u-tier u-tier--featured">
              <div className="u-tier-badge">Limited — 5 Available</div>
              <div className="u-tier-header">
                <span className="u-tier-price">$100,000</span>
                <span className="u-tier-name">Ranch Founder</span>
              </div>
              <p className="u-tier-desc">A deposit on one of the first five personal ranch installations. Guaranteed slot in the first production run with $100,000 credited toward the purchase price.</p>
              <p className="u-tier-perks">✓ Everything in Ranch Pioneer &nbsp;&nbsp;✓ $100K credited toward system &nbsp;&nbsp;✓ Guaranteed slot in first 5 &nbsp;&nbsp;✓ Co-design your installation &nbsp;&nbsp;✓ Monthly direct access to founder</p>
            </div>
          </div>

          {/* Now then... */}
          <div className="u-now-then">
            <p>Now Then...</p>
          </div>

          {/* What I need */}
          <div className="u-section">
            <div className="u-dark-card">
              <h3>What I need to pull the trigger on the full campaign</h3>

              <div className="u-need-highlight">
                <p className="u-need-highlight-title">
                  &#9658;&nbsp; <Link href="/survey">Survey responses — this is the big one</Link>
                </p>
                <p>Which tiers would you actually pay for? What&rsquo;s your realistic price ceiling? Your answers shape the entire campaign. <strong>2 minutes, and it actually matters.</strong></p>
              </div>

              <div className="u-need-item">
                <div className="u-need-num">2</div>
                <div>
                  <p className="u-need-item-title">Day-1 backers</p>
                  <p className="u-need-item-text">The first 24 hours determine a Kickstarter&rsquo;s algorithmic rank — and whether strangers ever discover it. Knowing you&rsquo;ll back on launch day is as valuable as the pledge itself.</p>
                </div>
              </div>

              <div className="u-need-item">
                <div className="u-need-num">3</div>
                <div>
                  <p className="u-need-item-title">Referrals</p>
                  <p className="u-need-item-text">Send it to anyone who&rsquo;s ever said &ldquo;I&rsquo;d love to fly a plane someday.&rdquo; In particular: women. Only 2% of certificated pilots are female — but nearly every woman I&rsquo;ve talked to about this lights up immediately. Huge market waiting to be unlocked.</p>
                </div>
              </div>

              <div className="u-bonus">
                <p className="u-bonus-label">Added Bonus</p>
                <p>
                  A robust discussion on Discord! Come argue about aircraft design, ask anything, or just lurk. &nbsp;<a href="https://discord.gg/tFFhRf3CJ" target="_blank" rel="noreferrer">Join the Discord &#8599;</a>
                </p>
              </div>
            </div>
          </div>

          {/* Movement */}
          <div className="u-section" style={{paddingBottom: "8px"}}>
            <div className="u-dark-card">
              <h3>FlyIRL is a movement — not just a startup</h3>
              <p>
                There are plenty of people who want to fly but can&rsquo;t. This is a human dream — probably as old as humans. Spread the word. If you know anyone who&rsquo;s ever said &ldquo;I&rsquo;ve always wanted to fly&rdquo; — send them to <a href="https://fly-irl.com" target="_blank" rel="noreferrer">fly-irl.com</a>. Every person in that list is another vote that this matters.
              </p>
              <p>
                I&rsquo;ve also created a Discord. Come argue with me about aircraft design, ask anything, or just lurk. <a href="https://discord.gg/tFFhRf3CJ" target="_blank" rel="noreferrer">Join the discussion &rarr;</a>
              </p>
            </div>
          </div>

          {/* Survey CTA */}
          <div className="u-survey-cta">
            <div className="u-survey-inner">
              <p className="u-survey-eyebrow">2 minutes &nbsp;·&nbsp; Shapes the entire campaign</p>
              <p className="u-survey-title">Which reward tiers would you actually back?</p>
              <p className="u-survey-arrows">&#9660; &#9660; &#9660;</p>
              <Link href="/survey" className="u-survey-btn">
                &#9654;&nbsp;&nbsp;Take the Survey&nbsp;&nbsp;&#9654;
              </Link>
              <p className="u-survey-fine">Suggest a tier that makes it in &mdash; you get it free.</p>
            </div>
          </div>

          {/* Sign-off */}
          <div className="u-signoff">
            <p>That&rsquo;s it for now.</p>
            <p>You signed up because you believe flying should be for everyone. So do I. Let&rsquo;s figure out which path gets us there first.</p>
            <p className="u-sig-name">— Aaron</p>
            <p className="u-sig-title">Founder, FlyIRL / SkyPark</p>
            <button className="u-email-btn" onClick={copyEmail}>
              {copied ? "✓ Copied!" : "aaron@fly-irl.com"}
            </button>
          </div>

          {/* Footer */}
          <div className="u-footer">
            <p>
              You&rsquo;re getting this because you signed up at fly-irl.com.<br />
              Questions? <a href="mailto:hello@fly-irl.com">hello@fly-irl.com</a>
              &nbsp;·&nbsp;
              <a href="#">Unsubscribe</a>
            </p>
          </div>

        </div>
      </div>

      {/* FABs */}
      <Link href="/survey" className="update-survey-fab">Help! Another survey! ;)</Link>
      <a href="https://discord.gg/tFFhRf3CJ" target="_blank" rel="noreferrer" className="update-discord-fab">
        💬 Join the Discord Discussion!
      </a>
    </>
  );
}
