"use client";

import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/vision", label: "The Pitch" },
  { href: "/kickstarter", label: "Kickstarter" },
  { href: "/story", label: "Founder Story" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <a href="/" className="site-nav-logo">
          Fly<span>IRL</span>
        </a>
        <div className="site-nav-links">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`site-nav-link ${pathname === l.href ? "active" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
