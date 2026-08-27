import { Link, Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import {
  formatCityLabel,
  getCityBySlug,
  getCityPath,
  getNearbyCities,
  replaceCityTokens,
} from '../data/service-area-cities';
import {
  bathroomHeadline,
  formatUsd,
  formatUsdRange,
  getCityCostGuide,
  getCostGuidePath,
} from '../data/cost-guides';
import { getCityCostGuideSeo } from '../seo/cost-guides';
import { sectionImages } from '../data/images';
import { contactInfo } from '../data/content';

export default function CostGuideCityPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const { locale, f, getServiceById } = useLanguage();
  const city = getCityBySlug(citySlug);

  if (!city) {
    return <Navigate to="/cost-guides" replace />;
  }

  const copy = f.costGuides;
  const guide = getCityCostGuide(city);
  const nearbyCities = getNearbyCities(city);
  const headline = bathroomHeadline(city, locale);
  const faqItems = copy.faqItems.map((item) => ({
    question: replaceCityTokens(item.question, city),
    answer: replaceCityTokens(
      item.answer
        .replaceAll('{bathroomRange}', formatUsdRange(guide.projects[0].min, guide.projects[0].max, locale))
        .replaceAll('{showerRange}', formatUsdRange(guide.projects[1].min, guide.projects[1].max, locale)),
      city
    ),
  }));
  const seo = getCityCostGuideSeo(city, locale, faqItems);

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={replaceCityTokens(copy.cityTitle, city)}
        subtitle={replaceCityTokens(copy.citySubtitle, city)}
        backgroundImage={sectionImages.yourSpaceDeservesTheBest}
      />

      <section className="section">
        <div className="container cost-guide-layout">
          <div>
            <p className="cost-guide-headline lead">{headline}</p>
            <p>{replaceCityTokens(copy.cityIntro, city)}</p>
            <p className="cost-guide-disclaimer">{copy.disclaimer}</p>
          </div>
          <aside className="cost-guide-highlight">
            <h2>{replaceCityTokens(copy.highlightTitle, city)}</h2>
            <p className="cost-guide-highlight-range">
              {formatUsdRange(guide.projects[0].min, guide.projects[0].max, locale)}
            </p>
            <p>{copy.highlightNote}</p>
            <div className="city-landing-contact-actions">
              <Link to="/estimate" className="btn btn-primary">
                {copy.estimateCta}
              </Link>
              <Link to={getCityPath(city)} className="btn btn-secondary">
                {replaceCityTokens(copy.cityPageCta, city)}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>{replaceCityTokens(copy.tableTitle, city)}</h2>
            <p>{replaceCityTokens(copy.tableDescription, city)}</p>
          </div>
          <div className="cost-guide-table-wrap">
            <table className="cost-guide-table">
              <thead>
                <tr>
                  <th>{copy.colProject}</th>
                  <th>{copy.colRange}</th>
                  <th>{copy.colService}</th>
                </tr>
              </thead>
              <tbody>
                {guide.projects.map((project) => {
                  const service = getServiceById(project.serviceId);
                  return (
                    <tr key={project.id}>
                      <td>{copy.projects[project.id as keyof typeof copy.projects]}</td>
                      <td>{formatUsdRange(project.min, project.max, locale)}</td>
                      <td>
                        {service ? (
                          <Link to={`/services/${service.id}`}>{service.title}</Link>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{replaceCityTokens(copy.sqftTitle, city)}</h2>
            <p>{replaceCityTokens(copy.sqftDescription, city)}</p>
          </div>
          <ul className="cost-guide-sqft">
            <li>
              <strong>{copy.sqftCeramic}</strong>
              <span>
                {formatUsd(guide.sqft.ceramic.min, locale)}–{formatUsd(guide.sqft.ceramic.max, locale)}
                {copy.perSqft}
              </span>
            </li>
            <li>
              <strong>{copy.sqftPorcelain}</strong>
              <span>
                {formatUsd(guide.sqft.porcelain.min, locale)}–{formatUsd(guide.sqft.porcelain.max, locale)}
                {copy.perSqft}
              </span>
            </li>
            <li>
              <strong>{copy.sqftStone}</strong>
              <span>
                {formatUsd(guide.sqft.stone.min, locale)}–{formatUsd(guide.sqft.stone.max, locale)}
                {copy.perSqft}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>{copy.factorsTitle}</h2>
          <ul className="feature-list">
            {copy.factors.map((factor) => (
              <li key={factor}>{replaceCityTokens(factor, city)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{replaceCityTokens(copy.faqTitle, city)}</h2>
          </div>
          <div className="city-landing-faq-list">
            {faqItems.map((item) => (
              <article key={item.question} className="city-landing-faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
          <p className="city-landing-faq-footer">
            <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}>
              {copy.callCta} {contactInfo.phone}
            </a>
          </p>
        </div>
      </section>

      {nearbyCities.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <h2>{copy.nearbyTitle}</h2>
            </div>
            <ul className="city-grid city-grid--linked">
              {nearbyCities.map((nearby) => (
                <li key={nearby.slug}>
                  <Link to={getCostGuidePath(nearby)}>{formatCityLabel(nearby)}</Link>
                </li>
              ))}
            </ul>
            <p className="city-landing-nearby-footer">
              <Link to="/cost-guides">{copy.viewAllGuides}</Link>
            </p>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
