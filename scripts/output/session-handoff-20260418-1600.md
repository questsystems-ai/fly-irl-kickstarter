# Session Handoff — 2026-04-18 ~16:00

## The Product
Pre-launch Kickstarter site for FlyIRL / SkyPark. Next.js app deployed on Vercel: `/kickstarter` (main landing), `/story`, `/vision`, `/update` (founder letter + campaign options), `/survey`, `/cub`, `/plane`, `/xprize`. Email capture → Supabase/Mailchimp, Stripe reserve flow.

## Stack
Next.js 14 · TypeScript · Tailwind (minimal) · Supabase · Stripe · Vercel · Meta/TikTok/GTM pixels

## Business Context
Phase 1 complete (1,000+ signups, <$2/lead). Pivoting to decide which of three Kickstarter paths to launch: main FlyIRL ($500K), Aircraft/RAM ($500K), or X-Prize ($50K). Survey + LikeWidget gathering signals. Discord server live.

## Current State — 2026-04-18 · branch: main · commit e46bd25

### Done this session
- `/update` page: fully rebuilt with 3 campaign option cards (Aircraft/RAM, STOL Cub, X-Prize), real images per card, movement section with Discord link, fixed "Help! Another survey! ;)" FAB, all three cards link to full campaign pages
- `/cub/page.tsx`: full Cub Experience page ported from private repo — hero video, 6 experience cards with photos, safety section, use of funds, 6 reward tiers. No email form.
- `components/LikeWidget.tsx`: fixed floating "Like this idea?" yes/no widget on `/plane`, `/cub`, `/xprize`. Fires POST to `/api/vote`.
- `app/api/vote/route.ts`: vote endpoint → `campaign_votes` Supabase table
- `/survey` page: complete visual overhaul — tier cards in grid with checkmark-corner UI, concept cards with matching accent colors (gold/green/purple), removed price ceiling question
- `/api/survey/route.ts`: now writes to `kickstarter_survey_responses` (new table, correct schema)
- Supabase: created `kickstarter_survey_responses` + `campaign_votes` tables, both live
- Discord server created: https://discord.gg/5vBd8YP8 — wired into update page
- Images added: EHang VT30 (2), STOL drag (2), GT Capstone, hackathon team, cub experience photos (6), cub hero video
- All committed and pushed → Vercel auto-deployed

### Pending / next session
- Swap placeholder Discord link for a vanity URL if Aaron gets one (discord.gg/flyirl etc.)
- `/update/vip` variant for reservation holders (noted in prior handoff, still not built)
- Wire `/update` into Mailchimp email — add "View web version →" at top of email
- Verify Stripe reserve flow end-to-end
- Nav decision — link all pages or stay logo-only?
- Discord: set up channels, pin intro message, post invite in Mailchimp email
- Populate the Discord — the page points there now, should have some content ready

## Key Files
- `app/update/page.tsx` — main founder letter (most active file this session)
- `app/cub/page.tsx` — new Cub Experience page
- `app/survey/page.tsx` — overhauled survey
- `app/api/survey/route.ts` — now targets `kickstarter_survey_responses`
- `app/api/vote/route.ts` — LikeWidget votes
- `components/LikeWidget.tsx` — shared floating vote widget
- `.env.local` — all keys (gitignored)

## Quick Verify
```bash
npm run dev
# localhost:3000/update   — founder letter + campaign cards + FAB
# localhost:3000/cub      — Cub Experience page
# localhost:3000/survey   — overhauled survey
# localhost:3000/plane    — LikeWidget visible bottom-right
```
