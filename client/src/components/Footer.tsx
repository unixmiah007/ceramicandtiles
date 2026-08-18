import { Link } from 'react-router-dom';
import { contactInfo } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import TrustBadges from './TrustBadges';
import BusinessHours from './BusinessHours';
import SocialShare from './SocialShare';

export default function Footer() {
  const { t, f } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h2 className="footer-title">Portillo Ceramic and Tile</h2>
          <p className="footer-tagline">{t.footer.tagline}</p>
          <TrustBadges />
        </div>

        <div className="footer-links">
          <h3>{t.footer.quickLinks}</h3>
          <ul>
            <li><Link to="/experience">{t.nav.experience}</Link></li>
            <li><Link to="/services">{t.nav.services}</Link></li>
            <li><Link to="/why-portillo">{t.nav.whyPortillo}</Link></li>
            <li><Link to="/contact">{t.nav.contact}</Link></li>
            <li><Link to="/quote-wizard">{t.nav.quoteWizard}</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>{f.nav.resources}</h3>
          <ul>
            <li><Link to="/faq">{f.nav.faq}</Link></li>
            <li><Link to="/before-after">{f.nav.beforeAfter}</Link></li>
            <li><Link to="/service-area">{f.nav.serviceArea}</Link></li>
            <li><Link to="/estimate">{f.nav.estimate}</Link></li>
            <li><Link to="/blog">{f.nav.blog}</Link></li>
            <li><Link to="/checklist">{f.nav.checklist}</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>{t.footer.contact}</h3>
          <p>{contactInfo.name}</p>
          <p>
            <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
          </p>
          <p>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </p>
          <BusinessHours />
          <SocialShare className="footer-social" />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Portillo Ceramic and Tile. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
