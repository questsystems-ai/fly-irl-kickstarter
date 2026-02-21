// lib/tiktokPixel.ts
// TikTok Pixel event tracking utilities

declare global {
  interface Window {
    ttq: any;
  }
}

export function isTikTokPixelReady(): boolean {
  return typeof window !== "undefined" && typeof window.ttq !== "undefined";
}

export function trackTikTokEvent(eventName: string, params?: Record<string, any>) {
  if (!isTikTokPixelReady()) {
    console.log(`[TikTok Pixel] Not ready, skipping event: ${eventName}`);
    return;
  }
  try {
    if (params) {
      window.ttq.track(eventName, params);
    } else {
      window.ttq.track(eventName);
    }
    console.log(`[TikTok Pixel] Tracked: ${eventName}`, params || "");
  } catch (e) {
    console.error(`[TikTok Pixel] Error tracking ${eventName}:`, e);
  }
}

export function identifyTikTokUser(params: {
  email?: string;
  phone_number?: string;
  external_id?: string;
}) {
  if (!isTikTokPixelReady()) {
    console.log("[TikTok Pixel] Not ready, skipping identify");
    return;
  }
  try {
    window.ttq.identify(params);
    console.log("[TikTok Pixel] Identified user:", params);
  } catch (e) {
    console.error("[TikTok Pixel] Error identifying user:", e);
  }
}

// ============================================
// Pre-built event helpers for FlyIRL funnel
// ============================================

/** Track email submit (lead capture) — primary conversion for TikTok ads */
export function trackLeadSubmit(email: string, audienceMode?: string) {
  identifyTikTokUser({ email });
  trackTikTokEvent("SubmitForm", {
    content_name: "prelaunch_lead",
    content_category: audienceMode || "general",
  });
  trackTikTokEvent("CompleteRegistration", {
    content_name: "email_signup",
  });
}

/** Track when someone initiates the $1 reservation checkout */
export function trackInitiateCheckout(email: string) {
  identifyTikTokUser({ email });
  trackTikTokEvent("InitiateCheckout", {
    content_name: "reservation_checkout",
    value: 1.0,
    currency: "USD",
  });
}

/** Track when someone completes the $1 reservation */
export function trackReservationComplete() {
  trackTikTokEvent("CompletePayment", {
    content_name: "reservation_complete",
    value: 1.0,
    currency: "USD",
  });
  trackTikTokEvent("Purchase", {
    content_name: "reservation",
    value: 1.0,
    currency: "USD",
    quantity: 1,
  });
}
