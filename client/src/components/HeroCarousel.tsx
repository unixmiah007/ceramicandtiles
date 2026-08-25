import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { heroSlides, FALLBACK_IMAGE } from '../data/images';
import { useLanguage } from '../context/LanguageContext';
import ServiceCategoriesAnimation from './ServiceCategoriesAnimation';

const AUTOPLAY_MS = 6000;

export default function HeroCarousel() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + heroSlides.length) % heroSlides.length);
  }, []);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused]);

  const activeSlide = heroSlides[activeIndex];
  const activeSlideText = t.hero.slides[activeSlide.id];

  return (
    <section
      className="hero-carousel"
      aria-roledescription="carousel"
      aria-label={t.hero.featuredProjects}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="hero-carousel-slides" aria-live="polite">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-carousel-slide ${index === activeIndex ? 'is-active' : ''}`}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={slide.image.src}
              alt={index === activeIndex ? slide.image.alt : ''}
              className="hero-carousel-bg"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== FALLBACK_IMAGE.src) {
                  img.src = FALLBACK_IMAGE.src;
                }
              }}
            />
            <div className="hero-carousel-overlay" />
          </div>
        ))}
      </div>

      <div className="container hero-carousel-content">
        <p className="hero-eyebrow">{t.hero.eyebrow}</p>

        <div className="hero-carousel-text">
          {heroSlides.map((slide, index) => {
            const slideText = t.hero.slides[slide.id];
            return (
              <div
                key={slide.id}
                className={`hero-carousel-caption ${index === activeIndex ? 'is-active' : ''}`}
                aria-hidden={index !== activeIndex}
              >
                {index === activeIndex ? (
                  <h1>{slideText.headline}</h1>
                ) : (
                  <h2 className="hero-carousel-heading">{slideText.headline}</h2>
                )}
                <p className="hero-subtitle">{slideText.subtitle}</p>
              </div>
            );
          })}
        </div>

        <ServiceCategoriesAnimation />

        <p className="hero-description">{t.hero.description}</p>

        <div className="hero-actions">
          <Link to="/contact" className="btn btn-primary btn-lg">
            {t.common.requestQuote}
          </Link>
          <Link to="/services" className="btn btn-outline btn-lg">
            {t.common.viewServices}
          </Link>
          <Link to="/quote-wizard" className="btn btn-outline btn-lg">
            {t.nav.quoteWizard}
          </Link>
        </div>

        <div className="hero-carousel-controls">
          <button
            type="button"
            className="hero-carousel-arrow hero-carousel-arrow--prev"
            onClick={goPrev}
            aria-label={t.hero.previousSlide}
          >
            ‹
          </button>

          <div className="hero-carousel-dots" role="tablist" aria-label={t.hero.featuredProjects}>
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                className={`hero-carousel-dot ${index === activeIndex ? 'is-active' : ''}`}
                aria-label={`${t.hero.goToSlide} ${index + 1}: ${t.hero.slides[slide.id].headline}`}
                aria-selected={index === activeIndex}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="hero-carousel-arrow hero-carousel-arrow--next"
            onClick={goNext}
            aria-label={t.hero.nextSlide}
          >
            ›
          </button>
        </div>

        <p className="sr-only">{activeSlideText.headline}. {activeSlide.image.alt}</p>
      </div>
    </section>
  );
}
