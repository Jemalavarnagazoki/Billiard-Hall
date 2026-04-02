import { useEffect, useState } from 'react';
import CustomSelect from '../components/CustomSelect';
import { siteContent } from '../data/siteContent';
import useVenueSummary from '../hooks/useVenueSummary';
import { createReservation, fetchReservationAvailability } from '../lib/api';

const reservationTimes = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00'];
const quickDurations = [1, 2, 3];

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  reservationDate: '',
  reservationTime: '',
  reservationType: 'billiard',
  tableNumber: '1',
  durationHours: '1',
  notes: ''
};

const tableOptions = Array.from({ length: 13 }, (_, index) => ({
  value: String(index + 1),
  label: `მაგიდა ${index + 1}`
}));

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getHourlyRate(type) {
  return siteContent.pricingRules[type] || 0;
}

export default function ReservePage() {
  const { summary } = useVenueSummary();
  const [formData, setFormData] = useState({
    ...initialForm,
    reservationDate: getToday()
  });
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const durationHours = Math.max(1, Number(formData.durationHours) || 1);
  const hourlyRate = getHourlyRate(formData.reservationType);
  const totalPrice = hourlyRate * durationHours;

  useEffect(() => {
    let isMounted = true;

    async function loadAvailability() {
      if (!formData.reservationDate) {
        return;
      }

      setIsLoadingTimes(true);

      try {
        const data = await fetchReservationAvailability({
          date: formData.reservationDate,
          tableNumber: formData.reservationType === 'billiard' ? formData.tableNumber : '0',
          type: formData.reservationType,
          durationHours
        });

        if (!isMounted) {
          return;
        }

        setUnavailableTimes(data.unavailableTimes);
        setFormData((current) => {
          if (current.reservationTime && data.unavailableTimes.includes(current.reservationTime)) {
            return {
              ...current,
              reservationTime: ''
            };
          }

          return current;
        });
      } catch (error) {
        if (isMounted) {
          setMessage(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoadingTimes(false);
        }
      }
    }

    loadAvailability();

    return () => {
      isMounted = false;
    };
  }, [formData.reservationDate, formData.tableNumber, formData.reservationType, durationHours]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSelectChange(name, value) {
    setFormData((current) => ({ ...current, [name]: value, reservationTime: '' }));
  }

  function handleServiceSelect(service) {
    setFormData((current) => ({
      ...current,
      reservationType: service,
      reservationTime: ''
    }));
  }

  function handleTimeSelect(time) {
    setFormData((current) => ({ ...current, reservationTime: time }));
  }

  function handleDurationButton(hours) {
    setFormData((current) => ({
      ...current,
      durationHours: String(hours),
      reservationTime: ''
    }));
  }

  function handleDurationInput(event) {
    const nextValue = event.target.value;
    setFormData((current) => ({
      ...current,
      durationHours: nextValue,
      reservationTime: ''
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const result = await createReservation({
        ...formData,
        durationHours
      });
      setMessage(
        `${formData.reservationType === 'playstation' ? 'PlayStation' : 'ჯავშანი'} მიღებულია. გადასახდელი თანხა: ${result.reservation.totalPrice} ლარი.`
      );
      setFormData({
        ...initialForm,
        reservationDate: getToday()
      });
      setUnavailableTimes([]);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <section className="section reserve-page-section">
        <div className="container reserve-layout">
          <aside className="reserve-side-panel">
            <p className="eyebrow">Reserve</p>
            <h1>ჯავშანი</h1>
            <p className="reserve-side-copy">თუ მეტი დრო გინდა, მიუთითე საათები და თანხაც ავტომატურად გაიზრდება.</p>

            <div className="reserve-side-stats">
              <article>
                <span>დღეს თავისუფალია</span>
                <strong>{summary.remainingTables}</strong>
              </article>
              <article>
                <span>საათობრივი ფასი</span>
                <strong>{hourlyRate} ლარი</strong>
              </article>
            </div>

            <div className="reserve-side-cards">
              {siteContent.phones.map((phone) => (
                <a className="contact-card" href={`tel:${phone}`} key={phone}>
                  <span>დარეკე</span>
                  <strong>{phone}</strong>
                </a>
              ))}
            </div>

            <div className="location-card">
              <p className="feature-eyebrow">სულ თანხა</p>
              <strong>{totalPrice} ლარი</strong>
              <p>{durationHours} საათი x {hourlyRate} ლარი</p>
            </div>
          </aside>

          <form className="reservation-form reserve-form-large" onSubmit={handleSubmit}>
            <div className="form-head">
              <h2>აირჩიე დრო და ხანგრძლივობა</h2>
            </div>

            <div className="service-switcher">
              {siteContent.reserveServices.map((service) => (
                <button
                  className={`service-switch-button${formData.reservationType === service.value ? ' is-selected' : ''}`}
                  key={service.value}
                  type="button"
                  onClick={() => handleServiceSelect(service.value)}
                >
                  {service.label}
                </button>
              ))}
            </div>

            <label>
              სახელი და გვარი
              <input
                name="fullName"
                onChange={handleInputChange}
                placeholder="შეიყვანე სახელი და გვარი"
                required
                type="text"
                value={formData.fullName}
              />
            </label>

            <div className="form-row">
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
                ტელეფონის ნომერი
                <input
                  name="phone"
                  onChange={handleInputChange}
                  placeholder="577949425"
                  required
                  type="tel"
                  value={formData.phone}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                თარიღი
                <input
                  min={getToday()}
                  name="reservationDate"
                  onChange={handleInputChange}
                  required
                  type="date"
                  value={formData.reservationDate}
                />
              </label>

              {formData.reservationType === 'billiard' ? (
                <CustomSelect
                  label="მაგიდა"
                  name="tableNumber"
                  onChange={handleSelectChange}
                  options={tableOptions}
                  placeholder="აირჩიე მაგიდა"
                  value={formData.tableNumber}
                />
              ) : (
                <div className="resource-fixed-card">
                  <span className="field-label">რესურსი</span>
                  <div className="resource-fixed-value">PlayStation</div>
                </div>
              )}
            </div>

            <div className="duration-block">
              <div className="time-picker-head">
                <span className="field-label">ხანგრძლივობა</span>
                <small>აირჩიე სწრაფად ან მიუთითე custom საათები</small>
              </div>

              <div className="duration-grid">
                {quickDurations.map((hours) => (
                  <button
                    className={`duration-button${durationHours === hours ? ' is-selected' : ''}`}
                    key={hours}
                    type="button"
                    onClick={() => handleDurationButton(hours)}
                  >
                    {hours} სთ
                  </button>
                ))}
              </div>

              <label>
                Custom საათები
                <input
                  max="12"
                  min="1"
                  name="durationHours"
                  onChange={handleDurationInput}
                  type="number"
                  value={formData.durationHours}
                />
              </label>
            </div>

            <div className="time-picker-block">
              <div className="time-picker-head">
                <span className="field-label">დრო</span>
                <small>{isLoadingTimes ? 'იტვირთება...' : 'უკვე დაკავებული ინტერვალები დაბლოკილია'}</small>
              </div>

              <div className="time-grid">
                {reservationTimes.map((time) => {
                  const isUnavailable = unavailableTimes.includes(time);
                  const isSelected = formData.reservationTime === time;

                  return (
                    <button
                      className={`time-slot-button${isSelected ? ' is-selected' : ''}${isUnavailable ? ' is-unavailable' : ''}`}
                      disabled={isUnavailable}
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            <label>
              დამატებითი ინფორმაცია
              <textarea
                name="notes"
                onChange={handleInputChange}
                placeholder="სურვილის შემთხვევაში"
                rows="3"
                value={formData.notes}
              />
            </label>

            <button
              className="button button-primary button-submit button-large"
              disabled={isSubmitting || !formData.reservationTime}
              type="submit"
            >
              {isSubmitting ? 'იგზავნება...' : `გაგზავნა • ${totalPrice} ლარი`}
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
