import { useState } from 'react';
import StockImage from './StockImage';
import { StockImage as StockImageType } from '../data/images';
import { useLanguage } from '../context/LanguageContext';

interface BeforeAfterSliderProps {
  beforeImage: StockImageType;
  afterImage: StockImageType;
  title: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
}: BeforeAfterSliderProps) {
  const { f } = useLanguage();
  const [position, setPosition] = useState(50);

  return (
    <div className="before-after-slider">
      <h3>{title}</h3>
      <div className="before-after-frame">
        <StockImage image={afterImage} aspectRatio="16 / 10" className="before-after-image after" />
        <div className="before-after-before" style={{ width: `${position}%` }}>
          <StockImage image={beforeImage} aspectRatio="16 / 10" className="before-after-image before" />
        </div>
        <div className="before-after-labels">
          <span>{f.beforeAfter.before}</span>
          <span>{f.beforeAfter.after}</span>
        </div>
        <input
          type="range"
          min={5}
          max={95}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="before-after-range"
          aria-label={`${title} before and after comparison`}
        />
      </div>
    </div>
  );
}
