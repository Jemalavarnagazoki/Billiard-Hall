import { useEffect, useState } from 'react';
import { RouteLink } from '../components/RouteLink';
import { useLocale } from '../context/LocaleContext';
import {
  USER_EMAIL_STORAGE_KEY,
  USER_TOKEN_STORAGE_KEY,
  createUserSession,
  destroyUserSession,
  fetchUserReservations
} from '../lib/api';

const initialForm = {
  email: '',
  password: ''
};

function getStoredUserToken() {
  return localStorage.getItem(USER_TOKEN_STORAGE_KEY) || '';
}

function getStoredUserEmail() {
  return localStorage.getItem(USER_EMAIL_STORAGE_KEY) || '';
}

export default function SignInPage() {
  const { content, locale } = useLocale();
  const [formData, setFormData] = useState({
    ...initialForm,
    email: getStoredUserEmail()
  });
  const [token, setToken] = useState(getStoredUserToken);
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    async function loadUserReservations() {
      setIsLoading(true);
      setMessage('');

      try {
        const data = await fetchUserReservations(token);

        if (!isMounted) {
          return;
        }

        setUser(data.user);
        setReservations(data.reservations);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        clearUserSession(false);
        setMessage(error.message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUserReservations();

    return () => {
      isMounted = false;
    };
  }, [token]);

  function clearUserSession(clearStoredEmail = true) {
    localStorage.removeItem(USER_TOKEN_STORAGE_KEY);

    if (clearStoredEmail) {
      localStorage.removeItem(USER_EMAIL_STORAGE_KEY);
      setFormData(initialForm);
    }

    setToken('');
    setUser(null);
    setReservations([]);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const data = await createUserSession(formData);
      localStorage.setItem(USER_TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(USER_EMAIL_STORAGE_KEY, data.user.email);
      setToken(data.token);
      setUser(data.user);
      setFormData((current) => ({
        ...current,
        email: data.user.email,
        password: ''
      }));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    const activeToken = token;
    clearUserSession(false);

    if (activeToken) {
      await destroyUserSession(activeToken);
    }
  }

  if (!token) {
    return (
      <main>
        <section className="section signup-minimal-section">
          <div className="container signup-minimal-wrap">
            <form className="reservation-form signup-minimal-card" onSubmit={handleSubmit}>
              <div className="signup-minimal-head">
                <p className="eyebrow">{content.ui.signIn.eyebrow}</p>
                <h1>{content.ui.signIn.title}</h1>
              </div>

              <label>
                {content.ui.signIn.email}
                <input
                  name="email"
                  onChange={handleInputChange}
                  placeholder="name@email.com"
                  required
                  type="email"
                  value={formData.email}
                />
              </label>

              <label>
                {content.ui.signIn.password}
                <input
                  name="password"
                  onChange={handleInputChange}
                  placeholder={content.ui.signIn.passwordPlaceholder}
                  required
                  type="password"
                  value={formData.password}
                />
              </label>

              <button className="button button-primary button-submit button-large" disabled={isSubmitting} type="submit">
                {isSubmitting ? content.ui.signIn.submitting : content.ui.signIn.submit}
              </button>

              <p className="auth-switch-copy">
                {content.ui.signIn.noAccount} <RouteLink to="/signup">{content.ui.signIn.createAccount}</RouteLink>
              </p>

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
              <p className="eyebrow">{content.ui.signIn.accountEyebrow}</p>
              <h1>{content.ui.signIn.accountTitle}</h1>
              <p className="section-copy">{user?.email}</p>
            </div>

            <button className="button button-secondary" type="button" onClick={handleLogout}>
              {content.ui.signIn.logout}
            </button>
          </div>

          <div className="admin-stat-grid">
            <article className="info-strip-card">
              <span>{content.ui.signIn.statsName}</span>
              <strong>{user?.fullName || '-'}</strong>
            </article>
            <article className="info-strip-card">
              <span>{content.ui.signIn.statsTotal}</span>
              <strong>{reservations.length}</strong>
            </article>
            <article className="info-strip-card">
              <span>{content.ui.signIn.statsPhone}</span>
              <strong>{user?.phone || '-'}</strong>
            </article>
          </div>

          <p className="form-message" role="status">
            {isLoading ? content.ui.signIn.loadingReservations : message}
          </p>

          <div className="admin-reservation-list">
            {reservations.map((reservation) => (
              <article className="admin-reservation-card" key={reservation.id}>
                <div className="admin-reservation-top">
                  <div>
                    <h2>{formatReservationType(reservation)}</h2>
                    <p>{reservation.reservationDate} - {reservation.reservationTime}</p>
                  </div>

                  <span className={`payment-badge${reservation.paymentStatus === 'paid' ? ' is-paid' : ''}`}>
                    {formatPaymentStatus(reservation.paymentStatus)}
                  </span>
                </div>

                <div className="admin-detail-grid">
                  <div>
                    <span>{content.ui.signIn.duration}</span>
                    <strong>{reservation.durationHours} {content.ui.reserve.durationUnit}</strong>
                  </div>
                  <div>
                    <span>{content.ui.signIn.total}</span>
                    <strong>{reservation.totalPrice} {content.ui.common.currency}</strong>
                  </div>
                  <div>
                    <span>{content.ui.signIn.status}</span>
                    <strong>{formatPaymentStatus(reservation.paymentStatus)}</strong>
                  </div>
                  <div>
                    <span>{content.ui.signIn.createdAt}</span>
                    <strong>{reservation.createdAt.slice(0, 16).replace('T', ' ')}</strong>
                  </div>
                </div>

                <div className="admin-meta-row">
                  <span>{content.ui.signIn.notePrefix} {reservation.notes || content.ui.signIn.noteEmpty}</span>
                  <span>{reservation.paymentStatus === 'paid' ? content.ui.signIn.paymentConfirmed : content.ui.signIn.payOnSite}</span>
                </div>
              </article>
            ))}

            {!isLoading && reservations.length === 0 ? (
              <article className="admin-reservation-card">
                <div className="admin-reservation-top">
                  <div>
                    <h2>{content.ui.signIn.noReservationsTitle}</h2>
                    <p>{content.ui.signIn.noReservationsCopy}</p>
                  </div>
                </div>
                <RouteLink className="button button-primary" to="/reserve">
                  {content.ui.signIn.goReserve}
                </RouteLink>
              </article>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
