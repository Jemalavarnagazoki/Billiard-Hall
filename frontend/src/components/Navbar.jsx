import logoImage from '../assets/logo-new.png';
import { useLocale } from '../context/LocaleContext';
import LocaleSwitcher from './LocaleSwitcher';
import { RouteNavLink, RouteLink } from './RouteLink';

export default function Navbar() {
  const { content } = useLocale();

  return (
    <>
      <div className="topbar">
        <div className="container topbar-row">
          <div className="topbar-copy">
            <span className="topbar-hours">{content.ui.topbar.openDaily} {content.hours}</span>
            <span className="topbar-location">{content.address}</span>
          </div>
          <LocaleSwitcher />
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-row">
          <RouteLink className="brand" to="/">
            <span className="brand-mark">
              <img src={logoImage} alt="Billiard Hall logo" />
            </span>
            <span className="brand-copy">
              <strong>{content.venueName}</strong>
              <small>{content.cityLabel}</small>
            </span>
          </RouteLink>

          <nav aria-label="Main navigation" className="nav-links">
            {content.ui.navItems.map((item) => (
              <RouteNavLink
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </RouteNavLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
