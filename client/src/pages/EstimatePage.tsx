import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import { estimateOptions } from '../data/features';
import { useLanguage } from '../context/LanguageContext';
import { getStaticPageSeo } from '../seo/meta';
import { sectionImages } from '../data/images';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function EstimatePage() {
  const { locale, f } = useLanguage();
  const seo = getStaticPageSeo('estimate', locale)!;
  const [selectedId, setSelectedId] = useState(estimateOptions[0].id);
  const selected = estimateOptions.find((opt) => opt.id === selectedId) ?? estimateOptions[0];

  return (
    <>
      <SeoHead {...seo} />
      <PageHero
        title={f.estimate.heroTitle}
        subtitle={f.estimate.heroSubtitle}
        backgroundImage={sectionImages.craftsmanship}
      />

      <section className="section">
        <div className="container estimate-panel">
          <label htmlFor="estimate-type" className="estimate-label">
            {f.estimate.selectProject}
          </label>
          <select
            id="estimate-type"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="estimate-select"
          >
            {estimateOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {f.estimate.labels[opt.labelKey as keyof typeof f.estimate.labels]}
              </option>
            ))}
          </select>

          <div className="estimate-results">
            <div className="estimate-result-card">
              <span className="estimate-result-label">{f.estimate.estimatedCost}</span>
              <strong>
                {formatCurrency(selected.minCost)} – {formatCurrency(selected.maxCost)}
              </strong>
            </div>
            <div className="estimate-result-card">
              <span className="estimate-result-label">{f.estimate.estimatedTimeline}</span>
              <strong>
                {selected.weeksMin}–{selected.weeksMax} {f.estimate.weeks}
              </strong>
            </div>
          </div>

          <p className="estimate-disclaimer">{f.estimate.disclaimer}</p>

          <Link to="/quote-wizard" className="btn btn-primary">
            {f.estimate.getQuote}
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
