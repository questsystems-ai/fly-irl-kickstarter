"use client";

import { useEffect } from "react";
import { trackMetaReservationComplete } from "../../lib/metaPixel";
import { trackReservationComplete as trackTikTokReservationComplete } from "../../lib/tiktokPixel";
import { gtmTrackPurchase } from "../../lib/gtm";

export default function Success() {
  useEffect(() => {
    // Fire purchase/reservation conversion events on all pixels + GTM
    trackMetaReservationComplete();
    trackTikTokReservationComplete();
    gtmTrackPurchase();
  }, []);

  return (
    <>
      <style>{`
        :root {
          --bg: #f4f3f3;
          --ink: #2f2f2f;
          --muted: #5a5a5a;
          --dark: #313131;
          --accent: #f7f3ea;
          --border: #e7e7e7;
        }
        * { box-sizing: border-box; }
        .page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
        .card {
          background: #fff;
          border: 1px solid var(--border);
          padding: 48px;
          border-radius: 12px;
          text-align: center;
          max-width: 500px;
        }
        .checkmark {
          width: 80px;
          height: 80px;
          background: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 40px;
        }
        h1 {
          font-family: Montserrat, sans-serif;
          font-size: 28px;
          margin: 0 0 12px 0;
          color: var(--ink);
        }
        p {
          color: var(--muted);
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 24px 0;
        }
        .highlight {
          background: var(--accent);
          padding: 16px;
          border-radius: 8px;
          margin: 24px 0;
        }
        .highlight p {
          margin: 0;
          font-size: 14px;
        }
        a {
          color: var(--dark);
          text-decoration: none;
          font-weight: 600;
        }
        a:hover { text-decoration: underline; }
      `}</style>

      <div className="page">
        <div className="card">
          <div className="checkmark">🎉</div>
          <h1>Reservation Confirmed!</h1>
          <p>
            You&rsquo;re officially in the front of the line. We&rsquo;ll notify you first when the Kickstarter launches.
          </p>
          
          <div className="highlight">
            <p>
              <strong>What&rsquo;s next?</strong><br />
              Watch your inbox for insider updates, early demo access, and your exclusive reward tier discount code.
            </p>
          </div>

          <p style={{ fontSize: 15, color: "var(--ink)" }}>
            <strong>Got 60 seconds?</strong> Help us shape the experience — your answers directly influence what we build.
          </p>
          <a
            href="/reserve#survey"
            style={{
              display: "inline-block",
              background: "#e63946",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              marginBottom: 24,
              boxShadow: "0 4px 14px rgba(230,57,70,0.35)",
              transition: "transform 0.15s ease",
            }}
          >
            Take the Quick Survey →
          </a>

          <p>
            <a href="/">← Back to FlyIRL</a>
          </p>
        </div>
      </div>
    </>
  );
}
