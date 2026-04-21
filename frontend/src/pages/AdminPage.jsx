import { useEffect, useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import {
  ADMIN_EMAIL_STORAGE_KEY,
  ADMIN_TOKEN_STORAGE_KEY,
  createAdminSession,
  destroyAdminSession,
  fetchAdminReservations,
  updateReservationPaymentStatus
} from '../lib/api';

const initialLoginForm = {
  email: 'tamakurashvili056@gmail.com',
  password: ''
};

function getStoredToken() {
  return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || '';
}

function getStoredEmail() {
  return localStorage.getItem(ADMIN_EMAIL_STORAGE_KEY) || initialLoginForm.email;
}

export default function AdminPage() {
  const { content, locale } = useLocale();
  const [loginForm, setLoginForm] = useState({
    ...initialLoginForm,
    email: getStoredEmail()
  });
  const [token, setToken] = useState(getStoredToken);
  const [adminEmail, setAdminEmail] = useState(getStoredEmail);
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState('');

  function formatReservationType(item) {
    if (item.reservationType === 'playstation') {
      return 'PlayStation';
    }

    return `${content.ui.reserve.tableLabel} ${item.tableNumber}`;
  }

  function formatPaymentStatus(status) {
    if (status === 'paid') {
      return locale === 'ka' ? 'გადახდილია' : 'Paid';
    }

    return locale === 'ka' ? 'გადასახდელია' : 'Unpaid';
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    let isMounted = true;

    async function loadReservations() {
      setIsLoading(true);
      setMessage('');

      try {
        const data = await fetchAdminReservations(token);

        if (!isMounted) {
          return;
        }

        setReservations(data.reservations);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        clearAdminSession();
        setMessage(error.message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadReservations();

    return () => {
      isMounted = false;
    };
  }, [token]);

  function clearAdminSession() {
    localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    setToken('');
    setReservations([]);
  }

  function handleLoginInputChange(event) {
    const { name, value } = event.target;
    setLoginForm((current) => ({ ...current, [name]: value }));
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setIsLoggingIn(true);
    setMessage('');

    try {
      const data = await createAdminSession(loginForm);
      localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(ADMIN_EMAIL_STORAGE_KEY, data.admin.email);
      setAdminEmail(data.admin.email);
      setToken(data.token);
      setLoginForm((current) => ({
        ...current,
        password: ''
      }));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleLogout() {
    const activeToken = token;
    clearAdminSession();
    setAdminEmail(getStoredEmail());

    if (activeToken) {
      await destroyAdminSession(activeToken);
    }
  }

  async function handlePaymentToggle(reservation) {
    setUpdatingId(reservation.id);
    setMessage('');

    try {
      const nextStatus = reservation.paymentStatus === 'paid' ? 'unpaid' : 'paid';
      const data = await updateReservationPaymentStatus({
        reservationId: reservation.id,
        paymentStatus: nextStatus,
        token
      });

      setReservations((current) =>
        current.map((item) => (item.id === reservation.id ? data.reservation : item))
      );
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUpdatingId('');
    }
  }

  const paidCount = reservations.filter((item) => item.paymentStatus === 'paid').length;
  const unpaidCount = reservations.length - paidCount;

  if (!token) {
    return (
      <main>
        <section className="section signup-minimal-section admin-login-section">
          <div className="container signup-minimal-wrap">
            <form className="reservation-form signup-minimal-card" onSubmit={handleLoginSubmit}>
              <div className="signup-minimal-head">
                <p className="eyebrow">{content.ui.admin.eyebrow}</p>
                <h1>{content.ui.admin.title}</h1>
              </div>

              <label>
                {content.ui.admin.email}
                <input
                  name="email"
                  onChange={handleLoginInputChange}
                  required
                  type="email"
                  value={loginForm.email}
                />
              </label>

              <label>
                {content.ui.admin.password}
                <input
                  name="password"
                  onChange={handleLoginInputChange}
                  placeholder={content.ui.admin.passwordPlaceholder}
                  required
                  type="password"
                  value={loginForm.password}
                />
              </label>

              <button className="button button-primary button-submit button-large" disabled={isLoggingIn} type="submit">
                {isLoggingIn ? content.ui.admin.submitting : content.ui.admin.submit}
              </button>

              <p className="form-message" role="status">
                {message}
              </p>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="section admin-page-section">
        <div className="container admin-dashboard">
          <div className="admin-head">
            <div>
              <p className="eyebrow">{content.ui.admin.panelEyebrow}</p>
              <h1>{content.ui.admin.panelTitle}</h1>
              <p className="section-copy">{adminEmail}</p>
            </div>

            <button className="button button-secondary" type="button" onClick={handleLogout}>
              {content.ui.admin.logout}
            </button>
          </div>

          <div className="admin-stat-grid">
            <article className="info-strip-card">
              <span>{content.ui.admin.totalReservations}</span>
              <strong>{reservations.length}</strong>
            </article>
            <article className="info-strip-card">
              <span>{content.ui.admin.paid}</span>
              <strong>{paidCount}</strong>
            </article>
            <article className="info-strip-card">
              <span>{content.ui.admin.unpaid}</span>
              <strong>{unpaidCount}</strong>
            </article>
          </div>

          <p className="form-message" role="status">
            {isLoading ? content.ui.admin.loadingReservations : message}
          </p>

          <div className="admin-reservation-list">
            {reservations.map((reservation) => (
              <article className="admin-reservation-card" key={reservation.id}>
                <div className="admin-reservation-top">
                  <div>
                    <h2>{reservation.fullName || content.ui.admin.missingName}</h2>
                    <p>{formatReservationType(reservation)}</p>
                  </div>

                  <span className={`payment-badge${reservation.paymentStatus === 'paid' ? ' is-paid' : ''}`}>
                    {formatPaymentStatus(reservation.paymentStatus)}
                  </span>
                </div>

                <div className="admin-detail-grid">
                  <div>
                    <span>{content.ui.admin.date}</span>
                    <strong>{reservation.reservationDate}</strong>
                  </div>
                  <div>
                    <span>{content.ui.admin.time}</span>
                    <strong>{reservation.reservationTime}</strong>
                  </div>
                  <div>
                    <span>{content.ui.admin.duration}</span>
                    <strong>{reservation.durationHours} {content.ui.reserve.durationUnit}</strong>
                  </div>
                  <div>
                    <span>{content.ui.admin.total}</span>
                    <strong>{reservation.totalPrice} {content.ui.common.currency}</strong>
                  </div>
                </div>

                <div className="admin-contact-grid">
                  <a href={`mailto:${reservation.email}`}>{reservation.email}</a>
                  <a href={`tel:${reservation.phone}`}>{reservation.phone}</a>
                </div>

                <div className="admin-meta-row">
                  <span>{content.ui.admin.notePrefix} {reservation.notes || content.ui.admin.noteEmpty}</span>
                  <span>{content.ui.admin.createdAtPrefix} {reservation.createdAt.slice(0, 16).replace('T', ' ')}</span>
                </div>

                <button
                  className={`button ${reservation.paymentStatus === 'paid' ? 'button-secondary' : 'button-primary'}`}
                  disabled={updatingId === reservation.id}
                  type="button"
                  onClick={() => handlePaymentToggle(reservation)}
                >
                  {updatingId === reservation.id
                    ? content.ui.admin.updating
                    : reservation.paymentStatus === 'paid'
                      ? content.ui.admin.markUnpaid
                      : content.ui.admin.markPaid}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
