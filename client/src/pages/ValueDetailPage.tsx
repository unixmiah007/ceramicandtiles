import { Link, Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import { getValueImage, getValueSectionImage } from '../data/images';
import { getValueById, valuePropositions } from '../data/values';

export default function ValueDetailPage() {
  const { valueId } = useParams<{ valueId: string }>();
  const value = valueId ? getValueById(valueId) : undefined;

  if (!value) {
    return <Navigate to="/why-portillo" replace />;
  }

  const otherValues = valuePropositions.filter((item) => item.id !== value.id);
  const heroImage = getValueImage(value.id, value.title);
  const sectionImages = value.sections.map((section) =>
    getValueSectionImage(value.id, section.heading)
  );

  return (
    <>
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
            <h2>What This Means for Your Project</h2>
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
            <h2>More of Our Work</h2>
            <p>Examples of the craftsmanship and quality behind every Portillo Ceramic and Tile project.</p>
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
            <h2>Explore Our Other Qualities</h2>
          </div>
          <div className="value-links-grid">
            {otherValues.map((item) => (
              <Link key={item.id} to={`/why-portillo/${item.id}`} className="value-link-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="value-link-card-action">Read More</span>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/why-portillo" className="btn btn-secondary">
              Back to Why Portillo
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title={`Experience ${value.title} on Your Project`}
        description="Contact Portillo Ceramic and Tile today to discuss your bathroom, shower, tile, or commercial project."
      />
    </>
  );
}
