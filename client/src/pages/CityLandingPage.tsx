import { Link, Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import { blogPosts } from '../data/blog';
import { useLanguage } from '../context/LanguageContext';
import {
  CITY_RELATED_BLOG_SLUGS,
  FEATURED_CITY_SERVICE_IDS,
  formatCityLabel,
  getCityBySlug,
  getCityPath,
  getNearbyCities,
  replaceCityTokens,
} from '../data/service-area-cities';
import NeighborhoodMap from '../components/NeighborhoodMap';
import { buildCityFaqItems, getCitySeo } from '../seo/city';
import { sectionImages } from '../data/images';
import { SERVICE_AREA_HERO_VIDEO } from '../data/hero-videos';
import { contactInfo } from '../data/content';
import { SITE_NAME } from '../seo/site';

export default function CityLandingPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const { locale, f, getServiceById } = useLanguage();
  const city = getCityBySlug(citySlug);

  if (!city) {
    return <Navigate to="/service-area" replace />;
  }

  const copy = f.cityLanding;
  const faqItems = buildCityFaqItems(city, copy.faqItems);
  const seo = getCitySeo(city, locale, faqItems);
  const nearbyCities = getNearbyCities(city);
  const featuredServices = FEATURED_CITY_SERVICE_IDS.map((id) => getServiceById(id)).filter(
    Boolean
  );
  const relatedPosts = CITY_RELATED_BLOG_SLUGS.map((slug) => blogPosts.find((post) => post.slug === slug)).filter(
    Boolean
  );

  const regionIntro =
    copy.regionIntro[city.region as keyof typeof copy.regionIntro] ?? copy.introP1;

  return (
    <>
      <SeoHead {...seo} />
      <main id="city-landing-main">
        <PageHero
          title={replaceCityTokens(copy.heroTitle, city)}
          subtitle={replaceCityTokens(copy.heroSubtitle, city)}
          backgroundVideo={{
            youtubeId: SERVICE_AREA_HERO_VIDEO.youtubeId,
            poster: sectionImages.yourSpaceDeservesTheBest,
            title: SERVICE_AREA_HERO_VIDEO.title,
          }}
        />

        <section className="section city-landing-intro" aria-labelledby="city-intro-heading">
          <div className="container">
            <div className="city-landing-intro-grid">
              <div className="city-landing-copy">
                <h2 id="city-intro-heading" className="sr-only">
                  {replaceCityTokens(copy.seoSectionTitle, city)}
                </h2>
                <p className="lead">{replaceCityTokens(regionIntro, city)}</p>
                <p>{replaceCityTokens(copy.introP2, city)}</p>
                <div className="city-landing-contact-card">
                  <h3>{replaceCityTokens(copy.contactTitle, city)}</h3>
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
              <aside className="city-landing-highlights" aria-label={replaceCityTokens(copy.highlightsTitle, city)}>
                <h2>{replaceCityTokens(copy.highlightsTitle, city)}</h2>
                <ul className="feature-list">
                  {copy.highlights.map((item) => (
                    <li key={item}>{replaceCityTokens(item, city)}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="section section-alt city-landing-map" aria-labelledby="city-map-heading">
          <div className="container">
            <NeighborhoodMap
              city={city}
              headingId="city-map-heading"
              title={replaceCityTokens(copy.mapTitle, city)}
              description={replaceCityTokens(copy.mapDescription, city)}
              openLabel={replaceCityTokens(copy.mapOpen, city)}
            />
          </div>
        </section>

        <section className="section city-landing-seo" aria-labelledby="city-seo-heading">
          <div className="container">
            <h2 id="city-seo-heading">{replaceCityTokens(copy.seoSectionTitle, city)}</h2>
            <p>{replaceCityTokens(copy.seoSectionP1, city)}</p>
            <p>{replaceCityTokens(copy.seoSectionP2, city)}</p>
            <div className="city-landing-search-terms">
              <h3>{replaceCityTokens(copy.searchTermsTitle, city)}</h3>
              <ul>
                {copy.searchTerms.map((term) => (
                  <li key={term}>{replaceCityTokens(term, city)}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="city-services-heading">
          <div className="container">
            <div className="section-header">
              <h2 id="city-services-heading">{replaceCityTokens(copy.servicesTitle, city)}</h2>
              <p>{replaceCityTokens(copy.servicesDescription, city)}</p>
            </div>
            <div className="city-landing-services">
              {featuredServices.map((service) => (
                <Link
                  key={service!.id}
                  to={`/services/${service!.id}`}
                  className="city-landing-service-card"
                  aria-label={`${service!.title} in ${formatCityLabel(city)}`}
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

        <section className="section section-alt" aria-labelledby="city-why-heading">
          <div className="container">
            <div className="section-header">
              <h2 id="city-why-heading">{replaceCityTokens(copy.whyTitle, city)}</h2>
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

        <section className="section city-landing-nap" aria-labelledby="city-nap-heading">
          <div className="container">
            <div className="city-landing-nap-card">
              <h2 id="city-nap-heading">{copy.napTitle}</h2>
              <p>{replaceCityTokens(copy.napDescription, city)}</p>
              <address className="city-landing-nap-details">
                <strong>{SITE_NAME}</strong>
                <span>
                  {replaceCityTokens('Serving {cityState} · {county}', city)}
                </span>
                <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}>{contactInfo.phone}</a>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </address>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="section section-alt" aria-labelledby="city-articles-heading">
            <div className="container">
              <div className="section-header">
                <h2 id="city-articles-heading">{replaceCityTokens(copy.relatedArticlesTitle, city)}</h2>
                <p>{replaceCityTokens(copy.relatedArticlesDescription, city)}</p>
              </div>
              <ul className="city-landing-articles">
                {relatedPosts.map((post) => {
                  const content = f.blog.posts[post!.titleKey as keyof typeof f.blog.posts];
                  return (
                    <li key={post!.slug}>
                      <Link to={`/blog/${post!.slug}`}>{content.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        <section className="section" aria-labelledby="city-resources-heading">
          <div className="container">
            <h2 id="city-resources-heading">{replaceCityTokens(copy.resourcesTitle, city)}</h2>
            <ul className="city-landing-resources">
              {copy.resources.map((resource) => (
                <li key={resource.href}>
                  <Link to={replaceCityTokens(resource.href, city)}>
                    {replaceCityTokens(resource.label, city)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {nearbyCities.length > 0 && (
          <section className="section section-alt" aria-labelledby="city-nearby-heading">
            <div className="container">
              <div className="section-header">
                <h2 id="city-nearby-heading">{copy.nearbyTitle}</h2>
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

        <section className="section city-landing-faq" aria-labelledby="city-faq-heading">
          <div className="container">
            <div className="section-header">
              <h2 id="city-faq-heading">{replaceCityTokens(copy.faqTitle, city)}</h2>
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
              <Link to="/faq">{copy.moreFaq}</Link>
            </p>
          </div>
        </section>
      </main>

      <CTASection />
    </>
  );
}
