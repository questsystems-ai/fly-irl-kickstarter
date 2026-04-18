# Session Handoff — 2026-04-17 ~17:00

## The Product
Pre-launch Kickstarter site for FlyIRL / SkyPark. Three-page Next.js app: `/kickstarter` (default — proof kit, reward tiers, email capture), `/story` (founder journey), `/vision` (pitch deck). Deployed on Vercel at fly-irl-kickstarter.vercel.app.

## Stack
Next.js 14 · TypeScript · Supabase (leads) · Stripe (reserve) · Vercel · Meta/TikTok/GTM pixels

## Business Context
Pre-launch email capture for the SkyPark Kickstarter. Sends interested users to `/reserve` after capturing email + firing conversion pixels.

## Current State — 2026-04-17 · branch: main · commit 21a92a2

### Done this session
- Cloned repo locally to `a-i-rons_projects/fly-irl-kickstarter/`
- `npm install` — packages installed
- Full Claude Code bootstrap: `.claude/` skills (initiate/terminate/cost-aware), `settings.local.json` with Stop hook, `CLAUDE.md`, `scripts/log_claude_response.py`, `scripts/output/session-log.md`
- `.env.local` written with all FlyIRL Supabase, Stripe, and Mailchimp keys (gitignored)
- Committed: 21a92a2

### Content reviewed — no changes made yet
- `/kickstarter` page: hero video, proof kit (3 cards, images present), use of funds ($500K goal breakdown), reward tiers ($25→$100K), email form with neon animated border
- All proof images present: `proof-hud.jpg`, `proof-digital-twin.jpg`, `proof-skypark-world.jpg`
- Nav: logo-only (no tabs)
- Untracked pages in repo: `app/plane/`, `app/survey/`, `app/update/`, `app/xprize/` — not yet reviewed

### Pending — next session
- Review content and decide what needs changing before sending out
- Check `/reserve` page flow end-to-end
- Review untracked pages (plane, survey, update, xprize) — may be relevant
- Verify Supabase `leads` table schema matches what `/api/lead` expects
- Decide if Nav should link all 3 pages or stay logo-only

## Key Files
- `app/kickstarter/page.tsx` — main landing (all content)
- `app/api/lead/route.ts` — email capture endpoint
- `app/api/reserve/route.ts` — Stripe reserve flow
- `.env.local` — keys (gitignored, do not commit)

## Quick Verify
```bash
cd fly-irl-kickstarter && npm run dev
# → http://localhost:3000/kickstarter
```
