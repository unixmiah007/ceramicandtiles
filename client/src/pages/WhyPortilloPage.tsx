import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import { useLanguage } from '../context/LanguageContext';
import { pageHeroImages, sectionImages, getValueImage } from '../data/images';

export default function WhyPortilloPage() {
  const { t, values, getEnglishValueById } = useLanguage();

  return (
    <>
      <PageHero
        title={t.whyPortillo.heroTitle}
        subtitle={t.whyPortillo.heroSubtitle}
        backgroundImage={pageHeroImages['why-portillo']}
      />

      <section className="section">
        <div className="container">
          <div className="split-feature split-feature--reverse">
            <StockImage
              image={sectionImages.whyPortillo}
              aspectRatio="4 / 3"
              className="split-feature-image rounded-image"
            />
            <div className="split-feature-content intro-block intro-block--left">
              <p className="lead">{t.whyPortillo.introLead}</p>
              <p>{t.whyPortillo.introP}</p>
            </div>
          </div>

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
