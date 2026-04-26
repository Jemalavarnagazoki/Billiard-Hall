import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo-new.png';
import { useLocale } from '../context/LocaleContext';
import {
  ADMIN_EMAIL_STORAGE_KEY,
  ADMIN_TOKEN_STORAGE_KEY,
  AUTH_STATE_EVENT,
  USER_EMAIL_STORAGE_KEY,
  USER_TOKEN_STORAGE_KEY,
  destroyAdminSession,
  destroyUserSession
} from '../lib/api';
import LocaleSwitcher from './LocaleSwitcher';
import { RouteNavLink, RouteLink } from './RouteLink';

function readSessionState() {
  if (typeof window === 'undefined') {
    return {
      isAdmin: false,
      isUser: false,
      adminToken: '',
      userToken: ''
    };
  }

  return {
    isAdmin: Boolean(localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)),
    isUser: Boolean(localStorage.getItem(USER_TOKEN_STORAGE_KEY)),
    adminToken: localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || '',
    userToken: localStorage.getItem(USER_TOKEN_STORAGE_KEY) || ''
  };
}

export default function Navbar() {
  const { content, locale } = useLocale();
  const navigate = useNavigate();
  const [session, setSession] = useState(readSessionState);

  useEffect(() => {
    function syncSessionState() {
      setSession(readSessionState());
    }

    syncSessionState();
    window.addEventListener('storage', syncSessionState);
    window.addEventListener(AUTH_STATE_EVENT, syncSessionState);

    return () => {
      window.removeEventListener('storage', syncSessionState);
      window.removeEventListener(AUTH_STATE_EVENT, syncSessionState);
    };
  }, []);

  async function handleLogout() {
    const adminToken = session.adminToken;
    const userToken = session.userToken;

    localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    localStorage.removeItem(ADMIN_EMAIL_STORAGE_KEY);
    localStorage.removeItem(USER_TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_EMAIL_STORAGE_KEY);
    window.dispatchEvent(new Event(AUTH_STATE_EVENT));
    setSession(readSessionState());

    if (adminToken) {
      await destroyAdminSession(adminToken);
    }

    if (userToken) {
      await destroyUserSession(userToken);
    }

    navigate('/');
  }

  const navItems = content.ui.navItems.filter((item) => item.to !== '/signin');
  const isAuthenticated = session.isAdmin || session.isUser;
  const adminPanelLabel = locale === 'ka' ? 'ადმინ პანელი' : 'Admin Panel';

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
            {navItems.map((item) => (
              <RouteNavLink
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </RouteNavLink>
            ))}

            {session.isAdmin ? (
              <RouteNavLink className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`} to="/admin">
                {content.ui.admin.navPanel || adminPanelLabel}
              </RouteNavLink>
            ) : null}

            {isAuthenticated ? (
              <button className="nav-link nav-link-button" type="button" onClick={handleLogout}>
                {content.ui.signIn.logout}
              </button>
            ) : (
              <RouteNavLink className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`} to="/signin">
                {content.ui.navItems.find((item) => item.to === '/signin')?.label || content.ui.signIn.submit}
              </RouteNavLink>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
