import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

function formatReservationType(item) {
  return item.reservationType === 'playstation' ? 'PlayStation' : `მაგიდა ${item.tableNumber}`;
}

function formatPaymentStatus(status) {
  return status === 'paid' ? 'გადახდილია' : 'გადასახდელია';
}

export default function SignInPage() {
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
                <p className="eyebrow">Sign In</p>
                <h1>შესვლა</h1>
              </div>

              <label>
                ელფოსტა
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
                პაროლი
                <input
                  name="password"
                  onChange={handleInputChange}
                  placeholder="შეიყვანე პაროლი"
                  required
                  type="password"
                  value={formData.password}
                />
              </label>

              <button className="button button-primary button-submit button-large" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'იტვირთება...' : 'შესვლა'}
              </button>

              <p className="auth-switch-copy">
                ჯერ არ გაქვს ანგარიში? <Link to="/signup">რეგისტრაცია</Link>
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
              <p className="eyebrow">Account</p>
              <h1>ჩემი ჯავშნები</h1>
              <p className="section-copy">{user?.email}</p>
            </div>

            <button className="button button-secondary" type="button" onClick={handleLogout}>
              გამოსვლა
            </button>
          </div>

          <div className="admin-stat-grid">
            <article className="info-strip-card">
              <span>სახელი</span>
              <strong>{user?.fullName || '-'}</strong>
            </article>
            <article className="info-strip-card">
              <span>სულ ჯავშანი</span>
              <strong>{reservations.length}</strong>
            </article>
            <article className="info-strip-card">
              <span>ტელეფონი</span>
              <strong>{user?.phone || '-'}</strong>
            </article>
          </div>

          <p className="form-message" role="status">
            {isLoading ? 'ჯავშნები იტვირთება...' : message}
          </p>

          <div className="admin-reservation-list">
            {reservations.map((reservation) => (
              <article className="admin-reservation-card" key={reservation.id}>
                <div className="admin-reservation-top">
                  <div>
                    <h2>{formatReservationType(reservation)}</h2>
                    <p>{reservation.reservationDate} • {reservation.reservationTime}</p>
                  </div>

                  <span className={`payment-badge${reservation.paymentStatus === 'paid' ? ' is-paid' : ''}`}>
                    {formatPaymentStatus(reservation.paymentStatus)}
                  </span>
                </div>

                <div className="admin-detail-grid">
                  <div>
                    <span>ხანგრძლივობა</span>
                    <strong>{reservation.durationHours} სთ</strong>
                  </div>
                  <div>
                    <span>ჯამი</span>
                    <strong>{reservation.totalPrice} ლარი</strong>
                  </div>
                  <div>
                    <span>სტატუსი</span>
                    <strong>{formatPaymentStatus(reservation.paymentStatus)}</strong>
                  </div>
                  <div>
                    <span>დაჯავშნდა</span>
                    <strong>{reservation.createdAt.slice(0, 16).replace('T', ' ')}</strong>
                  </div>
                </div>

                <div className="admin-meta-row">
                  <span>შენიშვნა: {reservation.notes || 'არ არის'}</span>
                  <span>{reservation.paymentStatus === 'paid' ? 'დადასტურებულია' : 'ადგილზე გადასახდელია'}</span>
                </div>
              </article>
            ))}

            {!isLoading && reservations.length === 0 ? (
              <article className="admin-reservation-card">
                <div className="admin-reservation-top">
                  <div>
                    <h2>ჯავშნები ჯერ არ არის</h2>
                    <p>როდესაც დაჯავშნი, აქ გამოჩნდება.</p>
                  </div>
                </div>
                <Link className="button button-primary" to="/reserve">
                  ჯავშანზე გადასვლა
                </Link>
              </article>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
