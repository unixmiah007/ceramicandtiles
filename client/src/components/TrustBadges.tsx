import { useLanguage } from '../context/LanguageContext';

export default function TrustBadges() {
  const { f } = useLanguage();
  const badges = [
    f.trust.licensed,
    f.trust.warranty,
    f.trust.familyOwned,
    f.trust.yearsExperience,
  ];

  return (
    <div className="trust-badges" aria-label="Credentials">
      {badges.map((badge) => (
        <span key={badge} className="trust-badge">
          {badge}
        </span>
      ))}
    </div>
  );
}
