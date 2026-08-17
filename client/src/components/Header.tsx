import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const { t } = useLanguage();

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/experience', label: t.nav.experience },
    { to: '/services', label: t.nav.services },
    { to: '/why-portillo', label: t.nav.whyPortillo },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span className="logo-mark" aria-hidden="true" />
          <span className="logo-text">
            <span className="logo-name">Portillo</span>
            <span className="logo-tagline">Ceramic &amp; Tile</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <LanguageToggle />
          <Link to="/contact" className="btn btn-primary header-cta">
            {t.nav.requestQuote}
          </Link>
        </div>
      </div>
    </header>
  );
}
