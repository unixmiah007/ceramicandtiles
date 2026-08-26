import { ReactNode } from 'react';
import HeroVideoBackground from './HeroVideoBackground';
import { StockImage as StockImageType } from '../data/images';

interface PageHeroVideoBackground {
  youtubeId: string;
  poster: StockImageType;
  title: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: StockImageType;
  backgroundVideo?: PageHeroVideoBackground;
  children?: ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  backgroundVideo,
  children,
}: PageHeroProps) {
  const hasVideo = Boolean(backgroundVideo);
  const hasImage = Boolean(backgroundImage) && !hasVideo;

  return (
    <section
      className={`page-hero${hasVideo ? ' page-hero--video' : ''}${hasImage ? ' page-hero--image' : ''}`}
      style={
        hasImage && backgroundImage
          ? { backgroundImage: `url(${backgroundImage.src})` }
          : undefined
      }
    >
      {hasVideo && backgroundVideo && (
        <>
          <HeroVideoBackground
            youtubeId={backgroundVideo.youtubeId}
            posterSrc={backgroundVideo.poster.src}
            title={backgroundVideo.title}
          />
          <div className="page-hero-overlay page-hero-overlay--video" aria-hidden="true" />
          <span className="sr-only">{backgroundVideo.poster.alt}</span>
        </>
      )}
      {hasImage && backgroundImage && (
        <>
          <div className="page-hero-overlay" aria-hidden="true" />
          <span className="sr-only">{backgroundImage.alt}</span>
        </>
      )}
      <div className="container page-hero-content">
        <h1>{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
