import { ReactNode } from 'react';
import { StockImage as StockImageType } from '../data/images';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: StockImageType;
  children?: ReactNode;
}

export default function PageHero({ title, subtitle, backgroundImage, children }: PageHeroProps) {
  return (
    <section
      className={`page-hero ${backgroundImage ? 'page-hero--image' : ''}`}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage.src})` }
          : undefined
      }
    >
      {backgroundImage && (
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
