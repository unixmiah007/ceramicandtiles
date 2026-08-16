import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import { projects } from '../data/content';
import { pageHeroImages, projectImages, sectionImages } from '../data/images';

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        title="Experience You Can Trust"
        subtitle="Our experience includes residential and commercial projects throughout Northern Virginia and the Washington, D.C. area."
        backgroundImage={pageHeroImages.experience}
      />

      <section className="section">
        <div className="container">
          <div className="projects-list">
            {projects.map((project) => (
              <article key={project.id} className="project-card project-card--image">
                <StockImage
                  image={projectImages[project.id]}
                  aspectRatio="16 / 11"
                  className="project-card-image"
                />
                <div className="project-card-body">
                  <div className="project-card-header">
                    <h2>{project.name}</h2>
                    <span className="project-location">{project.location}</span>
                  </div>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="highlight-box highlight-box--image">
            <StockImage
              image={sectionImages.commercial}
              aspectRatio="21 / 9"
              overlay
              className="highlight-box-bg"
            />
            <p>
              Our experience working in professional and high-traffic facilities has taught us
              the importance of quality, durability, precision, and attention to detail.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="two-column two-column--centered">
            <StockImage
              image={sectionImages.craftsmanship}
              aspectRatio="4 / 5"
              className="rounded-image column-image"
            />
            <div>
              <h2>Residential &amp; Commercial Expertise</h2>
              <p>
                From residential bathrooms and custom showers to commercial locker rooms and
                professional facilities, our family brings experience, precision, and pride to
                every project.
              </p>
              <p>
                Whether you&apos;re upgrading a bathroom, creating a new shower, replacing
                outdated tile, or renovating a commercial facility, we focus on doing the job
                correctly from start to finish.
              </p>
              <div className="stats-panel">
                <div className="stat">
                  <span className="stat-label">Service Area</span>
                  <span className="stat-value">Northern Virginia &amp; D.C.</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Project Types</span>
                  <span className="stat-value">Residential &amp; Commercial</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Notable Clients</span>
                  <span className="stat-value">Capitals, Pentagon &amp; More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Start Your Project?"
        description="Contact us today to discuss your residential or commercial tile project and request a quote."
      />

      <section className="section">
        <div className="container text-center">
          <Link to="/services" className="btn btn-secondary">
            Explore Our Services
          </Link>
        </div>
      </section>
    </>
  );
}
