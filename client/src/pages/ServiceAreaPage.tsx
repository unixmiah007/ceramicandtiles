import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import { serviceAreaCities } from '../data/features';
import { useLanguage } from '../context/LanguageContext';
import { getStaticPageSeo } from '../seo/meta';
import { sectionImages } from '../data/images';

export default function ServiceAreaPage() {
  const { locale, f } = useLanguage();
  const seo = getStaticPageSeo('service-area', locale)!;

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={f.serviceArea.heroTitle}
        subtitle={f.serviceArea.heroSubtitle}
        backgroundImage={sectionImages.residential}
      />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{f.serviceArea.mapTitle}</h2>
            <p>{f.serviceArea.mapDescription}</p>
          </div>

          <div className="service-area-map">
            <iframe
              title="Washington D.C. metro service area map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-77.6%2C38.7%2C-77.0%2C39.1&layer=mapnik&marker=38.88%2C-77.3"
              loading="lazy"
            />
          </div>

          <div className="service-area-cities">
            <h3>{f.serviceArea.citiesTitle}</h3>
            <ul className="city-grid">
              {serviceAreaCities.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>

          <div className="service-area-cta text-center">
            <p>{f.serviceArea.notListed}</p>
            <Link to="/contact" className="btn btn-secondary">
              {f.serviceArea.notListedCta}
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
