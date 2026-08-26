import { FormEvent, useMemo, useState } from 'react';
import PageHero from '../components/PageHero';
import StockImage from '../components/StockImage';
import PhotoUploadField from '../components/PhotoUploadField';
import AppointmentField from '../components/AppointmentField';
import SmsOptInField from '../components/SmsOptInField';
import SeoHead from '../components/SeoHead';
import { submitWizardForm } from '../api';
import { useLanguage } from '../context/LanguageContext';
import { getStaticPageSeo } from '../seo/meta';
import {
  initialWizardForm,
  projectSizeOptions,
  tileSamples,
  timelineOptions,
  WizardFormData,
  wizardSteps,
  WizardStep,
} from '../data/wizard';
import { pageHeroImages } from '../data/images';
import { ApiError } from '../types';

export default function QuoteWizardPage() {
  const { locale, t, services, getEnglishServiceById } = useLanguage();
  const seo = getStaticPageSeo('quote-wizard', locale)!;
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<WizardFormData>(initialWizardForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = wizardSteps[stepIndex];

  const selectedService = useMemo(
    () => services.find((service) => service.id === form.serviceId),
    [form.serviceId, services]
  );

  const updateForm = <K extends keyof WizardFormData>(key: K, value: WizardFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTileSample = (sampleId: string) => {
    setForm((prev) => ({
      ...prev,
      tileSampleIds: prev.tileSampleIds.includes(sampleId)
        ? prev.tileSampleIds.filter((id) => id !== sampleId)
        : [...prev.tileSampleIds, sampleId],
    }));
  };

  const validateStep = (step: WizardStep): string[] => {
    const stepErrors: string[] = [];

    if (step === 'property') {
      if (!form.propertyType) stepErrors.push(t.wizard.validation.propertyType);
      if (!form.propertyDescription.trim() || form.propertyDescription.trim().length < 10) {
        stepErrors.push(t.wizard.validation.propertyDescription);
      }
      if (!form.location.trim()) stepErrors.push(t.wizard.validation.location);
    }

    if (step === 'service' && !form.serviceId) {
      stepErrors.push(t.wizard.validation.service);
    }

    if (step === 'tiles' && form.tileSampleIds.length === 0) {
      stepErrors.push(t.wizard.validation.tiles);
    }

    if (step === 'details') {
      if (!form.projectSize) stepErrors.push(t.wizard.validation.projectSize);
      if (!form.timeline) stepErrors.push(t.wizard.validation.timeline);
    }

    if (step === 'contact') {
      if (!form.name.trim()) stepErrors.push(t.wizard.validation.name);
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        stepErrors.push(t.wizard.validation.email);
      }
      if (!form.phone.trim()) stepErrors.push(t.wizard.validation.phone);
    }

    return stepErrors;
  };

  const goNext = () => {
    const stepErrors = validateStep(currentStep);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors([]);
    setStepIndex((index) => Math.min(index + 1, wizardSteps.length - 1));
  };

  const goBack = () => {
    setErrors([]);
    setStepIndex((index) => Math.max(index - 1, 0));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const stepErrors = validateStep('contact');
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors([]);
    setIsSubmitting(true);

    const englishService = getEnglishServiceById(form.serviceId);
    const tileSampleLabels = form.tileSampleIds.map(
      (id) => t.wizard.tileSamples[id as keyof typeof t.wizard.tileSamples] ?? id
    );

    try {
      const response = await submitWizardForm({
        propertyType:
          form.propertyType === 'residential' ? t.wizard.residential : t.wizard.commercial,
        propertyDescription: form.propertyDescription.trim(),
        location: form.location.trim(),
        serviceTitle: englishService?.title ?? selectedService?.title ?? form.serviceId,
        tileSamples: tileSampleLabels,
        projectSize: t.wizard.projectSizes[form.projectSize],
        timeline: t.wizard.timelines[form.timeline],
        additionalNotes: form.additionalNotes.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        smsOptIn: form.smsOptIn || undefined,
        preferredVisit: form.preferredVisit.trim() || undefined,
        photos: form.photos.length ? form.photos : undefined,
      });

      setSuccessMessage(response.message);
      setForm(initialWizardForm);
      setStepIndex(0);
    } catch (err) {
      const apiError = err as ApiError;
      setErrors(apiError.errors || [apiError.message || t.contact.genericError]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepContent = t.wizard.steps[currentStep];

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={t.wizard.heroTitle}
        subtitle={t.wizard.heroSubtitle}
        backgroundImage={pageHeroImages.contact}
      />

      <section className="section">
        <div className="container wizard-container">
          <div className="wizard-progress" aria-label="Wizard progress">
            {wizardSteps.map((step, index) => (
              <div
                key={step}
                className={`wizard-progress-step${index <= stepIndex ? ' wizard-progress-step--active' : ''}${index === stepIndex ? ' wizard-progress-step--current' : ''}`}
              >
                <span className="wizard-progress-number">{index + 1}</span>
                <span className="wizard-progress-label">{t.wizard.stepLabels[index]}</span>
              </div>
            ))}
          </div>

          {successMessage && (
            <div className="alert alert-success wizard-success" role="status">
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

          <div className="wizard-panel">
            <div className="wizard-panel-header">
              <h2>{stepContent.title}</h2>
              <p>{stepContent.description}</p>
            </div>

            {currentStep === 'property' && (
              <div className="wizard-step">
                <fieldset className="wizard-fieldset">
                  <legend>{t.wizard.propertyType}</legend>
                  <div className="wizard-choice-grid wizard-choice-grid--two">
                    <label className={`wizard-choice${form.propertyType === 'residential' ? ' wizard-choice--selected' : ''}`}>
                      <input
                        type="radio"
                        name="propertyType"
                        value="residential"
                        checked={form.propertyType === 'residential'}
                        onChange={() => updateForm('propertyType', 'residential')}
                      />
                      <span>{t.wizard.residential}</span>
                    </label>
                    <label className={`wizard-choice${form.propertyType === 'commercial' ? ' wizard-choice--selected' : ''}`}>
                      <input
                        type="radio"
                        name="propertyType"
                        value="commercial"
                        checked={form.propertyType === 'commercial'}
                        onChange={() => updateForm('propertyType', 'commercial')}
                      />
                      <span>{t.wizard.commercial}</span>
                    </label>
                  </div>
                </fieldset>

                <div className="form-group">
                  <label htmlFor="propertyDescription">{t.wizard.propertyDescription}</label>
                  <textarea
                    id="propertyDescription"
                    rows={4}
                    value={form.propertyDescription}
                    onChange={(e) => updateForm('propertyDescription', e.target.value)}
                    placeholder={t.wizard.propertyDescriptionPlaceholder}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">{t.wizard.location}</label>
                  <input
                    id="location"
                    type="text"
                    value={form.location}
                    onChange={(e) => updateForm('location', e.target.value)}
                    placeholder={t.wizard.locationPlaceholder}
                  />
                </div>
              </div>
            )}

            {currentStep === 'service' && (
              <div className="wizard-step">
                <div className="wizard-service-grid">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className={`wizard-service-card${form.serviceId === service.id ? ' wizard-service-card--selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="serviceId"
                        value={service.id}
                        checked={form.serviceId === service.id}
                        onChange={() => updateForm('serviceId', service.id)}
                      />
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'tiles' && (
              <div className="wizard-step">
                <p className="wizard-hint">{t.wizard.tileSamplesHint}</p>
                <div className="wizard-tile-grid">
                  {tileSamples.map((sample) => {
                    const isSelected = form.tileSampleIds.includes(sample.id);
                    const label = t.wizard.tileSamples[sample.id as keyof typeof t.wizard.tileSamples];
                    return (
                      <button
                        key={sample.id}
                        type="button"
                        className={`wizard-tile-card${isSelected ? ' wizard-tile-card--selected' : ''}`}
                        onClick={() => toggleTileSample(sample.id)}
                        aria-pressed={isSelected}
                      >
                        <StockImage image={sample.image} aspectRatio="4 / 3" className="wizard-tile-image" />
                        <span className="wizard-tile-label">{label}</span>
                        {isSelected && <span className="wizard-tile-check" aria-hidden="true">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {currentStep === 'details' && (
              <div className="wizard-step">
                <div className="form-group">
                  <label htmlFor="projectSize">{t.wizard.projectSize}</label>
                  <select
                    id="projectSize"
                    value={form.projectSize}
                    onChange={(e) => updateForm('projectSize', e.target.value as WizardFormData['projectSize'])}
                  >
                    <option value="">—</option>
                    {projectSizeOptions.map((option) => (
                      <option key={option} value={option}>
                        {t.wizard.projectSizes[option]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="timeline">{t.wizard.timeline}</label>
                  <select
                    id="timeline"
                    value={form.timeline}
                    onChange={(e) => updateForm('timeline', e.target.value as WizardFormData['timeline'])}
                  >
                    <option value="">—</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {t.wizard.timelines[option]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="additionalNotes">{t.wizard.additionalNotes}</label>
                  <textarea
                    id="additionalNotes"
                    rows={4}
                    value={form.additionalNotes}
                    onChange={(e) => updateForm('additionalNotes', e.target.value)}
                    placeholder={t.wizard.additionalNotesPlaceholder}
                  />
                </div>
              </div>
            )}

            {currentStep === 'contact' && (
              <form className="wizard-step" onSubmit={handleSubmit} noValidate>
                <div className="wizard-review">
                  <h3>{t.wizard.reviewTitle}</h3>
                  <dl className="wizard-review-list">
                    <div>
                      <dt>{t.wizard.review.propertyType}</dt>
                      <dd>{form.propertyType === 'residential' ? t.wizard.residential : form.propertyType === 'commercial' ? t.wizard.commercial : '—'}</dd>
                    </div>
                    <div>
                      <dt>{t.wizard.review.location}</dt>
                      <dd>{form.location || '—'}</dd>
                    </div>
                    <div>
                      <dt>{t.wizard.review.property}</dt>
                      <dd>{form.propertyDescription || '—'}</dd>
                    </div>
                    <div>
                      <dt>{t.wizard.review.service}</dt>
                      <dd>{selectedService?.title || '—'}</dd>
                    </div>
                    <div>
                      <dt>{t.wizard.review.tiles}</dt>
                      <dd>
                        {form.tileSampleIds.length
                          ? form.tileSampleIds
                              .map((id) => t.wizard.tileSamples[id as keyof typeof t.wizard.tileSamples])
                              .join(', ')
                          : t.wizard.review.none}
                      </dd>
                    </div>
                    <div>
                      <dt>{t.wizard.review.size}</dt>
                      <dd>{form.projectSize ? t.wizard.projectSizes[form.projectSize] : '—'}</dd>
                    </div>
                    <div>
                      <dt>{t.wizard.review.timeline}</dt>
                      <dd>{form.timeline ? t.wizard.timelines[form.timeline] : '—'}</dd>
                    </div>
                    {form.additionalNotes && (
                      <div>
                        <dt>{t.wizard.review.notes}</dt>
                        <dd>{form.additionalNotes}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="form-group">
                  <label htmlFor="wizard-name">{t.wizard.fullName}</label>
                  <input
                    id="wizard-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    placeholder={t.contact.namePlaceholder}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="wizard-email">{t.common.email} *</label>
                    <input
                      id="wizard-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder={t.contact.emailPlaceholder}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="wizard-phone">{t.common.phone} *</label>
                    <input
                      id="wizard-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      placeholder={t.contact.phonePlaceholder}
                      required
                    />
                  </div>
                </div>

                <PhotoUploadField
                  photos={form.photos}
                  onChange={(photos) => updateForm('photos', photos)}
                />

                <AppointmentField
                  value={form.preferredVisit}
                  onChange={(preferredVisit) => updateForm('preferredVisit', preferredVisit)}
                />

                <SmsOptInField
                  checked={form.smsOptIn}
                  onChange={(smsOptIn) => updateForm('smsOptIn', smsOptIn)}
                />
              </form>
            )}

            <div className="wizard-actions">
              {stepIndex > 0 && (
                <button type="button" className="btn btn-secondary" onClick={goBack}>
                  {t.wizard.back}
                </button>
              )}
              {currentStep !== 'contact' ? (
                <button type="button" className="btn btn-primary" onClick={goNext}>
                  {t.wizard.next}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.common.sending : t.wizard.submit}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
