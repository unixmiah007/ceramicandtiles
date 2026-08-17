import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import { useLanguage } from '../context/LanguageContext';
import { pageHeroImages, sectionImages, getServiceImage } from '../data/images';

export default function ServicesPage() {
  const { t, services, getEnglishServiceById } = useLanguage();

  return (
    <>
      <PageHero
        title={t.services.heroTitle}
        subtitle={t.services.heroSubtitle}
        backgroundImage={pageHeroImages.services}
      />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t.services.completeTitle}</h2>
            <p>{t.services.completeDescription}</p>
          </div>

          <div className="service-grid">
            {services.map((service) => {
              const englishService = getEnglishServiceById(service.id)!;
              return (
                <article key={service.id} className="service-card service-card--image">
                  <StockImage
                    image={getServiceImage(englishService.id, englishService.title)}
                    aspectRatio="16 / 10"
                    className="service-card-image"
                  />
                  <div className="service-card-body">
                    <h3>{service.title}</h3>
                    <p className="value-card-tagline">{service.tagline}</p>
                    <p>{service.description}</p>
                    <p className="value-card-preview">{service.intro}</p>
                    <ul className="value-card-highlights">
                      {service.highlights.slice(0, 2).map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <Link to={`/services/${service.id}`} className="btn btn-secondary value-card-link">
                      {t.common.viewServiceDetails}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="two-column two-column--centered">
            <div className="feature-panel">
              <StockImage
                image={sectionImages.residential}
                aspectRatio="16 / 10"
                className="feature-panel-image"
              />
              <h2>{t.services.residentialTitle}</h2>
              <ul className="feature-list">
                {t.services.residentialItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="feature-panel">
              <StockImage
                image={sectionImages.commercial}
                aspectRatio="16 / 10"
                className="feature-panel-image"
              />
              <h2>{t.services.commercialTitle}</h2>
              <ul className="feature-list">
                {t.services.commercialItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="value-links-grid service-links-grid">
            {services.map((service) => (
              <Link key={service.id} to={`/services/${service.id}`} className="value-link-card">
                <h3>{service.title}</h3>
                <p>{service.tagline}</p>
                <span className="value-link-card-action">{t.common.readFullDetails}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
