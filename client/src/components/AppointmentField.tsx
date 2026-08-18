import { useLanguage } from '../context/LanguageContext';

interface AppointmentFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AppointmentField({ value, onChange }: AppointmentFieldProps) {
  const { f } = useLanguage();

  return (
    <div className="form-group">
      <label htmlFor="preferredVisit">{f.appointment.label}</label>
      <input
        id="preferredVisit"
        name="preferredVisit"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={f.appointment.placeholder}
      />
      <p className="field-hint">{f.appointment.hint}</p>
    </div>
  );
}
