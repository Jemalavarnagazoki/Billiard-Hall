import { useEffect, useState } from 'react';
import CustomSelect from '../components/CustomSelect';
import { useLocale } from '../context/LocaleContext';
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

function getToday() {
  return new Date().toISOString().split('T')[0];
}

export default function ReservePage() {
  const { content } = useLocale();
  const { summary } = useVenueSummary();
  const [formData, setFormData] = useState({
    ...initialForm,
    reservationDate: getToday()
  });
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const tableOptions = Array.from({ length: 13 }, (_, index) => ({
    value: String(index + 1),
    label: `${content.ui.reserve.tableLabel} ${index + 1}`
  }));

  const durationHours = Math.max(1, Number(formData.durationHours) || 1);
  const hourlyRate = content.pricingRules[formData.reservationType] || 0;
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
      durationHours: '1',
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

      const serviceLabel =
        content.reserveServices.find((service) => service.value === formData.reservationType)?.label ||
        formData.reservationType;

      setMessage(`${serviceLabel}. ${content.ui.reserve.totalEyebrow}: ${result.reservation.totalPrice} ${content.ui.common.currency}.`);
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
            <p className="eyebrow">{content.ui.reserve.eyebrow}</p>
            <h1>{content.ui.reserve.title}</h1>
            <p className="reserve-side-copy">{content.ui.reserve.description}</p>

            <div className="reserve-side-stats">
              <article>
                <span>{content.ui.home.availableToday}</span>
                <strong>{summary.remainingTables}</strong>
              </article>
              <article>
                <span>{content.ui.reserve.hourlyRate}</span>
                <strong>{hourlyRate} {content.ui.common.currency}</strong>
              </article>
            </div>

            <div className="reserve-side-cards">
              <div className="location-card">
                <p className="feature-eyebrow">{content.ui.reserve.visitEyebrow}</p>
                <strong>{content.address}</strong>
                <p>{content.hours}</p>
              </div>
            </div>

            <div className="location-card">
              <p className="feature-eyebrow">{content.ui.reserve.totalEyebrow}</p>
              <strong>{totalPrice} {content.ui.common.currency}</strong>
              <p>{durationHours} {content.ui.reserve.durationUnit} x {hourlyRate} {content.ui.common.currency}</p>
            </div>
          </aside>

          <form className="reservation-form reserve-form-large" onSubmit={handleSubmit}>
            <div className="form-head">
              <h2>{content.ui.reserve.formTitle}</h2>
            </div>

            <div className="service-switcher">
              {content.reserveServices.map((service) => (
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
              {content.ui.reserve.fullName}
              <input
                name="fullName"
                onChange={handleInputChange}
                placeholder={content.ui.reserve.fullNamePlaceholder}
                required
                type="text"
                value={formData.fullName}
              />
            </label>

            <div className="form-row">
              <label>
                {content.ui.reserve.email}
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
                {content.ui.reserve.phone}
                <input
                  name="phone"
                  onChange={handleInputChange}
                  placeholder={content.ui.reserve.phonePlaceholder}
                  required
                  type="tel"
                  value={formData.phone}
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                {content.ui.reserve.date}
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
                  label={content.ui.reserve.table}
                  name="tableNumber"
                  onChange={handleSelectChange}
                  options={tableOptions}
                  placeholder={content.ui.reserve.tablePlaceholder}
                  value={formData.tableNumber}
                />
              ) : (
                <div className="resource-fixed-card">
                  <span className="field-label">{content.ui.reserve.service}</span>
                  <div className="resource-fixed-value">{content.ui.reserve.playstationValue}</div>
                </div>
              )}
            </div>

            <div className="duration-block">
              <div className="time-picker-head">
                <span className="field-label">{content.ui.reserve.duration}</span>
                <small>{content.ui.reserve.durationHint}</small>
              </div>

              <div className="duration-grid">
                {quickDurations.map((hours) => (
                  <button
                    className={`duration-button${durationHours === hours ? ' is-selected' : ''}`}
                    key={hours}
                    type="button"
                    onClick={() => handleDurationButton(hours)}
                  >
                    {hours} {content.ui.reserve.durationUnit}
                  </button>
                ))}
              </div>

              <label>
                {content.ui.reserve.customHours}
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
                <span className="field-label">{content.ui.reserve.time}</span>
                <small>{isLoadingTimes ? content.ui.reserve.loadingTimes : content.ui.reserve.bookedHint}</small>
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
              {content.ui.reserve.notes}
              <textarea
                name="notes"
                onChange={handleInputChange}
                placeholder={content.ui.reserve.notesPlaceholder}
                rows="3"
                value={formData.notes}
              />
            </label>

            <button
              className="button button-primary button-submit button-large"
              disabled={isSubmitting || !formData.reservationTime}
              type="submit"
            >
              {isSubmitting
                ? content.ui.reserve.submitting
                : `${content.ui.reserve.submit} - ${totalPrice} ${content.ui.common.currency}`}
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
