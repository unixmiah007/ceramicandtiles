import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  calculateEstimate,
  defaultEstimateInput,
  estimateAddons,
  estimateSizes,
  estimateTileMaterials,
  estimateTimelines,
  type EstimateAddonId,
  type EstimateInput,
  type EstimateProjectTypeId,
  type EstimatePropertyType,
  type EstimateSizeId,
  type EstimateTileMaterialId,
  type EstimateTimelineId,
} from '../data/estimateCalculator';

function formatCurrency(value: number, locale: string) {
  return new Intl.NumberFormat(locale === 'es' ? 'es-US' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

const residentialProjects: EstimateProjectTypeId[] = [
  'kitchen-backsplash',
  'bathroom-backsplash',
  'custom-shower',
  'tub-to-shower',
  'full-bathroom',
  'floor-tile',
  'whole-home-flooring',
  'kitchen-floor',
  'laundry-mudroom',
  'fireplace-accent',
  'outdoor-patio',
  'tile-repair',
];

const commercialProjects: EstimateProjectTypeId[] = [
  'commercial-restroom',
  'commercial-locker-room',
  'commercial-lobby',
  'commercial-facility',
];

export default function EstimateCalculator() {
  const { locale, f } = useLanguage();
  const labels = f.estimate;
  const [input, setInput] = useState<EstimateInput>(defaultEstimateInput);

  const result = useMemo(() => calculateEstimate(input), [input]);

  const update = <K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const selectProject = (projectType: EstimateProjectTypeId) => {
    const isCommercial = commercialProjects.includes(projectType);
    setInput((prev) => ({
      ...prev,
      projectType,
      propertyType: isCommercial ? 'commercial' : 'residential',
    }));
  };

  const toggleAddon = (addonId: EstimateAddonId) => {
    setInput((prev) => ({
      ...prev,
      addons: prev.addons.includes(addonId)
        ? prev.addons.filter((id) => id !== addonId)
        : [...prev.addons, addonId],
    }));
  };

  const projectLabel = (id: string) =>
    labels.projectTypes[id as keyof typeof labels.projectTypes] ?? id;

  const visibleProjects =
    input.propertyType === 'commercial'
      ? [...commercialProjects, ...residentialProjects]
      : [...residentialProjects, ...commercialProjects];

  const breakdownItems = result.breakdown.filter(
    (item) => item.id !== 'base' && Math.abs(item.minDelta) + Math.abs(item.maxDelta) > 0
  );

  return (
    <div className="estimate-calculator">
      <div className="estimate-calculator-form">
        <section className="estimate-section">
          <div className="estimate-section-header">
            <span className="estimate-step">1</span>
            <div>
              <h2>{labels.propertyTypeTitle}</h2>
              <p>{labels.propertyTypeHint}</p>
            </div>
          </div>
          <div className="estimate-toggle">
            {(['residential', 'commercial'] as EstimatePropertyType[]).map((type) => (
              <button
                key={type}
                type="button"
                className={`estimate-toggle-btn${input.propertyType === type ? ' estimate-toggle-btn--active' : ''}`}
                onClick={() => update('propertyType', type)}
              >
                {labels.propertyTypes[type]}
              </button>
            ))}
          </div>
        </section>

        <section className="estimate-section">
          <div className="estimate-section-header">
            <span className="estimate-step">2</span>
            <div>
              <h2>{labels.projectTypeTitle}</h2>
              <p>{labels.projectTypeHint}</p>
            </div>
          </div>
          <div className="estimate-project-grid">
            {visibleProjects.map((id) => {
              const isCommercial = commercialProjects.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  className={`estimate-project-card${input.projectType === id ? ' estimate-project-card--selected' : ''}${isCommercial ? ' estimate-project-card--commercial' : ''}`}
                  onClick={() => selectProject(id)}
                >
                  <span className="estimate-project-icon">
                    {labels.projectIcons[id as keyof typeof labels.projectIcons]}
                  </span>
                  <span className="estimate-project-name">{projectLabel(id)}</span>
                  {isCommercial && (
                    <span className="estimate-project-badge">{labels.commercialBadge}</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="estimate-section">
          <div className="estimate-section-header">
            <span className="estimate-step">3</span>
            <div>
              <h2>{labels.sizeTitle}</h2>
              <p>{labels.sizeHint}</p>
            </div>
          </div>
          <div className="estimate-pill-row">
            {estimateSizes.map((size) => (
              <button
                key={size.id}
                type="button"
                className={`estimate-pill${input.size === size.id ? ' estimate-pill--active' : ''}`}
                onClick={() => update('size', size.id as EstimateSizeId)}
              >
                <strong>{labels.sizes[size.id as keyof typeof labels.sizes].title}</strong>
                <span>{labels.sizes[size.id as keyof typeof labels.sizes].hint}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="estimate-section">
          <div className="estimate-section-header">
            <span className="estimate-step">4</span>
            <div>
              <h2>{labels.timelineTitle}</h2>
              <p>{labels.timelineHint}</p>
            </div>
          </div>
          <div className="estimate-pill-row estimate-pill-row--timeline">
            {estimateTimelines.map((timeline) => (
              <button
                key={timeline.id}
                type="button"
                className={`estimate-pill${input.timeline === timeline.id ? ' estimate-pill--active' : ''}`}
                onClick={() => update('timeline', timeline.id as EstimateTimelineId)}
              >
                <strong>{labels.timelines[timeline.id as keyof typeof labels.timelines].title}</strong>
                <span>{labels.timelines[timeline.id as keyof typeof labels.timelines].hint}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="estimate-section">
          <div className="estimate-section-header">
            <span className="estimate-step">5</span>
            <div>
              <h2>{labels.tileTitle}</h2>
              <p>{labels.tileHint}</p>
            </div>
          </div>
          <div className="estimate-tile-grid">
            {estimateTileMaterials.map((material) => (
              <button
                key={material.id}
                type="button"
                className={`estimate-tile-card${input.tileMaterial === material.id ? ' estimate-tile-card--selected' : ''}`}
                onClick={() => update('tileMaterial', material.id as EstimateTileMaterialId)}
              >
                <span className={`estimate-tile-swatch estimate-tile-swatch--${material.id}`} />
                <strong>{labels.tiles[material.id as keyof typeof labels.tiles].title}</strong>
                <span>{labels.tiles[material.id as keyof typeof labels.tiles].hint}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="estimate-section">
          <div className="estimate-section-header">
            <span className="estimate-step">6</span>
            <div>
              <h2>{labels.addonsTitle}</h2>
              <p>{labels.addonsHint}</p>
            </div>
          </div>
          <div className="estimate-addon-grid">
            {estimateAddons.map((addon) => (
              <button
                key={addon.id}
                type="button"
                className={`estimate-addon${input.addons.includes(addon.id) ? ' estimate-addon--selected' : ''}`}
                onClick={() => toggleAddon(addon.id)}
                aria-pressed={input.addons.includes(addon.id)}
              >
                <span className="estimate-addon-check" aria-hidden="true">
                  {input.addons.includes(addon.id) ? '✓' : ''}
                </span>
                <span>
                  <strong>{labels.addons[addon.id as keyof typeof labels.addons].title}</strong>
                  <span>{labels.addons[addon.id as keyof typeof labels.addons].hint}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <aside className="estimate-calculator-results">
        <div className="estimate-results-panel">
          <p className="estimate-results-eyebrow">{labels.liveEstimate}</p>
          <h3 className="estimate-results-project">{projectLabel(input.projectType)}</h3>

          <div className="estimate-result-highlight">
            <span className="estimate-result-label">{labels.estimatedCost}</span>
            <strong className="estimate-result-price">
              {formatCurrency(result.minCost, locale)} – {formatCurrency(result.maxCost, locale)}
            </strong>
          </div>

          <div className="estimate-result-meta">
            <div>
              <span className="estimate-result-label">{labels.estimatedTimeline}</span>
              <strong>
                {result.weeksMin}–{result.weeksMax} {labels.weeks}
              </strong>
            </div>
            <div>
              <span className="estimate-result-label">{labels.perSqFt}</span>
              <strong>{labels.perSqFtRange}</strong>
            </div>
          </div>

          {breakdownItems.length > 0 && (
            <div className="estimate-breakdown">
              <h4>{labels.breakdownTitle}</h4>
              <ul>
                {breakdownItems.map((item) => {
                  const label =
                    labels.projectTypes[item.id as keyof typeof labels.projectTypes] ??
                    labels.timelines[item.id as keyof typeof labels.timelines]?.title ??
                    labels.tiles[item.id as keyof typeof labels.tiles]?.title ??
                    labels.addons[item.id as keyof typeof labels.addons]?.title ??
                    labels.propertyTypes[item.id as keyof typeof labels.propertyTypes] ??
                    item.id;

                  return (
                    <li key={item.id} className={`estimate-breakdown-item estimate-breakdown-item--${item.impact}`}>
                      <span>{label}</span>
                      <span>
                        {item.impact === 'decrease' ? '−' : '+'}
                        {formatCurrency(Math.abs(item.minDelta), locale)} –{' '}
                        {formatCurrency(Math.abs(item.maxDelta), locale)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <p className="estimate-disclaimer">{labels.disclaimer}</p>

          <Link to="/quote-wizard" className="btn btn-primary estimate-results-cta">
            {labels.getQuote}
          </Link>
          <Link to="/contact" className="btn btn-secondary estimate-results-secondary">
            {labels.talkToUs}
          </Link>
        </div>
      </aside>
    </div>
  );
}
