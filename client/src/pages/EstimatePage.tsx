import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import EstimateCalculator from '../components/EstimateCalculator';
import SeoHead from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import { getStaticPageSeo } from '../seo/meta';
import { sectionImages } from '../data/images';

export default function EstimatePage() {
  const { locale, f } = useLanguage();
  const seo = getStaticPageSeo('estimate', locale)!;

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={f.estimate.heroTitle}
        subtitle={f.estimate.heroSubtitle}
        backgroundImage={sectionImages.craftsmanship}
      />

      <section className="section estimate-page-section">
        <div className="container">
          <EstimateCalculator />
        </div>
      </section>

      <CTASection />
    </>
  );
}
