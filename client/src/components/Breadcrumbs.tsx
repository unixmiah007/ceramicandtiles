import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';

export default function Breadcrumbs() {
  const crumbs = useBreadcrumbs();
  const { t } = useLanguage();

  if (!crumbs) {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label={t.breadcrumbs.ariaLabel}>
      <div className="container">
        <ol className="breadcrumbs-list">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;

            return (
              <li key={`${crumb.label}-${index}`} className="breadcrumbs-item">
                {index > 0 && (
                  <span className="breadcrumbs-separator" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14" focusable="false">
                      <path
                        d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                )}
                {crumb.path && !isLast ? (
                  <Link to={crumb.path} className="breadcrumbs-link">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="breadcrumbs-current" aria-current={isLast ? 'page' : undefined}>
                    {crumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
