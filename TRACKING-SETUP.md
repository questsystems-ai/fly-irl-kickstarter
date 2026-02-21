# FlyIRL Tracking Setup Guide

## Architecture Overview

This site uses **three independent tracking systems**, all installed correctly:

| System | How it loads | Where events fire |
|--------|-------------|-------------------|
| **Google Tag Manager (GTM)** | `<Script>` in `layout.tsx` | `dataLayer.push()` via `lib/gtm.ts` |
| **Meta (Facebook/Instagram) Pixel** | `MetaPixel` component in `layout.tsx` | `fbq()` via `lib/metaPixel.ts` |
| **TikTok Pixel** | `TikTokPixel` component in `layout.tsx` | `ttq.track()` via `lib/tiktokPixel.ts` |

### How events flow (the correct way)

```
User clicks button
  → Code calls trackMetaLeadSubmit()      → fbq('track','Lead',...)
  → Code calls trackTikTokLeadSubmit()     → ttq.track('SubmitForm',...)
  → Code calls gtmTrackLead()              → dataLayer.push({event:'generate_lead',...})
                                                ↓
                                           GTM picks it up
                                                ↓
                                           GTM fires your GA4 tag (or Google Ads, etc.)
```

**Key insight:** GTM is a *container* that listens to `dataLayer` events and routes them to
whatever tags you configure inside GTM. The code does NOT call `gtag()` directly — it pushes
to `dataLayer`, and GTM handles the rest. This means your marketing manager can add, edit, or
remove tags inside GTM without any code changes.

---

## Step 1: Get Your GTM Container ID

1. Go to **[Google Tag Manager](https://tagmanager.google.com/)**
2. Create an account (or use existing) → Create a **Web** container
3. Your Container ID looks like `GTM-XXXXXXX`
4. Open `app/layout.tsx` and replace `GTM-XXXXXXX` with your real ID:

```typescript
const GTM_ID = "GTM-XXXXXXX"; // ← paste your real GTM container ID here
```

---

## Step 2: Set Up GA4 Inside GTM

You do NOT add GA4 code to the site. GA4 runs *inside* GTM as a tag.

### 2a. Create a GA4 Configuration Tag
1. In GTM → **Tags** → **New**
2. Tag type: **Google Analytics: GA4 Configuration**
3. **Measurement ID**: paste your GA4 Measurement ID (starts with `G-`, e.g. `G-S2YQ55HXE4`)
   - Find this in GA4 → Admin → Data Streams → your web stream
4. Trigger: **All Pages**
5. Save

### 2b. Create Event Tags for Button Presses

The site pushes three custom events to the dataLayer. You need a GTM trigger + tag for each:

#### Event: `generate_lead` (email submit)

1. **Trigger** → New → **Custom Event** → Event name: `generate_lead`
2. **Tag** → New → **Google Analytics: GA4 Event**
   - Configuration Tag: select your GA4 config from step 2a
   - Event Name: `generate_lead`
   - Event Parameters (optional): `event_label` = `{{DLV - event_label}}`
3. Attach the trigger, save

#### Event: `initiate_checkout` (Reserve $1 click)

1. **Trigger** → New → **Custom Event** → Event name: `initiate_checkout`
2. **Tag** → New → **GA4 Event** → Event Name: `initiate_checkout`
3. Attach trigger, save

#### Event: `purchase` (reservation complete)

1. **Trigger** → New → **Custom Event** → Event name: `purchase`
2. **Tag** → New → **GA4 Event** → Event Name: `purchase`
   - Event Parameters: `value` = `{{DLV - value}}`, `currency` = `{{DLV - currency}}`
3. Attach trigger, save

> **Tip:** To use dataLayer variables, go to **Variables** → **User-Defined Variables** → New →
> **Data Layer Variable**. Name it `DLV - event_label`, Data Layer Variable Name: `event_label`.
> Repeat for `value`, `currency`, `transaction_id`, etc.

---

## Step 3: Verify Your Pixel IDs

The Meta and TikTok pixel IDs are already set in `app/layout.tsx`:

```typescript
const META_PIXEL_ID = "1263296819041974";
const TIKTOK_PIXEL_ID = "D68AQ4JC77U42FK0214G";
```

If you need to change them (new ad accounts, etc.), just update these values.

---

## Step 4: Set Up Conversion Events in Ad Platforms

### Meta (Facebook/Instagram) Ads Manager
1. Go to **Events Manager** → Your pixel → **Custom Conversions**
2. The following standard events fire automatically:
   - `PageView` — every page load
   - `Lead` — email submit
   - `InitiateCheckout` — Reserve $1 click
   - `Purchase` — reservation complete
3. In your ad set, optimize for `Lead` (email capture) or `Purchase` (reservation)

### TikTok Ads Manager
1. Go to **Assets** → **Events** → Your pixel
2. Events that fire:
   - `PageView` — every page
   - `SubmitForm` + `CompleteRegistration` — email submit
   - `InitiateCheckout` — Reserve $1 click
   - `CompletePayment` + `Purchase` — reservation complete
3. Set your optimization event in your ad group settings

---

## Step 5: Test Everything

### GTM Preview Mode
1. In GTM, click **Preview** (top right)
2. Enter your site URL
3. Browse the site — you should see events firing in the debug panel
4. When happy, click **Submit** to publish the container

### Meta Pixel Helper
1. Install the [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
2. Visit your site — verify `PageView`, `Lead`, `InitiateCheckout`, `Purchase` fire at the right times

### TikTok Pixel Helper
1. Install the [TikTok Pixel Helper](https://chrome.google.com/webstore/detail/tiktok-pixel-helper/aelgobmabdmlfmiblddjfnjodalhidnn)
2. Verify events fire correctly

---

## Environment Variables Needed

Add these to your hosting platform (Vercel, etc.):

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_RESERVATION_PRICE_CENTS=100

# Mailchimp
MAILCHIMP_API_KEY=your-key-us21
MAILCHIMP_AUDIENCE_ID=abc123

# Site
SITE_URL=https://fly-irl.com
```

---

## Summary of What Changed vs. the Old Site

| Old Site Problem | New Site Fix |
|-----------------|-------------|
| Raw HTML `<!-- -->` and `<script>` pasted into JSX | All scripts use Next.js `<Script>` component |
| GTM loaded twice (raw HTML + JSX) | GTM loaded exactly once |
| Button events used `gtag()` (bypasses GTM) | Button events use `dataLayer.push()` (goes through GTM) |
| No GTM triggers for custom events | Guide above explains how to create them |
| TikTok pixel built but never imported | Imported in `layout.tsx` from day one |
| Meta pixel built but never imported | Imported in `layout.tsx` from day one |
