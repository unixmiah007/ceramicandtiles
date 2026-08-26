import { Link, Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import SeoHead from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import { getServiceSeo } from '../seo/meta';
import { getServiceImage, getServiceSectionImage } from '../data/images';

export default function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { locale, t, services, getServiceById, getEnglishServiceById } = useLanguage();
  const service = serviceId ? getServiceById(serviceId) : undefined;
  const englishService = serviceId ? getEnglishServiceById(serviceId) : undefined;

  if (!service || !englishService) {
    return <Navigate to="/services" replace />;
  }

  const seo = getServiceSeo(service, locale);

  const otherServices = services.filter((item) => item.id !== service.id).slice(0, 6);
  const heroImage = getServiceImage(englishService.id, englishService.title);
  const sectionImages = englishService.sections.map((section) =>
    getServiceSectionImage(englishService.id, section.heading)
  );

  return (
    <>
      <SeoHead {...seo} />
      <PageHero title={service.title} subtitle={service.tagline} backgroundImage={heroImage} />

      <section className="section">
        <div className="container">
          <div className="value-detail-intro">
            <div className="value-detail-copy">
              <p className="lead">{service.intro}</p>
              <p>{service.description}</p>
            </div>
            <StockImage
              image={heroImage}
              aspectRatio="4 / 3"
              className="rounded-image value-detail-featured"
            />
          </div>

          <div className="detail-panels">
            <div className="value-highlights">
              <h2>{t.serviceDetail.whatWeProvide}</h2>
              <ul className="feature-list">
                {service.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="value-highlights">
              <h2>{t.serviceDetail.idealFor}</h2>
              <ul className="feature-list">
                {service.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="value-detail-sections">
            {service.sections.map((section, index) => (
              <article
                key={section.heading}
                className={`value-detail-section ${index % 2 === 1 ? 'value-detail-section--reverse' : ''}`}
              >
                <StockImage
                  image={sectionImages[index]}
                  aspectRatio="16 / 11"
                  className="value-detail-section-image rounded-image"
                />
                <div className="value-detail-section-copy">
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t.serviceDetail.projectExamples}</h2>
            <p>{t.serviceDetail.projectExamplesDescription}</p>
          </div>
          <div className="value-detail-gallery">
            {sectionImages.map((image) => (
              <StockImage
                key={image.src}
                image={image}
                aspectRatio="4 / 3"
                className="rounded-image value-detail-gallery-item"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>{t.serviceDetail.exploreMore}</h2>
          </div>
          <div className="value-links-grid">
            {otherServices.map((item) => (
              <Link key={item.id} to={`/services/${item.id}`} className="value-link-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="value-link-card-action">{t.common.viewServiceDetails}</span>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn btn-secondary">
              {t.common.backToAllServices}
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title={`${t.serviceDetail.quoteTitle} ${service.title}`}
        description={t.serviceDetail.quoteDescription}
      />
    </>
  );
}
