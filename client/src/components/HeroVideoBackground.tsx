import { useEffect, useState } from 'react';
import { buildHeroVideoEmbedUrl } from '../data/hero-videos';

interface HeroVideoBackgroundProps {
  youtubeId: string;
  posterSrc: string;
  title: string;
}

export default function HeroVideoBackground({ youtubeId, posterSrc, title }: HeroVideoBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div
        className="page-hero-video-fallback"
        style={{ backgroundImage: `url(${posterSrc})` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="page-hero-video" aria-hidden="true">
      <iframe
        src={buildHeroVideoEmbedUrl(youtubeId, window.location.origin)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
      />
    </div>
  );
}
