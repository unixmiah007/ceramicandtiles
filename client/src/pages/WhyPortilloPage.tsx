import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import WhyPortilloImageShowcase from '../components/WhyPortilloImageShowcase';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import SeoHead from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import { getStaticPageSeo } from '../seo/meta';
import { pageHeroImages, getValueImage } from '../data/images';

export default function WhyPortilloPage() {
  const { locale, t, values, getEnglishValueById } = useLanguage();
  const seo = getStaticPageSeo('why-portillo', locale)!;

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={t.whyPortillo.heroTitle}
        subtitle={t.whyPortillo.heroSubtitle}
        backgroundImage={pageHeroImages['why-portillo']}
      />

      <WhyPortilloImageShowcase />

      <section className="section">
        <div className="container">
          <div className="values-grid values-grid-large">
            {values.map((value, index) => {
              const englishValue = getEnglishValueById(value.id)!;
              return (
                <article key={value.id} className="value-card value-card-large value-card--image">
                  <StockImage
                    image={getValueImage(englishValue.id, englishValue.title)}
                    aspectRatio="16 / 9"
                    className="value-card-image"
                  />
                  <div className="value-card-body">
                    <span className="value-number">{String(index + 1).padStart(2, '0')}</span>
                    <h2>{value.title}</h2>
                    <p className="value-card-tagline">{value.tagline}</p>
                    <p>{value.description}</p>
                    <p className="value-card-preview">{value.intro}</p>
                    <ul className="value-card-highlights">
                      {value.highlights.slice(0, 2).map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <Link to={`/why-portillo/${value.id}`} className="btn btn-secondary value-card-link">
                      {t.whyPortillo.learnMoreAbout} {value.title}
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
          <div className="quote-block">
            <blockquote>{t.whyPortillo.quote}</blockquote>
            <p className="quote-attribution">{t.whyPortillo.quoteAttribution}</p>
          </div>

          <div className="value-links-grid">
            {values.map((value) => (
              <Link key={value.id} to={`/why-portillo/${value.id}`} className="value-link-card">
                <h3>{value.title}</h3>
                <p>{value.tagline}</p>
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
