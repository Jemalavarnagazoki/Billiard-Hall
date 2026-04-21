import { RouteLink } from '../components/RouteLink';
import { useLocale } from '../context/LocaleContext';

export default function MenuPage() {
  const { content } = useLocale();

  return (
    <main>
      <section className="section prices-page-section">
        <div className="container prices-layout">
          <div className="prices-main">
            <div className="prices-header prices-header-wide">
              <p className="eyebrow">{content.ui.menu.eyebrow}</p>
              <h1>{content.ui.menu.title}</h1>
              <p className="section-copy">{content.ui.menu.description}</p>
            </div>

            <div className="menu-shortcuts" aria-label="Menu categories">
              {content.menuCategories.map((category) => (
                <a className="menu-shortcut" href={`#${category.id}`} key={category.id}>
                  <span>{category.title}</span>
                  <small>{category.label}</small>
                </a>
              ))}
            </div>

            <div className="menu-board-grid">
              {content.menuCategories.map((category) => (
                <section className="menu-category-card" id={category.id} key={category.id}>
                  <div className="menu-category-head">
                    <h2>{category.title}</h2>
                    <span>{category.label}</span>
                  </div>

                  <div className="menu-item-list">
                    {category.items.map((item) => (
                      <div className="menu-item-row" key={`${category.id}-${item.name}`}>
                        <strong>{item.name}</strong>
                        <span>{item.price} {content.ui.common.currency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="prices-sticky-card">
            <p className="eyebrow">{content.ui.menu.asideEyebrow}</p>
            <strong>{content.hours}</strong>
            <span>{content.address}</span>
            <span>{content.ui.menu.asideCopy}</span>
            <RouteLink className="button button-primary button-large prices-sticky-button" to="/reserve">
              {content.ui.menu.reserveAction}
            </RouteLink>
          </aside>
        </div>
      </section>
    </main>
  );
}
