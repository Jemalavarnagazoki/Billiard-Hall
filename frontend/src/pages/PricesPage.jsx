import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';

export default function PricesPage() {
  return (
    <main>
      <section className="section prices-page-section">
        <div className="container prices-layout">
          <div className="prices-main">
            <div className="prices-header">
              <p className="eyebrow">ფასები</p>
              <h1>აირჩიე სასურველი თამაში</h1>
            </div>

            <div className="prices-page-grid">
              {siteContent.pricing.map((item) => (
                <article className={`prices-page-card${item.featured ? ' is-featured' : ''}`} key={item.title}>
                  <p className="feature-eyebrow">{item.note}</p>
                  <h2>{item.title}</h2>
                  <strong>{item.price}</strong>
                  <span>{item.featured ? 'ყველაზე მოთხოვნადი არჩევანი' : 'სწრაფი გასართობი ვარიანტი'}</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="prices-sticky-card">
            <p className="eyebrow">სწრაფი ჯავშანი</p>
            <strong>{siteContent.hours}</strong>
            <span>{siteContent.address}</span>
            <Link className="button button-primary button-large prices-sticky-button" to="/reserve">
              დაჯავშნე ახლავე
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
