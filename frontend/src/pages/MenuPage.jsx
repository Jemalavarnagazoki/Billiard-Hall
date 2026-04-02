import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';

export default function MenuPage() {
  return (
    <main>
      <section className="section prices-page-section">
        <div className="container prices-layout">
          <div className="prices-main">
            <div className="prices-header prices-header-wide">
              <p className="eyebrow">მენიუ</p>
              <h1>სასმელი და სნექი</h1>
              <p className="section-copy">კატეგორიებად დალაგებული სრული მენიუ.</p>
            </div>

            <div className="menu-shortcuts" aria-label="მენიუს კატეგორიები">
              {siteContent.menuCategories.map((category) => (
                <a className="menu-shortcut" href={`#${category.id}`} key={category.id}>
                  <span>{category.title}</span>
                  <small>{category.label}</small>
                </a>
              ))}
            </div>

            <div className="menu-board-grid">
              {siteContent.menuCategories.map((category) => (
                <section className="menu-category-card" id={category.id} key={category.id}>
                  <div className="menu-category-head">
                    <h2>{category.title}</h2>
                    <span>{category.label}</span>
                  </div>

                  <div className="menu-item-list">
                    {category.items.map((item) => (
                      <div className="menu-item-row" key={`${category.id}-${item.name}`}>
                        <strong>{item.name}</strong>
                        <span>{item.price} ₾</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="prices-sticky-card">
            <p className="eyebrow">ჯავშანი</p>
            <strong>{siteContent.hours}</strong>
            <span>{siteContent.address}</span>
            <div className="prices-contact-list">
              {siteContent.phones.map((phone) => (
                <a className="contact-chip" href={`tel:${phone}`} key={phone}>
                  <span>დარეკე</span>
                  <strong>{phone}</strong>
                </a>
              ))}
            </div>
            <Link className="button button-primary button-large prices-sticky-button" to="/reserve">
              დაჯავშნე ახლავე
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
