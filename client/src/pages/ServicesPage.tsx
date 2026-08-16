import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import { services } from '../data/services';
import { pageHeroImages, sectionImages, serviceImages } from '../data/images';

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="From demolition and preparation to waterproofing, installation, grout, and finishing touches—we take pride in every step."
        backgroundImage={pageHeroImages.services}
      />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Complete Tile Solutions</h2>
            <p>
              Whether you&apos;re upgrading a bathroom, creating a new shower, replacing
              outdated tile, or renovating a commercial facility, we focus on doing the job
              correctly from start to finish. Select any service below to learn more.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article key={service.id} className="service-card service-card--image">
                <StockImage
                  image={serviceImages[service.id]}
                  aspectRatio="16 / 10"
                  className="service-card-image"
                />
                <div className="service-card-body">
                  <h3>{service.title}</h3>
                  <p className="value-card-tagline">{service.tagline}</p>
                  <p>{service.description}</p>
                  <p className="value-card-preview">{service.intro}</p>
                  <ul className="value-card-highlights">
                    {service.highlights.slice(0, 2).map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <Link to={`/services/${service.id}`} className="btn btn-secondary value-card-link">
                    View Service Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="two-column two-column--centered">
            <div className="feature-panel">
              <StockImage
                image={sectionImages.residential}
                aspectRatio="16 / 10"
                className="feature-panel-image"
              />
              <h2>Residential Projects</h2>
              <ul className="feature-list">
                <li>Bathroom renovations and upgrades</li>
                <li>Custom shower installation</li>
                <li>Floor and wall tile</li>
                <li>Kitchen backsplashes</li>
                <li>Tile replacement and repair</li>
              </ul>
            </div>
            <div className="feature-panel">
              <StockImage
                image={sectionImages.commercial}
                aspectRatio="16 / 10"
                className="feature-panel-image"
              />
              <h2>Commercial Projects</h2>
              <ul className="feature-list">
                <li>Commercial tile installation</li>
                <li>Locker room facilities</li>
                <li>Restroom renovations</li>
                <li>High-traffic facility spaces</li>
                <li>Professional facility upgrades</li>
              </ul>
            </div>
          </div>

          <div className="value-links-grid service-links-grid">
            {services.map((service) => (
              <Link key={service.id} to={`/services/${service.id}`} className="value-link-card">
                <h3>{service.title}</h3>
                <p>{service.tagline}</p>
                <span className="value-link-card-action">Read Full Details</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
