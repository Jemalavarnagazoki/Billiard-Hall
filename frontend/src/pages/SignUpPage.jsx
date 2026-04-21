import { useState } from 'react';
import CustomSelect from '../components/CustomSelect';
import { RouteLink } from '../components/RouteLink';
import { useLocale } from '../context/LocaleContext';
import { createSignup } from '../lib/api';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  plan: 'billiard',
  password: ''
};

export default function SignUpPage() {
  const { content } = useLocale();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSelectChange(name, value) {
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await createSignup(formData);
      setMessage(content.ui.signUp.successMessage);
      setFormData(initialForm);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <section className="section signup-minimal-section">
        <div className="container signup-minimal-wrap">
          <form className="reservation-form signup-minimal-card" onSubmit={handleSubmit}>
            <div className="signup-minimal-head">
              <p className="eyebrow">{content.ui.signUp.eyebrow}</p>
              <h1>{content.ui.signUp.title}</h1>
            </div>

            <label>
              {content.ui.signUp.fullName}
              <input
                name="fullName"
                onChange={handleInputChange}
                placeholder={content.ui.signUp.fullNamePlaceholder}
                required
                type="text"
                value={formData.fullName}
              />
            </label>

            <label>
              {content.ui.signUp.email}
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
              {content.ui.signUp.phone}
              <input
                name="phone"
                onChange={handleInputChange}
                placeholder={content.ui.signUp.phonePlaceholder}
                required
                type="tel"
                value={formData.phone}
              />
            </label>

            <label>
              {content.ui.signUp.password}
              <input
                name="password"
                onChange={handleInputChange}
                placeholder={content.ui.signUp.passwordPlaceholder}
                required
                type="password"
                value={formData.password}
              />
            </label>

            <CustomSelect
              label={content.ui.signUp.service}
              name="plan"
              onChange={handleSelectChange}
              options={content.signupPlans}
              placeholder={content.ui.signUp.servicePlaceholder}
              value={formData.plan}
            />

            <button className="button button-primary button-submit button-large" disabled={isSubmitting} type="submit">
              {isSubmitting ? content.ui.signUp.submitting : content.ui.signUp.submit}
            </button>

            <p className="auth-switch-copy">
              {content.ui.signUp.hasAccount} <RouteLink to="/signin">{content.ui.signUp.signIn}</RouteLink>
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
