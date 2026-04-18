# FlyIRL / SkyPark — Kickstarter Survey Draft
*Internal draft — not yet live*

---

## Context
This survey lives at the bottom of `/kickstarter`. Email recipients are sent there and invited to fill it out. It's the key data Aaron needs before deciding whether to launch the full Kickstarter campaign.

Two audiences:
- **VIP** — paid $1 reservation, already emotionally invested
- **General** — signed up free, varying engagement

---

## Survey Questions

### Header
> "This will take 2 minutes. Your answers directly shape the campaign — and if an idea you suggest makes it in, you get that tier for free (or at a serious discount)."

---

### Q1 — Reward tier interest
**Which of these reward tiers sounds interesting to you?**
*(Check all that apply)*

- [ ] **Dreamer — $25** · Name on the Founders Wall, private build updates
- [ ] **Crew Member — $100** · Monthly design review access, vote on features, Discord
- [ ] **Test Pilot — $300** · Priority demo access, simulation beta, launch-day flight reservation
- [ ] **Founding Pilot — $1,000** · Guaranteed first-year flight, lifetime priority, name on the aircraft
- [ ] **Ranch Pioneer — $10,000** · $10K toward a personal ranch system, first on install waitlist
- [ ] **Ranch Founder — $100,000** · Deposit on one of the first 5 personal installations
- [ ] **None of these** *(tell us what would work — see below)*

---

### Q2 — Price point reality check
**What's the most you'd realistically pay for a Kickstarter reward — knowing delivery is 5–10 years out?**
*(Single choice)*

- [ ] Under $50
- [ ] $50–$150
- [ ] $150–$500
- [ ] $500–$2,000
- [ ] $2,000+
- [ ] Nothing — but I'd help in other ways

---

### Q3 — Day-1 pledge
**The first 24 hours of a Kickstarter determine its algorithmic rank. Would you commit to backing on launch day?**
*(Single choice)*

- [ ] Yes, definitely — just tell me when
- [ ] Probably, if the tier feels right
- [ ] Maybe — depends on what else is going on
- [ ] Probably not
- [ ] No

---

### Q4 — Referral
**Would you share the Kickstarter with friends, family, or your network when it goes live?**
*(Single choice)*

- [ ] Yes — I already know people who'd dig this
- [ ] Maybe — if there's an easy way to do it
- [ ] Probably not
- [ ] No

---

### Q5 — STOL Cub experience (optional)
**There's a possible near-term add: a 1-hour backcountry bush plane thrill ride near Las Vegas, deliverable within a year, starting at ~$250. Is that something you'd back?**
*(Single choice)*

- [ ] Yes — that sounds amazing
- [ ] Maybe — I'd want to know more
- [ ] Not for me
- [ ] What's a STOL Cub? *(lol — we'll explain)*

---

### Q6 — Open ideas
**Any tier ideas, reward concepts, or thoughts you'd want Aaron to see?**
*(Textarea — 500 char max)*

> Placeholder: "Wild ideas welcome. If it makes the campaign, you get it free or at cost."

---

### Q7 — Email
**Your email address** *(so we can follow up, and so we can credit you if your idea makes it in)*

> Placeholder: "The email you used to sign up"
> *(Pre-filled from localStorage if they signed up before)*

---

### Submit button
**"Send My Answers →"**

Post-submit message:
> "Got it — thank you. Aaron reads every response personally. You'll hear from him when the campaign is ready to launch."

---

## Notes for implementation

- Q1 uses checkboxes (multiple allowed), stored as `text[]` in Supabase
- Q2–Q5 use radio buttons, stored as `text` columns
- Q6 is a `text` field, limit 500 chars on the client
- Q7 is an email field, pre-populated from `localStorage.getItem("flyirl_email")` if set
- Existing `/api/survey` route already maps to `survey_responses` table — just need to confirm Supabase table schema matches these fields (add `price_point` and `stol_interest` columns)
- Survey is NOT gated — no email required to submit (but prompt them)
- Should work fine on mobile (single column, big tap targets)

---

## VIP-only additions (for the reservation holder audience)

Add after Q4 (referral):

### Q4b — Referral incentive
**We're considering letting people who refer new signups skip the $1 reservation fee and join the waitlist for free — while keeping early reservation holders at the front. Would that bother you?**

- [ ] No problem at all
- [ ] I'd want more detail before saying yes
- [ ] Yes — reservation holders should stay separate

*(This maps to the referral program idea in the VIP email)*
