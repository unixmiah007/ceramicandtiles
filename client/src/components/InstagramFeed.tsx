import { instagramFeedImages } from '../data/features';
import StockImage from './StockImage';
import { useLanguage } from '../context/LanguageContext';

export default function InstagramFeed() {
  const { f } = useLanguage();

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>{f.instagram.title}</h2>
          <p>{f.instagram.subtitle}</p>
        </div>
        <div className="instagram-grid">
          {instagramFeedImages.map((image, index) => (
            <div key={index} className="instagram-item">
              <StockImage image={image} aspectRatio="1 / 1" className="instagram-image" />
            </div>
          ))}
        </div>
        <p className="instagram-handle text-center">
          <a
            href="https://www.instagram.com/portilloceramicandtile"
            target="_blank"
            rel="noopener noreferrer"
          >
            {f.instagram.follow} — {f.instagram.handle}
          </a>
        </p>
      </div>
    </section>
  );
}
