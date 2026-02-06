import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlyIRL — The SkyPark",
  description: "Real flight. No license. Hard safety limits.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="site-footer">
          <strong>FlyIRL</strong> — SkyPark Pre-Launch &nbsp;·&nbsp;{" "}
          <a href="/privacy">Privacy</a> &nbsp;·&nbsp; <a href="/terms">Terms</a>
        </footer>
      </body>
    </html>
  );
}
