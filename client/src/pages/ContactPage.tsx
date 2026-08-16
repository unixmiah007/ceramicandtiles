import { FormEvent, useState } from 'react';
import PageHero from '../components/PageHero';
import StockImage from '../components/StockImage';
import { submitContactForm } from '../api';
import { contactInfo, projectTypes } from '../data/content';
import { pageHeroImages, sectionImages } from '../data/images';
import { ApiError } from '../types';

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const response = await submitContactForm(form);
      setSuccessMessage(response.message);
      setForm(initialFormState);
    } catch (err) {
      const apiError = err as ApiError;
      setErrors(apiError.errors || [apiError.message || 'Something went wrong. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        title="Request a Quote Today"
        subtitle="Whether you're planning a bathroom renovation, shower installation, tile replacement, or commercial project, contact us today to discuss your project."
        backgroundImage={pageHeroImages.contact}
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-panel">
              <StockImage
                image={sectionImages.contactSide}
                aspectRatio="16 / 10"
                className="contact-info-image rounded-image"
              />
              <h2>Contact Abel Portillo</h2>
              <p>
                Reach out to discuss your project and request a personalized quote. We&apos;re
                here to help bring your vision to life.
              </p>

              <div className="contact-details">
                <div className="contact-detail">
                  <span className="contact-label">Phone</span>
                  <a href={`tel:${contactInfo.phone}`} className="contact-value">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="contact-detail">
                  <span className="contact-label">Email</span>
                  <a href={`mailto:${contactInfo.email}`} className="contact-value">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="contact-detail">
                  <span className="contact-label">Service Area</span>
                  <span className="contact-value">Northern Virginia &amp; Washington, D.C.</span>
                </div>
              </div>

              <div className="contact-note">
                <p>
                  Family-Owned. Professional Craftsmanship. Quality You Can See.
                </p>
              </div>
            </div>

            <div className="contact-form-panel">
              <h2>Send Us a Message</h2>

              {successMessage && (
                <div className="alert alert-success" role="status">
                  {successMessage}
                </div>
              )}

              {errors.length > 0 && (
                <div className="alert alert-error" role="alert">
                  <ul>
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="(703) 555-0123"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="projectType">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
