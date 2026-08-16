import { Link, Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import { getServiceImage, getServiceSectionImage } from '../data/images';
import { getServiceById, services } from '../data/services';

export default function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? getServiceById(serviceId) : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const otherServices = services.filter((item) => item.id !== service.id).slice(0, 6);
  const heroImage = getServiceImage(service.id, service.title);
  const sectionImages = service.sections.map((section) =>
    getServiceSectionImage(service.id, section.heading)
  );

  return (
    <>
      <PageHero title={service.title} subtitle={service.tagline} backgroundImage={heroImage} />

      <section className="section">
        <div className="container">
          <div className="value-detail-intro">
            <div className="value-detail-copy">
              <p className="lead">{service.intro}</p>
              <p>{service.description}</p>
            </div>
            <StockImage
              image={heroImage}
              aspectRatio="4 / 3"
              className="rounded-image value-detail-featured"
            />
          </div>

          <div className="detail-panels">
            <div className="value-highlights">
              <h2>What We Provide</h2>
              <ul className="feature-list">
                {service.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="value-highlights">
              <h2>Ideal For</h2>
              <ul className="feature-list">
                {service.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="value-detail-sections">
            {service.sections.map((section, index) => (
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
            <h2>Project Examples</h2>
            <p>Tile and ceramic work that reflects the quality behind every Portillo Ceramic and Tile service.</p>
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
            <h2>Explore More Services</h2>
          </div>
          <div className="value-links-grid">
            {otherServices.map((item) => (
              <Link key={item.id} to={`/services/${item.id}`} className="value-link-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="value-link-card-action">View Service Details</span>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn btn-secondary">
              Back to All Services
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title={`Request a Quote for ${service.title}`}
        description="Contact Portillo Ceramic and Tile today to discuss your project and get a personalized quote."
      />
    </>
  );
}
