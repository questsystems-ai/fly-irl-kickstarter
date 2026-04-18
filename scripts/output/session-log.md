# Session Log — fly-irl-kickstarter

---
### Session 2026-04-18 ~16:00 — Update page, /cub, LikeWidget, survey overhaul, Supabase, Discord

**Key decisions/insights:**
- [Campaign framing]: Three paths forward are now "Kickstarter-ready options" not wildcards — language aligned across update page and survey
- [Movement copy]: "FlyIRL needs to become a movement" leads the section — human dream framing, dropped statistics paragraph
- [Aircraft tagline]: "FlyIRL is a dream — a purpose-built aircraft is a product, Kickstarter bread and butter"
- [Discord]: https://discord.gg/5vBd8YP8 — live, wired into update page movement section
- [Supabase tables]: `kickstarter_survey_responses` + `campaign_votes` created and confirmed live
- [Image choices]: EHang VT30 for aircraft, STOL drag photos for cub, GT Capstone + hackathon team for X-Prize

**Actions taken:**
- Rebuilt /update page: 3 campaign cards with images (2 per card), movement section, fixed survey FAB ("Help! Another survey! ;)"), internal links to /plane /cub /xprize
- Built /cub/page.tsx from private cub-experience repo — full page, no email form, LikeWidget
- Built LikeWidget component (fixed floating yes/no, fires to /api/vote)
- Built /api/vote → campaign_votes table
- Overhauled /survey: tier cards with checkmark UI, concept cards with accent colors, removed price ceiling question
- Updated /api/survey → kickstarter_survey_responses table
- All committed and pushed (e46bd25)

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

---
### Session 2026-04-17 ~09:00–14:00 — Phase 1 complete: founder letter + survey + wildcard campaign pages

**Key decisions/insights:**
- [Archer/Joby framing]: correct comparison is "FAA approval for commercially un-piloted operations" — their initial commercial routes ARE piloted. Fixed in /update letter.
- [Quote]: "worth (almost ;) more than gold" — self-deprecating hedge, sounds more like Aaron
- [Survey]: 9 questions: tier interest (checkboxes), price ceiling, day-1 pledge, referral, STOL, plane, X-Prize, open ideas, email
- [Page strategy]: /update, /plane, /xprize linked FROM Mailchimp email, not from main site nav
- [Email dedup]: /api/lead deduplicates gracefully — soft interest forms on /plane and /xprize reuse it safely with different `source` fields
- [VIP variant]: /update/vip not yet built — notes at bottom of scripts/drafts/letter-page-draft.tsx

**Ideas captured:**
- X-Prize open IP is a feature: positions FlyIRL as the org that made the aircraft design happen
- Title Sponsor tier names the competition in perpetuity — strong vanity hook
- STOL Cub → Plane → X-Prize = natural progression of tangible short-timeline deliverables
- University targets: MIT, Georgia Tech, Embry-Riddle, Cal Poly, UT Austin, U Michigan

**Actions taken:**
- `app/update/page.tsx` — founder letter, mobile-first, stats strip, letter body, wildcards, survey CTA
- `app/survey/page.tsx` — 9-question form, localStorage email pre-fill, submits to /api/survey
- `app/plane/page.tsx` — $500K aircraft campaign, blue accent, 6 tiers, sticky back bar
- `app/xprize/page.tsx` — $50K X-Prize campaign, purple accent, 6 tiers, how-it-works cards
- `scripts/drafts/survey-draft.md` + `letter-page-draft.tsx` — reference drafts
- Committed: d157b6a

**Pending next session:**
- Supabase: add `price_point`, `stol_interest`, `plane_interest`, `xprize_interest` to `survey_responses` table
- Wire /update link into /kickstarter page
- Add Mailchimp "📱 View web version →" header link pointing to /update
- Build /update/vip for reservation holders
- Link /plane and /xprize from the wildcard aside blocks in /update
---
[08:39] [CLAUDE] The newer JSONL is this current session — no crash to recover. Ready to brief.

