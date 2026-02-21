// lib/gtm.ts
// Google Tag Manager dataLayer event helpers
//
// IMPORTANT: This pushes events to the GTM dataLayer, NOT to gtag() directly.
// In your GTM container, create "Custom Event" triggers for each event name below.
// GTM will then route them to GA4, Google Ads, or any other tag you configure.

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export function pushDataLayerEvent(event: string, params?: Record<string, any>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  console.log(`[GTM] dataLayer.push: ${event}`, params || "");
}

// ============================================
// Pre-built event helpers for FlyIRL funnel
// ============================================

/** Push when someone submits their email */
export function gtmTrackLead(audienceMode?: string) {
  pushDataLayerEvent("generate_lead", {
    event_category: "engagement",
    event_label: audienceMode || "general",
  });
}

/** Push when someone clicks "Reserve for $1" */
export function gtmTrackInitiateCheckout() {
  pushDataLayerEvent("initiate_checkout", {
    event_category: "ecommerce",
    value: 1.0,
    currency: "USD",
  });
}

/** Push when someone completes the $1 reservation */
export function gtmTrackPurchase() {
  pushDataLayerEvent("purchase", {
    transaction_id: `res_${Date.now()}`,
    value: 1.0,
    currency: "USD",
    items: [{ item_name: "FlyIRL Reservation" }],
  });
}

/** Push virtual pageview for SPA navigation */
export function gtmTrackPageView(path: string) {
  pushDataLayerEvent("pageview", { page: path });
}
