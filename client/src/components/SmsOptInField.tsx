import { useLanguage } from '../context/LanguageContext';

interface SmsOptInFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function SmsOptInField({ checked, onChange }: SmsOptInFieldProps) {
  const { f } = useLanguage();

  return (
    <div className="form-group checkbox-field">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{f.sms.label}</span>
      </label>
      <p className="field-hint">{f.sms.hint}</p>
    </div>
  );
}
