import Nav from "@/components/Nav";
import Link from "next/link";

export default function PoliticsBlogPost() {
  return (
    <>
      <style>{`
        .post-wrap {
          background: #f9f8f6;
          min-height: 100vh;
          padding-bottom: 80px;
        }
        .post-hero {
          background: #1a1a1a;
          padding: 100px 24px 52px;
          text-align: center;
        }
        .post-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(247,243,234,0.45);
          margin-bottom: 16px;
        }
        .post-hero h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(26px, 4.5vw, 40px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          max-width: 700px;
          margin: 0 auto 14px;
          line-height: 1.15;
        }
        .post-meta {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }
        .post-body {
          max-width: 680px;
          margin: 0 auto;
          padding: 52px 24px 32px;
        }
        .post-body p {
          font-size: 18px;
          line-height: 1.82;
          color: #2f2f2f;
          margin-bottom: 24px;
        }
        .post-body em { font-style: italic; color: #5a5a5a; }
        .post-body strong { font-weight: 600; color: #1a1a1a; }
        .post-img-block {
          margin: 36px 0;
          border-radius: 10px;
          overflow: hidden;
        }
        .post-img-block img {
          width: 100%;
          display: block;
          border-radius: 10px;
        }
        .post-img-caption {
          font-size: 13px;
          color: #aaa;
          margin-top: 10px;
          text-align: center;
          font-style: italic;
        }
        .post-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 36px 0;
        }
        .post-divider hr { flex: 1; border: none; border-top: 1px solid #e0ddd8; }
        .post-divider-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #d0cdc8;
        }
        .post-back {
          display: inline-block;
          margin-top: 40px;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .post-callout {
          border-left: 4px solid #1a1a1a;
          background: #fff;
          padding: 20px 24px;
          margin: 32px 0;
          border-radius: 0 8px 8px 0;
        }
        .post-callout p {
          font-size: 19px !important;
          font-weight: 600;
          color: #1a1a1a !important;
          font-style: italic;
          margin: 0 !important;
          line-height: 1.5 !important;
        }
      `}</style>

      <Nav />

      <div className="post-wrap">
        <div className="post-hero">
          <div className="post-tag">Culture · May 2026</div>
          <h1>Putting on my politics hat…</h1>
          <div className="post-meta">Aaron Kushner &nbsp;·&nbsp; Founder, FlyIRL</div>
        </div>

        <div className="post-body">
          <p>
            We can all agree America is extremely divided, enabled by our own technological prowess
            and uniquely free market system, our original but outdated political system, and of course
            the arc of history: empires rise and fall. And the fact is, this is not a new situation.
            Look back at the red scare of the McCarthy era, the hard hats and long hairs of the Vietnam
            era. It was traumatic and messy but we survived. America will survive this too. To date
            myself as an &rsquo;80s kid, in the words of Billy Joel: We didn&rsquo;t start the fire.
          </p>
          <p>
            But the fact is, now we have two sides digging in, both suspicious and convinced
            the other is a threat to the values and security of America, leaving the quiet majority
            of independent voters with pretty stark choices, with almost diametrically opposed visions
            of both America&rsquo;s past and its future.
          </p>

          <div className="post-callout">
            <p>
              &ldquo;I believe we can rise above it&hellip; literally. Get out of our echo chambers&hellip;
              and into the sky!&rdquo;
            </p>
          </div>

          <p>
            It may be simplistic or naive, but I believe human flight is something we can all agree
            on — a place, a concept, a dream surely as old as the first humans gazing at the freedom
            and joy that only birds get to feel. A dream, it turns out, whose time has finally come.
            So let&rsquo;s start by focusing on the positive, something that is symbolic of both American
            freedom and American greatness: Our role as pioneers and continuing excellence in Aviation.
          </p>

          <p>
            So let&rsquo;s make flight for all a reality. Let&rsquo;s share in the joy and freedom, the freedom
            to explore and push boundaries, to disrupt old orthodoxies, and to adapt to new ones —
            that is the center of our power and success as a nation. Give thought and attention to,
            wherever our personal politics may fall, left, middle, and right, we can all agree on
            this: how lucky we are to be here, and to be free. In China, for example, for obvious
            reasons{" "}
            <em>(FREEDOM!)</em>{" "}
            there is no General Aviation community.
          </p>

          <div className="post-img-block">
            <img src="/images/sabrina.jpg" alt="Sabrina Carpenter as an all-American sky captain releasing a dove of peace at the Grammys 2026" />
            <div className="post-img-caption">
              Peace Through Flight! It can work. Just ask Sabrina Carpenter.
            </div>
          </div>

          <div className="post-divider">
            <hr /><div className="post-divider-dot" /><hr />
          </div>

          <p>
            It could work. Because the dream of human flight is universal, and tied from birth to
            the core principles and values that indisputably make America great — the core of our
            success as a nation. America First, but then the world.
          </p>

          <Link href="/blog" className="post-back">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </>
  );
}