---

## Session Briefing

### Model
Running as Sonnet (cost-aware mode active)

### Project: fly-irl-kickstarter
- **Branch:** `main` — clean
- **Last commit:** `7daa1da` — Add session handoff, log, and memory files
- **Live:** fly-irl-kickstarter.vercel.app/kickstarter

---

### Last Sessions (2026-04-17, two sessions)

**Session 1 (~14:00)** — Built 4 new post-Phase-1 pages:
- `/update` — Founder letter (stats strip, STOL aside, plane + X-Prize wildcards)
- `/survey` — 9-question form → `/api/survey`
- `/plane` — $500K aircraft campaign page (6 tiers, blue accent)
- `/xprize` — $50K university competition page (6 tiers, purple accent)

**Session 2 (~17:00)** — Bootstrap/setup session (npm install, Claude infr… [truncated]
[09:02] [CLAUDE] Good — the old `letter-aside` JSX elements are all gone (CSS remains but that's fine, unused styles are harmless). The page structure is clean.

---

Here's the **Mailchimp email copy** — minimal, as requested:

---

**Subject:** FlyIRL — Phase 1 results + what's next

**Body:**

> Hey —
>
> Quick update from Aaron at FlyIRL.
>
> Phase 1 wrapped up well. I'm using Mailchimp so this doesn't land in your spam folder — but everything worth reading is on the site.
>
> **[Read the full founder update →](https://fly-irl-kickstarter.vercel.app/update)**
>
> It covers Phase 1 results, three real campaign paths forward, and a 2-minute survey that shapes which one launches first.
>
> — Aaron

---

That's it. The `/update` page now does all the heavy lifting. The email is just a delivery vehicle.

**… [truncated]
[09:07] [CLAUDE] Done. Two changes:
- Heading: direct statement of the opportunity, "Kickstarter-ready" framing
- Paragraph: reframed as a question to the reader — *you* have the power, would these be interesting? No shade on the original campaign.
[09:19] [CLAUDE] The repo doesn't exist yet under `questsystems-ai` — none of the 13 public repos match. The org has `fly-irl-kickstarter`, `flightquest-landing`, and a few others, but no cub experience repo.

A few possibilities:
1. **Not created yet** — you were planning to make it
2. **Different account** — personal GitHub account instead of questsystems-ai?
3. **Different name** — `flightquest-landing` maybe?

What's the actual URL or account? Once I have the right repo I'll pull the code directly and build the page from it rather than from scratch.
[09:25] [CLAUDE] Clean. Here's everything that was done:

**`/update` page:**
- Fixed "Help! Another survey!" button — floats bottom-left, stays visible as you scroll, links to `/survey`
- STOL Cub campaign card now links to internal `/cub` (not external site)

**New `/cub/page.tsx`:**
- Full page ported from the cub experience repo — hero video (`cub-hero.mp4`), 6 experience cards with real images, safety section, use of funds, all 6 reward tiers ($25–$5K)
- Back bar to `/update` (same pattern as `/plane` and `/xprize`)
- No email form
- Gold/amber accent (`#d4a85c`) matching the original branding

**`components/LikeWidget.tsx`:**
- Fixed bottom-right floating widget on all three campaign pages
- "Like this idea?" + Yes/No radios → Submit button appears when either selected → fires POST to `/api/vote` → "… [truncated]
[09:31] [CLAUDE] Done. Added a natural, Aaron-voiced paragraph to the movement section. One thing — I used a placeholder Discord URL (`discord.gg/flyirl`). Drop the real invite link when you have it and I'll swap it in.
[09:56] [CLAUDE] Clean. Here's what changed:

**Tier question (Q1):**
- Full card grid (2 columns on desktop, 1 on mobile)
- Each card: large price, name, description, perks list with checkmarks
- Selecting a card highlights the border and shows a filled checkmark circle in the top-right corner
- "None of these" stays as a flat full-width option at the bottom

**Bonus concept questions (Q5/Q6/Q7):**
- Each now leads with a mini campaign card matching the `/update` page exactly — same campaign tag, same goal pill, same accent colors (gold/green/purple), same language
- Radio options appear below each card
- Framing updated from "Wildcard/bonus idea" to "Kickstarter-ready option" to match the update page language
[10:09] [CLAUDE] Clean. Here's the image pairing rationale:

- **Aircraft/RAM**: EHang VT30 (the "exactly one, made in China" line now has a face) + American aircraft concept (the contrast/opportunity)
- **STOL Cub**: Super Cub on a backcountry strip (iconic) + `dropping-in.png` (action drama)
- **X-Prize**: STOL technical diagram (fits the "design competition" framing) + digital twin (simulation/engineering angle)

Images render as a side-by-side 2-column strip, 150px tall, full-width, rounded corners — sits between the last paragraph and the "See the full campaign page" link on each card.
[10:12] [CLAUDE] Done.
[10:15] [CLAUDE] Done.
[10:18] [CLAUDE] Done. Final image assignments:

- **Plane**: EHang VT30 on landing pad + EHang VT30 top view — the "made in China, going nowhere" reference now has visuals
- **Cub**: STOL drag race shot + STOL field at sunset — pure adventure energy
- **X-Prize**: GT Capstone aero team with winner's check + STOL field — the "this is what winning university aero teams look like" framing is perfect for the concept
[10:19] [CLAUDE] Done.
[10:19] [CLAUDE] Done. GT Capstone winners + hackathon team — two flavors of exactly the kind of people the X-Prize would attract.
[10:26] [CLAUDE] Done. Tighter, more resonant — leads with the human truth instead of the statistics.
[10:27] [CLAUDE] Done. All three campaign cards now have "See the full campaign page →" links — `/plane`, `/cub`, `/xprize`.
[10:32] [CLAUDE] [code]

After you run that, I'll update the survey API route to point at `kickstarter_survey_responses` with the right fields.
[10:37] [CLAUDE] Both tables are live. Survey responses now go to `kickstarter_survey_responses` with the correct fields, and `campaign_votes` is ready for the LikeWidget votes.
[10:39] [CLAUDE] Pushed. Vercel will pick it up automatically — should be live in ~1–2 minutes at fly-irl-kickstarter.vercel.app.

Notable: the cub hero video is ~in the commit so the first deploy may take slightly longer than usual. Worth checking `/cub` first once it's up to confirm the video loads.
[10:43] [CLAUDE] For a community/movement you definitely want a **server** (not just a channel) — a server is your own space where you control everything and can have multiple channels inside it.

On the account question: you don't need a separate account. You create the server under your personal account and then set it up so it looks like it belongs to FlyIRL — custom name, icon, invite link, etc. Your personal username `alakazam123` just shows up as the admin/owner, which is fine. Anyone who knows Discord expects the founder to be running it from a personal account early on.

The short path:

1. In Discord, hit the **+** button on the left sidebar → "Create My Own" → "For a club or community"
2. Name it **FlyIRL** (or **FlyIRL / SkyPark**)
3. Set a custom invite link: `discord.gg/flyirl` (or whatever's … [truncated]
[10:51] [CLAUDE] That's a Discord rate limit or account flag — sometimes happens with newer accounts or when creating servers quickly. A few things to try:

1. **Try a slightly different name** — `Fly IRL` (with a space) or `FlyIRL Community` — Discord sometimes rejects names that look like brand handles
2. **Verify your email** on the Discord account if you haven't — unverified accounts often can't create servers
3. **Try on desktop app or browser** (discord.com) instead of mobile, or vice versa — the "unknown message" error is often a client glitch

If none of that works, the nuclear option is just creating it with a throwaway name like "Aaron's Flight Club" and renaming it after. Server names can be changed any time.

What platform are you trying on — mobile, desktop app, or browser?
[11:01] [CLAUDE] Done. Want me to commit and push now, or are there more changes to batch in first?
[11:10] [CLAUDE] Pushed — Vercel deploying now.
