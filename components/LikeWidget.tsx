"use client";

import React, { useState } from "react";

type Props = {
  campaign: string; // e.g. "plane" | "cub" | "xprize"
  accent?: string;  // hex color for the button
};

type VoteStatus = "idle" | "selected" | "saving" | "done";

export default function LikeWidget({ campaign, accent = "#1a1a1a" }: Props) {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const [status, setStatus] = useState<VoteStatus>("idle");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  async function onSubmit() {
    if (!vote) return;
    setStatus("saving");
    try {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaign, vote }),
      });
    } catch {
      // fire-and-forget — don't surface errors to user
    }
    setStatus("done");
    setTimeout(() => setDismissed(true), 2200);
  }

  return (
    <>
      <style>{`
        .lw-wrap {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9000;
          background: #fff;
          border: 2px solid ${accent};
          border-radius: 14px;
          padding: 16px 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          min-width: 190px;
          max-width: 220px;
          font-family: 'Poppins', system-ui, sans-serif;
          animation: lw-slide-in 0.3s ease;
        }
        @keyframes lw-slide-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lw-dismiss {
          position: absolute;
          top: 8px;
          right: 10px;
          background: none;
          border: none;
          font-size: 15px;
          color: #bbb;
          cursor: pointer;
          line-height: 1;
          padding: 0;
          transition: color 0.15s;
        }
        .lw-dismiss:hover { color: #888; }
        .lw-question {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          padding-right: 16px;
          line-height: 1.4;
        }
        .lw-options {
          display: flex;
          gap: 10px;
          margin-bottom: 0;
        }
        .lw-option {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 10px;
          border: 1.5px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          color: #555;
          background: #fafafa;
          transition: all 0.15s ease;
          user-select: none;
        }
        .lw-option:hover { border-color: ${accent}; color: #1a1a1a; background: #fff; }
        .lw-option.selected {
          border-color: ${accent};
          background: ${accent}18;
          color: #1a1a1a;
        }
        .lw-option input[type="radio"] { display: none; }
        .lw-submit {
          width: 100%;
          margin-top: 10px;
          padding: 9px;
          background: ${accent};
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Montserrat', system-ui, sans-serif;
          transition: opacity 0.15s, transform 0.15s;
        }
        .lw-submit:hover { opacity: 0.88; transform: translateY(-1px); }
        .lw-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
        .lw-done {
          font-size: 13px;
          font-weight: 600;
          color: ${accent};
          text-align: center;
          padding: 4px 0 2px;
        }
        @media (max-width: 480px) {
          .lw-wrap { right: 12px; bottom: 12px; left: 12px; max-width: none; min-width: 0; }
        }
      `}</style>

      <div className="lw-wrap" role="region" aria-label="Quick vote">
        <button
          className="lw-dismiss"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
        >×</button>

        {status === "done" ? (
          <div className="lw-done">Got it — thanks!</div>
        ) : (
          <>
            <div className="lw-question">Like this idea?</div>
            <div className="lw-options">
              <label className={`lw-option${vote === "yes" ? " selected" : ""}`}>
                <input type="radio" name={`vote-${campaign}`} value="yes"
                  checked={vote === "yes"}
                  onChange={() => { setVote("yes"); setStatus("selected"); }}
                />
                Yes
              </label>
              <label className={`lw-option${vote === "no" ? " selected" : ""}`}>
                <input type="radio" name={`vote-${campaign}`} value="no"
                  checked={vote === "no"}
                  onChange={() => { setVote("no"); setStatus("selected"); }}
                />
                No
              </label>
            </div>
            {(status === "selected" || status === "saving") && (
              <button
                className="lw-submit"
                onClick={onSubmit}
                disabled={status === "saving"}
              >
                {status === "saving" ? "Submitting..." : "Submit"}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
