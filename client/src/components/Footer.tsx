import { Link } from 'react-router-dom';
import { contactInfo } from '../data/content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h2 className="footer-title">Portillo Ceramic and Tile</h2>
          <p className="footer-tagline">
            Family-Owned. Professional Craftsmanship. Quality You Can See.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/experience">Experience</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/why-portillo">Why Portillo</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>{contactInfo.name}</p>
          <p>
            <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
          </p>
          <p>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Portillo Ceramic and Tile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
