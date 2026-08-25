import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CaseStudyGallery from '../components/CaseStudyGallery';
import StockImage from '../components/StockImage';
import CTASection from '../components/CTASection';
import { caseStudies } from '../data/features';
import SeoHead from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import { getCaseStudySeo } from '../seo/meta';
import { projectImages } from '../data/images';

export default function CaseStudyPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { locale, f, projects } = useLanguage();
  const study = caseStudies.find((item) => item.projectId === projectId);
  const project = projects.find((item) => item.id === projectId);

  if (!study || !project) {
    return (
      <section className="section">
        <div className="container text-center">
          <h1>Case study not found</h1>
          <Link to="/experience" className="btn btn-secondary">
            {f.caseStudy.backToExperience}
          </Link>
        </div>
      </section>
    );
  }

  const studyKey = study.id as 'capitals' | 'pentagon' | 'orangetheory';
  const studyContent = f.caseStudy[studyKey];
  const seo = getCaseStudySeo(project.name, project.location, project.description, project.id, locale);

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={project.name}
        subtitle={project.location}
        backgroundImage={projectImages[project.id]}
      />

      <section className="section">
        <div className="container case-study">
          <StockImage
            image={study.image}
            aspectRatio="21 / 9"
            className="case-study-hero rounded-image"
          />
          <p className="case-study-intro">{project.description}</p>
        </div>

        <div className="container">
          <CaseStudyGallery projectId={project.id} projectName={project.name} />
        </div>

        <div className="container case-study">
          <div className="case-study-section">
            <h2>{f.caseStudy.scope}</h2>
            <ul>
              {study.scopeKeys.map((key) => (
                <li key={key}>
                  {studyContent[key as keyof typeof studyContent] as string}
                </li>
              ))}
            </ul>
          </div>

          <div className="case-study-section">
            <h2>{f.caseStudy.challenge}</h2>
            <p>{studyContent.challenge}</p>
          </div>

          <div className="case-study-section">
            <h2>{f.caseStudy.solution}</h2>
            <p>{studyContent.solution}</p>
          </div>

          <div className="case-study-section">
            <h2>{f.caseStudy.result}</h2>
            <p>{studyContent.result}</p>
          </div>

          <Link to="/experience" className="inline-link">
            ← {f.caseStudy.backToExperience}
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
