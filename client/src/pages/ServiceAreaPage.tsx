import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import {
  SERVICE_AREA_CITIES,
  SERVICE_AREA_REGION_ORDER,
  formatCityLabel,
  getCityPath,
  getCitiesByRegion,
} from '../data/service-area-cities';
import { useLanguage } from '../context/LanguageContext';
import { getStaticPageSeo } from '../seo/meta';
import { sectionImages } from '../data/images';
import { SERVICE_AREA_HERO_VIDEO } from '../data/hero-videos';

export default function ServiceAreaPage() {
  const { locale, f } = useLanguage();
  const seo = getStaticPageSeo('service-area', locale)!;

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={f.serviceArea.heroTitle}
        subtitle={f.serviceArea.heroSubtitle}
        backgroundVideo={{
          youtubeId: SERVICE_AREA_HERO_VIDEO.youtubeId,
          poster: sectionImages.yourSpaceDeservesTheBest,
          title: SERVICE_AREA_HERO_VIDEO.title,
        }}
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
            <p className="service-area-cities-note">
              {locale === 'es'
                ? `Explore páginas locales de azulejos para ${SERVICE_AREA_CITIES.length} comunidades.`
                : `Browse local tile contractor pages for ${SERVICE_AREA_CITIES.length} communities.`}
            </p>
            {SERVICE_AREA_REGION_ORDER.map((region) => {
              const cities = getCitiesByRegion(region);
              if (cities.length === 0) return null;

              return (
                <div key={region} className="service-area-region">
                  <h4>{f.cityLanding.regionLabels[region]}</h4>
                  <ul className="city-grid city-grid--linked">
                    {cities.map((city) => (
                      <li key={city.slug}>
                        <Link to={getCityPath(city)}>{formatCityLabel(city)}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
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
