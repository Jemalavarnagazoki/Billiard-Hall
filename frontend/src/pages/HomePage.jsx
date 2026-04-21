import hallImage from '../assets/hall.jpg';
import PageHero from '../components/PageHero';
import { RouteLink } from '../components/RouteLink';
import { useLocale } from '../context/LocaleContext';
import useVenueSummary from '../hooks/useVenueSummary';

export default function HomePage() {
  const { summary, error } = useVenueSummary();
  const { content } = useLocale();

  return (
    <main>
      <PageHero
        description={content.hero.description}
        eyebrow={content.hero.eyebrow}
        image={hallImage}
        primaryAction={{ to: '/reserve', label: content.ui.home.primaryAction }}
        secondaryAction={{ to: '/menu', label: content.ui.home.secondaryAction }}
        title={content.hero.title}
      >
        <div className="home-hero-panel">
          <div className="home-hero-summary">
            <article>
              <span>{content.ui.home.availableToday}</span>
              <strong>{summary.remainingTables}</strong>
            </article>
            <article>
              <span>{content.ui.home.totalTables}</span>
              <strong>{summary.totalTables}</strong>
            </article>
          </div>

          <div className="home-call-list">
            {content.phones.map((phone) => (
              <a className="contact-chip" href={`tel:${phone}`} key={phone}>
                <span>{content.ui.home.callLabel}</span>
                <strong>{phone}</strong>
              </a>
            ))}
          </div>

          {error ? <p className="form-message">{error}</p> : null}
        </div>
      </PageHero>

      <section className="section home-info-section">
        <div className="container home-info-grid">
          {content.quickInfo.map((item) => (
            <article className="info-strip-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section home-features-section">
        <div className="container home-features-grid">
          <div className="section-heading section-heading-compact">
            <p className="eyebrow">{content.ui.home.whyVisitEyebrow}</p>
            <h2>{content.ui.home.whyVisitTitle}</h2>
          </div>

          <div className="feature-grid">
            {content.highlights.map((item) => (
              <article className="feature-card" key={item.title}>
                <p className="feature-eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-vibe-section">
        <div className="container vibe-grid">
          <div className="vibe-card vibe-card-dark">
            <p className="eyebrow">{content.ui.home.atmosphereEyebrow}</p>
            <h2>{content.ui.home.atmosphereTitle}</h2>
            <ul className="vibe-list">
              {content.vibePoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="vibe-card vibe-card-accent">
            <p className="eyebrow">{content.ui.home.readyEyebrow}</p>
            <h2>{content.ui.home.readyTitle}</h2>
            <p>{content.ui.home.readyCopy}</p>
            <RouteLink className="button button-primary button-large" to="/reserve">
              {content.ui.home.primaryAction}
            </RouteLink>
          </div>
        </div>
      </section>
    </main>
  );
}
