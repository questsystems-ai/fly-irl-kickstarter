# Session Handoff — 2026-04-19 ~11:00

## The Product
Pre-launch Kickstarter site for FlyIRL / SkyPark. Next.js app deployed on Vercel: `/update` (now default landing), `/story`, `/vision`, `/survey`, `/cub`, `/plane`, `/xprize`. Email capture → Supabase/Mailchimp, Stripe reserve flow.

## Stack
Next.js 14 · TypeScript · Tailwind (minimal) · Supabase · Stripe · Vercel · Meta/TikTok/GTM pixels

## Business Context
Phase 1 complete (1,000+ signups, <$2/lead). Gathering survey/vote signal to pick which Kickstarter path to launch. Still pre-campaign — signal-gathering mode.

## Current State — 2026-04-19 · branch: main · commit dead288

### Done this session
- Root `/` now redirects to `/update` (was `/kickstarter`) — deployed
- `/update` page: survey FAB now pulses every 3.5s (lifts + glows) to draw attention
- `/update` page: new Discord FAB pinned bottom-right (Discord indigo, links to discord.gg/5vBd8YP8)
- Drafted general + VIP Mailchimp emails — copy ready to paste, not yet sent
  - General (961): subject "What happens next with FlyIRL", points to /update, survey CTA
  - VIP (35, "Email tagged customers"): same + marketing dashboard link (vip-marketing-dashboard.vercel.app)
- Researched Kickstarter/Indiegogo policies on long-horizon rewards (5-10yr delivery)

### Key research findings — Kickstarter/crowdfunding policy
- Neither platform sets a hard max on delivery timelines, but obligation to deliver or refund is permanent
- Kickstarter may decline aviation campaign outright ("heavily regulated + potentially dangerous") — must contact them pre-launch
- Flight-dependent rewards (FAA-approval-required) carry FTC exposure — FDA analog applies
- Lifetime memberships explicitly banned on Kickstarter; "founding access when SkyPark opens" is fine
- Aerospace sector uses Reg CF / Reg A+ (StartEngine etc.) for regulatory-dependent products, not Kickstarter
- Decision: proceed with disclaimers + internal ToS ("pending FAA approval, no refunds if not approved") for now; equity crowdfunding is a future-state conversation
- STOL Cub campaign is the cleanest Kickstarter play — existing product, deliverable within a year, no regulatory risk

### Pending / next session
- Send Mailchimp emails (general + VIP) — copy is ready, just needs to go into Mailchimp composer
- `/update/vip` — reserved-backer variant page (still not built)
- Wire `/update` into Mailchimp email (add "View web version →" header)
- Verify Stripe reserve flow end-to-end
- Nav decision — link all pages or stay logo-only?
- Populate Discord — channels, pinned intro, invite in Mailchimp email
- Draft internal ToS / backer disclaimer for campaign pages (pending FAA approval language)

## Key Files
- `app/update/page.tsx` — main founder letter + FABs (most active file)
- `app/page.tsx` — root redirect (now → /update)
- `scripts/output/session-log.md` — full email copy is in the log if needed

## Quick Verify
```bash
npm run dev
# localhost:3000         — should redirect to /update
# localhost:3000/update  — check both FABs visible (survey left, Discord right)
```
