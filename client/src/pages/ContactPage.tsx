import { FormEvent, useState } from 'react';
import PageHero from '../components/PageHero';
import StockImage from '../components/StockImage';
import PhotoUploadField from '../components/PhotoUploadField';
import SmsOptInField from '../components/SmsOptInField';
import AppointmentField from '../components/AppointmentField';
import TrustBadges from '../components/TrustBadges';
import BusinessHours from '../components/BusinessHours';
import { submitContactForm } from '../api';
import { contactInfo } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import { pageHeroImages, sectionImages } from '../data/images';
import { ApiError, PhotoAttachment } from '../types';

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  smsOptIn: boolean;
  preferredVisit: string;
  photos: PhotoAttachment[];
}

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
  smsOptIn: false,
  preferredVisit: '',
  photos: [],
};

export default function ContactPage() {
  const { t, services, getEnglishServiceById } = useLanguage();
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
      const englishService = getEnglishServiceById(form.projectType);
      const response = await submitContactForm({
        ...form,
        projectType:
          form.projectType === 'other'
            ? t.common.other
            : englishService?.title ?? form.projectType,
        photos: form.photos.length ? form.photos : undefined,
        preferredVisit: form.preferredVisit.trim() || undefined,
        smsOptIn: form.smsOptIn || undefined,
      });
      setSuccessMessage(response.message);
      setForm(initialFormState);
    } catch (err) {
      const apiError = err as ApiError;
      setErrors(apiError.errors || [apiError.message || t.contact.genericError]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        title={t.contact.heroTitle}
        subtitle={t.contact.heroSubtitle}
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
              <h2>{t.contact.contactTitle}</h2>
              <p>{t.contact.contactIntro}</p>

              <div className="contact-details">
                <div className="contact-detail">
                  <span className="contact-label">{t.common.phone}</span>
                  <a href={`tel:${contactInfo.phone}`} className="contact-value">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="contact-detail">
                  <span className="contact-label">{t.common.email}</span>
                  <a href={`mailto:${contactInfo.email}`} className="contact-value">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="contact-detail">
                  <span className="contact-label">{t.common.serviceArea}</span>
                  <span className="contact-value">{t.common.serviceAreaValue}</span>
                </div>
              </div>

              <div className="contact-note">
                <p>{t.contact.note}</p>
              </div>

              <TrustBadges />
              <BusinessHours />
            </div>

            <div className="contact-form-panel">
              <h2>{t.contact.formTitle}</h2>

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
                  <label htmlFor="name">{t.contact.fullName}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">{t.common.email} *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder={t.contact.emailPlaceholder}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t.common.phone} *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder={t.contact.phonePlaceholder}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="projectType">{t.contact.projectType}</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t.contact.selectService}</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                    <option value="other">{t.common.other}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t.contact.projectDetails}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>

                <PhotoUploadField
                  photos={form.photos}
                  onChange={(photos) => setForm((prev) => ({ ...prev, photos }))}
                />

                <AppointmentField
                  value={form.preferredVisit}
                  onChange={(preferredVisit) => setForm((prev) => ({ ...prev, preferredVisit }))}
                />

                <SmsOptInField
                  checked={form.smsOptIn}
                  onChange={(smsOptIn) => setForm((prev) => ({ ...prev, smsOptIn }))}
                />

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.common.sending : t.common.submitRequest}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
