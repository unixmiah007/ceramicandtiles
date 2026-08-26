import { useLanguage } from '../context/LanguageContext';

export default function BusinessHours() {
  const { f } = useLanguage();

  return (
    <div className="business-hours">
      <h3>{f.hours.title}</h3>
      <ul>
        <li>{f.hours.weekdays}</li>
        <li>{f.hours.saturday}</li>
        <li>{f.hours.sunday}</li>
      </ul>
      <p className="business-hours-response">{f.hours.response}</p>
    </div>
  );
}
