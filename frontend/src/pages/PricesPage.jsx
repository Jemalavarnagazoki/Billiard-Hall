import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';

export default function PricesPage() {
  return (
    <main>
      <section className="section prices-page-section">
        <div className="container prices-layout">
          <div className="prices-main">
            <div className="prices-header prices-header-wide">
              <p className="eyebrow">ფასები</p>
              <h1>თამაშის ფასები</h1>
              <p className="section-copy">ბილიარდისა და PlayStation-ის საათობრივი ფასები.</p>
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
            <p className="eyebrow">მენიუ</p>
            <strong>{siteContent.hours}</strong>
            <span>სასმელები და სნექი ნახე ცალკე მენიუს გვერდზე.</span>
            <Link className="button button-secondary button-large prices-sticky-button" to="/menu">
              მენიუს ნახვა
            </Link>
            <Link className="button button-primary button-large prices-sticky-button" to="/reserve">
              დაჯავშნე ახლავე
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
