import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function ReferralCTA() {
  const { f } = useLanguage();

  return (
    <section className="referral-cta">
      <div className="container referral-cta-inner">
        <div>
          <h2>{f.referral.title}</h2>
          <p>{f.referral.description}</p>
        </div>
        <Link to="/contact" className="btn btn-primary">
          {f.referral.cta}
        </Link>
      </div>
    </section>
  );
}
