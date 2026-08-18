import { Link, Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import SeoHead from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import { getValueSeo } from '../seo/meta';
import { getValueImage, getValueSectionImage } from '../data/images';

export default function ValueDetailPage() {
  const { valueId } = useParams<{ valueId: string }>();
  const { locale, t, values, getValueById, getEnglishValueById } = useLanguage();
  const value = valueId ? getValueById(valueId) : undefined;
  const englishValue = valueId ? getEnglishValueById(valueId) : undefined;

  if (!value || !englishValue) {
    return <Navigate to="/why-portillo" replace />;
  }

  const seo = getValueSeo(value, locale);

  const otherValues = values.filter((item) => item.id !== value.id);
  const heroImage = getValueImage(englishValue.id, englishValue.title);
  const sectionImages = englishValue.sections.map((section) =>
    getValueSectionImage(englishValue.id, section.heading)
  );

  return (
    <>
      <SeoHead {...seo} />
      <PageHero title={value.title} subtitle={value.tagline} backgroundImage={heroImage} />

      <section className="section">
        <div className="container">
          <div className="value-detail-intro">
            <div className="value-detail-copy">
              <p className="lead">{value.intro}</p>
              <p>{value.description}</p>
            </div>
            <StockImage
              image={heroImage}
              aspectRatio="4 / 3"
              className="rounded-image value-detail-featured"
            />
          </div>

          <div className="value-highlights">
            <h2>{t.valueDetail.whatItMeans}</h2>
            <ul className="feature-list">
              {value.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="value-detail-sections">
            {value.sections.map((section, index) => (
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
            <h2>{t.valueDetail.moreWork}</h2>
            <p>{t.valueDetail.moreWorkDescription}</p>
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
            <h2>{t.valueDetail.exploreOther}</h2>
          </div>
          <div className="value-links-grid">
            {otherValues.map((item) => (
              <Link key={item.id} to={`/why-portillo/${item.id}`} className="value-link-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="value-link-card-action">{t.common.learnMore}</span>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/why-portillo" className="btn btn-secondary">
              {t.valueDetail.backToWhy}
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title={`${t.valueDetail.experienceTitle} ${value.title}`}
        description={t.valueDetail.experienceDescription}
      />
    </>
  );
}
