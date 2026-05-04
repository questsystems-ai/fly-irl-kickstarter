import Nav from "@/components/Nav";
import Link from "next/link";

export default function RevolutionBlogPost() {
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
          max-width: 720px;
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
        }
        .post-img-block img {
          width: 100%;
          display: block;
          border-radius: 10px;
        }
        .post-img-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin: 36px 0;
        }
        .post-img-pair img {
          width: 100%;
          display: block;
          border-radius: 8px;
          height: 200px;
          object-fit: cover;
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
        .post-back {
          display: inline-block;
          margin-top: 40px;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        @media (max-width: 600px) {
          .post-img-pair { grid-template-columns: 1fr; }
        }
      `}</style>

      <Nav />

      <div className="post-wrap">
        <div className="post-hero">
          <div className="post-tag">Aviation History · April 2026</div>
          <h1>A Revolution in General Aviation?</h1>
          <div className="post-meta">Aaron Kushner &nbsp;·&nbsp; Founder, FlyIRL</div>
        </div>

        <div className="post-body">
          <p>A revolution in general aviation?</p>

          <p><em>Big words, little man!</em></p>

          <p>One could reasonably say.</p>

          <p>
            But I mean, it&rsquo;s been a LOOOONNNGG time since something really revolutionary,
            something disruptive, happened in general aviation. So this idea — basically making
            one airplane and one system, designed for mass production, in other words a scalable
            civilian aircraft that can open up flight to the mass market, with a scalable tech
            airstrip installation — like the McDonald&rsquo;s of flight, except instead of a burger
            assembly line in the city, you use tech to offer drive-up-and-fly in the country.
            But it&rsquo;s the same principle of a new model that unlocks a huge unserved market.
          </p>

          <p><em>OK so not a revolution&hellip; You&rsquo;re the next McDonald&rsquo;s.</em></p>
          <p><em>OK I can&rsquo;t win.</em></p>

          <p>
            Forget all that. Here&rsquo;s the way looking at aviation history, as I see it, has
            determined that this idea&rsquo;s time has come.
          </p>

          <p>
            Flying in America started out as all fun and joy, the entrepreneurial spirit of
            adventure, before rules and war took things in a completely different direction.
          </p>

          <div className="post-img-block">
            <img src="/images/blog/revolution/beachey-oldfield.jpg" alt="Beachey vs Oldfield — the devil in the sky vs. the demon on the ground" />
            <div className="post-img-caption">
              Beachey vs Oldfield. &ldquo;The devil in the sky&rdquo; vs. &ldquo;the demon on the ground.&rdquo; Image from The Old Motor.
            </div>
          </div>

          <p>
            Flying in America actually matured, after a stint of rapid technological progress
            because of war, into pilots flying around in fun little planes low to the ground,
            landing in a field near some town USA, and giving the townsfolk fun-ass joyrides —
            not a bad way to make a living. Say, the &ldquo;youth&rdquo; of flight culture, the tech and the
            people, born and raised in America.
          </p>

          <div className="post-img-pair">
            <img src="/images/blog/revolution/barnstorming.jpg" alt="Airplane rides poster, 50 cents" />
            <img src="/images/blog/revolution/barnstorming.jpg" alt="Biplane with joyrides banner" style={{ objectPosition: "right" }} />
          </div>
          <div className="post-img-caption">The barnstorming era: airplane rides for 50 cents, townsfolk lining up for joyrides.</div>

          <p>
            Of course these things were made out of wood and cloth, as the petroleum age had yet
            to yield the advanced materials we all take for granted today. And the US was starting
            to get its act together to regulate the safety of products generally. Which had to be
            done: like in food and medicine, shoddy work and unscrupulous actors could result in
            terrifying and untimely customer death.
          </p>

          <div className="post-img-block">
            <img src="/images/blog/revolution/beachey-fall.jpg" alt="Lincoln Beachey falls to his death at the World's Fair, San Francisco" />
            <div className="post-img-caption">
              (With a resounding snap of wood breaking, the daredevil of the skies Lincoln Beachey
              plummets to his death at the World&rsquo;s Fair in San Francisco.)
            </div>
          </div>

          <div className="post-divider">
            <hr /><div className="post-divider-dot" /><hr />
          </div>

          <p>
            In the case of flight, the complex system of constraints and regulations enabled the
            whole GA system, which today allows a relatively large number of people — considering
            we&rsquo;re talking about <em>humans being able to fly</em> — to take wing, as it were. But
            still, compared to the general population, that used to be able to roll up on a picnic
            and get in the sky for 15 minutes for like 10 cents, personal flight is by and large
            a non-starter for the average American.
          </p>

          <p>
            So that&rsquo;s where civilian aircraft design went. Very limited access, because of the
            expense and complexity, forcing a shift in focus from the freedom birds feel, to the
            freedom of their ability to go wherever they want, whenever they want.
          </p>

          <p>
            Since that was the case, once there&rsquo;s a basic model that works well enough, as the
            planes and procedures of the GA world became, there&rsquo;s no real need or incentive to
            change the original designs really&hellip; They work. Their designers had free run to
            optimize designs, because the technology had just become available, and no one else
            had really thought about it yet. And they were very, very good. They didn&rsquo;t leave
            a lot of room for improvement.
          </p>

          <div className="post-img-block">
            <img src="/images/blog/revolution/cirrus.jpg" alt="Cirrus aircraft — beautiful design, same fatal accident rate as every other GA plane" />
            <div className="post-img-caption">
              The American flight story of Cirrus started with dreamers in a garage. In the end,
              their very commercially successful plane looks like every other plane out there —
              and despite adding a big parachute, the fatal accident rate remains on the same
              order as every other GA plane.
            </div>
          </div>

          <p>
            New milestones went to the military, where higher, harder, faster is the order of
            the day. Some of the coolest and most amazing STEM over decades, heroic stories in
            a golden age for America — but other than vicarious living or vivid imaginations,
            it completely left the ordinary folks behind.
          </p>

          <div className="post-img-block">
            <img src="/images/blog/revolution/military-jets.jpg" alt="Military jets lined up on a runway" />
          </div>

          <div className="post-img-block">
            <img src="/images/blog/revolution/f22.jpg" alt="F-22 Raptor banking over mountains" />
          </div>

          <div className="post-divider">
            <hr /><div className="post-divider-dot" /><hr />
          </div>

          <p>
            Of course, the technology we enjoy in society today — much of it got started in those
            defense labs and airfields, in order to keep aircraft pushing the limits, in order to
            protect the freedom and prosperity of the West. And just like when the technology of
            flight was invented at the dawn of the petroleum age, we are in another moment where
            the technology is suddenly and massively here — though this time it&rsquo;s computation,
            materials science, autonomy and AI, not mining engineering and internal combustion
            as it was for the Wright brothers.
          </p>

          <p>
            One highly anticipated manifestation of this technological turning point is Urban Air
            Mobility: your Joby&rsquo;s, your Archer&rsquo;s. It&rsquo;s a specific kind of mission&hellip; there&rsquo;s a
            reason all of their new aircraft designs combine very similar elements.
          </p>

          <div className="post-img-block">
            <img src="/images/blog/revolution/joby.jpg" alt="Joby Aviation eVTOL aircraft in a hangar" />
          </div>

          <p>
            If UAM — zipping people around and between cities and suburbs with no trained pilot
            on board — is possible, and not just possible but in process of what everyone assumes
            will be scaled deployment with complete regulations and tested systems in place&hellip;
            then it has to be said that our SkyPark idea, if pursued, would be on a similar
            trajectory, similar timeline, with different looking aircraft built for a different
            mission, but of the same quality, durability, electrification, low-cost maintenance,
            and digital safety redundancies.{" "}
            <em>
              (P.S. I know what I think the SkyPark aircraft should look like&hellip; but what do
              YOU think they should look like? Hit us up with your thoughts and ideas if you want!)
            </em>
          </p>

          <div className="post-img-block">
            <img src="/images/blog/revolution/uam-city.jpg" alt="Urban Air Mobility city concept illustration" />
          </div>

          <div className="post-callout">
            <p>
              &ldquo;Just as a thought experiment: the first step is to decide on a mission, then
              decide accordingly. Our mission is simple: maximum fun, zero injury accidents.
              No point A to point B needed.&rdquo;
            </p>
          </div>

          <p>
            So the plane doesn&rsquo;t need to be particularly fast, or go high or far. Opens up a lot
            of engineering bandwidth to be fun and safe, where you used to have to add weight and
            complexity in order to push the envelope for speed, altitude, and comfort. Not at a
            SkyPark. At the same time, batteries, computers, electric motors all got lighter and
            more powerful. Like in a big way&hellip; and fast. Meanwhile massive investment in tech
            systems built for safe autonomy are coming online.
          </p>

          <p>
            There&rsquo;s a lot of overlap with UAM: an airpark is just a vertiport in the middle of
            nowhere, with no obstacles and no other traffic. Just fun. Not transportation. So
            there&rsquo;s a lot of off-the-shelf tech that can speed things up. To prove something like
            this is safe, where any error is likely to be an injury or fatality, you need to run
            it for a LOONNGG time error-free with no humans aboard. Which is why, with your help,
            we can get that started. Let&rsquo;s get that clock ticking!
          </p>

          <div className="post-img-block">
            <img src="/images/blog/revolution/skypark-seaplane.png" alt="SkyPark aircraft concept — electric seaplane taking off from a desert lake" />
            <div className="post-img-caption">
              What could the SkyPark aircraft look like? What do YOU think it should look like?
            </div>
          </div>

          <Link href="/blog" className="post-back">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </>
  );
}
