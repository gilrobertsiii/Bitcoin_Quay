import Link from "next/link";

import { IndustryConstellation } from "@/components/industry-constellation";
import { MailtoCta } from "@/components/mailto-cta";
import { HOME_CONTENT, INDUSTRIES, NON_CERTIFICATION_NOTICE } from "@/lib/content";
import {
  COMMONS_URL,
  CONTRIBUTE_INVITE_MAILTO,
  CU_UPDATES_MAILTO,
} from "@/lib/copy";

export default function HomePage() {
  const { hero, helloWorld, sneakPeek, deeperDive, commonsStrip, contribute } =
    HOME_CONTENT;

  return (
    <>
      {/* 1) Hero section — hook in <= 5 seconds */}
      <section className="section hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="kicker">{hero.kicker}</p>
            <h1>{hero.title}</h1>
            <p className="hero-subtitle">{hero.subtitle}</p>
            <p className="lede">{hero.catchphrase}</p>
            <div className="cta-row">
              <Link className="action" href={hero.ctaUsers.href}>
                {hero.ctaUsers.label}
              </Link>
              <Link
                className="action action-secondary"
                href={hero.ctaContributors.href}
              >
                {hero.ctaContributors.label}
              </Link>
            </div>
          </div>
          <IndustryConstellation />
        </div>
      </section>

      {/* 2) Hello World — why care (~30s elevator pitch, no CTA) */}
      <section className="section section-divider">
        <div className="container narrow">
          <p className="kicker">{helloWorld.kicker}</p>
          <h2>{helloWorld.heading}</h2>
          {helloWorld.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <p className="peek-ahead">{helloWorld.peekAhead}</p>
        </div>
      </section>

      {/* 3) Sneak Peek — Credit Unions & CDFIs */}
      <section id="cu-updates" className="section section-divider">
        <div className="container narrow">
          <p className="kicker">{sneakPeek.kicker}</p>
          <h2>{sneakPeek.heading}</h2>
          <p>{sneakPeek.body}</p>
          <p className="notice">{NON_CERTIFICATION_NOTICE}</p>
          <div className="cta-row">
            <MailtoCta href={CU_UPDATES_MAILTO} label={sneakPeek.ctaLabel} />
          </div>
        </div>
      </section>

      {/* 4) Deeper Dive — summary explainer leading to /breakdown */}
      <section className="section section-divider">
        <div className="container">
          <div className="narrow">
            <p className="kicker">{deeperDive.kicker}</p>
            <h2>{deeperDive.heading}</h2>
            <p>{deeperDive.intro}</p>
            <p>{deeperDive.orderNote}</p>
          </div>

          <div className="grid">
            {deeperDive.layers.map((layer) => (
              <article key={layer.name} className="card">
                <h3>{layer.name}</h3>
                <p>{layer.gloss}</p>
              </article>
            ))}
          </div>

          <ol className="order-strip" aria-label="Target sectors in rollout order">
            {INDUSTRIES.map((sector) => (
              <li key={sector.slug}>
                <span className="order-num">{sector.rank}.</span>{" "}
                {sector.shortName}
              </li>
            ))}
          </ol>

          <div className="cta-row">
            <Link className="action" href={deeperDive.ctaHref}>
              {deeperDive.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* 5) Commons Strip — full-bleed band across the page */}
      <section className="strip" aria-labelledby="commons-strip-heading">
        <div className="container strip-inner">
          <div className="strip-copy">
            <p className="kicker">{commonsStrip.kicker}</p>
            <h2 id="commons-strip-heading">{commonsStrip.heading}</h2>
            <p className="strip-text">{commonsStrip.paragraph}</p>
          </div>
          <div className="strip-cta">
            <a
              className="action"
              href={COMMONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {commonsStrip.ctaLabel} ↗
            </a>
          </div>
        </div>
      </section>

      {/* 6) How to contribute promo */}
      <section className="section">
        <div className="container narrow">
          <p className="kicker">{contribute.kicker}</p>
          <h2>{contribute.heading}</h2>
          <p>{contribute.body}</p>
          <div className="cta-row">
            <MailtoCta
              href={CONTRIBUTE_INVITE_MAILTO}
              label={contribute.ctaInviteLabel}
            />
            <Link className="action action-secondary" href="/project#contribute">
              {contribute.ctaProjectLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
