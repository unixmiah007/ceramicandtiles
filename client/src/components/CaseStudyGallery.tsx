import { useEffect, useRef, useState } from 'react';
import { caseStudyGalleries, FALLBACK_IMAGE, StockImage as StockImageType } from '../data/images';
import { useLanguage } from '../context/LanguageContext';

interface CaseStudyGalleryProps {
  projectId: string;
  projectName: string;
}

function GalleryTile({
  image,
  layoutClass,
  delay,
  isVisible,
}: {
  image: StockImageType;
  layoutClass: string;
  delay: number;
  isVisible: boolean;
}) {
  const [src, setSrc] = useState(image.src);

  useEffect(() => {
    setSrc(image.src);
  }, [image.src]);

  return (
    <figure
      className={`case-study-gallery-tile ${layoutClass}${isVisible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <img
        src={src}
        alt={image.alt}
        className="case-study-gallery-image"
        loading="lazy"
        decoding="async"
        onError={() => {
          if (src !== FALLBACK_IMAGE.src) {
            setSrc(FALLBACK_IMAGE.src);
          }
        }}
      />
      <figcaption className="case-study-gallery-caption">{image.alt}</figcaption>
      <span className="case-study-gallery-shine" aria-hidden="true" />
    </figure>
  );
}

const TILE_LAYOUTS = [
  'case-study-gallery-tile--hero',
  'case-study-gallery-tile--tall',
  'case-study-gallery-tile--wide',
  'case-study-gallery-tile--square',
  'case-study-gallery-tile--square',
  'case-study-gallery-tile--wide',
  'case-study-gallery-tile--tall',
  'case-study-gallery-tile--square',
  'case-study-gallery-tile--accent',
];

export default function CaseStudyGallery({ projectId, projectName }: CaseStudyGalleryProps) {
  const { f } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const images = caseStudyGalleries[projectId] ?? [];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || images.length === 0) return;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [images.length, prefersReducedMotion]);

  if (images.length === 0) {
    return null;
  }

  const visibleClass = isVisible ? ' is-visible' : '';

  return (
    <section
      ref={sectionRef}
      className={`case-study-gallery${visibleClass}`}
      aria-labelledby="case-study-gallery-title"
    >
      <div className={`case-study-gallery-header${visibleClass}`}>
        <p className="case-study-gallery-eyebrow">{projectName}</p>
        <h2 id="case-study-gallery-title">{f.caseStudy.galleryTitle}</h2>
        <p>{f.caseStudy.galleryDescription}</p>
      </div>

      <div className={`case-study-gallery-grid${visibleClass}`}>
        {images.map((image, index) => (
          <GalleryTile
            key={`${image.src}-${index}`}
            image={image}
            layoutClass={TILE_LAYOUTS[index % TILE_LAYOUTS.length]}
            delay={0.07 * index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
}
