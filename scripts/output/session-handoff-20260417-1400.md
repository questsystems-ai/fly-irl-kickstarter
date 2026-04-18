# Session Handoff — 2026-04-17 ~14:00

## The Product
FlyIRL / SkyPark pre-launch Kickstarter site. Three-page Next.js app (kickstarter, story, vision) deployed on Vercel, used as the destination for email campaigns and ad traffic. The site captures leads into Supabase/Mailchimp and routes serious buyers through a Stripe reservation flow.

## Stack
Next.js 14 · TypeScript · Tailwind (minimal) · Supabase · Stripe · Vercel · Meta/TikTok/GTM pixels

## Business Context
Phase 1 pre-launch complete (1,000+ signups, <$2/lead, <1 month). Now pivoting to decide whether to launch the full Kickstarter — need survey data on tier resonance and day-1 commitment signals.

## Current State — 2026-04-17, branch: main

### What got built this session
Four new standalone pages, all independently dev-able at localhost:3000:

| Route | Purpose |
|-------|---------|
| `/update` | Founder letter — web/smartphone version of the post-Phase-1 email. Stats strip, letter body, STOL Cub aside, two wildcard sections (plane + X-Prize), sign-off. Links to `/survey`. |
| `/survey` | 9-question standalone survey. Tier checkboxes, price ceiling, day-1 pledge, referral, STOL interest, plane interest, X-Prize interest, open ideas, email. Submits to `/api/survey`. |
| `/plane` | $500K aircraft design campaign page. 6 tiers ($25–$50K). Blue accent. Sticky back-to-update bar. Soft interest-signal email (dedup-safe). |
| `/xprize` | $50K university X-Prize campaign page. 6 tiers ($25–$10K). Purple accent. Same back nav pattern. |

Survey draft notes: `scripts/drafts/survey-draft.md`

### Pending / not yet done
- **Supabase schema**: `survey_responses` table needs `price_point` and `stol_interest` columns added (existing route only has original schema). Also need `plane_interest` and `xprize_interest` columns.
- `/update` is NOT yet linked from `/kickstarter` — wire it up when ready to send email
- Mailchimp email needs "📱 View web version →" link pointing to `/update` at the top
- VIP variant of `/update` (`/update/vip`) — notes at bottom of draft file, not yet built
- `/plane` and `/xprize` not yet linked from `/update` — add them as "Learn more" links on the wildcard aside blocks when ready
- No images on `/plane` or `/xprize` — placeholder card layout, needs real imagery later

### Key content edits made to /update
- Quote: "worth (almost ;) more than gold" — self-deprecating hedge added
- Archer/Joby line corrected: now says "FAA approval for commercially un-piloted operations" (not "first commercial routes" — those are piloted)
- Two wildcard sections added after STOL aside: dark card for the plane, lighter aside for X-Prize

## Key files
- `app/update/page.tsx` — founder letter page
- `app/survey/page.tsx` — survey form
- `app/plane/page.tsx` — aircraft campaign
- `app/xprize/page.tsx` — X-Prize campaign
- `app/api/survey/route.ts` — survey API (check Supabase schema before deploying survey)
- `app/kickstarter/page.tsx` — main landing (unchanged this session)
- `scripts/drafts/survey-draft.md` — survey question reference doc

## Quick verify
```bash
npm run dev
# Then check:
# localhost:3000/update
# localhost:3000/survey
# localhost:3000/plane
# localhost:3000/xprize
```
