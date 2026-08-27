import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import {
  SERVICE_AREA_CITIES,
  SERVICE_AREA_REGION_ORDER,
  formatCityLabel,
  getCitiesByRegion,
} from '../data/service-area-cities';
import {
  bathroomHeadline,
  formatUsdRange,
  getCityCostGuide,
  getCostGuidePath,
} from '../data/cost-guides';
import { getCostGuidesHubSeo } from '../seo/cost-guides';
import { sectionImages } from '../data/images';

export default function CostGuidesPage() {
  const { locale, f } = useLanguage();
  const copy = f.costGuides;
  const seo = getCostGuidesHubSeo(locale);
  const sample = SERVICE_AREA_CITIES.find((city) => city.slug === 'arlington-va') ?? SERVICE_AREA_CITIES[0];

  return (
    <>
      <SeoHead {...seo} />
      <PageHero title={copy.hubTitle} subtitle={copy.hubSubtitle} backgroundImage={sectionImages.craftsmanship} />

      <section className="section">
        <div className="container">
          <p className="lead">{copy.hubIntro}</p>
          <p className="cost-guide-example">{bathroomHeadline(sample, locale)}</p>
          <p>{copy.hubDisclaimer}</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          {SERVICE_AREA_REGION_ORDER.map((region) => {
            const cities = getCitiesByRegion(region);
            if (cities.length === 0) {
              return null;
            }
            return (
              <div key={region} className="cost-guide-region">
                <h2>{copy.regionLabels[region]}</h2>
                <ul className="cost-guide-city-list">
                  {cities.map((city) => {
                    const bathroom = getCityCostGuide(city).projects.find((project) => project.id === 'bathroom')!;
                    return (
                      <li key={city.slug}>
                        <Link to={getCostGuidePath(city)}>
                          <span>{formatCityLabel(city)}</span>
                          <strong>
                            {copy.bathroomLabel}: {formatUsdRange(bathroom.min, bathroom.max, locale)}
                          </strong>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
