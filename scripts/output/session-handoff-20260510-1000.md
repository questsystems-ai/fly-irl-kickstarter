# Session Handoff — 2026-05-10 ~10:00

## The Product
Pre-launch Kickstarter site for FlyIRL / SkyPark. Next.js app on Vercel. `/update` is the main landing (two updates on one scrollable page), `/survey` for reward tier survey, `/survey/campaigns` for campaign vote survey, `/blog` for founder writing.

## Stack
Next.js 14 · TypeScript · Tailwind (minimal) · Supabase · Stripe · Vercel · Meta/TikTok/GTM pixels

## Business Context
Aaron, solo founder. Phase 1 done (1,000+ signups, <$2/lead). Signal-gathering mode — survey responses trickling in (3 so far). Choosing which Kickstarter path to launch.

## Current State — 2026-05-10 · branch: main · commit a3c7b88

### Done this session
- Discord link fixed site-wide → `discord.gg/tFFhRf3CJ`
- Supabase survey confirmed working (3 responses captured)
- `/update` rebuilt from mailchimp email HTML — faithful conversion
- `/update` now shows Update 1 (reward tiers) + Update 2 (campaign cards) on one page with sticky scroll nav
- Update 2 intro copy corrected (honest about 1 survey response so far)
- Campaign cards in Update 2 restored with images + original formatting
- `/survey/campaigns` — new page with STOL/RAM/XPrize questions, posts to same `/api/survey`
- Smart scroll nav highlights active update; survey CTAs route to correct survey
- FABs removed from `/update`
- Blog politics page (`/blog/politics`) — multiple copy edits:
  - Opening rewritten: McCarthy/Vietnam context, Billy Joel reference, new paragraph break
  - Aviation pioneers line added
  - Freedom paragraph rewritten
  - Sabrina image moved to end, "Peace Through Flight!" as centered line below image
  - "America First, but then the world" removed

### Stopped Mid-Task
User asked to move "click to enlarge" text to center and remove the double arrow on the blog politics page. Search came up empty — couldn't find the element before terminate was called. **Start here next session:** find and fix that element in `app/blog/politics/page.tsx`.

### Pending
- Send Mailchimp follow-up email (followup HTML ready in `scripts/output/`)
- `/update/vip` — reserved-backer variant (not built)
- Stripe reserve flow — verify end-to-end
- Populate Discord channels
- Draft internal ToS / backer disclaimer (pending FAA approval language)

## Key Files
- `app/update/page.tsx` — combined Update 1 + Update 2 page
- `app/survey/campaigns/page.tsx` — new campaign vote survey
- `app/blog/politics/page.tsx` — politics blog post (active editing)
- `scripts/output/mailchimp-email-followup.html` — follow-up email ready to send

## Quick Verify
```bash
npm run dev
# /update — both updates visible, sticky nav works, scroll to each section
# /survey/campaigns — three campaign questions render
# /blog/politics — Sabrina image at bottom, Peace Through Flight centered below
```
