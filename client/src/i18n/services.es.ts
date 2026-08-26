import { ContentSection } from '../types';

type ServiceTranslation = {
  title: string;
  description: string;
  tagline: string;
  intro: string;
  sections: ContentSection[];
  highlights: string[];
  idealFor: string[];
};

export const servicesEs: Record<string, ServiceTranslation> = {
  'bathroom-renovations': {
    title: 'Renovaciones de Baños',
    description:
      'Transformaciones completas de baños, desde la demolición hasta los acabados finales.',
    tagline: 'Renovaciones completas de baños hechas correctamente de principio a fin.',
    intro:
      'Una renovación de baño es una de las mejoras más impactantes que puede hacer en su hogar. Portillo Ceramic and Tile se encarga de transformaciones completas de baños—incluyendo demolición, preparación, impermeabilización, instalación de azulejos, lechada y acabados—para que su nuevo espacio se vea hermoso y funcione de manera confiable durante años.',
    sections: [
      {
        heading: 'Servicios Completos de Renovación',
        body:
          'Gestionamos el alcance de azulejos y cerámica de su renovación de baño, desde la remoción de materiales obsoletos hasta la instalación de nuevas superficies en pisos, paredes y duchas. Nuestro enfoque es hacer cada fase correctamente para que el baño terminado se sienta cohesivo y construido profesionalmente.',
      },
      {
        heading: 'Superficies de Piso, Pared y Ducha',
        body:
          'Ya sea que esté actualizando un medio baño, un baño de visitas o un baño principal, instalamos azulejos de cerámica y porcelanato en pisos, paredes, nichos y áreas de ducha con diseños limpios y acabados consistentes en todo el espacio.',
      },
      {
        heading: 'Diseñado para el Uso Diario',
        body:
          'Los baños soportan humedad constante y tráfico diario. Priorizamos la preparación adecuada, la impermeabilización en áreas húmedas y métodos de instalación de calidad para que su renovación aguante la vida real—no solo el día de las fotos.',
      },
    ],
    highlights: [
      'Alcance completo de azulejos y cerámica para baños',
      'Desde la demolición hasta los acabados finales',
      'Instalación de azulejos en pisos, paredes y duchas',
      'Impermeabilización adecuada en áreas húmedas',
    ],
    idealFor: [
      'Baños principales',
      'Baños de visitas',
      'Medios baños',
      'Remodelaciones completas de baños',
    ],
  },
  'shower-installation': {
    title: 'Instalación y Renovación de Duchas',
    description:
      'Construcción y renovación de duchas personalizadas con impermeabilización adecuada y trabajo de azulejos de precisión.',
    tagline: 'Duchas personalizadas construidas con precisión e impermeabilización adecuada.',
    intro:
      'Una ducha bien construida combina diseño, impermeabilización y trabajo experto de azulejos. Instalamos y renovamos duchas walk-in, conversiones de tina a ducha y mamparas personalizadas con la preparación y el detalle necesarios para un resultado hermético y duradero.',
    sections: [
      {
        heading: 'Instalación de Duchas Nuevas',
        body:
          'Desde nichos enmarcados y detalles de bancos hasta azulejos en paredes y pisos, construimos duchas que se adaptan al diseño y objetivos de su baño. Cada superficie se planifica antes de comenzar la instalación para que los cortes, transiciones y detalles de drenaje se manejen correctamente.',
      },
      {
        heading: 'Renovaciones y Mejoras de Duchas',
        body:
          'Si su ducha actual está desactualizada, tiene filtraciones o está fallando, podemos remover los materiales antiguos, abordar problemas subyacentes e instalar una ducha de azulejos nueva construida según estándares modernos.',
      },
      {
        heading: 'Impermeabilización Incluida',
        body:
          'Las duchas exigen impermeabilización adecuada detrás del azulejo. Nunca tratamos la impermeabilización como opcional—es una parte fundamental de cada instalación y renovación de ducha que completamos.',
      },
    ],
    highlights: [
      'Construcción de duchas walk-in y personalizadas',
      'Renovaciones y reemplazos de duchas',
      'Sistemas de impermeabilización incluidos',
      'Diseños de azulejos limpios y acabados detallados',
    ],
    idealFor: [
      'Duchas walk-in',
      'Conversiones de tina a ducha',
      'Mejoras de baño principal',
      'Remodelaciones de duchas',
    ],
  },
  'ceramic-porcelain': {
    title: 'Azulejos de Cerámica y Porcelanato',
    description:
      'Instalación experta de azulejos de cerámica y porcelanato para pisos, paredes y áreas especiales.',
    tagline: 'Instalación experta de azulejos de cerámica y porcelanato.',
    intro:
      'Los azulejos de cerámica y porcelanato ofrecen durabilidad, versatilidad y una amplia gama de opciones de diseño para baños, cocinas, duchas, pisos y espacios comerciales. Instalamos ambos materiales con la preparación y precisión necesarias para resaltar su resistencia y apariencia.',
    sections: [
      {
        heading: 'Instalación de Azulejos Residenciales',
        body:
          'Instalamos azulejos de cerámica y porcelanato en baños, duchas, cocinas, entradas y otros espacios residenciales donde los propietarios desean superficies fáciles de mantener y construidas para durar.',
      },
      {
        heading: 'Aplicaciones Comerciales de Azulejos',
        body:
          'Los azulejos de porcelanato y cerámica son excelentes opciones para baños, vestuarios, pasillos y otras áreas comerciales de alto tráfico. Seleccionamos métodos de instalación adecuados para el uso del espacio.',
      },
      {
        heading: 'La Precisión Importa',
        body:
          'Azulejos de formato grande, diseños con patrones y trabajo detallado en bordes requieren planificación cuidadosa. Diseñamos cada proyecto para minimizar cortes incómodos y entregar un acabado pulido y profesional.',
      },
    ],
    highlights: [
      'Azulejos de cerámica y porcelanato para pisos y paredes',
      'Aplicaciones residenciales y comerciales',
      'Diseños de formato grande y con patrones',
      'Superficies duraderas y de bajo mantenimiento',
    ],
    idealFor: ['Baños', 'Cocinas', 'Paredes de ducha', 'Baños comerciales'],
  },
  'shower-waterproofing': {
    title: 'Impermeabilización de Duchas',
    description:
      'Sistemas de impermeabilización adecuados para proteger su inversión y prevenir daños por humedad.',
    tagline: 'Proteja su hogar con impermeabilización adecuada para duchas.',
    intro:
      'El azulejo por sí solo no hace que una ducha sea hermética. Detrás de cada ducha duradera hay un sistema de impermeabilización instalado correctamente que protege la estructura, paredes y pisos del daño por humedad. Instalamos la impermeabilización correctamente como parte de nuestro trabajo de azulejos en duchas y áreas húmedas.',
    sections: [
      {
        heading: 'Por Qué Importa la Impermeabilización',
        body:
          'La humedad que se filtra detrás del azulejo puede causar moho, podredumbre y reparaciones costosas. La impermeabilización adecuada crea una barrera protectora en duchas y áreas húmedas antes de instalar el azulejo, ayudando a que su inversión dure.',
      },
      {
        heading: 'Preparación de Áreas Húmedas',
        body:
          'Preparamos platos de ducha, paredes y transiciones utilizando métodos de impermeabilización comprobados, diseñados para entornos húmedos con azulejos. Este paso es esencial—no opcional—para cualquier proyecto de ducha o revestimiento de tina.',
      },
      {
        heading: 'Parte de una Instalación Completa',
        body:
          'La impermeabilización se integra en nuestro proceso de instalación de duchas y renovación de baños. No nos apresuramos en este paso, porque el acabado del azulejo es tan confiable como el sistema que hay debajo.',
      },
    ],
    highlights: [
      'Impermeabilización de duchas y áreas húmedas',
      'Protección contra humedad detrás de superficies de azulejo',
      'Integrada con la instalación de duchas',
      'Diseñada para prevenir daños por agua a largo plazo',
    ],
    idealFor: [
      'Construcción de duchas nuevas',
      'Renovaciones de duchas',
      'Revestimientos de tina',
      'Proyectos de azulejos en áreas húmedas',
    ],
  },
  'floor-wall-tile': {
    title: 'Azulejos de Piso y Pared',
    description:
      'Instalación profesional de azulejos en pisos y paredes con cortes limpios y juntas consistentes.',
    tagline: 'Azulejos profesionales de piso y pared con resultados limpios y consistentes.',
    intro:
      'Los azulejos de piso y pared pueden transformar la apariencia y funcionalidad de una habitación. Instalamos azulejos en pisos de baños, paredes de duchas, pisos de cocinas, pasillos y paredes de acento con diseños equilibrados, duraderos y visualmente refinados.',
    sections: [
      {
        heading: 'Instalación de Azulejos en Pisos',
        body:
          'Los azulejos de piso deben estar nivelados, estables e instalados sobre una superficie preparada correctamente. Instalamos azulejos en pisos de baños, cocinas, áreas de lavandería y espacios comerciales con atención a transiciones, drenaje y durabilidad a largo plazo.',
      },
      {
        heading: 'Instalación de Azulejos en Paredes',
        body:
          'Los azulejos de pared añaden estilo y protección en duchas, paredes de baños, salpicaderos y áreas destacadas. Planificamos los diseños cuidadosamente para que los cortes, esquinas y juntas se vean intencionales y profesionales.',
      },
      {
        heading: 'Acabados Consistentes',
        body:
          'Combinar azulejos de piso y pared o coordinar diferentes superficies en la misma habitación requiere planificación y precisión. Llevamos ese detalle a través de toda la instalación.',
      },
    ],
    highlights: [
      'Azulejos de piso para baños, cocinas y pasillos',
      'Azulejos de pared para duchas y baños',
      'Superficies niveladas y transiciones limpias',
      'Juntas consistentes y detalle en bordes',
    ],
    idealFor: ['Pisos de baño', 'Paredes de ducha', 'Pisos de cocina', 'Paredes de acento'],
  },
  'commercial-tile': {
    title: 'Instalación Comercial de Azulejos',
    description:
      'Soluciones de azulejos duraderas para instalaciones comerciales diseñadas para soportar uso de alto tráfico.',
    tagline: 'Soluciones de azulejos duraderas para instalaciones comerciales.',
    intro:
      'Los espacios comerciales requieren trabajo de azulejos que pueda soportar uso constante mientras mantiene una apariencia limpia y profesional. Nuestra experiencia comercial incluye baños, vestuarios, pasillos y mejoras de instalaciones en todo el Norte de Virginia y Washington, D.C.',
    sections: [
      {
        heading: 'Diseñado para Uso de Alto Tráfico',
        body:
          'Los azulejos comerciales deben resistir tráfico diario, rutinas de limpieza y uso intensivo. Instalamos azulejos pensando en durabilidad, drenaje y mantenimiento—no solo en apariencia.',
      },
      {
        heading: 'Experiencia en Instalaciones Profesionales',
        body:
          'Nuestro trabajo incluye entornos profesionales como Capital One Arena, el Pentagon y Orangetheory Fitness. Esa experiencia informa cómo abordamos la preparación, selección de materiales e instalación en espacios exigentes.',
      },
      {
        heading: 'Ejecución Confiable de Proyectos',
        body:
          'Los clientes comerciales necesitan trabajo hecho correctamente y con respeto por la instalación. Comunicamos claramente, mantenemos estándares profesionales en el sitio y entregamos superficies terminadas listas para la operación diaria.',
      },
    ],
    highlights: [
      'Baños, vestuarios y pisos de instalaciones',
      'Entornos comerciales de alto tráfico',
      'Experiencia en instalaciones profesionales',
      'Materiales y métodos de instalación duraderos',
    ],
    idealFor: [
      'Baños de oficinas',
      'Instalaciones comerciales',
      'Centros de fitness',
      'Edificios profesionales',
    ],
  },
  'locker-rooms': {
    title: 'Vestuarios',
    description:
      'Trabajo de azulejos y cerámica para vestuarios y espacios de instalaciones profesionales.',
    tagline: 'Soluciones de azulejos para vestuarios e instalaciones deportivas.',
    intro:
      'Los vestuarios e instalaciones deportivas necesitan superficies que resistan la humedad, soporten tráfico intenso y sean fáciles de mantener. Instalamos azulejos y cerámica en vestuarios y espacios relacionados, diseñados para uso profesional diario.',
    sections: [
      {
        heading: 'Superficies Resistentes a la Humedad',
        body:
          'Los entornos de vestuarios exponen los azulejos a humedad, productos químicos de limpieza y uso constante. Instalamos materiales y sistemas adecuados para estas condiciones para que el espacio permanezca funcional y profesional.',
      },
      {
        heading: 'Estándares de Instalaciones Profesionales',
        body:
          'Nuestra experiencia en entornos deportivos y de fitness—incluyendo trabajo en Capital One Arena y Orangetheory Fitness—nos ha enseñado lo que se necesita para entregar trabajo de azulejos duradero en vestuarios exigentes.',
      },
      {
        heading: 'Alcance Completo de Azulejos',
        body:
          'Desde pisos y paredes hasta transiciones y áreas húmedas, manejamos el alcance de azulejos y cerámica necesario para mejorar o construir vestuarios de la manera correcta.',
      },
    ],
    highlights: [
      'Pisos y paredes de vestuarios',
      'Instalación resistente a la humedad',
      'Experiencia en instalaciones de alto tráfico',
      'Acabados profesionales y duraderos',
    ],
    idealFor: [
      'Gimnasios y centros de fitness',
      'Instalaciones deportivas',
      'Vestuarios atléticos',
      'Centros de entrenamiento',
    ],
  },
  'backsplashes': {
    title: 'Salpicaderos',
    description:
      'Diseños de salpicaderos personalizados que añaden belleza y funcionalidad a cocinas y baños.',
    tagline: 'Salpicaderos personalizados que añaden estilo y funcionalidad.',
    intro:
      'Un salpicadero protege sus paredes y añade personalidad a cocinas y baños. Instalamos azulejos de cerámica y porcelanato en diseños que complementan sus encimeras, gabinetes y visión general de diseño.',
    sections: [
      {
        heading: 'Salpicaderos de Cocina',
        body:
          'Desde azulejos subway clásicos hasta patrones decorativos y diseños destacados, instalamos salpicaderos de cocina que son prácticos y visualmente atractivos, con cortes limpios alrededor de tomacorrientes, esquinas y encimeras.',
      },
      {
        heading: 'Salpicaderos de Baño',
        body:
          'Los azulejos de salpicadero en lavabos y baños añaden estilo mientras protegen las paredes de la humedad y el uso diario. Instalamos azulejos de salpicadero con la misma atención al detalle que aportamos a proyectos de azulejos más grandes.',
      },
      {
        heading: 'Diseños Personalizados',
        body:
          'Podemos ayudarle a dar vida a su visión de diseño con planificación cuidadosa, instalación precisa y acabados que hacen que el salpicadero se sienta como una parte natural de la habitación.',
      },
    ],
    highlights: [
      'Azulejos de salpicadero para cocina y baño',
      'Diseños subway, con patrones y personalizados',
      'Cortes limpios alrededor de tomacorrientes y bordes',
      'Resultados funcionales y decorativos',
    ],
    idealFor: [
      'Remodelaciones de cocina',
      'Lavabos de baño',
      'Cuartos de lavandería',
      'Áreas de bar y despensa',
    ],
  },
  'tile-replacement': {
    title: 'Reemplazo de Azulejos',
    description:
      'Remueva azulejos obsoletos e instale superficies frescas y modernas que transformen su espacio.',
    tagline: 'Reemplace azulejos obsoletos con superficies frescas y modernas.',
    intro:
      'Los azulejos obsoletos, agrietados o en mal estado pueden hacer que toda una habitación se sienta desgastada. Removemos los azulejos antiguos con cuidado, preparamos la superficie correctamente e instalamos azulejos nuevos de cerámica o porcelanato que transforman la apariencia y el rendimiento de su baño, ducha, piso o salpicadero.',
    sections: [
      {
        heading: 'Remueva lo Antiguo, Comience de Nuevo',
        body:
          'El reemplazo de azulejos comienza con la remoción adecuada y evaluación de la superficie. Abordamos lo que hay debajo del azulejo antiguo para que la nueva instalación tenga una base estable.',
      },
      {
        heading: 'Mejore Su Espacio',
        body:
          'El reemplazo es una oportunidad para modernizar diseños, mejorar la impermeabilización y elegir materiales que se adapten mejor a cómo usa el espacio hoy.',
      },
      {
        heading: 'Reemplazo Parcial o Completo',
        body:
          'Ya sea que necesite renovar un área o retilar un baño o piso completo, manejamos proyectos de reemplazo con los mismos estándares de calidad que las instalaciones nuevas.',
      },
    ],
    highlights: [
      'Remoción de azulejos obsoletos o dañados',
      'Preparación de superficie antes de la nueva instalación',
      'Reemplazo de azulejos en baños, duchas, pisos y paredes',
      'Materiales modernos y diseños mejorados',
    ],
    idealFor: [
      'Baños desactualizados',
      'Azulejos de ducha en mal estado',
      'Azulejos de piso antiguos',
      'Actualizaciones de cocina',
    ],
  },
  'tile-repair': {
    title: 'Reparación de Azulejos',
    description:
      'Reparaciones puntuales para restaurar azulejos dañados o en mal estado sin una renovación completa.',
    tagline: 'Reparaciones puntuales para azulejos dañados o en mal estado.',
    intro:
      'No todo problema de azulejos requiere una renovación completa. Ofrecemos reparación puntual de azulejos para piezas agrietadas, secciones sueltas, lechada en mal estado y daños localizados—restaurando funcionalidad y apariencia mientras abordamos el problema subyacente cuando es posible.',
    sections: [
      {
        heading: 'Azulejos Agrietados o Sueltos',
        body:
          'Reparamos azulejos individuales y secciones pequeñas donde ha ocurrido daño o movimiento, haciendo que la reparación coincida con la instalación existente siempre que sea posible.',
      },
      {
        heading: 'Problemas de Lechada y Superficie',
        body:
          'La lechada en mal estado, juntas manchadas y problemas menores de superficie a menudo pueden corregirse con trabajo de reparación profesional que mejora tanto la apariencia como el rendimiento.',
      },
      {
        heading: 'Recomendaciones Honestas',
        body:
          'Si una reparación no proporcionará una solución duradera, se lo diremos. Nuestro objetivo es recomendar el enfoque que tenga más sentido para su espacio y presupuesto.',
      },
    ],
    highlights: [
      'Reparación de azulejos agrietados y sueltos',
      'Reparación y restauración de lechada',
      'Arreglos localizados sin renovación completa',
      'Recomendaciones prácticas para resultados duraderos',
    ],
    idealFor: [
      'Azulejos de piso agrietados',
      'Azulejos de ducha sueltos',
      'Juntas de lechada dañadas',
      'Áreas pequeñas de reparación',
    ],
  },
  'demolition-removal': {
    title: 'Demolición y Remoción',
    description:
      'Demolición y remoción cuidadosa para preparar su espacio para la nueva instalación de azulejos.',
    tagline: 'Demolición cuidadosa para preparar su espacio para azulejos nuevos.',
    intro:
      'El trabajo de azulejos de calidad comienza con la remoción adecuada de materiales antiguos. Demolemos y removemos cuidadosamente azulejos existentes, accesorios y superficies en mal estado para preparar baños, duchas, pisos y espacios comerciales para una nueva instalación.',
    sections: [
      {
        heading: 'Remoción Controlada',
        body:
          'Removemos azulejos antiguos y materiales relacionados con cuidado por el espacio circundante, preparando el área para la siguiente fase de su renovación sin daños innecesarios.',
      },
      {
        heading: 'Evaluación de Superficie',
        body:
          'Una vez completada la remoción, evaluamos el sustrato e identificamos cualquier problema que deba abordarse antes de instalar los azulejos nuevos.',
      },
      {
        heading: 'Listo para la Instalación',
        body:
          'La demolición y preparación adecuadas ahorran tiempo y previenen problemas después. Preparamos el escenario para una instalación de azulejos exitosa desde el primer paso.',
      },
    ],
    highlights: [
      'Remoción de azulejos y superficies',
      'Preparación para nueva instalación',
      'Trabajo cuidadoso en hogares e instalaciones ocupadas',
      'Evaluación del sustrato después de la remoción',
    ],
    idealFor: [
      'Preparación para remodelación de baño',
      'Demolición de duchas',
      'Remoción de azulejos de piso',
      'Proyectos de renovación',
    ],
  },
  'custom-designs': {
    title: 'Diseños de Azulejos Personalizados',
    description:
      'Diseños y patrones únicos adaptados a su visión y espacio.',
    tagline: 'Diseños y patrones únicos adaptados a su espacio.',
    intro:
      'El diseño personalizado de azulejos puede elevar un baño, ducha, cocina o pared destacada de estándar a excepcional. Trabajamos con diseños con patrones, bandas de acento, nichos, bordes y diseños especiales para dar vida a su visión con instalación precisa.',
    sections: [
      {
        heading: 'Planificación de Patrones y Diseños',
        body:
          'Los diseños personalizados requieren planificación antes de comenzar la instalación. Diseñamos patrones, acentos y áreas destacadas para que el resultado terminado se vea equilibrado e intencional.',
      },
      {
        heading: 'Duchas, Pisos y Paredes Destacadas',
        body:
          'Desde nichos de ducha y paredes de acento hasta patrones decorativos en pisos, instalamos trabajo de azulejos personalizado que refleja su estilo mientras mantiene durabilidad profesional.',
      },
      {
        heading: 'Artesanía que Se Nota',
        body:
          'Los azulejos personalizados resaltan los detalles—los cortes, alineación y juntas importan aún más. Aportamos la precisión necesaria para que los diseños complejos se vean limpios y pulidos.',
      },
    ],
    highlights: [
      'Diseños de azulejos con patrones y acentos',
      'Nichos de ducha y paredes destacadas',
      'Diseños decorativos de piso y pared',
      'Instalación de precisión para trabajo personalizado',
    ],
    idealFor: [
      'Baños de diseñador',
      'Paredes de ducha de acento',
      'Pisos con patrones',
      'Salpicaderos destacados',
    ],
  },
};
