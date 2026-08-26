import { useCallback, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sectionImages } from '../data/images';

/** Bathroom remodel start-to-finish timelapse — tile, demo, grout, and finishing. */
const YOUTUBE_ID = 'hx9MfUaYyUk';

interface YourSpaceVideoProps {
  isVisible: boolean;
}

export default function YourSpaceVideo({ isVisible }: YourSpaceVideoProps) {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => setIsPlaying(true), []);

  const embedSrc = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;

  return (
    <div
      className={`your-space-video${isVisible ? ' is-visible' : ''}${isPlaying ? ' is-playing' : ''}`}
    >
      <div className="your-space-video-glow" aria-hidden="true" />
      <div className="your-space-video-shell">
        <div className="your-space-video-frame">
          {!isPlaying ? (
            <>
              <img
                src={sectionImages.yourSpaceDeservesTheBest.src}
                alt=""
                className="your-space-video-poster"
                loading="lazy"
                decoding="async"
              />
              <div className="your-space-video-overlay" aria-hidden="true" />
              <div className="your-space-video-grain" aria-hidden="true" />
              <div className="your-space-video-badges" aria-hidden="true">
                <span className="your-space-video-badge your-space-video-badge--live">
                  <span className="your-space-video-live-dot" />
                  {t.home.yourSpaceVideoBadge}
                </span>
                <span className="your-space-video-badge">{t.home.yourSpaceVideoDuration}</span>
              </div>
              <button
                type="button"
                className="your-space-video-play"
                onClick={handlePlay}
                aria-label={t.home.yourSpaceVideoPlayLabel}
              >
                <span className="your-space-video-play-rings" aria-hidden="true">
                  <span />
                  <span />
                </span>
                <span className="your-space-video-play-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.04-7.36a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z" />
                  </svg>
                </span>
                <span className="your-space-video-play-text">{t.home.yourSpaceVideoPlayText}</span>
              </button>
            </>
          ) : (
            <iframe
              className="your-space-video-iframe"
              src={embedSrc}
              title={t.home.yourSpaceVideoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </div>
        <ul className="your-space-video-tags" aria-label={t.home.yourSpaceVideoTagsLabel}>
          {t.home.yourSpaceVideoTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
