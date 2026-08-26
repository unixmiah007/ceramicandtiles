import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY = 'portillo-estimate-floater-dismissed';

function EstimateFloaterIcon() {
  return (
    <svg
      className="estimate-floater-icon"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="estimate-floater-bg" x1="12" y1="8" x2="68" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a252f" />
          <stop offset="1" stopColor="#2c3e50" />
        </linearGradient>
        <linearGradient id="estimate-floater-accent" x1="24" y1="18" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e8d5a3" />
          <stop offset="1" stopColor="#c9a962" />
        </linearGradient>
        <linearGradient id="estimate-floater-tile" x1="28" y1="30" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#faf9f7" />
          <stop offset="1" stopColor="#e7e2d8" />
        </linearGradient>
        <filter id="estimate-floater-shadow" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1a252f" floodOpacity="0.22" />
        </filter>
      </defs>

      <circle cx="40" cy="40" r="34" fill="url(#estimate-floater-bg)" filter="url(#estimate-floater-shadow)" />
      <circle cx="40" cy="40" r="34" stroke="url(#estimate-floater-accent)" strokeWidth="2" opacity="0.85" />

      <rect x="22" y="20" width="36" height="42" rx="5" fill="url(#estimate-floater-tile)" stroke="#d4cfc4" strokeWidth="1.5" />

      <rect x="27" y="25" width="11" height="11" rx="1.5" fill="#f5f2ec" stroke="#c9a962" strokeWidth="1.2" />
      <rect x="42" y="25" width="11" height="11" rx="1.5" fill="#ebe6dc" stroke="#c9a962" strokeWidth="1.2" />
      <rect x="27" y="40" width="11" height="11" rx="1.5" fill="#ebe6dc" stroke="#c9a962" strokeWidth="1.2" />
      <rect x="42" y="40" width="11" height="11" rx="1.5" fill="#f5f2ec" stroke="#c9a962" strokeWidth="1.2" />

      <path d="M30 56h20" stroke="#8b7355" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M33 59h14" stroke="#c9a962" strokeWidth="2" strokeLinecap="round" />

      <circle cx="58" cy="24" r="11" fill="url(#estimate-floater-accent)" stroke="#faf9f7" strokeWidth="2" />
      <path
        d="M54.5 24c0-1.2 1-2.2 2.2-2.2.9 0 1.7.5 2 1.3.4-.2.8-.3 1.3-.3 1.2 0 2.2 1 2.2 2.2 0 1.6-2.2 3.4-2.2 3.4s-2.2-1.8-2.2-3.4z"
        fill="#1a252f"
        opacity="0.15"
      />
      <text
        x="58"
        y="28"
        textAnchor="middle"
        fill="#1a252f"
        fontSize="11"
        fontWeight="700"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        $
      </text>

      <path
        d="M18 52l4-4 3 3 6-7 5 5"
        stroke="#7dffb3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="52" r="2" fill="#7dffb3" />
    </svg>
  );
}

export default function EstimateFloater() {
  const { f } = useLanguage();
  const location = useLocation();
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  });

  if (dismissed || location.pathname === '/estimate') {
    return null;
  }

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, '1');
    setDismissed(true);
  };

  return (
    <aside className="estimate-floater" aria-label={f.estimate.floaterLabel}>
      <button
        type="button"
        className="estimate-floater-dismiss"
        onClick={dismiss}
        aria-label={f.estimate.floaterDismiss}
      >
        ×
      </button>

      <Link to="/estimate" className="estimate-floater-link">
        <span className="estimate-floater-visual">
          <EstimateFloaterIcon />
          <span className="estimate-floater-pulse" aria-hidden="true" />
        </span>
        <span className="estimate-floater-copy">
          <strong>{f.estimate.floaterTitle}</strong>
          <span>{f.estimate.floaterHint}</span>
        </span>
      </Link>
    </aside>
  );
}
