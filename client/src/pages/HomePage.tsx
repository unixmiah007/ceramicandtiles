import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import GallerySection from '../components/GallerySection';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import { services } from '../data/services';
import { valuePropositions } from '../data/values';
import { processStepImages, sectionImages, getServiceImage, getValueImage } from '../data/images';

const processSteps = [
  { key: 'demolition', number: '01', title: 'Demolition & Preparation', description: 'Careful removal and surface preparation for lasting results.' },
  { key: 'waterproofing', number: '02', title: 'Waterproofing', description: 'Proper waterproofing systems to protect your investment.' },
  { key: 'installation', number: '03', title: 'Installation', description: 'Precision tile installation with clean cuts and layouts.' },
  { key: 'finishing', number: '04', title: 'Grout & Finishing', description: 'Consistent grout lines and quality finishing touches.' },
] as const;

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <section className="section">
        <div className="container">
          <div className="split-feature">
            <div className="split-feature-content">
              <h2>Your Space Deserves the Best</h2>
              <p>
                Whether you&apos;re upgrading a bathroom, creating a new shower, replacing
                outdated tile, or renovating a commercial facility, we focus on doing the job
                correctly from start to finish.
              </p>
              <p>
                From demolition and preparation to waterproofing, installation, grout, and
                finishing touches—we take pride in every step.
              </p>
            </div>
            <StockImage
              image={sectionImages.yourSpaceDeservesTheBest}
              aspectRatio="4 / 3"
              className="split-feature-image rounded-image"
            />
          </div>

          <div className="process-steps">
            {processSteps.map((step) => (
              <div key={step.key} className="process-step process-step--image">
                <StockImage
                  image={processStepImages[step.key]}
                  aspectRatio="16 / 10"
                  className="process-step-image"
                />
                <div className="process-step-body">
                  <span className="step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GallerySection />

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>
              Comprehensive tile and ceramic solutions for homes and commercial facilities
              throughout Northern Virginia and Washington, D.C.
            </p>
          </div>
          <div className="service-grid service-grid-preview">
            {services.slice(0, 6).map((service) => (
              <div key={service.id} className="service-card service-card--image">
                <StockImage
                  image={getServiceImage(service.id, service.title)}
                  aspectRatio="16 / 10"
                  className="service-card-image"
                />
                <div className="service-card-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to={`/services/${service.id}`} className="inline-link">
                    View service details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Why Portillo?</h2>
          </div>
          <div className="values-grid">
            {valuePropositions.map((value) => (
              <div key={value.id} className="value-card value-card--image">
                <StockImage
                  image={getValueImage(value.id, value.title)}
                  aspectRatio="16 / 9"
                  className="value-card-image"
                />
                <div className="value-card-body">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                  <Link to={`/why-portillo/${value.id}`} className="inline-link">
                    Learn more
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/why-portillo" className="btn btn-secondary">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
