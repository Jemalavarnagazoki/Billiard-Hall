import { Link } from 'react-router-dom';
import hallImage from '../assets/hall.jpg';
import PageHero from '../components/PageHero';
import { siteContent } from '../data/siteContent';
import useVenueSummary from '../hooks/useVenueSummary';

export default function HomePage() {
  const { summary, error } = useVenueSummary();

  return (
    <main>
      <PageHero
        description={siteContent.hero.description}
        eyebrow={siteContent.hero.eyebrow}
        image={hallImage}
        primaryAction={{ to: '/reserve', label: 'დაჯავშნე მაგიდა' }}
        secondaryAction={{ to: '/prices', label: 'ნახე მენიუ' }}
        title={siteContent.hero.title}
      >
        <div className="home-hero-panel">
          <div className="home-hero-summary">
            <article>
              <span>დღეს თავისუფალია</span>
              <strong>{summary.remainingTables}</strong>
            </article>
            <article>
              <span>სულ მაგიდა</span>
              <strong>{summary.totalTables}</strong>
            </article>
          </div>

          <div className="home-call-list">
            {siteContent.phones.map((phone) => (
              <a className="contact-chip" href={`tel:${phone}`} key={phone}>
                <span>დარეკე</span>
                <strong>{phone}</strong>
              </a>
            ))}
          </div>

          {error ? <p className="form-message">{error}</p> : null}
        </div>
      </PageHero>

      <section className="section home-info-section">
        <div className="container home-info-grid">
          {siteContent.quickInfo.map((item) => (
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
            <p className="eyebrow">რატომ ჩვენთან</p>
            <h2>სწრაფი არჩევანი. კარგი ატმოსფერო.</h2>
          </div>

          <div className="feature-grid">
            {siteContent.highlights.map((item) => (
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
            <p className="eyebrow">Vibe</p>
            <h2>ადგილი საღამოსთვის</h2>
            <ul className="vibe-list">
              {siteContent.vibePoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="vibe-card vibe-card-accent">
            <p className="eyebrow">Ready to play</p>
            <h2>დაჯავშნე და მოდი</h2>
            <p>{siteContent.address}</p>
            <Link className="button button-primary button-large" to="/reserve">
              ჯავშანზე გადასვლა
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
