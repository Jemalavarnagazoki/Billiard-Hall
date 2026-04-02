import { Link } from 'react-router-dom';
import { useState } from 'react';
import CustomSelect from '../components/CustomSelect';
import { siteContent } from '../data/siteContent';
import { createSignup } from '../lib/api';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  plan: 'billiard',
  password: ''
};

export default function SignUpPage() {
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
      setMessage('ანგარიში შეიქმნა. ახლა შეგიძლია შეხვიდე.');
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
              <p className="eyebrow">Sign Up</p>
              <h1>რეგისტრაცია</h1>
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

            <label>
              პაროლი
              <input
                name="password"
                onChange={handleInputChange}
                placeholder="მინიმუმ 6 სიმბოლო"
                required
                type="password"
                value={formData.password}
              />
            </label>

            <CustomSelect
              label="სერვისი"
              name="plan"
              onChange={handleSelectChange}
              options={siteContent.signupPlans}
              placeholder="აირჩიე სერვისი"
              value={formData.plan}
            />

            <button className="button button-primary button-submit button-large" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'იგზავნება...' : 'რეგისტრაციის გაგზავნა'}
            </button>

            <p className="auth-switch-copy">
              უკვე გაქვს ანგარიში? <Link to="/signin">შესვლა</Link>
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
