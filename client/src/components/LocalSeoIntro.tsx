import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LOCAL_SEO } from '../seo/site';

export default function LocalSeoIntro() {
  const { locale } = useLanguage();
  const cities = LOCAL_SEO.primaryCities.join(', ');

  if (locale === 'es') {
    return (
      <section className="section local-seo-intro" aria-label="Área de servicio">
        <div className="container">
          <h2>Instalación de Azulejos en Washington D.C., Maryland, Virginia y Virginia Occidental</h2>
          <p>
            Portillo Ceramic and Tile es un contratista local de azulejos y cerámica que atiende
            propietarios y negocios en {cities}, y comunidades cercanas en el área metropolitana de
            D.C. Desde renovaciones de baños y duchas walk-in hasta vestuarios comerciales e
            instalaciones de alto tráfico, combinamos impermeabilización adecuada, diseños precisos y
            acabados duraderos en cada proyecto.
          </p>
          <p>
            ¿Busca un instalador de azulejos cerca de usted?{' '}
            <Link to="/service-area">Vea nuestra área de servicio</Link>, explore{' '}
            <Link to="/services">nuestros servicios de azulejos</Link>, o{' '}
            <Link to="/contact">solicite una cotización gratis</Link>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section local-seo-intro" aria-label="Service area">
      <div className="container">
        <h2>Tile Installation Contractor in DC, Maryland, Virginia & West Virginia</h2>
        <p>
          Portillo Ceramic and Tile is a local tile and ceramic contractor serving homeowners and
          businesses in {cities}, and surrounding communities across the Washington D.C. metro area.
          From bathroom renovations and walk-in shower installs to commercial locker rooms and
          high-traffic facility upgrades, we combine proper waterproofing, precise layouts, and
          durable finishes on every job.
        </p>
        <p>
          Searching for a tile installer near you?{' '}
          <Link to="/service-area">View our service area</Link>, browse{' '}
          <Link to="/services">our tile services</Link>, or{' '}
          <Link to="/contact">request a free quote</Link>.
        </p>
      </div>
    </section>
  );
}
