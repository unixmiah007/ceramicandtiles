import { ContentSection } from '../types';

type ValueTranslation = {
  title: string;
  description: string;
  tagline: string;
  intro: string;
  sections: ContentSection[];
  highlights: string[];
};

export const valuesEs: Record<string, ValueTranslation> = {
  'family-owned': {
    title: 'Empresa Familiar',
    description:
      'Nuestro nombre está en cada proyecto. Tratamos a cada cliente y cada hogar con respeto.',
    tagline: 'Responsabilidad personal en cada trabajo.',
    intro:
      'Portillo Ceramic and Tile es una empresa familiar construida sobre la confianza, el respeto y el orgullo por nuestro trabajo. Cuando nos contrata, no obtiene un equipo rotativo ni un contratista anónimo: trabaja directamente con personas que respaldan cada corte, cada diseño y cada superficie terminada.',
    sections: [
      {
        heading: 'Nuestro Nombre Está en Cada Proyecto',
        body:
          'Como empresa familiar, nuestra reputación es personal. Llegamos cuando decimos que lo haremos, nos comunicamos con claridad durante todo el proyecto y asumimos la responsabilidad del resultado final. Su satisfacción refleja directamente el nombre de nuestra familia.',
      },
      {
        heading: 'Respeto por Su Hogar y Su Negocio',
        body:
          'Ya sea que trabajemos en un baño residencial o en un vestuario comercial, tratamos su espacio con cuidado. Protegemos las áreas circundantes, mantenemos un entorno de trabajo limpio y dejamos su propiedad lista para usar, no para que usted tenga que limpiar después de nosotros.',
      },
      {
        heading: 'Comunicación Directa en la que Puede Confiar',
        body:
          'Sabrá quién está en su proyecto y cómo contactarnos. Creemos que una comunicación honesta y directa genera confianza y mejores resultados. Las preguntas reciben respuesta, los plazos se mantienen claros y las expectativas se establecen desde el principio.',
      },
    ],
    highlights: [
      'Empresa familiar con responsabilidad personal',
      'Comunicación directa con las personas que realizan el trabajo',
      'Enfoque respetuoso hacia su hogar o instalación',
      'Artesanía consistente respaldada por nuestro nombre',
    ],
  },
  'professional-experience': {
    title: 'Experiencia Profesional',
    description:
      'Nuestro trabajo abarca proyectos residenciales e instalaciones comerciales profesionales.',
    tagline: 'Resultados comprobados en hogares e instalaciones de alto tráfico.',
    intro:
      'Nuestra experiencia incluye proyectos residenciales y comerciales en todo el norte de Virginia y el área de Washington, D.C. Desde duchas personalizadas y renovaciones de baños hasta vestuarios profesionales e instalaciones sanitarias, aportamos el mismo nivel de habilidad y profesionalismo a cada entorno.',
    sections: [
      {
        heading: 'Proyectos Residenciales Bien Hechos',
        body:
          'Los propietarios confían en nosotros para renovaciones de baños, instalaciones de duchas, azulejos de piso y pared, salpicaderos y reemplazo de azulejos. Entendemos que su hogar es personal, y abordamos cada proyecto residencial con el cuidado y la precisión que merece.',
      },
      {
        heading: 'Instalaciones Comerciales y de Alto Tráfico',
        body:
          'Nuestra experiencia comercial incluye trabajo de azulejos y cerámica en vestuarios profesionales, baños e instalaciones diseñadas para uso diario y alto tráfico. Sabemos cómo seleccionar materiales y métodos de instalación que resisten el uso constante.',
      },
      {
        heading: 'Experiencia Profesional Destacada',
        body:
          'Nuestro portafolio incluye trabajo en Capital One Arena para los Washington Capitals, espacios sanitarios y profesionales en el Pentágono, e instalaciones de vestuarios en Orangetheory Fitness en Leesburg, Virginia. Esa experiencia ha perfeccionado nuestros estándares de durabilidad, precisión y atención al detalle.',
      },
    ],
    highlights: [
      'Baños residenciales, duchas y trabajo de azulejos personalizado',
      'Vestuarios comerciales e instalaciones sanitarias',
      'Experiencia en Capital One Arena, el Pentágono y Orangetheory Fitness',
      'Área de servicio: norte de Virginia y Washington, D.C.',
    ],
  },
  'attention-to-detail': {
    title: 'Atención al Detalle',
    description:
      'Cortes limpios, diseños precisos, juntas de lechada uniformes y acabados de calidad son lo que separa un buen trabajo de uno excelente.',
    tagline: 'Precisión que se ve en cada línea y acabado.',
    intro:
      'El trabajo de azulejos es tan bueno como sus detalles. La planificación del diseño, los cortes limpios, las juntas rectas y los acabados cuidadosos separan un trabajo aceptable de una artesanía de la que estará orgulloso de vivir cada día. En Portillo Ceramic and Tile, esos detalles nunca son un pensamiento posterior.',
    sections: [
      {
        heading: 'Diseños Precisos y Cortes Limpios',
        body:
          'Antes de colocar el primer azulejo, planificamos el diseño para minimizar cortes incómodos, equilibrar el diseño y asegurar que el espacio terminado se vea intencional. Cada corte se mide con cuidado para que las transiciones, esquinas y bordes se vean nítidos y profesionales.',
      },
      {
        heading: 'Juntas de Lechada Uniformes',
        body:
          'Las juntas uniformes son uno de los signos más claros de un trabajo de azulejos de calidad. Nos tomamos el tiempo de colocar cada azulejo correctamente, mantener un espaciado uniforme y acabar la lechada con limpieza para que la superficie final se vea equilibrada y refinada.',
      },
      {
        heading: 'Acabados de Calidad',
        body:
          'Los últimos pasos importan. El sellado, la limpieza, los detalles de los bordes y la inspección final contribuyen a un resultado pulido. No consideramos un proyecto completo hasta que los detalles cumplan con el estándar que esperaríamos en nuestro propio hogar.',
      },
    ],
    highlights: [
      'Planificación cuidadosa del diseño antes de la instalación',
      'Cortes limpios y precisos en esquinas y transiciones',
      'Juntas uniformes en pisos y paredes',
      'Acabado meticuloso e inspección final',
    ],
  },
  'quality-without-shortcuts': {
    title: 'Calidad Sin Atajos',
    description:
      'Creemos en hacer las cosas correctamente, no simplemente terminar el trabajo rápidamente.',
    tagline: 'Cada paso hecho correctamente, no solo rápido.',
    intro:
      'Un trabajo rápido significa poco si el azulejo falla, el agua se filtra o la superficie terminada se ve irregular. Nos enfocamos en hacer cada fase del proyecto correctamente, desde la demolición y preparación hasta la impermeabilización, instalación, lechada y acabado, porque los atajos crean problemas que cuestan más después.',
    sections: [
      {
        heading: 'La Preparación Adecuada Es lo Primero',
        body:
          'Un buen trabajo de azulejos comienza antes de que se coloque el azulejo. Las superficies deben estar limpias, niveladas y preparadas correctamente. Omitir o apresurar la preparación conduce a azulejos agrietados, pisos irregulares e instalaciones fallidas. Nos tomamos el tiempo de preparar el espacio correctamente.',
      },
      {
        heading: 'La Impermeabilización y los Pasos Estructurales Importan',
        body:
          'En duchas y áreas húmedas, la impermeabilización es esencial. No escatimamos en membranas, respaldos ni detalles de drenaje. Proteger la estructura detrás del azulejo es tan importante como el azulejo que ve en la superficie.',
      },
      {
        heading: 'Construido Según Nuestro Estándar, No un Plazo',
        body:
          'Preferimos tomarnos el tiempo de hacer el trabajo correctamente que apresurarnos para pasar al siguiente. Nuestro objetivo es un resultado que se vea excelente y funcione de manera confiable, no simplemente un proyecto marcado como completo.',
      },
    ],
    highlights: [
      'Demolición y preparación de superficies exhaustivas',
      'Impermeabilización adecuada en duchas y áreas húmedas',
      'Sin pasos omitidos para ahorrar tiempo',
      'Métodos de instalación elegidos para un rendimiento a largo plazo',
    ],
  },
  'built-to-last': {
    title: 'Construido para Durar',
    description:
      'Nos enfocamos en la preparación e instalación adecuadas para que su inversión resista el uso diario.',
    tagline: 'Trabajo de azulejos diseñado para años de uso cotidiano.',
    intro:
      'Los azulejos son una inversión en su hogar o negocio. Deben verse hermosos desde el primer día y seguir funcionando durante años. Nos enfocamos en la preparación adecuada, métodos de instalación probados y acabados duraderos para que su proyecto resista el uso diario en baños, cocinas, duchas e instalaciones comerciales de alto tráfico.',
    sections: [
      {
        heading: 'Preparación que Protege Su Inversión',
        body:
          'Un trabajo de azulejos duradero depende de lo que ocurre antes y debajo de la superficie. Evaluamos el sustrato, abordamos las áreas problemáticas y preparamos cada espacio para que la instalación tenga una base estable para una durabilidad a largo plazo.',
      },
      {
        heading: 'Materiales y Métodos para el Uso Real',
        body:
          'Diferentes espacios requieren diferentes enfoques. Una ducha residencial, un salpicadero de cocina y un vestuario comercial tienen demandas únicas. Elegimos métodos de instalación adaptados a cómo se usará realmente el espacio, no solo a cómo se ve cuando nos vamos.',
      },
      {
        heading: 'Rendimiento en el que Puede Confiar',
        body:
          'Nuestra experiencia en instalaciones profesionales y de alto tráfico nos ha enseñado que la durabilidad y la precisión van de la mano. Ya sea que el proyecto esté en su hogar o en su negocio, instalamos azulejos construidos para resistir la vida cotidiana.',
      },
    ],
    highlights: [
      'Sustrato estable y preparación de superficies',
      'Instalación adaptada a cada espacio y nivel de tráfico',
      'Resultados duraderos para baños, duchas e instalaciones comerciales',
      'Trabajo diseñado para proteger su inversión a largo plazo',
    ],
  },
};
