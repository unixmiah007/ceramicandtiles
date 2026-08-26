import { Link, Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import {
  FEATURED_CITY_SERVICE_IDS,
  formatCityLabel,
  getCityBySlug,
  getCityPath,
  getNearbyCities,
  replaceCityTokens,
} from '../data/service-area-cities';
import { getCitySeo } from '../seo/city';
import { sectionImages } from '../data/images';
import { contactInfo } from '../data/content';

export default function CityLandingPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const { locale, f, getServiceById } = useLanguage();
  const city = getCityBySlug(citySlug);

  if (!city) {
    return <Navigate to="/service-area" replace />;
  }

  const seo = getCitySeo(city, locale);
  const copy = f.cityLanding;
  const nearbyCities = getNearbyCities(city);
  const featuredServices = FEATURED_CITY_SERVICE_IDS.map((id) => getServiceById(id)).filter(
    Boolean
  );

  const regionIntro =
    copy.regionIntro[city.region as keyof typeof copy.regionIntro] ?? copy.introP1;

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={replaceCityTokens(copy.heroTitle, city)}
        subtitle={replaceCityTokens(copy.heroSubtitle, city)}
        backgroundImage={sectionImages.residential}
      />

      <section className="section city-landing-intro">
        <div className="container">
          <div className="city-landing-intro-grid">
            <div className="city-landing-copy">
              <p className="lead">{replaceCityTokens(regionIntro, city)}</p>
              <p>{replaceCityTokens(copy.introP2, city)}</p>
              <div className="city-landing-contact-card">
                <h2>{replaceCityTokens(copy.contactTitle, city)}</h2>
                <p>{replaceCityTokens(copy.contactDescription, city)}</p>
                <div className="city-landing-contact-actions">
                  <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="btn btn-primary">
                    {copy.callCta} {contactInfo.phone}
                  </a>
                  <Link to="/contact" className="btn btn-secondary">
                    {copy.quoteCta}
                  </Link>
                </div>
              </div>
            </div>
            <aside className="city-landing-highlights" aria-label={copy.highlightsTitle}>
              <h2>{copy.highlightsTitle}</h2>
              <ul className="feature-list">
                {copy.highlights.map((item) => (
                  <li key={item}>{replaceCityTokens(item, city)}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>{replaceCityTokens(copy.servicesTitle, city)}</h2>
            <p>{replaceCityTokens(copy.servicesDescription, city)}</p>
          </div>
          <div className="city-landing-services">
            {featuredServices.map((service) => (
              <Link
                key={service!.id}
                to={`/services/${service!.id}`}
                className="city-landing-service-card"
              >
                <h3>{service!.title}</h3>
                <p>{service!.description}</p>
                <span className="city-landing-service-link">{copy.viewService}</span>
              </Link>
            ))}
          </div>
          <p className="city-landing-services-footer">
            <Link to="/services">{copy.allServices}</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{replaceCityTokens(copy.whyTitle, city)}</h2>
            <p>{replaceCityTokens(copy.whyDescription, city)}</p>
          </div>
          <div className="city-landing-why-grid">
            {copy.whyItems.map((item) => (
              <article key={item.title} className="city-landing-why-card">
                <h3>{replaceCityTokens(item.title, city)}</h3>
                <p>{replaceCityTokens(item.body, city)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {nearbyCities.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <h2>{copy.nearbyTitle}</h2>
              <p>{replaceCityTokens(copy.nearbyDescription, city)}</p>
            </div>
            <ul className="city-grid city-grid--linked">
              {nearbyCities.map((nearby) => (
                <li key={nearby.slug}>
                  <Link to={getCityPath(nearby)}>{formatCityLabel(nearby)}</Link>
                </li>
              ))}
            </ul>
            <p className="city-landing-nearby-footer">
              <Link to="/service-area">{copy.viewAllAreas}</Link>
            </p>
          </div>
        </section>
      )}

      <section className="section city-landing-faq">
        <div className="container">
          <div className="section-header">
            <h2>{replaceCityTokens(copy.faqTitle, city)}</h2>
          </div>
          <div className="city-landing-faq-list">
            {copy.faqItems.map((item) => (
              <article key={item.question} className="city-landing-faq-item">
                <h3>{replaceCityTokens(item.question, city)}</h3>
                <p>{replaceCityTokens(item.answer, city)}</p>
              </article>
            ))}
          </div>
          <p className="city-landing-faq-footer">
            <Link to="/faq">{copy.moreFaq}</Link>
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
