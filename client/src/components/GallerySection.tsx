import { galleryImages } from '../data/images';
import StockImage from './StockImage';

export default function GallerySection() {
  return (
    <section className="section gallery-section">
      <div className="container">
        <div className="section-header">
          <h2>Craftsmanship You Can See</h2>
          <p>
            Every project reflects our commitment to precision layouts, clean cuts, and
            finishes built to stand up to everyday use.
          </p>
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
