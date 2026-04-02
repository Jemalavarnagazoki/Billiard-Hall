import { NavLink } from 'react-router-dom';
import logoImage from '../assets/logo-new.png';
import { siteContent } from '../data/siteContent';

const navItems = [
  { to: '/', label: 'მთავარი' },
  { to: '/prices', label: 'ფასები' },
  { to: '/reserve', label: 'ჯავშანი' },
  { to: '/contact', label: 'კონტაქტი' },
  { to: '/signup', label: 'რეგისტრაცია' }
];

export default function Navbar() {
  return (
    <>
      <div className="topbar">
        <div className="container topbar-row">
          <span className="topbar-hours">ღია ყოველდღე {siteContent.hours}</span>
          <span className="topbar-location">{siteContent.address}</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-row">
          <NavLink className="brand" to="/">
            <span className="brand-mark">
              <img src={logoImage} alt="Billiard Hall logo" />
            </span>
            <span className="brand-copy">
              <strong>{siteContent.venueName}</strong>
              <small>{siteContent.cityLabel}</small>
            </span>
          </NavLink>

          <nav aria-label="Main navigation" className="nav-links">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
