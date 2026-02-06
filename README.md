# FlyIRL Kickstarter — Three-Page Site

Three-page site for the FlyIRL Kickstarter pre-launch campaign.

## Pages

1. **`/story`** — "How I Got Here" — The founder's hero's journey narrative
2. **`/vision`** — "The Vision" — Slide-deck style pitch (problem, solution, safety, market, economics, roadmap)
3. **`/kickstarter`** — "The Kickstarter" — Proof Kit, Use of Funds, Reward Tiers, Email capture

## Structure

```
app/
  layout.tsx          — Shared layout + footer
  page.tsx            — Redirects to /story
  globals.css         — Design system (colors, nav, typography)
  story/page.tsx      — Page 1: Hero's journey
  vision/page.tsx     — Page 2: Pitch deck
  kickstarter/page.tsx — Page 3: KS details + tiers
components/
  Nav.tsx             — Shared 3-tab navigation
```

## Design System

Carries forward from the existing FlyIRL site:
- **Fonts**: Montserrat (headings), Poppins (body) — loaded via Google Fonts
- **Colors**: `--bg: #f4f3f3`, `--dark: #1a1a1a`, `--accent: #f7f3ea`
- **Max width**: 1100px

## Setup

```bash
npm install
npm run dev
```

## TODO

- [ ] Wire email form to Supabase/Mailchimp (currently placeholder)
- [ ] Add real images to Proof Kit cards
- [ ] Review/finalize reward tier pricing with coach
- [ ] Add Open Graph meta tags for social sharing
- [ ] Port over API routes from existing repo if needed
- [ ] Copy `/public/images/` from existing repo
