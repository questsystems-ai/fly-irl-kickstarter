import Link from "next/link";
import Nav from "@/components/Nav";

const posts = [
  {
    slug: "politics",
    title: "Putting on my politics hat…",
    date: "May 2026",
    excerpt:
      "America is divided as never before. I believe we can rise above it — literally. Get out of our echo chambers and into the sky. It may be simplistic, but I believe human flight is something we can all agree on.",
    tag: "Culture",
  },
  {
    slug: "revolution",
    title: "A Revolution in General Aviation?",
    date: "April 2026",
    excerpt:
      "Big words, little man! But it's been a LOOOONNNGG time since something really revolutionary happened in general aviation. Here's why this idea's time has finally come.",
    tag: "Aviation History",
  },
];

export default function BlogIndex() {
  return (
    <>
      <style>{`
        .blog-wrap {
          background: #f9f8f6;
          min-height: 100vh;
          padding-bottom: 80px;
        }
        .blog-hero {
          background: #1a1a1a;
          padding: 100px 24px 56px;
          text-align: center;
        }
        .blog-hero-eyebrow {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(247,243,234,0.5);
          margin-bottom: 14px;
        }
        .blog-hero h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
        }
        .blog-hero p {
          margin-top: 14px;
          font-size: 17px;
          color: rgba(255,255,255,0.55);
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }
        .blog-grid {
          max-width: 780px;
          margin: 52px auto 0;
          padding: 0 24px;
          display: grid;
          gap: 28px;
        }
        .blog-card {
          background: #fff;
          border: 1px solid #e8e5e0;
          border-radius: 12px;
          padding: 32px;
          transition: box-shadow 0.15s ease, transform 0.15s ease;
          display: block;
          text-decoration: none;
          color: inherit;
        }
        .blog-card:hover {
          box-shadow: 0 6px 28px rgba(0,0,0,0.09);
          transform: translateY(-2px);
        }
        .blog-card-tag {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #aaa;
          margin-bottom: 10px;
        }
        .blog-card h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: 21px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 10px;
          line-height: 1.25;
        }
        .blog-card-meta {
          font-size: 12px;
          color: #bbb;
          margin-bottom: 14px;
        }
        .blog-card p {
          font-size: 15px;
          color: #5a5a5a;
          line-height: 1.72;
          margin-bottom: 20px;
        }
        .blog-card-read {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>

      <Nav />

      <div className="blog-wrap">
        <div className="blog-hero">
          <div className="blog-hero-eyebrow">FlyIRL</div>
          <h1>Blog</h1>
          <p>Thoughts on flight, technology, and the future from Aaron, founder of FlyIRL.</p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-tag">{post.tag}</div>
              <h2>{post.title}</h2>
              <div className="blog-card-meta">{post.date} · Aaron Kushner</div>
              <p>{post.excerpt}</p>
              <span className="blog-card-read">Read more →</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
