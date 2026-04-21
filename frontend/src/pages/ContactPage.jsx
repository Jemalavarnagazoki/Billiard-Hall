import { useLocale } from '../context/LocaleContext';

const mapQuery = encodeURIComponent('41.6908365,44.8803262');

export default function ContactPage() {
  const { content } = useLocale();

  return (
    <main>
      <section className="section contact-page-section">
        <div className="container contact-page-title">
          <p className="eyebrow">{content.ui.contact.eyebrow}</p>
          <h1>{content.ui.contact.title}</h1>
        </div>

        <div className="container contact-page-grid">
          <div className="map-card">
            <iframe
              className="map-frame"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              title={content.ui.contact.mapTitle}
            />
          </div>

          <div className="contact-page-cards">
            <article className="large-contact-card">
              <p className="feature-eyebrow">{content.ui.contact.address}</p>
              <strong>{content.address}</strong>
            </article>

            <article className="large-contact-card">
              <p className="feature-eyebrow">{content.ui.contact.phone}</p>
              {content.phones.map((phone) => (
                <a className="contact-line" href={`tel:${phone}`} key={phone}>
                  {phone}
                </a>
              ))}
            </article>

            <article className="large-contact-card">
              <p className="feature-eyebrow">{content.ui.contact.hours}</p>
              <strong>{content.hours}</strong>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
