import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/experience', label: t.nav.experience },
    { to: '/services', label: t.nav.services },
    { to: '/why-portillo', label: t.nav.whyPortillo },
    { to: '/quote-wizard', label: t.nav.quoteWizard, highlight: true },
    { to: '/contact', label: t.nav.contact },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className={`header${isMenuOpen ? ' header--menu-open' : ''}`}>
      <div className="container header-shell">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-mark" aria-hidden="true" />
          <span className="logo-text">
            <span className="logo-name">Portillo</span>
            <span className="logo-tagline">Ceramic &amp; Tile</span>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
          aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="menu-toggle-box" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav className="nav" id="main-nav" aria-label="Main navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link${link.highlight ? ' nav-link--wizard' : ''}${isActive ? ' active' : ''}`
                  }
                  end={link.to === '/'}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn-primary nav-mobile-cta" onClick={closeMenu}>
            {t.nav.requestQuote}
          </Link>
        </nav>

        <div className="header-actions">
          <LanguageToggle />
          <Link to="/contact" className="btn btn-primary header-cta">
            {t.nav.requestQuote}
          </Link>
        </div>
      </div>

      <button
        type="button"
        className="nav-overlay"
        aria-label={t.nav.closeMenu}
        onClick={closeMenu}
        tabIndex={isMenuOpen ? 0 : -1}
      />
    </header>
  );
}
