import { siteContent } from '../data/siteContent';

const mapQuery = encodeURIComponent('41.6908365,44.8803262');

export default function ContactPage() {
  return (
    <main>
      <section className="section contact-page-section">
        <div className="container contact-page-title">
          <p className="eyebrow">Contact</p>
          <h1>კონტაქტი</h1>
        </div>

        <div className="container contact-page-grid">
          <div className="map-card">
            <iframe
              className="map-frame"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              title="Billiard Hall location"
            />
          </div>

          <div className="contact-page-cards">
            <article className="large-contact-card">
              <p className="feature-eyebrow">მისამართი</p>
              <strong>{siteContent.address}</strong>
            </article>

            <article className="large-contact-card">
              <p className="feature-eyebrow">ტელეფონი</p>
              {siteContent.phones.map((phone) => (
                <a className="contact-line" href={`tel:${phone}`} key={phone}>
                  {phone}
                </a>
              ))}
            </article>

            <article className="large-contact-card">
              <p className="feature-eyebrow">სამუშაო საათები</p>
              <strong>{siteContent.hours}</strong>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
