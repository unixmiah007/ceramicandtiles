import { ImgHTMLAttributes, useState } from 'react';
import { StockImage as StockImageType, FALLBACK_IMAGE } from '../data/images';

interface StockImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  image: StockImageType;
  aspectRatio?: string;
  overlay?: boolean;
}

export default function StockImage({
  image,
  aspectRatio,
  overlay = false,
  className = '',
  loading = 'lazy',
  ...props
}: StockImageProps) {
  const [src, setSrc] = useState(image.src);
  const wrapperStyle = aspectRatio ? { aspectRatio } : undefined;

  return (
    <div className={`stock-image ${overlay ? 'stock-image--overlay' : ''} ${className}`.trim()} style={wrapperStyle}>
      <img
        src={src}
        alt={image.alt}
        loading={loading}
        decoding="async"
        onError={() => {
          if (src !== FALLBACK_IMAGE.src) {
            setSrc(FALLBACK_IMAGE.src);
          }
        }}
        {...props}
      />
    </div>
  );
}
