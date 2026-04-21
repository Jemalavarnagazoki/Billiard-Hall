import { RouteLink } from '../components/RouteLink';
import { useLocale } from '../context/LocaleContext';

export default function PricesPage() {
  const { content } = useLocale();

  return (
    <main>
      <section className="section prices-page-section">
        <div className="container prices-layout">
          <div className="prices-main">
            <div className="prices-header prices-header-wide">
              <p className="eyebrow">{content.ui.prices.eyebrow}</p>
              <h1>{content.ui.prices.title}</h1>
              <p className="section-copy">{content.ui.prices.description}</p>
            </div>

            <div className="prices-page-grid">
              {content.pricing.map((item) => (
                <article className={`prices-page-card${item.featured ? ' is-featured' : ''}`} key={item.title}>
                  <p className="feature-eyebrow">{item.note}</p>
                  <h2>{item.title}</h2>
                  <strong>{item.price}</strong>
                  <span>{item.featured ? content.ui.prices.featuredLabel : content.ui.prices.secondaryLabel}</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="prices-sticky-card">
            <p className="eyebrow">{content.ui.prices.sidebarEyebrow}</p>
            <strong>{content.ui.prices.sidebarTitle}</strong>
            <span>{content.ui.prices.sidebarCopy}</span>
            <RouteLink className="button button-secondary button-large prices-sticky-button" to="/menu">
              {content.ui.prices.menuAction}
            </RouteLink>
            <RouteLink className="button button-primary button-large prices-sticky-button" to="/reserve">
              {content.ui.prices.reserveAction}
            </RouteLink>
          </aside>
        </div>
      </section>
    </main>
  );
}
