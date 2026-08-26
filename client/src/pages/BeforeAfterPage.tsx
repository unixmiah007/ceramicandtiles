import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import { beforeAfterProjects } from '../data/features';
import { useLanguage } from '../context/LanguageContext';
import { getStaticPageSeo } from '../seo/meta';
import { galleryImages } from '../data/images';

export default function BeforeAfterPage() {
  const { locale, f } = useLanguage();
  const seo = getStaticPageSeo('before-after', locale)!;

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={f.beforeAfter.heroTitle}
        subtitle={f.beforeAfter.heroSubtitle}
        backgroundImage={galleryImages[0]}
      />

      <section className="section">
        <div className="container before-after-grid">
          {beforeAfterProjects.map((project) => (
            <BeforeAfterSlider
              key={project.id}
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              title={f.beforeAfter.titles[project.titleKey as keyof typeof f.beforeAfter.titles]}
            />
          ))}
        </div>
        <div className="container text-center section-cta">
          <Link to="/quote-wizard" className="btn btn-primary">
            {f.beforeAfter.cta}
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
