import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import GallerySection from '../components/GallerySection';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import { useLanguage } from '../context/LanguageContext';
import { processStepImages, sectionImages, getServiceImage, getValueImage } from '../data/images';

const processStepKeys = ['demolition', 'waterproofing', 'installation', 'finishing'] as const;
const processStepNumbers = ['01', '02', '03', '04'];

export default function HomePage() {
  const { t, services, values, getEnglishServiceById, getEnglishValueById } = useLanguage();

  return (
    <>
      <HeroCarousel />

      <section className="section">
        <div className="container">
          <div className="split-feature">
            <div className="split-feature-content">
              <h2>{t.home.yourSpaceTitle}</h2>
              <p>{t.home.yourSpaceP1}</p>
              <p>{t.home.yourSpaceP2}</p>
            </div>
            <StockImage
              image={sectionImages.yourSpaceDeservesTheBest}
              aspectRatio="4 / 3"
              className="split-feature-image rounded-image"
            />
          </div>

          <div className="process-steps">
            {processStepKeys.map((key, index) => (
              <div key={key} className="process-step process-step--image">
                <StockImage
                  image={processStepImages[key]}
                  aspectRatio="16 / 10"
                  className="process-step-image"
                />
                <div className="process-step-body">
                  <span className="step-number">{processStepNumbers[index]}</span>
                  <h3>{t.home.processSteps[key].title}</h3>
                  <p>{t.home.processSteps[key].description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GallerySection />

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>{t.home.servicesTitle}</h2>
            <p>{t.home.servicesDescription}</p>
          </div>
          <div className="service-grid service-grid-preview">
            {services.slice(0, 6).map((service) => {
              const englishService = getEnglishServiceById(service.id)!;
              return (
                <div key={service.id} className="service-card service-card--image">
                  <StockImage
                    image={getServiceImage(englishService.id, englishService.title)}
                    aspectRatio="16 / 10"
                    className="service-card-image"
                  />
                  <div className="service-card-body">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <Link to={`/services/${service.id}`} className="inline-link">
                      {t.common.viewServiceDetails}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn btn-secondary">
              {t.common.viewAllServices}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t.home.whyTitle}</h2>
          </div>
          <div className="values-grid">
            {values.map((value) => {
              const englishValue = getEnglishValueById(value.id)!;
              return (
                <div key={value.id} className="value-card value-card--image">
                  <StockImage
                    image={getValueImage(englishValue.id, englishValue.title)}
                    aspectRatio="16 / 9"
                    className="value-card-image"
                  />
                  <div className="value-card-body">
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                    <Link to={`/why-portillo/${value.id}`} className="inline-link">
                      {t.common.learnMore}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="section-cta">
            <Link to="/why-portillo" className="btn btn-secondary">
              {t.home.learnMoreAboutUs}
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
