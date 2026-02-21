// lib/metaPixel.ts
// Meta (Facebook/Instagram) Pixel event tracking utilities

declare global {
  interface Window {
    fbq: any;
  }
}

export function isMetaPixelReady(): boolean {
  return typeof window !== "undefined" && typeof window.fbq !== "undefined";
}

export function trackMetaEvent(eventName: string, params?: Record<string, any>) {
  if (!isMetaPixelReady()) {
    console.log(`[Meta Pixel] Not ready, skipping event: ${eventName}`);
    return;
  }
  try {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
    console.log(`[Meta Pixel] Tracked: ${eventName}`, params || "");
  } catch (e) {
    console.error(`[Meta Pixel] Error tracking ${eventName}:`, e);
  }
}

// ============================================
// Pre-built event helpers for FlyIRL funnel
// ============================================

/** Track email submit (lead capture) — primary conversion for Meta ads */
export function trackMetaLeadSubmit(email: string, audienceMode?: string) {
  trackMetaEvent("Lead", {
    content_name: "prelaunch_lead",
    content_category: audienceMode || "general",
  });
}

/** Track when someone initiates the $1 reservation checkout */
export function trackMetaInitiateCheckout() {
  trackMetaEvent("InitiateCheckout", {
    content_name: "reservation_checkout",
    value: 1.0,
    currency: "USD",
  });
}

/** Track when someone completes the $1 reservation */
export function trackMetaReservationComplete() {
  trackMetaEvent("Purchase", {
    content_name: "reservation_complete",
    value: 1.0,
    currency: "USD",
  });
}
