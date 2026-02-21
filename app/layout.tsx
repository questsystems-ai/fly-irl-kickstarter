// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import MetaPixel from "@/components/MetaPixel";
import TikTokPixel from "@/components/TikTokPixel";
import GTMTracker from "@/components/GTMTracker";

// ============================================
// PIXEL & TAG IDs — replace placeholders with your real IDs
// ============================================
const GTM_ID = "GTM-TP3XKJVM";
const META_PIXEL_ID = "1263296819041974";
const TIKTOK_PIXEL_ID = "D68AQ4JC77U42FK0214G";
// ============================================

export const metadata: Metadata = {
  title: "FlyIRL — The SkyPark",
  description: "Real flight. No license. Hard safety limits.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ── Google Tag Manager (head) ── */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* ── Meta (Facebook/Instagram) Pixel ── */}
        <MetaPixel pixelId={META_PIXEL_ID} />

        {/* ── TikTok Pixel ── */}
        <TikTokPixel pixelId={TIKTOK_PIXEL_ID} />
      </head>

      <body>
        {/* ── Google Tag Manager (noscript fallback) ── */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* ── GTM page-view tracker for client-side navigation ── */}
        <GTMTracker />

        {children}

        <footer className="site-footer">
          <strong>FlyIRL</strong> — SkyPark Pre-Launch &nbsp;·&nbsp;{" "}
          <a href="/privacy">Privacy</a> &nbsp;·&nbsp; <a href="/terms">Terms</a>
        </footer>
      </body>
    </html>
  );
}
