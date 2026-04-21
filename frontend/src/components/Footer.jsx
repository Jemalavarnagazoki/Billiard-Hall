import { useLocale } from '../context/LocaleContext';
import { RouteLink } from './RouteLink';

export default function Footer() {
  const { content } = useLocale();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="eyebrow">{content.ui.footer.brandEyebrow}</p>
          <strong className="footer-title">{content.address}</strong>
          <p className="footer-copy">{content.ui.contact.hours}: {content.hours}</p>
        </div>

        <div>
          <p className="eyebrow">{content.ui.footer.quickLinks}</p>
          <div className="footer-links">
            {content.ui.navItems.slice(1).map((item) => (
              <RouteLink key={item.to} to={item.to}>
                {item.label}
              </RouteLink>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{content.ui.footer.reservationsTitle}</p>
          <p className="footer-copy">{content.ui.footer.reservationsCopy}</p>
          <RouteLink className="button button-primary" to="/reserve">
            {content.ui.footer.reserveLink}
          </RouteLink>
        </div>
      </div>
    </footer>
  );
}
