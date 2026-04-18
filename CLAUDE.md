# fly-irl-kickstarter

## Startup Protocol
On every new conversation, run `/initiate` before anything else.

## What This Is
Pre-launch Kickstarter site for FlyIRL / SkyPark. Three-page Next.js app deployed on Vercel:
- `/kickstarter` — proof kit, reward tiers, email capture (default landing)
- `/story` — founder hero's journey
- `/vision` — slide-deck style pitch

**Live URL:** https://fly-irl-kickstarter.vercel.app/kickstarter  
**GitHub:** https://github.com/questsystems-ai/fly-irl-kickstarter

## Stack
Next.js 14 · TypeScript · Tailwind (minimal) · Supabase (email leads) · Stripe (reserve flow) · Vercel deployment

## Tracking
Meta Pixel · TikTok Pixel · Google Tag Manager — all wired in layout.tsx

## Key Files
- `app/kickstarter/page.tsx` — main landing page (hero, proof kit, tiers, email form)
- `app/story/page.tsx` — founder narrative
- `app/vision/page.tsx` — pitch deck slides
- `app/api/lead/route.ts` — email capture → Supabase
- `app/api/reserve/route.ts` — Stripe reserve flow
- `components/Nav.tsx` — shared nav (logo only)
- `public/images/` — proof kit images (hud, digital-twin, skypark-world)
- `public/videos/hero.mp4` — hero background video

## Env Vars Needed
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Git Workflow
- Default branch: `main`
- Deploy: push to `main` → Vercel auto-deploys
- Remote: `origin` = questsystems-ai/fly-irl-kickstarter

## Complexity Check (Self-Audit Rule)
After 2 failed attempts at the same problem: STOP. Diagnose, propose a fix, let the user decide.
