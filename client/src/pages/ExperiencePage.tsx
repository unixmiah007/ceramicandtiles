import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import StockImage from '../components/StockImage';
import { useLanguage } from '../context/LanguageContext';
import { pageHeroImages, projectImages, sectionImages } from '../data/images';

export default function ExperiencePage() {
  const { t, projects } = useLanguage();

  return (
    <>
      <PageHero
        title={t.experience.heroTitle}
        subtitle={t.experience.heroSubtitle}
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
            <p>{t.experience.highlight}</p>
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
              <h2>{t.experience.expertiseTitle}</h2>
              <p>{t.experience.expertiseP1}</p>
              <p>{t.experience.expertiseP2}</p>
              <div className="stats-panel">
                <div className="stat">
                  <span className="stat-label">{t.experience.statServiceArea}</span>
                  <span className="stat-value">{t.common.serviceAreaValue}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">{t.experience.statProjectTypes}</span>
                  <span className="stat-value">{t.experience.statProjectTypesValue}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">{t.experience.statNotableClients}</span>
                  <span className="stat-value">{t.experience.statNotableClientsValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={t.experience.ctaTitle}
        description={t.experience.ctaDescription}
      />

      <section className="section">
        <div className="container text-center">
          <Link to="/services" className="btn btn-secondary">
            {t.common.exploreServices}
          </Link>
        </div>
      </section>
    </>
  );
}
