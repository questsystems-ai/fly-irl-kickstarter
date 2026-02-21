"use client";

import Nav from "@/components/Nav";

export default function StoryPage() {
  return (
    <>
      <style>{`
        .story-hero {
          background: linear-gradient(165deg, var(--dark2) 0%, #1e1e1e 50%, #2a2520 100%);
          color: #fff;
          padding: 130px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .story-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 120%, rgba(247,243,234,0.06) 0%, transparent 70%);
        }
        .story-hero-inner {
          position: relative;
          max-width: 700px;
          margin: 0 auto;
        }
        .story-hero h1 {
          font-size: clamp(32px, 5.5vw, 52px);
          font-weight: 800;
          margin-bottom: 18px;
          letter-spacing: -1px;
        }
        .story-hero h1 span { color: var(--accent); }
        .story-hero .subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.7);
          font-weight: 300;
          max-width: 520px;
          margin: 0 auto;
        }

        /* Narrative body */
        .story-body {
          max-width: 680px;
          margin: 0 auto;
          padding: 64px 24px 80px;
        }
        .story-body p {
          font-size: 17px;
          line-height: 1.75;
          color: var(--ink);
          margin-bottom: 20px;
        }
        .story-body p.muted {
          color: var(--muted);
        }
        .story-body em {
          font-style: italic;
        }
        .story-body strong {
          font-weight: 600;
          color: var(--ink);
        }

        /* Section breaks within the narrative */
        .story-break {
          display: block;
          width: 40px;
          height: 2px;
          background: var(--border);
          margin: 40px auto;
        }

        /* Pull quote */
        .story-pull {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(22px, 3.5vw, 30px);
          font-weight: 700;
          line-height: 1.3;
          color: var(--dark);
          text-align: center;
          max-width: 560px;
          margin: 48px auto;
          padding: 32px 0;
          border-top: 2px solid var(--border);
          border-bottom: 2px solid var(--border);
        }
        .story-pull span {
          color: var(--muted);
          font-weight: 400;
          font-size: 0.65em;
          display: block;
          margin-top: 10px;
        }

        /* Crisis callout */
        .story-crisis {
          background: var(--dark);
          color: #fff;
          margin: 48px -24px;
          padding: 40px 32px;
          border-radius: 0;
          position: relative;
        }
        .story-crisis::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: var(--accent);
        }
        .story-crisis p {
          color: rgba(255,255,255,0.88);
          font-size: 17px;
          line-height: 1.75;
          margin-bottom: 18px;
        }
        .story-crisis p:last-child { margin-bottom: 0; }

        /* AI miracle section */
        .story-miracle {
          text-align: center;
          padding: 48px 0;
        }
        .story-miracle h2 {
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
          margin-bottom: 24px;
          color: var(--dark);
        }

        /* Bottom CTA */
        .story-cta {
          background: var(--dark);
          color: #fff;
          padding: 64px 24px;
          text-align: center;
        }
        .story-cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }
        .story-cta h2 {
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 700;
          margin-bottom: 18px;
        }
        .story-cta p {
          color: rgba(255,255,255,0.75);
          font-size: 17px;
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .story-cta-links {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .story-cta-btn {
          display: inline-block;
          padding: 14px 28px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: transform 0.15s ease;
        }
        .story-cta-btn:hover { transform: translateY(-2px); }
        .story-cta-btn.primary {
          background: var(--accent);
          color: var(--accentText);
        }
        .story-cta-btn.secondary {
          border: 1px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.9);
        }

        @media (max-width: 680px) {
          .story-crisis {
            margin: 40px -16px;
            padding: 32px 24px;
          }
        }
      `}</style>

      <Nav />

      {/* HERO */}
      <section className="story-hero">
        <div className="story-hero-inner">
          <h1>How I Got <span>Here</span></h1>
          <p className="subtitle">
            The long, unlikely path from daydreaming about flight to building a place where anyone can fly.
          </p>
        </div>
      </section>

      {/* NARRATIVE */}
      <article className="story-body">

        {/* BEAT 1: ORDINARY WORLD */}
        <p>
          As long as I can remember, I've been dreaming of flying. Not a math person, a writer,
          a day dreamer. So for me, it's always been about airplanes. One problem: I hate math.
          I can do it if I have to… I just don't like it. And for someone working in advanced
          engineering research, even I knew in 5th grade, math had to come pretty naturally.
        </p>
        <p>
          So I just daydreamed about it. And looked for some kind of engineering that didn't
          involve math.
        </p>

        <span className="story-break" />

        {/* BEAT 2: THE PATH */}
        <p>
          That led me to organic chemistry, which is extremely light in math, but heavy on
          "daydreaming" — just not about airplanes: instead about the shapes of the tiniest
          structures around, molecules, how to engineer them to fit in protein pockets for
          cancer-fighting medicines, or it turns out… to make materials stronger, tougher
          and lighter. Now those ARE things of interest to the designers and builders of airplanes.
        </p>
        <p>
          I left the pharma startup world, moved back in with my parents and worked for my dad
          while I looked for the right lab, which I found at the Guan lab at UC Irvine. So I
          went back to school, where we — after 10 years of swimming in chemicals that will
          melt your nuts off — invented a new material.
        </p>
        <p>
          This was my chance. We started working with aero engineering companies to develop
          things like self-healing transparent armor, and I got some government startup
          funding to go for it… which I did. Zero thought to the risk, zero thought to my
          life, I could see it right in front of me…
        </p>

        <div className="story-pull">
          And then the bottom fell out.
        </div>

        {/* BEAT 3: THE CRISIS */}
        <div className="story-crisis">
          <p>
            And I had my crisis. An epic mental health breakdown. After 5 hard years on
            the bench — literally on a sofa — working through my own issues, I started the long
            climb out, building electric guitars, living with my parents.
          </p>
          <p>
            Then, an opportunity to get back in the materials game! Then setbacks: COVID shut my
            avenues down, then horrible back pain from being glued to a sofa for five years as my
            mental health debacle got sorted. Nothing worked. Finally I figured out the issue — call
            it "sedentary human disease" — and then 3 years of hard strength work and a lotta pain
            before I could sit in a car for the LA–SF trip, or walk 5 miles again.
          </p>
          <p>
            Meanwhile I felt my life, my productive years, my dreams… fading away. But I put that
            aside and worked.
          </p>
        </div>

        <span className="story-break" />

        {/* BEAT 4: THE REALIZATION */}
        <p>
          I am also extremely fortunate to have a very supportive family. I lived and worked
          out of my parents' house, no personal life to speak of as I built, as I picked and
          probed at ways to, somehow, get into aviation — not just get into it… to change it.
          It wasn't going to be about aircraft design, cool as that would be. It was gonna be
          about putting something in place that let <em>anyone</em> fly.
        </p>
        <p>
          And then I had a realization. Almost all the technology was there. And the regulations
          too: what we're talking about is very similar to urban air mobility in aircraft and
          systems design. And over my long period of recovery, battery, motor, and computer
          power had all increased dramatically. That means lots of weight to add safety
          systems, to a plane purpose-built for a new mission. Maximum fun, maximum accessibility.
        </p>
        <p>
          So if it's all there, why hasn't someone else done this? Lots of reasons. But it's
          a fact that it can be done, and that no one has: Flight as safe and thrilling as a
          roller coaster… where anyone can just walk up and fly. I could do it. And I would
          continue to sacrifice to do it. But who was I, a non-engineer without a lot of tech
          connections, no cred in aerospace… no one was going to fund my dream just based on my
          passion and a PowerPoint deck.
        </p>

        {/* BEAT 5: THE MIRACLE */}
        <div className="story-miracle">
          <h2>Then, for me anyway, a miracle: AI.</h2>
        </div>

        <p>
          Here was something that could take my dreams and organize them, convert them to
          numbers, and present them. That could draw on basically the entirety of technical
          knowledge when rendering opinions or solutions. That could code, at least to
          prototype, anything I wanted.
        </p>
        <p>
          I worked for a year, learning how to use AI as AI got better and better, then actually
          building prototypes of key park systems — collision avoidance with switchable aircraft
          control between guest pilot and the autonomous safety system. An AR HUD so the guest
          pilot never has to look at a dial, or think about anything other than flying. A digital
          wind tunnel for AI-accelerated aircraft design and testing.
        </p>
        <p>
          The foundations, it turns out, of what this Kickstarter aims to fund: a soup-to-nuts
          simulation of the dream, physically realistic in every aspect — something that not
          only provides a perfect cyber-replica of the SkyPark concept, but also serves as a
          silicon testing laboratory, getting 90% of the way there for $5 million, not 50.
        </p>
        <p>
          And that was just the coding half. Now, with generative video AI, I can literally take
          the daydreams out of my head and put them on the screen for all to see. For someone
          who thinks in cinematic scenes but can't draw, it's nothing short of a miracle. So I
          stopped coding and started communicating. I can do it myself, but it would take years.
          Or I can get funding and do it in one. So, here we are.
        </p>

        <span className="story-break" />

        {/* BEAT 6 & 7: THE ASK + VISION */}
        <p>
          Because the fact is, even though the economics of the business look good, the vision
          is 100% doable technically, this dream cannot move forward without "proof of market."
          Quite simply, this is a totally new product, one that addresses a pain point so
          ingrained, that people who dream of flying don't even think about it anymore. That's
          why this Kickstarter needs to succeed. Not to get to the end, but to get the dream —
          not MY dream, but a near-universal, effectively eternal dream — off the ground.
          After that, nothing will stop it.
        </p>
        <p>
          It's by no means a sure thing. We're asking people to support something with their
          hard-earned dollars that won't deliver the end product for… up to 10 years. But in
          this case we think it's more about the journey than the reward. Or anyway, as much
          as is possible, when the reward is… GETTING TO FLY!
        </p>
        <p>
          Thanks to technology, it's possible for millions of people to participate, to
          contribute, to influence the project in real ways. And along the way — the
          prototypes, the testing, the design reviews, the failures, the breakthroughs —
          you're not watching from the sidelines. You're in it.
        </p>
        <p>
          <strong>
            I've given this everything I have. I'm not going anywhere. Now I need to know:
            is it just me? Or is this something we all want?
          </strong>
        </p>
      </article>

      {/* BOTTOM CTA */}
      <section className="story-cta">
        <div className="story-cta-inner">
          <h2>See what we're building</h2>
          <p>
            The story is why. The next two pages are what and how.
          </p>
          <div className="story-cta-links">
            <a href="/vision" className="story-cta-btn primary">The Vision →</a>
            <a href="/kickstarter" className="story-cta-btn secondary">The Kickstarter →</a>
          </div>
        </div>
      </section>
    </>
  );
}
