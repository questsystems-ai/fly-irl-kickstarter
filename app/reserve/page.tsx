"use client";

import React, { useEffect, useMemo, useState } from "react";
import { trackMetaInitiateCheckout } from "../../lib/metaPixel";
import { trackInitiateCheckout as trackTikTokInitiateCheckout } from "../../lib/tiktokPixel";
import { gtmTrackInitiateCheckout } from "../../lib/gtm";

type UTM = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid: string;
  fbclid: string;
  referrer: string;
};

function getUTM(): UTM {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      gclid: "",
      fbclid: "",
      referrer: "",
    };
  }
  const url = new URL(window.location.href);
  const p = url.searchParams;
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
    gclid: p.get("gclid") || "",
    fbclid: p.get("fbclid") || "",
    referrer: document.referrer || "",
  };
}

export default function ReservePage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string>("");
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ageRange: "",
    gender: "",
    location: "",
    userType: [] as string[],
    userTypeOther: "",
    industryArea: "",
    companyName: "",
    excitedAbout: [] as string[],
    excitedAboutOther: "",
    priceRange: "",
    payMoreFor: [] as string[],
    payMoreForOther: "",
    involvement: [] as string[],
    involvementOther: "",
    comments: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const utm = useMemo(() => {
    if (!mounted) return null;
    return getUTM();
  }, [mounted]);

  async function onReserve() {
    setErr("");
    const email = (localStorage.getItem("flyirl_email") || "").trim().toLowerCase();
    if (!email) {
      setErr("Missing email. Please go back and enter your email first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, utm: utm || getUTM() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not start checkout.");

      // Fire InitiateCheckout events on all pixels
      trackMetaInitiateCheckout();
      trackTikTokInitiateCheckout(email);
      gtmTrackInitiateCheckout();

      window.location.href = data.url;
    } catch (e: any) {
      console.error(e);
      setErr(e?.message || "Could not start checkout.");
    } finally {
      setLoading(false);
    }
  }

  const handleCheckbox = (field: string, value: string) => {
    setFormData((prev) => {
      const arr = prev[field as keyof typeof prev] as string[];
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter((v) => v !== value) };
      }
      return { ...prev, [field]: [...arr, value] };
    });
  };

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email: localStorage.getItem("flyirl_email") || "",
          submitted_at: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.log("Survey submission error:", err);
    }
    
    setSurveySubmitted(true);
  };

  return (
    <>
      <style>{`
        :root{
          --bg:#f4f3f3; --ink:#2f2f2f; --muted:#5a5a5a;
          --dark:#313131; --dark2:#0d0d0d;
          --accent:#f7f3ea; --accentText:#110f0f;
          --border:#e7e7e7; --max:720px;
        }
        *{ box-sizing:border-box; }
        .page{
          margin:0;
          font-family:Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          background:var(--bg);
          color:var(--ink);
          min-height:100vh;
          padding-bottom:60px;
        }
        .wrap{ max-width:var(--max); margin:0 auto; padding:0 20px; }
        h1,h2,h3{ font-family:Montserrat, sans-serif; margin:0 0 10px 0; }
        h1{ font-size:32px; line-height:1.15; }
        h2{ font-size:20px; margin-bottom:16px; }
        p{ margin:0 0 12px 0; color:var(--muted); line-height:1.5; }
        .darkBand{ background:var(--dark); color:#fff; padding:24px 0; }
        .darkBand p{ color:rgba(255,255,255,0.85); margin:0; }
        .badge{
          display:inline-block;
          font-size:11px;
          letter-spacing:0.1em;
          text-transform:uppercase;
          padding:6px 10px;
          border:1px solid rgba(255,255,255,0.2);
          border-radius:999px;
          color:rgba(255,255,255,0.8);
          margin-bottom:12px;
        }
        .card{
          background:#fff;
          border:1px solid var(--border);
          padding:24px;
          margin:20px 0;
          border-radius:8px;
        }
        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
          margin:16px 0;
        }
        .perk{
          border:1px solid var(--border);
          padding:12px;
          background:#fafafa;
          border-radius:6px;
          font-size:14px;
        }
        .perk strong{ display:block; margin-bottom:2px; }
        .perk span{ font-size:12px; color:var(--muted); }
        .small{ font-size:13px; color:#6b6b6b; }
        button{
          border:none;
          background:#e63946;
          color:#fff;
          padding:14px 20px;
          border-radius:6px;
          font-weight:700;
          cursor:pointer;
          width:100%;
          font-size:15px;
          box-shadow: 0 4px 14px rgba(230,57,70,0.35);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        button:hover{ background:#d62839; transform: translateY(-2px); }
        button[disabled]{ opacity:0.6; cursor:not-allowed; }
        button.secondary{
          background:var(--dark);
          color:#fff;
        }
        button.secondary:hover{ background:#444; }
        a.back{ 
          display:block; 
          text-align:center; 
          margin-top:24px; 
          color:var(--muted); 
          font-size:14px;
          text-decoration:none;
        }
        a.back:hover{ color:var(--ink); }
        
        /* Survey Styles */
        .survey-card{
          background:#fff;
          border:1px solid var(--border);
          padding:24px;
          margin:20px 0;
          border-radius:8px;
        }
        .survey-header{
          border-bottom:1px solid var(--border);
          padding-bottom:16px;
          margin-bottom:20px;
        }
        .survey-header h2{ margin-bottom:8px; }
        .survey-header p{ margin:0; font-size:14px; line-height:1.5; }
        .question{
          margin-bottom:20px;
          padding-bottom:20px;
          border-bottom:1px solid #eee;
        }
        .question:last-of-type{ border-bottom:none; margin-bottom:0; padding-bottom:0; }
        .question-label{
          font-weight:500;
          font-size:14px;
          margin-bottom:10px;
          color:var(--ink);
        }
        .options{
          display:flex;
          flex-direction:column;
          gap:2px;
        }
        .option{
          display:flex;
          align-items:center;
          gap:8px;
          padding:4px 0;
          cursor:pointer;
          font-size:14px;
        }
        .option input[type="checkbox"],
        .option input[type="radio"]{
          width:16px;
          height:16px;
          margin:0;
          accent-color:var(--dark);
        }
        select{
          width:100%;
          padding:10px 12px;
          border:1px solid var(--border);
          border-radius:4px;
          font-size:14px;
          background:#fff;
        }
        input[type="text"], textarea{
          width:100%;
          padding:10px 12px;
          border:1px solid var(--border);
          border-radius:4px;
          font-size:14px;
          font-family:inherit;
        }
        textarea{ min-height:80px; resize:vertical; }
        .survey-thanks{
          text-align:center;
          padding:32px 16px;
        }
        .survey-thanks h3{ font-size:20px; margin-bottom:8px; }
        .demographics-row{
          display:flex;
          gap:12px;
          flex-wrap:wrap;
        }
        .demographics-row select,
        .demographics-row input[type="text"]{
          flex:1;
          min-width:140px;
        }
        
        @media (max-width:600px){
          .grid{ grid-template-columns:1fr; }
          .demographics-row{ flex-direction:column; }
          .demographics-row select,
          .demographics-row input[type="text"]{ width:100%; }
        }
      `}</style>

      <div className="page">
        <div className="darkBand">
          <div className="wrap">
            <div className="badge">Step 2 of 2</div>
            <h1>Reserve your place in the SkyPark</h1>
            <p>
              Optional $1 reservation — signals early commitment and unlocks launch-day perks.
            </p>
          </div>
        </div>

        <div className="wrap">
          {/* $1 RESERVATION CARD - AT TOP */}
          <div className="card">
            <h2>What you unlock</h2>
            <div className="grid">
              <div className="perk">
                <strong>Launch-day priority</strong>
                <span>We notify you first.</span>
              </div>
              <div className="perk">
                <strong>Reward tier discounts</strong>
                <span>Exclusive Kickstarter pricing.</span>
              </div>
              <div className="perk">
                <strong>Early demos</strong>
                <span>Simulator prototype access.</span>
              </div>
              <div className="perk">
                <strong>Insider updates</strong>
                <span>Build log and sessions.</span>
              </div>
            </div>

            <button onClick={onReserve} disabled={loading} style={{ marginTop: 8 }}>
              {loading ? "Redirecting to checkout..." : "Reserve for $1"}
            </button>

            {err && <div style={{ marginTop: 10, color: "#c00", fontSize: 13 }}>{err}</div>}

            <p className="small" style={{ marginTop: 12, textAlign: "center" }}>
              This does not purchase a flight. Payment via Stripe.
            </p>
          </div>

          {/* NOT READY CARD */}
          <div className="card" style={{ textAlign: "center" }}>
            <p style={{ margin: "0 0 12px 0" }}>
              <strong>Not ready to reserve?</strong> No problem — you&#39;re still on the list.
            </p>
            <button className="secondary" onClick={() => (window.location.href = "/")}>
              Back to landing page
            </button>
          </div>

          {/* SURVEY CARD */}
          <div id="survey" className="survey-card">
            {!surveySubmitted ? (
              <>
                <div className="survey-header">
                  <h2>One more thing — we&#39;d love your input</h2>
                  <p>
                    You&#39;re one of the first people to hear about FlyIRL. That means your perspective matters more than most. 
                    Help us shape what this becomes — we read every response.
                  </p>
                </div>

                <form onSubmit={handleSurveySubmit}>
                  {/* DEMOGRAPHICS - OPTIONAL */}
                  <div className="question">
                    <div className="question-label">Demographic Info (totally optional but appreciated)</div>
                    <div className="demographics-row">
                      <select
                        value={formData.ageRange}
                        onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                      >
                        <option value="">Age range...</option>
                        <option value="11-17">11-17</option>
                        <option value="18-24">18-24</option>
                        <option value="25-34">25-34</option>
                        <option value="35-44">35-44</option>
                        <option value="45-54">45-54</option>
                        <option value="55-64">55-64</option>
                        <option value="65+">65+</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Gender (optional)"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Location (optional)"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* ABOUT YOU */}
                  <div className="question">
                    <div className="question-label">What best describes you?</div>
                    <div className="options">
                      {[
                        "Pilot (certificated)",
                        "Student pilot",
                        "Flight sim enthusiast",
                        "Gamer",
                        "Extreme sports fan",
                        "Aviation industry professional",
                        "Content creator / Influencer",
                        "Engineer / Technical background",
                        "Just curious about flight",
                      ].map((opt) => (
                        <label key={opt} className="option">
                          <input
                            type="checkbox"
                            checked={formData.userType.includes(opt)}
                            onChange={() => handleCheckbox("userType", opt)}
                          />
                          {opt}
                        </label>
                      ))}
                      <label className="option">
                        <input
                          type="checkbox"
                          checked={formData.userType.includes("Other")}
                          onChange={() => handleCheckbox("userType", "Other")}
                        />
                        Other
                      </label>
                      {formData.userType.includes("Other") && (
                        <input
                          type="text"
                          placeholder="Please specify..."
                          value={formData.userTypeOther}
                          onChange={(e) => setFormData({ ...formData, userTypeOther: e.target.value })}
                          style={{ marginTop: 4 }}
                        />
                      )}
                    </div>
                  </div>

                  {formData.userType.includes("Aviation industry professional") && (
                    <>
                      <div className="question">
                        <div className="question-label">Which area of aviation?</div>
                        <select
                          value={formData.industryArea}
                          onChange={(e) => setFormData({ ...formData, industryArea: e.target.value })}
                        >
                          <option value="">Select...</option>
                          <option value="Flight school / Training">Flight school / Training</option>
                          <option value="Aircraft manufacturer">Aircraft manufacturer</option>
                          <option value="Avionics / Systems">Avionics / Systems</option>
                          <option value="Airport / FBO">Airport / FBO</option>
                          <option value="Regulatory / Government">Regulatory / Government</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="question">
                        <div className="question-label">Company name (optional)</div>
                        <input
                          type="text"
                          placeholder="Your company"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {/* THE EXPERIENCE */}
                  <div className="question">
                    <div className="question-label">What excites you most about FlyIRL?</div>
                    <div className="options">
                      {[
                        "Flying without needing a license",
                        "Safe way to experience aerobatics",
                        "Dogfight / competitive game modes",
                        "Racing through digital gates",
                        "Realistic flight physics",
                        "Practicing real flight maneuvers",
                        "Sharing the experience with others",
                        "The technology behind it",
                      ].map((opt) => (
                        <label key={opt} className="option">
                          <input
                            type="checkbox"
                            checked={formData.excitedAbout.includes(opt)}
                            onChange={() => handleCheckbox("excitedAbout", opt)}
                          />
                          {opt}
                        </label>
                      ))}
                      <label className="option">
                        <input
                          type="checkbox"
                          checked={formData.excitedAbout.includes("Other")}
                          onChange={() => handleCheckbox("excitedAbout", "Other")}
                        />
                        Other
                      </label>
                      {formData.excitedAbout.includes("Other") && (
                        <input
                          type="text"
                          placeholder="Please specify..."
                          value={formData.excitedAboutOther}
                          onChange={(e) => setFormData({ ...formData, excitedAboutOther: e.target.value })}
                          style={{ marginTop: 4 }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="question">
                    <div className="question-label">For a 15-20 minute guided flight, what would you be willing to pay?</div>
                    <select
                      value={formData.priceRange}
                      onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    >
                      <option value="">Select...</option>
                      <option value="Under $50">Under $50</option>
                      <option value="$50-99">$50 – $99</option>
                      <option value="$100-149">$100 – $149</option>
                      <option value="$150-199">$150 – $199</option>
                      <option value="$200-299">$200 – $299</option>
                      <option value="$300+">$300+</option>
                      <option value="Depends">Depends on the experience</option>
                    </select>
                  </div>

                  <div className="question">
                    <div className="question-label">Would you pay extra for any of these?</div>
                    <div className="options">
                      {[
                        "Longer flight time",
                        "Aerobatic maneuvers",
                        "Multiplayer dogfight mode",
                        "Recorded footage of your flight",
                        "Personalized coaching / debrief",
                        "VIP / private session",
                      ].map((opt) => (
                        <label key={opt} className="option">
                          <input
                            type="checkbox"
                            checked={formData.payMoreFor.includes(opt)}
                            onChange={() => handleCheckbox("payMoreFor", opt)}
                          />
                          {opt}
                        </label>
                      ))}
                      <label className="option">
                        <input
                          type="checkbox"
                          checked={formData.payMoreFor.includes("Other")}
                          onChange={() => handleCheckbox("payMoreFor", "Other")}
                        />
                        Other
                      </label>
                      {formData.payMoreFor.includes("Other") && (
                        <input
                          type="text"
                          placeholder="Please specify..."
                          value={formData.payMoreForOther}
                          onChange={(e) => setFormData({ ...formData, payMoreForOther: e.target.value })}
                          style={{ marginTop: 4 }}
                        />
                      )}
                    </div>
                  </div>

                  {/* GET INVOLVED */}
                  <div className="question">
                    <div className="question-label">Would you be interested in any of these?</div>
                    <div className="options">
                      {[
                        "Beta testing the simulator",
                        "Design feedback sessions",
                        "Testing arcade-style flight games",
                        "Optimizing flight model physics",
                        "Aircraft or system design input",
                        "Partnership / sponsorship opportunities",
                        "Licensing for your organization",
                        "Promotion / affiliate partnership",
                      ].map((opt) => (
                        <label key={opt} className="option">
                          <input
                            type="checkbox"
                            checked={formData.involvement.includes(opt)}
                            onChange={() => handleCheckbox("involvement", opt)}
                          />
                          {opt}
                        </label>
                      ))}
                      <label className="option">
                        <input
                          type="checkbox"
                          checked={formData.involvement.includes("Other")}
                          onChange={() => handleCheckbox("involvement", "Other")}
                        />
                        Other
                      </label>
                      {formData.involvement.includes("Other") && (
                        <input
                          type="text"
                          placeholder="Please specify..."
                          value={formData.involvementOther}
                          onChange={(e) => setFormData({ ...formData, involvementOther: e.target.value })}
                          style={{ marginTop: 4 }}
                        />
                      )}
                    </div>
                  </div>

                  {/* COMMENTS */}
                  <div className="question">
                    <div className="question-label">Anything else you&#39;d like us to know? (optional)</div>
                    <textarea
                      placeholder="Comments, ideas, questions..."
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="secondary">
                    Submit Survey
                  </button>
                </form>
              </>
            ) : (
              <div className="survey-thanks">
                <h3>Thanks for your input!</h3>
                <p>Your answers help us build something worth flying.</p>
              </div>
            )}
          </div>

          <a href="/" className="back">← Back to FlyIRL</a>
        </div>
      </div>
    </>
  );
}
