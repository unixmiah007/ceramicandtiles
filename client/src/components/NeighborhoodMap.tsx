import { formatCityLabel, getCityMapUrls, type ServiceAreaCity } from '../data/service-area-cities';

interface NeighborhoodMapProps {
  city: ServiceAreaCity;
  title: string;
  description: string;
  openLabel: string;
  headingId?: string;
}

export default function NeighborhoodMap({
  city,
  title,
  description,
  openLabel,
  headingId = 'location-map-heading',
}: NeighborhoodMapProps) {
  const { embedSrc, openUrl } = getCityMapUrls(city);

  return (
    <div className="neighborhood-map">
      <div className="section-header">
        <h2 id={headingId}>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="service-area-map neighborhood-map-frame">
        <iframe title={title} src={embedSrc} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
      </div>
      <p className="neighborhood-map-open">
        <a href={openUrl} target="_blank" rel="noreferrer">
          {openLabel}
        </a>
        <span className="neighborhood-map-pin">{formatCityLabel(city)}</span>
      </p>
    </div>
  );
}
