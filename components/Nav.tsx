"use client";

import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <a href="/" className="site-nav-logo">
          <img
            src="/logo-header.png"
            alt="FlyIRL"
            style={{ height: 48, width: "auto", display: "block" }}
          />
        </a>
        <div className="site-nav-links">
          <a href="/" className={`site-nav-link${path === "/" ? " active" : ""}`}>Home</a>
          <a href="/update" className={`site-nav-link${path.startsWith("/update") ? " active" : ""}`}>Updates</a>
          <a href="/blog" className={`site-nav-link${path.startsWith("/blog") ? " active" : ""}`}>Blog</a>
        </div>
      </div>
    </nav>
  );
}
