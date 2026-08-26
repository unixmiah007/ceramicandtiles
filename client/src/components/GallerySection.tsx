import { galleryImages } from '../data/images';
import { useLanguage } from '../context/LanguageContext';
import StockImage from './StockImage';

export default function GallerySection() {
  const { t } = useLanguage();

  return (
    <section className="section gallery-section">
      <div className="container">
        <div className="section-header">
          <h2>{t.home.galleryTitle}</h2>
          <p>{t.home.galleryDescription}</p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`gallery-item gallery-item--${(index % 6) + 1}`}
            >
              <StockImage image={image} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
