import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import SeoHead from '../components/SeoHead';
import StockImage from '../components/StockImage';
import { useLanguage } from '../context/LanguageContext';
import { getStaticPageSeo } from '../seo/meta';
import {
  materialFamilies,
  materialHeroImage,
  materialSizeClasses,
  tileMaterials,
  type MaterialFamily,
  type MaterialSizeClass,
  type TileMaterial,
} from '../data/materials';

type FamilyFilter = 'all' | MaterialFamily;
type SizeFilter = 'all' | MaterialSizeClass;

export default function MaterialLibraryPage() {
  const { locale, f } = useLanguage();
  const copy = f.materials;
  const seo = getStaticPageSeo('materials', locale)!;
  const [family, setFamily] = useState<FamilyFilter>('all');
  const [sizeClass, setSizeClass] = useState<SizeFilter>('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filtered = useMemo(
    () =>
      tileMaterials.filter((material) => {
        const familyMatch = family === 'all' || material.family === family;
        const sizeMatch = sizeClass === 'all' || material.sizeClass === sizeClass;
        return familyMatch && sizeMatch;
      }),
    [family, sizeClass]
  );

  const active = filtered.find((material) => material.id === activeId) ?? null;
  const activeCopy = active ? copy.items[active.id as keyof typeof copy.items] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (active) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [active]);

  useEffect(() => {
    if (!active) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const index = filtered.findIndex((material) => material.id === active.id);
        const nextIndex =
          event.key === 'ArrowRight'
            ? (index + 1) % filtered.length
            : (index - 1 + filtered.length) % filtered.length;
        setActiveId(filtered[nextIndex].id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, filtered]);

  const openMaterial = (material: TileMaterial) => setActiveId(material.id);
  const closeMaterial = () => setActiveId(null);

  return (
    <>
      <SeoHead {...seo} />
      <PageHero title={copy.title} subtitle={copy.subtitle} backgroundImage={materialHeroImage} />

      <section className="section">
        <div className="container">
          <p className="lead">{copy.intro}</p>
          <div className="material-compare">
            <article className="material-compare-card">
              <p className="material-compare-kicker">{copy.ceramicKicker}</p>
              <h2>{copy.ceramicTitle}</h2>
              <p>{copy.ceramicBody}</p>
              <ul>
                {copy.ceramicPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
            <article className="material-compare-card material-compare-card--porcelain">
              <p className="material-compare-kicker">{copy.porcelainKicker}</p>
              <h2>{copy.porcelainTitle}</h2>
              <p>{copy.porcelainBody}</p>
              <ul>
                {copy.porcelainPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="material-gallery-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="material-gallery-heading">{copy.galleryTitle}</h2>
            <p>{copy.galleryDescription}</p>
          </div>

          <div className="material-toolbar">
            <div>
              <p className="material-filter-label">{copy.familyLabel}</p>
              <div className="blog-filters" role="group" aria-label={copy.familyLabel}>
                <button
                  type="button"
                  className={`blog-filter-btn${family === 'all' ? ' blog-filter-btn--active' : ''}`}
                  onClick={() => setFamily('all')}
                >
                  {copy.allFamilies}
                </button>
                {materialFamilies.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`blog-filter-btn${family === item ? ' blog-filter-btn--active' : ''}`}
                    onClick={() => setFamily(item)}
                  >
                    {copy.families[item]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="material-filter-label">{copy.sizeLabel}</p>
              <div className="blog-filters" role="group" aria-label={copy.sizeLabel}>
                <button
                  type="button"
                  className={`blog-filter-btn${sizeClass === 'all' ? ' blog-filter-btn--active' : ''}`}
                  onClick={() => setSizeClass('all')}
                >
                  {copy.allSizes}
                </button>
                {materialSizeClasses.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`blog-filter-btn${sizeClass === item ? ' blog-filter-btn--active' : ''}`}
                    onClick={() => setSizeClass(item)}
                  >
                    {copy.sizeClasses[item]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="material-count">
            {copy.count.replace('{count}', String(filtered.length))}
          </p>

          {filtered.length === 0 ? (
            <p className="material-empty">{copy.empty}</p>
          ) : (
            <div className="material-gallery">
              {filtered.map((material, index) => {
                const item = copy.items[material.id as keyof typeof copy.items];
                return (
                  <button
                    key={material.id}
                    type="button"
                    className={`material-card material-card--${(index % 8) + 1}`}
                    onClick={() => openMaterial(material)}
                    aria-label={`${item.name}. ${copy.viewDetails}`}
                  >
                    <StockImage
                      image={{ src: material.imageSrc, alt: item.name }}
                      loading={index < 4 ? 'eager' : 'lazy'}
                    />
                    <span className="material-card-caption">
                      <span className="material-card-family">{copy.families[material.family]}</span>
                      <span className="material-card-name">{item.name}</span>
                      <span className="material-card-sizes">{material.sizes.join(' · ')}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="material-lightbox"
        onClose={closeMaterial}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeMaterial();
          }
        }}
      >
        {active && activeCopy && (
          <div className="material-lightbox-inner">
            <StockImage
              className="material-lightbox-photo"
              image={{ src: active.imageSrc, alt: activeCopy.name }}
              loading="eager"
            />
            <div className="material-lightbox-copy">
              <button
                type="button"
                className="material-lightbox-close"
                onClick={closeMaterial}
                aria-label={copy.close}
              >
                ×
              </button>
              <p className="material-card-family">{copy.families[active.family]}</p>
              <h2>{activeCopy.name}</h2>
              <p>{activeCopy.summary}</p>
              <p className="material-lightbox-sizes">
                <strong>{copy.sizesHeading}:</strong> {active.sizes.join(' · ')}
              </p>
              <h3>{copy.usesHeading}</h3>
              <ul>
                {activeCopy.uses.map((use) => (
                  <li key={use}>{use}</li>
                ))}
              </ul>
              <div className="material-lightbox-actions">
                <Link to="/contact" className="btn btn-primary" onClick={closeMaterial}>
                  {copy.quoteCta}
                </Link>
                <button type="button" className="btn btn-secondary" onClick={closeMaterial}>
                  {copy.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>

      <CTASection />
    </>
  );
}
