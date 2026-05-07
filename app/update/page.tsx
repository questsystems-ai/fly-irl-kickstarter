"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function UpdateLetterPage() {
  const [copied, setCopied] = useState(false);
  // Which update is currently in view — drives the smart FAB
  const [activeUpdate, setActiveUpdate] = useState<1 | 2>(1);

  const update1Ref = useRef<HTMLDivElement>(null);
  const update2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === update1Ref.current) setActiveUpdate(1);
            if (entry.target === update2Ref.current) setActiveUpdate(2);
          }
        });
      },
      { threshold: 0.25 }
    );
    if (update1Ref.current) observer.observe(update1Ref.current);
    if (update2Ref.current) observer.observe(update2Ref.current);
    return () => observer.disconnect();
  }, []);

  function copyEmail() {
    navigator.clipboard.writeText("aaron@fly-irl.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <style>{`
        .update-page {
          background: #f2f0ec;
          min-height: 100vh;
          padding-top: 76px;
          font-family: Georgia, serif;
        }

        /* ── Sticky update nav ── */
        .update-nav {
          position: sticky;
          top: 76px;
          z-index: 40;
          background: rgba(242,240,236,0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #e0ddd8;
          padding: 14px 16px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .update-nav-btn {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 20px;
          border-radius: 50px;
          border: 2px solid #1a1a1a;
          background: transparent;
          color: #1a1a1a;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .update-nav-btn:hover,
        .update-nav-btn--active {
          background: #1a1a1a;
          color: #f7f3ea;
        }

        /* ── Update section wrapper ── */
        .update-section {
          padding: 32px 16px 48px;
          scroll-margin-top: 140px;
        }
        .update-card {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }

        /* ── Divider between updates ── */
        .update-separator {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 16px;
        }
        .update-separator hr {
          flex: 1;
          border: none;
          border-top: 1px solid #d0cdc8;
        }
        .update-separator-label {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #b0ada8;
          white-space: nowrap;
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
        .u-hero h1 span { color: #f7f3ea; opacity: 0.72; }
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
        .u-body { padding: 44px 36px 8px; }
        .u-salutation {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 22px;
        }
        .u-body p, .u-body-intro p {
          font-family: Georgia, serif;
          font-size: 16px;
          line-height: 1.78;
          color: #2f2f2f;
          margin: 0 0 20px;
        }
        .u-body p strong, .u-body-intro p strong { color: #1a1a1a; font-weight: 600; }

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
        .u-tiers { padding: 0 36px 8px; }
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
        .u-tier--featured { border: 2px solid #1a1a1a; }
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
        .u-tier-header { margin-bottom: 6px; }
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
        .u-now-then { padding: 28px 36px 4px; text-align: center; }
        .u-now-then p {
          font-family: Georgia, serif;
          font-size: 28px;
          font-style: italic;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.2;
        }

        /* ── Dark cards ── */
        .u-section { padding: 16px 36px; }
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
        .u-dark-card p {
          font-family: Georgia, serif;
          font-size: 14px;
          color: rgba(255,255,255,0.72);
          line-height: 1.72;
          margin: 0 0 14px;
        }
        .u-dark-card p:last-child { margin-bottom: 0; }
        .u-dark-card a { color: #f7f3ea; font-weight: 600; }

        /* What I need — item 1 */
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
        .u-need-item { display: flex; gap: 14px; margin-bottom: 18px; }
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

        /* ── Survey / Vote CTA ── */
        .u-survey-cta { padding: 24px 36px 16px; }
        .u-survey-inner {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          border-radius: 14px;
          text-align: center;
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
        .u-signoff { padding: 8px 36px 32px; }
        .u-signoff p {
          font-family: Georgia, serif;
          font-size: 16px;
          line-height: 1.78;
          color: #2f2f2f;
          margin: 0 0 6px;
        }
        .u-signoff a { color: #1a1a1a; font-weight: 600; text-decoration: underline; }
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

        /* ── Campaign cards (Update 2) ── */
        .u-body-intro { padding: 40px 36px 8px; }
        .letter-campaigns-intro {
          margin: 0 36px 28px;
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
          margin: 0 36px 28px;
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

        /* ── Smart FAB ── */
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
          transition: opacity 0.2s;
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
          .u-body, .u-body-intro, .u-tiers, .u-section, .u-survey-cta, .u-signoff, .u-footer { padding-left: 20px; padding-right: 20px; }
          .u-campaign-card { margin-left: 20px; margin-right: 20px; }
          .u-stats { flex-direction: column; }
          .u-stat { border-right: none; border-bottom: 1px solid #e8e5e0; }
          .u-stat:last-child { border-bottom: none; }
        }
      `}</style>

      <Nav />

      {/* Sticky update nav */}
      <div className="update-nav">
        <button
          className={`update-nav-btn${activeUpdate === 1 ? " update-nav-btn--active" : ""}`}
          onClick={() => scrollTo("update-1")}
        >
          Update 1 — Reward Tiers
        </button>
        <button
          className={`update-nav-btn${activeUpdate === 2 ? " update-nav-btn--active" : ""}`}
          onClick={() => scrollTo("update-2")}
        >
          Update 2 — The Campaigns
        </button>
      </div>

      <div className="update-page">

        {/* ── UPDATE 1 ── */}
        <div id="update-1" className="update-section" ref={update1Ref}>
          <div className="update-card">

            <div className="u-topbar">
              <div className="u-logo">Fly<span>IRL</span></div>
              <div className="u-topbar-label">Founder Update</div>
            </div>

            <div className="u-hero">
              <div className="u-eyebrow">Phase 1 Complete &nbsp;·&nbsp; April 2026</div>
              <h1>The results are in.<br /><span>And they&rsquo;re good.</span></h1>
              <div className="u-hero-meta">From Aaron, Founder &nbsp;·&nbsp; 2 min read</div>
            </div>

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

            <div className="u-now-then">
              <p>Now Then...</p>
            </div>

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

            <div className="u-signoff">
              <p>That&rsquo;s it for now.</p>
              <p>You signed up because you believe flying should be for everyone. So do I. Let&rsquo;s figure out which path gets us there first.</p>
              <p className="u-sig-name">— Aaron</p>
              <p className="u-sig-title">Founder, FlyIRL / SkyPark</p>
              <button className="u-email-btn" onClick={copyEmail}>
                {copied ? "✓ Copied!" : "aaron@fly-irl.com"}
              </button>
            </div>

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

        {/* Separator */}
        <div className="update-separator">
          <hr />
          <span className="update-separator-label">Update 2</span>
          <hr />
        </div>

        {/* ── UPDATE 2 ── */}
        <div id="update-2" className="update-section" ref={update2Ref}>
          <div className="update-card">

            <div className="u-topbar">
              <div className="u-logo">Fly<span>IRL</span></div>
              <div className="u-topbar-label">Founder Update &nbsp;·&nbsp; Vol. 2</div>
            </div>

            <div className="u-hero">
              <div className="u-eyebrow">Three Paths &nbsp;·&nbsp; One Vote</div>
              <h1>There ARE Kickstarter-ready options.<br /><span>Which one do you want to see?</span></h1>
              <div className="u-hero-meta">From Aaron, Founder &nbsp;·&nbsp; 3 min read</div>
            </div>

            <div className="u-body-intro">
              <p>
                Thanks to everyone who filled out the Update 1 survey! It&rsquo;s valuable data and we&rsquo;re using it to strategize next steps.
              </p>
              <p>
                In the meantime, I wanted to hit you with this thought. If you are someone who likes the idea but aren&rsquo;t willing to pre-pay for an &ldquo;experiential entertainment&rdquo; product that won&rsquo;t get delivered for 5&ndash;10 years, there ARE some interesting alternative Kickstarter options. If they succeed, they would support our goals to deploy the flagship product ASAP and within our affordability targets just as effectively as a FlyIRL-the-business focused campaign.
              </p>
              <p>
                Please check them out and let us know what you think!
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
              <Link href="/plane">See the full campaign page →</Link>
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
              <Link href="/cub">See the full campaign page →</Link>
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
              <Link href="/xprize">See the full campaign page →</Link>
            </div>

            {/* Vote CTA */}
            <div className="u-survey-cta">
              <div className="u-survey-inner">
                <p className="u-survey-eyebrow">2 minutes &nbsp;·&nbsp; This decides what gets launched</p>
                <p className="u-survey-title">Which campaign do you want to see?</p>
                <p className="u-survey-arrows">&#9660; &#9660; &#9660;</p>
                <Link href="/survey/campaigns" className="u-survey-btn">
                  &#9654;&nbsp;&nbsp;Cast My Vote&nbsp;&nbsp;&#9654;
                </Link>
                <p className="u-survey-fine">Suggest a tier that makes it in &mdash; you get it free.</p>
              </div>
            </div>

            <div className="u-signoff">
              <p>That&rsquo;s the menu. Your vote is what gets one of these off the ground.</p>
              <p>One more thing: come argue with me on Discord. <a href="https://discord.gg/tFFhRf3CJ" target="_blank" rel="noreferrer">Join the discussion &rarr;</a></p>
              <p className="u-sig-name">— Aaron</p>
              <p className="u-sig-title">Founder, FlyIRL / SkyPark</p>
              <a href="mailto:aaron@fly-irl.com" style={{fontFamily: "'Helvetica Neue',Arial,sans-serif", fontSize: "13px", color: "#666", textDecoration: "underline"}}>aaron@fly-irl.com</a>
            </div>

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

      </div>

    </>
  );
}
