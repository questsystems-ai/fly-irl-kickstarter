# Session Log — fly-irl-kickstarter

---
[09:21] [CLAUDE] ---

## Session Briefing

### Model
Running as Sonnet (cost-aware mode active)

### Project: fly-irl-kickstarter
- **Branch:** `main`
- **Status:** Slightly dirty — `.claude/settings.local.json`, `.gitignore` modified; untracked `.claude/skills/`, `CLAUDE.md`, `scripts/`
- **Last commits:**
  - `e27d1f6` — add landing page (761-line `app/landing/page.tsx` + hero images/video)
  - `1be8915` — fixed favicon
  - `c879098` — full revamp

### Pages
| Route | File |
|-------|------|
| `/kickstarter` | `app/kickstarter/page.tsx` |
| `/landing` | `app/landing/page.tsx` (newest — just added) |
| `/story` | `app/story/page.tsx` |
| `/vision` | `app/vision/page.tsx` |
| `/deck` | `app/deck/` |

### Last Sessions
No handoff reports found. One JSONL exists (36KB, created today at 9:21am) — this is the … [truncated]
[10:18] [CLAUDE] Both drafts are in `scripts/drafts/`. Here's the breakdown:

---

**Survey (`survey-draft.md`)** — 7 questions:
1. **Tier checkboxes** — all 6 tiers + "none of these" (multi-select)
2. **Price reality check** — what's your actual ceiling knowing it's 5–10 years out?
3. **Day-1 pledge** — 5-point scale from "definitely" to "no"
4. **Referral** — would you share it?
5. **STOL Cub aside** — the near-term $250 experience, optional
6. **Open ideas** — textarea, 500 char, with the "suggest a tier = get it free" hook
7. **Email** — pre-filled from localStorage if they've signed up before

VIP-only addition: Q4b asks if a referral-for-waitlist-spot program would bother them.

---

**Letter page (`letter-page-draft.tsx`)** — designed for the `/update` route:

- Dark top bar + hero strip with "Phase… [truncated]
[10:24] [CLAUDE] Both live at their own routes now. Fire up the dev server and hit:

- **`http://localhost:3000/update`** — the founder letter / web version of the email
- **`http://localhost:3000/survey`** — the standalone survey form

Nothing on the existing site changed.

**What's there:**

`/update` — scrollable letter page with:
- Dark header + "Phase 1 Complete" eyebrow
- Stats strip (1,000+ / <$2 / <1mo) right under the hero
- Letter body in 660px reading column, comfortable on mobile
- Dark card with the 3 things you need (survey, day-1 backers, referrals)
- STOL Cub aside box
- Sign-off with tap-to-copy email
- Survey CTA block at the bottom linking to `/survey`

`/survey` — fully functional form with:
- 7 questions (tier checkboxes, price ceiling, day-1, referral, STOL, ideas, email)
- Email pre-… [truncated]
[10:26] [CLAUDE] Done. The self-deprecating hedge makes it sound much more like you.
[10:34] [CLAUDE] Good catch — and it's a meaningful distinction. As of my knowledge cutoff (August 2025):

**Archer and Joby's initial commercial routes are piloted** — a certified pilot on board, passengers in back, basically an air taxi with a human at the controls. That's what they're launching first. Autonomous/unpiloted commercial certification comes later, and the FAA timeline for that is genuinely unclear — probably well beyond 2030.

So the question is which parallel you're actually drawing:

- If you mean **"same timeframe as the first piloted eVTOL air taxis"** — that's actually sooner than 5–10 years, Joby was targeting 2025–2026 commercial launch. That framing makes FlyIRL sound *behind* them.

- If you mean **"same timeframe as the first commercially un-piloted eVTOL operations"** — that's the… [truncated]
[10:46] [CLAUDE] Done.
[10:47] [CLAUDE] Done. After the STOL Cub aside you now get two more sections:

**Wildcard #1** (dark card, more visual weight) — the EHang VT30 observation, the "we'll have to build it here" argument, the aerospace connections, the $500K parallel goal, and the business-vs-product distinction.

**Wildcard #2** (lighter aside) — the $50K university X-Prize concept, the IP tradeoff acknowledged cleanly, signed off with "whatever gets it off the ground."

The tone stays in your voice — candid, a little irreverent, but clearly someone who knows what they're talking about. Check it at `localhost:3000/update`.
[10:48] [CLAUDE] Done. Survey now has 9 questions total:

1. Tier checkboxes
2. Price ceiling
3. Day-1 pledge
4. Referral
5. STOL Cub
6. **The plane** — separate $500K campaign to build an American-made aircraft
7. **X-Prize** — $50K university competition wildcard
8. Open ideas
9. Email

The two new answers (`plane_interest`, `xprize_interest`) are included in the API payload. You'll want to add those columns to the `survey_responses` table in Supabase before going live.
[11:00] [CLAUDE] Four new routes, all independently viewable:

- **`/update`** — the founder letter
- **`/survey`** — standalone survey form  
- **`/plane`** — the American aircraft campaign (blue accent)
- **`/xprize`** — the university X-Prize campaign (purple accent)

---

**Tiers summary:**

`/plane` ($500K goal) — 6 tiers:
- $25 Blueprint Backer — name in design docs, engineering updates
- $100 Airframe Insider — monthly engineering reviews, Discord
- $500 Wind Tunnel Pass ⭐ — input on one design decision, signed Phase 1 drawings
- $1K Co-Designer — quarterly calls with engineering lead, permanent documentation credit
- $10K Angel Sponsor — equity conversation option, name on the aircraft, first purchase right
- $50K Founding Investor (×3) — guaranteed equity conversation, production slot

`/xprize` (… [truncated]
[21:41] [CLAUDE] There are uncommitted changes — 4 new pages (`/update`, `/survey`, `/plane`, `/xprize`) plus `scripts/drafts/` and config files. Want me to commit all of this before wrapping up?
