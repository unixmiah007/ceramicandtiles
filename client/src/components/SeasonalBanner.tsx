import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY = 'portillo-seasonal-dismissed';

export default function SeasonalBanner() {
  const { f } = useLanguage();
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(STORAGE_KEY) === '1';
  });

  if (dismissed) return null;

  return (
    <div className="seasonal-banner" role="region" aria-label="Promotion">
      <div className="container seasonal-banner-inner">
        <p>{f.seasonal.message}</p>
        <div className="seasonal-banner-actions">
          <Link to="/contact" className="btn btn-small btn-light">
            {f.seasonal.cta}
          </Link>
          <button
            type="button"
            className="seasonal-banner-dismiss"
            onClick={() => {
              window.sessionStorage.setItem(STORAGE_KEY, '1');
              setDismissed(true);
            }}
          >
            {f.seasonal.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
