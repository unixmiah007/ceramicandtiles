import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import { checklistPhases } from '../data/features';
import { useLanguage } from '../context/LanguageContext';
import { getStaticPageSeo } from '../seo/meta';
import { sectionImages } from '../data/images';

export default function ChecklistPage() {
  const { locale, f } = useLanguage();
  const seo = getStaticPageSeo('checklist', locale)!;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={f.checklist.heroTitle}
        subtitle={f.checklist.heroSubtitle}
        backgroundImage={sectionImages.yourSpaceDeservesTheBest}
      />

      <section className="section checklist-page">
        <div className="container">
          <div className="checklist-actions">
            <button type="button" className="btn btn-secondary" onClick={handlePrint}>
              {f.checklist.download}
            </button>
          </div>

          <div className="checklist-grid">
            {checklistPhases.map((phase) => (
              <div key={phase.id} className="checklist-phase">
                <h2>{f.checklist.phases[phase.phaseKey as keyof typeof f.checklist.phases]}</h2>
                <ul>
                  {phase.itemsKeys.map((key) => (
                    <li key={key}>
                      <label className="checklist-item">
                        <input type="checkbox" />
                        <span>{f.checklist.items[key as keyof typeof f.checklist.items]}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
