import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  FALLBACK_IMAGE,
  whyPortilloShowcaseImages,
  getValueImage,
} from '../data/images';

const FEATURED_ROTATE_MS = 4200;
const MOSAIC_TILE_COUNT = 8;
const mosaicImages = whyPortilloShowcaseImages.slice(0, MOSAIC_TILE_COUNT);
const filmstripImages = whyPortilloShowcaseImages.slice(8);

function ShowcaseImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE.src) {
          setImageSrc(FALLBACK_IMAGE.src);
        }
      }}
    />
  );
}

export default function WhyPortilloImageShowcase() {
  const { t, values, getEnglishValueById } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isFeaturedExiting, setIsFeaturedExiting] = useState(false);

  const featuredSlides = values.map((value) => {
    const englishValue = getEnglishValueById(value.id)!;
    return {
      id: value.id,
      label: value.title,
      image: getValueImage(englishValue.id, englishValue.title),
    };
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || featuredSlides.length <= 1) return;

    const timer = window.setInterval(() => {
      setIsFeaturedExiting(true);
      window.setTimeout(() => {
        setFeaturedIndex((current) => (current + 1) % featuredSlides.length);
        setIsFeaturedExiting(false);
      }, 500);
    }, FEATURED_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [featuredSlides.length, prefersReducedMotion]);

  const visibleClass = isVisible ? ' is-visible' : '';

  return (
    <section
      ref={sectionRef}
      className={`why-showcase${visibleClass}`}
      aria-labelledby="why-showcase-title"
    >
      <div className="container">
        <div className={`why-showcase-intro${visibleClass}`}>
          <p className="why-showcase-eyebrow">{t.whyPortillo.showcaseEyebrow}</p>
          <h2 id="why-showcase-title" className="why-showcase-title">
            {t.whyPortillo.introLead}
          </h2>
          <p className="why-showcase-description">{t.whyPortillo.introP}</p>
        </div>

        <div className={`why-showcase-stage${visibleClass}`}>
          <div className="why-showcase-featured">
            <div className="why-showcase-featured-frame" aria-live="polite">
              {featuredSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`why-showcase-featured-slide${
                    index === featuredIndex ? ' is-active' : ''
                  }${index === featuredIndex && isFeaturedExiting ? ' is-exiting' : ''}`}
                  aria-hidden={index !== featuredIndex}
                >
                  <ShowcaseImage
                    src={slide.image.src}
                    alt={slide.image.alt}
                    className="why-showcase-featured-image"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="why-showcase-featured-caption">
                    <span className="why-showcase-featured-label">{slide.label}</span>
                    <Link to={`/why-portillo/${slide.id}`} className="why-showcase-featured-link">
                      {t.common.learnMore}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="why-showcase-featured-dots" aria-hidden="true">
              {featuredSlides.map((slide, index) => (
                <span
                  key={`dot-${slide.id}`}
                  className={`why-showcase-dot${index === featuredIndex ? ' is-active' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="why-showcase-mosaic">
            {mosaicImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="why-showcase-tile"
                style={{ transitionDelay: `${0.08 * index}s` }}
              >
                <ShowcaseImage
                  src={image.src}
                  alt={image.alt}
                  className="why-showcase-tile-image"
                />
                <span className="why-showcase-tile-shine" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        {!prefersReducedMotion && filmstripImages.length > 0 && (
          <div className={`why-showcase-filmstrip${visibleClass}`} aria-hidden="true">
            <div className="why-showcase-filmstrip-track">
              {[...filmstripImages, ...filmstripImages].map((image, index) => (
                <div key={`${image.src}-film-${index}`} className="why-showcase-filmstrip-item">
                  <ShowcaseImage src={image.src} alt="" className="why-showcase-filmstrip-image" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
