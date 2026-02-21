"use client";

export default function Nav() {
  return (
    <nav className="site-nav">
      <div className="site-nav-inner" style={{ justifyContent: "center" }}>
        <a href="/" className="site-nav-logo">
          <img
            src="/logo-header.png"
            alt="FlyIRL"
            style={{ height: 56, width: "auto", display: "block" }}
          />
        </a>
      </div>
    </nav>
  );
}
