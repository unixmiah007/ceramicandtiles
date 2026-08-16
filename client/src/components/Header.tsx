import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/services', label: 'Services' },
  { to: '/why-portillo', label: 'Why Portillo' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
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

        <Link to="/contact" className="btn btn-primary header-cta">
          Request a Quote
        </Link>
      </div>
    </header>
  );
}
