/**
 * Generates blog post metadata and i18n content files.
 * Run: node scripts/generate-blog-posts.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CATEGORY_IMAGES = {
  tile: [
    'https://images.pexels.com/photos/7534391/pexels-photo-7534391.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6580708/pexels-photo-6580708.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6580701/pexels-photo-6580701.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3862131/pexels-photo-3862131.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/5824906/pexels-photo-5824906.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/7534390/pexels-photo-7534390.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6580703/pexels-photo-6580703.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1910482/pexels-photo-1910482.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6580704/pexels-photo-6580704.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  ceramic: [
    'https://images.pexels.com/photos/7534390/pexels-photo-7534390.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://www.rubi.com/us/blog/wp-content/uploads/2018/03/1420701275533.jpeg',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/6580702/pexels-photo-6580702.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6580700/pexels-photo-6580700.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6580708/pexels-photo-6580708.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6580701/pexels-photo-6580701.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/7534391/pexels-photo-7534391.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  bathroom: [
    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/6585758/pexels-photo-6585758.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/6580704/pexels-photo-6580704.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/6580700/pexels-photo-6580700.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1457844/pexels-photo-1457844.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/6580702/pexels-photo-6580702.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  bedroom: [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1616137467421-af7523e7879e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1616137467421-af7523e7879e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80',
  ],
  livingroom: [
    'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/1910488/pexels-photo-1910488.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.unsplash.com/photo-1600210492494-0946919439ea?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/5824906/pexels-photo-5824906.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/7534391/pexels-photo-7534391.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  ],
};

const POSTS = [
  // TILE (10)
  {
    category: 'tile',
    titleKey: 'tileSizeGuide',
    title: 'How to Choose the Right Tile Size for Your Space',
    titleEs: 'Cómo Elegir el Tamaño de Azulejo Correcto para Su Espacio',
    excerpt: 'Tile dimensions affect layout, grout lines, and how spacious a room feels.',
    excerptEs: 'Las dimensiones del azulejo afectan el diseño, las juntas y la sensación de amplitud.',
    paragraphs: [
      'Choosing tile size starts with the room dimensions and the look you want. Large-format tiles create fewer grout lines and can make small rooms feel more open, while smaller tiles offer more flexibility for curves, niches, and detailed patterns.',
      'For floors, consider furniture placement and sight lines from entry points. A common approach is using 12×24 or 24×24 tiles in living areas and 6×24 or mosaics in showers where slope and drainage matter.',
      'Portillo Ceramic and Tile helps homeowners and contractors select sizes that balance aesthetics, installation efficiency, and long-term durability for each project.',
    ],
    paragraphsEs: [
      'Elegir el tamaño del azulejo comienza con las dimensiones de la habitación y el aspecto deseado. Los formatos grandes crean menos juntas y pueden hacer que espacios pequeños se sientan más amplios.',
      'En pisos, considere la ubicación de muebles y las líneas visuales desde la entrada. Un enfoque común es usar azulejos 12×24 o 24×24 en áreas de estar y mosaicos en duchas donde la pendiente importa.',
      'Portillo Ceramic and Tile ayuda a seleccionar tamaños que equilibren estética, eficiencia de instalación y durabilidad.',
    ],
  },
  {
    category: 'tile',
    titleKey: 'largeFormatTile',
    title: 'Large-Format Tile: Pros and Cons for Modern Homes',
    titleEs: 'Azulejo de Formato Grande: Ventajas y Desventajas',
    excerpt: 'Oversized tiles deliver a sleek look but require expert installation.',
    excerptEs: 'Los azulejos extra grandes ofrecen un look moderno pero requieren instalación experta.',
    paragraphs: [
      'Large-format tile—often 24×48 inches or bigger—creates a clean, contemporary appearance with minimal grout. It works beautifully in open living spaces, spa-style bathrooms, and commercial lobbies.',
      'The trade-off is substrate preparation. Floors and walls must be flat within tight tolerances, and handling heavy panels requires experienced installers to avoid lippage and cracking.',
      'When prep and installation are done correctly, large-format tile offers a premium finish that holds up for years with straightforward maintenance.',
    ],
    paragraphsEs: [
      'El azulejo de formato grande crea una apariencia limpia y contemporánea con mínimas juntas. Funciona muy bien en espacios abiertos, baños tipo spa y lobbies comerciales.',
      'La contrapartida es la preparación del sustrato. Pisos y paredes deben estar nivelados, y manejar paneles pesados requiere instaladores con experiencia.',
      'Cuando la preparación e instalación son correctas, el azulejo de formato grande ofrece un acabado premium que dura años con mantenimiento sencillo.',
    ],
  },
  {
    category: 'tile',
    titleKey: 'tileLayoutPatterns',
    title: 'Tile Layout Patterns That Elevate Any Room',
    titleEs: 'Patrones de Instalación de Azulejos que Elevan Cualquier Habitación',
    excerpt: 'From herringbone to stacked bond, layout choice changes the entire feel of a space.',
    excerptEs: 'Desde espiga hasta apilado, el patrón cambia por completo la sensación del espacio.',
    paragraphs: [
      'Straight lay is classic and efficient, but diagonal, herringbone, and offset patterns add visual interest. Each pattern affects material waste, installation time, and how imperfections show.',
      'In bathrooms, running floor tile parallel to the longest wall often makes the room feel larger. Accent walls and niches are ideal spots to introduce a bolder pattern without overwhelming the space.',
      'We recommend choosing your layout early in the design phase so tile quantities, cuts, and transition strips can be planned accurately.',
    ],
    paragraphsEs: [
      'La instalación recta es clásica, pero patrones diagonales, en espiga y desplazados añaden interés visual. Cada patrón afecta el desperdicio de material y el tiempo de instalación.',
      'En baños, colocar el piso paralelo a la pared más larga suele hacer que la habitación se sienta más grande. Las paredes de acento son ideales para patrones más audaces.',
      'Recomendamos elegir el diseño temprano para planificar cantidades, cortes y perfiles de transición con precisión.',
    ],
  },
  {
    category: 'tile',
    titleKey: 'tilePeiRatings',
    title: 'Understanding Tile PEI Ratings for Floor Durability',
    titleEs: 'Entender las Clasificaciones PEI para Durabilidad del Piso',
    excerpt: 'PEI ratings tell you how much foot traffic a tile can handle.',
    excerptEs: 'Las clasificaciones PEI indican cuánto tráfico puede soportar un azulejo.',
    paragraphs: [
      'The Porcelain Enamel Institute (PEI) rating scale measures surface wear resistance. PEI 1–2 suits wall tile only, PEI 3 works for residential floors with normal traffic, and PEI 4–5 is built for heavy commercial use.',
      'Matching the rating to your space prevents premature wear. A beautiful wall tile used on a busy entryway floor may scratch or dull quickly.',
      'Our team specifies appropriate PEI-rated materials for kitchens, mudrooms, retail spaces, and facility corridors so performance matches expectations.',
    ],
    paragraphsEs: [
      'La escala PEI mide la resistencia al desgaste superficial. PEI 1–2 es solo para paredes, PEI 3 para pisos residenciales con tráfico normal, y PEI 4–5 para uso comercial intenso.',
      'Emparejar la clasificación con su espacio previene desgaste prematuro. Un azulejo de pared en una entrada concurrida puede rayarse rápidamente.',
      'Nuestro equipo especifica materiales con clasificación PEI adecuada para cocinas, pasillos comerciales y áreas de alto tráfico.',
    ],
  },
  {
    category: 'tile',
    titleKey: 'tileQuantityCalc',
    title: 'How to Calculate Tile Quantity for Your Project',
    titleEs: 'Cómo Calcular la Cantidad de Azulejos para Su Proyecto',
    excerpt: 'Accurate measurements save money and prevent mid-project delays.',
    excerptEs: 'Mediciones precisas ahorran dinero y evitan retrasos a mitad del proyecto.',
    paragraphs: [
      'Measure the length and width of each surface, subtract openings for doors and fixtures, then add 10–15% waste for cuts and future repairs. Complex patterns like herringbone may need 15–20% extra.',
      'Box coverage varies by tile size and manufacturer. Always confirm square footage per box and order from the same lot when possible to minimize shade variation.',
      'Portillo Ceramic and Tile provides quantity estimates during quote consultations based on your layout, tile size, and pattern choice.',
    ],
    paragraphsEs: [
      'Mida largo y ancho de cada superficie, reste aberturas y agregue 10–15% de desperdicio para cortes y reparaciones futuras. Patrones complejos pueden necesitar 15–20% extra.',
      'La cobertura por caja varía según tamaño y fabricante. Confirme pies cuadrados por caja y ordene del mismo lote cuando sea posible.',
      'Portillo Ceramic and Tile proporciona estimaciones de cantidad durante consultas de cotización según su diseño y patrón.',
    ],
  },
  {
    category: 'tile',
    titleKey: 'schluterWaterproofing',
    title: 'Schluter vs Traditional Waterproofing for Tile Projects',
    titleEs: 'Schluter vs Impermeabilización Tradicional para Proyectos de Azulejos',
    excerpt: 'Modern membrane systems offer reliable wet-area protection.',
    excerptEs: 'Los sistemas de membrana modernos ofrecen protección confiable en áreas húmedas.',
    paragraphs: [
      'Traditional waterproofing uses liquid-applied membranes or sheet barriers behind cement board. Schluter systems integrate prefabricated trays, drains, and banding for shower assemblies.',
      'Both approaches work when installed correctly. The best choice depends on shower shape, curb details, timeline, and whether you are renovating or building new.',
      'We evaluate each bathroom and recommend a waterproofing strategy that meets code requirements and protects the structure long-term.',
    ],
    paragraphsEs: [
      'La impermeabilización tradicional usa membranas líquidas o barreras detrás del cement board. Los sistemas Schluter integran bandejas, desagües y bandas prefabricados.',
      'Ambos enfoques funcionan cuando se instalan correctamente. La mejor opción depende de la forma de la ducha, plazos y si es renovación o construcción nueva.',
      'Evaluamos cada baño y recomendamos una estrategia que cumpla códigos y proteja la estructura a largo plazo.',
    ],
  },
  {
    category: 'tile',
    titleKey: 'groutColorGuide',
    title: 'Grout Color Selection: A Complete Guide',
    titleEs: 'Selección de Color de Lechada: Guía Completa',
    excerpt: 'Grout color can highlight or hide tile—choose wisely.',
    excerptEs: 'El color de la lechada puede resaltar u ocultar el azulejo—elija sabiamente.',
    paragraphs: [
      'Matching grout to tile creates a seamless look; contrasting grout emphasizes each tile shape and works well with geometric patterns. Light grout brightens spaces but shows stains more readily in kitchens.',
      'Epoxy grout resists staining in high-moisture areas, while cementitious grout offers more color options at a lower cost. Sealing is recommended for cement grout in wet zones.',
      'We help clients preview grout choices against sample tiles before installation so the finished result matches their vision.',
    ],
    paragraphsEs: [
      'Emparejar la lechada con el azulejo crea un look continuo; el contraste enfatiza cada forma. La lechada clara ilumina pero muestra manchas más fácilmente en cocinas.',
      'La lechada epóxica resiste manchas en áreas húmedas, mientras la cementicia ofrece más colores a menor costo. El sellado se recomienda en zonas húmedas.',
      'Ayudamos a los clientes a previsualizar opciones de lechada antes de la instalación.',
    ],
  },
  {
    category: 'tile',
    titleKey: 'tileTransitionStrips',
    title: 'Tile Transition Strips: When and How to Use Them',
    titleEs: 'Perfiles de Transición: Cuándo y Cómo Usarlos',
    excerpt: 'Clean transitions between tile and other flooring prevent tripping hazards.',
    excerptEs: 'Transiciones limpias entre azulejo y otros pisos previenen peligros de tropiezo.',
    paragraphs: [
      'Transition strips bridge height differences between tile and hardwood, carpet, or vinyl. Schluter profiles, metal strips, and marble saddles are common options depending on aesthetics and elevation change.',
      'Planning transitions during layout avoids awkward cuts at doorways. The goal is a smooth, safe edge that accommodates expansion and contraction of adjoining materials.',
      'Professional installation ensures transitions sit flush, look intentional, and meet accessibility standards where required.',
    ],
    paragraphsEs: [
      'Los perfiles de transición unen diferencias de altura entre azulejo y madera, alfombra o vinilo. Perfiles Schluter, tiras metálicas y umbrales de mármol son opciones comunes.',
      'Planificar transiciones durante el diseño evita cortes incómodos en puertas. El objetivo es un borde seguro que acomode expansión de materiales adyacentes.',
      'La instalación profesional garantiza transiciones niveladas y que cumplan estándares de accesibilidad cuando se requiera.',
    ],
  },
  {
    category: 'tile',
    titleKey: 'heatedFloorTile',
    title: 'Heated Floor Systems Under Tile',
    titleEs: 'Sistemas de Piso Radiante Bajo Azulejo',
    excerpt: 'Radiant heat adds comfort to tile floors in bathrooms and living spaces.',
    excerptEs: 'El calor radiante añade confort a pisos de azulejo en baños y salas.',
    paragraphs: [
      'Electric radiant mats install beneath tile mortar and warm the surface evenly. They are especially popular in bathrooms, mudrooms, and bedroom en-suites where cold tile is unwelcome in winter.',
      'Proper installation requires a dedicated thermostat, insulation board when needed, and careful placement around fixtures. Tile remains an excellent conductor for radiant systems.',
      'We coordinate heated floor wiring with tile layout and waterproofing so the system performs reliably for decades.',
    ],
    paragraphsEs: [
      'Las mantas radiantes eléctricas se instalan bajo el mortero del azulejo y calientan la superficie uniformemente. Son populares en baños y dormitorios con baño en suite.',
      'La instalación correcta requiere termostato dedicado, aislamiento cuando sea necesario y colocación cuidadosa alrededor de accesorios.',
      'Coordinamos el cableado del piso radiante con el diseño del azulejo e impermeabilización para un rendimiento confiable.',
    ],
  },
  {
    category: 'tile',
    titleKey: 'tileFloorMaintenance',
    title: 'Maintaining Tile Floors: Daily Care Tips',
    titleEs: 'Mantenimiento de Pisos de Azulejo: Consejos Diarios',
    excerpt: 'Simple habits keep tile and grout looking new for years.',
    excerptEs: 'Hábitos simples mantienen azulejos y lechada como nuevos por años.',
    paragraphs: [
      'Sweep or vacuum regularly to remove grit that can scratch glazed surfaces. Use pH-neutral cleaners—avoid acidic products on natural stone and harsh chemicals on grout.',
      'Place mats at entries to reduce tracked-in debris. Reseal grout in wet areas every one to two years depending on product and use.',
      'For deep cleaning or grout restoration, professional service can refresh floors without replacing tile—a cost-effective option for well-installed surfaces.',
    ],
    paragraphsEs: [
      'Barra o aspire regularmente para eliminar arena que puede rayar superficies esmaltadas. Use limpiadores de pH neutro y evite productos ácidos en piedra natural.',
      'Coloque tapetes en entradas para reducir suciedad. Reselle la lechada en áreas húmedas cada uno o dos años según el uso.',
      'Para limpieza profunda o restauración de lechada, el servicio profesional puede renovar pisos sin reemplazar azulejos.',
    ],
  },

  // CERAMIC (10)
  {
    category: 'ceramic',
    titleKey: 'ceramicVsPorcelain',
    title: 'Ceramic vs Porcelain: Which Is Right for You?',
    titleEs: 'Cerámica vs Porcelanato: ¿Cuál Es Mejor para Usted?',
    excerpt: 'Both are popular—understanding the differences helps you choose confidently.',
    excerptEs: 'Ambos son populares—entender las diferencias le ayuda a elegir con confianza.',
    paragraphs: [
      'Ceramic tile is made from clay fired at lower temperatures; porcelain is denser, fired hotter, and less porous. Porcelain handles moisture and heavy traffic better; ceramic is often more budget-friendly for walls and low-traffic floors.',
      'For shower walls and bathroom floors, porcelain is usually the safer long-term choice. Ceramic excels on backsplashes, accent walls, and decorative applications.',
      'We walk clients through samples and project requirements to match material type to each room\'s demands.',
    ],
    paragraphsEs: [
      'La cerámica se hace de arcilla a temperaturas más bajas; el porcelanato es más denso y menos poroso. El porcelanato maneja mejor humedad y tráfico; la cerámica suele ser más económica para paredes.',
      'Para paredes de ducha y pisos de baño, el porcelanato suele ser la opción más segura a largo plazo. La cerámica destaca en backsplashes y acentos.',
      'Guiamos a los clientes a través de muestras para emparejar el material con las demandas de cada habitación.',
    ],
  },
  {
    category: 'ceramic',
    titleKey: 'glazedUnglazedCeramic',
    title: 'Glazed vs Unglazed Ceramic Tile Explained',
    titleEs: 'Azulejo Cerámico Esmaltado vs No Esmaltado',
    excerpt: 'The surface finish affects durability, slip resistance, and maintenance.',
    excerptEs: 'El acabado superficial afecta durabilidad, resistencia al resbalón y mantenimiento.',
    paragraphs: [
      'Glazed ceramic has a glass-like coating that resists stains and comes in endless colors and patterns. Unglazed tile is through-body color, often more slip-resistant but requires sealing in some applications.',
      'Glazed tile is ideal for kitchen backsplashes and bathroom walls. Unglazed quarry tile suits mudrooms and commercial kitchens where traction matters.',
      'Understanding finish type helps you set realistic maintenance expectations from day one.',
    ],
    paragraphsEs: [
      'La cerámica esmaltada tiene un recubrimiento que resiste manchas y viene en infinitos colores. La no esmaltada tiene color en todo el cuerpo, a menudo más antideslizante pero requiere sellado.',
      'La cerámica esmaltada es ideal para backsplashes y paredes de baño. El quarry tile no esmaltado sirve para mudrooms y cocinas comerciales.',
      'Entender el tipo de acabado ayuda a establecer expectativas de mantenimiento desde el primer día.',
    ],
  },
  {
    category: 'ceramic',
    titleKey: 'ceramicKitchenBacksplash',
    title: 'Best Ceramic Tile for Kitchen Backsplashes',
    titleEs: 'Mejor Azulejo Cerámico para Backsplash de Cocina',
    excerpt: 'Backsplashes need style and easy cleanup behind the cooktop.',
    excerptEs: 'Los backsplashes necesitan estilo y limpieza fácil detrás de la cocina.',
    paragraphs: [
      'Ceramic subway tile remains a timeless backsplash choice. Gloss and satin finishes wipe clean easily; textured tiles add character but may need more attention near splatter zones.',
      'Consider running tile to the ceiling behind the range for a dramatic effect, or stop at cabinet height for a classic look. Outlet cuts and edge trim should be planned before ordering.',
      'We install kitchen backsplashes with precise cuts around cabinets, windows, and fixtures for a polished, durable result.',
    ],
    paragraphsEs: [
      'El azulejo subway cerámico sigue siendo una opción clásica para backsplash. Los acabados satinados se limpian fácilmente; los texturizados añaden carácter pero requieren más atención.',
      'Considere llevar el azulejo hasta el techo detrás de la estufa para un efecto dramático, o detenerse a la altura de gabinetes para un look clásico.',
      'Instalamos backsplashes con cortes precisos alrededor de gabinetes, ventanas y accesorios.',
    ],
  },
  {
    category: 'ceramic',
    titleKey: 'ceramicHighMoisture',
    title: 'Ceramic Tile in High-Moisture Areas',
    titleEs: 'Azulejo Cerámico en Áreas de Alta Humedad',
    excerpt: 'Not all ceramic tile belongs in wet zones—know the limits.',
    excerptEs: 'No todo azulejo cerámico va en zonas húmedas—conozca los límites.',
    paragraphs: [
      'Wall-grade ceramic works well in shower surrounds when paired with proper waterproofing behind the tile. Floor-grade ceramic in wet areas should meet slip-resistance and absorption standards.',
      'Porcelain often outperforms standard ceramic in steam showers and pool surrounds. If you prefer ceramic aesthetics, select vitreous or impervious ratings for moisture exposure.',
      'Waterproofing—not the tile face alone—protects your home. Never skip membrane systems in showers and tub surrounds.',
    ],
    paragraphsEs: [
      'La cerámica para pared funciona bien en duchas cuando se combina con impermeabilización adecuada. La cerámica para piso en áreas húmedas debe cumplir estándares de absorción.',
      'El porcelanato a menudo supera a la cerámica estándar en duchas de vapor. Si prefiere estética cerámica, seleccione clasificaciones vitreous o impervious.',
      'La impermeabilización—no solo la cara del azulejo—protege su hogar. Nunca omita membranas en duchas.',
    ],
  },
  {
    category: 'ceramic',
    titleKey: 'handcraftedCeramic',
    title: 'Handcrafted Ceramic Tile: Artisan Options',
    titleEs: 'Azulejo Cerámico Artesanal: Opciones Únicas',
    excerpt: 'Artisan tile adds character through variation and texture.',
    excerptEs: 'El azulejo artesanal añade carácter con variación y textura.',
    paragraphs: [
      'Handmade ceramic tiles feature subtle size variation, rich glazes, and organic edges. They suit feature walls, fireplace surrounds, and boutique commercial spaces seeking a custom feel.',
      'Expect longer lead times and slightly higher waste factors. Installers should dry-layout batches to blend tone variation evenly across the surface.',
      'Artisan tile rewards careful planning—the result is a one-of-a-kind surface that mass-produced tile cannot replicate.',
    ],
    paragraphsEs: [
      'Los azulejos hechos a mano tienen variación sutil de tamaño, esmaltes ricos y bordes orgánicos. Sirven para paredes de acento, chimeneas y espacios comerciales boutique.',
      'Espere tiempos de entrega más largos y mayor factor de desperdicio. Los instaladores deben secar diseños para mezclar variación de tono.',
      'El azulejo artesanal recompensa la planificación cuidadosa con una superficie única.',
    ],
  },
  {
    category: 'ceramic',
    titleKey: 'ceramicGroutSealant',
    title: 'Ceramic Tile Grout and Sealant Best Practices',
    titleEs: 'Mejores Prácticas de Lechada y Sellador para Cerámica',
    excerpt: 'Proper grout and sealing extend the life of ceramic installations.',
    excerptEs: 'Lechada y sellado adecuados prolongan la vida de instalaciones cerámicas.',
    paragraphs: [
      'Allow tile adhesive to cure fully before grouting—typically 24 hours. Use sanded grout for joints wider than 1/8 inch and unsanded for narrow joints on walls.',
      'Seal cementitious grout in kitchens and baths after it cures. Epoxy grout needs no sealer but demands faster cleanup during application.',
      'Routine resealing and gentle cleaning keep ceramic surfaces looking fresh without harsh abrasion.',
    ],
    paragraphsEs: [
      'Deje curar el adhesivo completamente antes de lechada—típicamente 24 horas. Use lechada arenosa para juntas mayores a 1/8 pulgada.',
      'Selle lechada cementicia en cocinas y baños después de curar. La lechada epóxica no necesita sellador pero requiere limpieza rápida.',
      'El resellado rutinario y limpieza suave mantienen las superficies cerámicas frescas.',
    ],
  },
  {
    category: 'ceramic',
    titleKey: 'ecoFriendlyCeramic',
    title: 'Eco-Friendly Ceramic Tile Options',
    titleEs: 'Opciones Ecológicas de Azulejo Cerámico',
    excerpt: 'Sustainable tile choices support greener renovation projects.',
    excerptEs: 'Opciones de azulejo sostenible apoyan renovaciones más verdes.',
    paragraphs: [
      'Many manufacturers now offer ceramic tile with recycled content and low-VOC adhesives. Locally sourced materials can reduce shipping impact for regional projects.',
      'Durability itself is sustainable—tile that lasts decades avoids repeated replacement waste. Long-life installations paired with efficient layouts minimize environmental footprint.',
      'Ask about certifications and material sourcing when selecting tile for LEED or green-building goals.',
    ],
    paragraphsEs: [
      'Muchos fabricantes ofrecen azulejo cerámico con contenido reciclado y adhesivos de bajo VOC. Materiales de origen local reducen el impacto de transporte.',
      'La durabilidad misma es sostenible—azulejo que dura décadas evita desperdicio de reemplazo repetido.',
      'Pregunte sobre certificaciones y origen de materiales para objetivos de construcción verde.',
    ],
  },
  {
    category: 'ceramic',
    titleKey: 'ceramicFireplaceSurround',
    title: 'Ceramic Tile for Fireplace Surrounds',
    titleEs: 'Azulejo Cerámico para Revestimiento de Chimenea',
    excerpt: 'Fireplace surrounds need heat-tolerant materials and bold design.',
    excerptEs: 'Los revestimientos de chimenea necesitan materiales resistentes al calor y diseño audaz.',
    paragraphs: [
      'Ceramic and porcelain tile can surround fireplaces when rated for temperature exposure. Check manufacturer specs for clearance to combustion zones and use appropriate backer board.',
      'From floor-to-ceiling slabs to mosaic herringbone, tile transforms a fireplace into a living room focal point. Coordinate with mantel height and TV placement if applicable.',
      'We install fireplace tile with expansion joints and heat-compatible materials for safe, striking results.',
    ],
    paragraphsEs: [
      'El azulejo cerámico y porcelanato puede rodear chimeneas cuando está clasificado para exposición a temperatura. Verifique especificaciones del fabricante.',
      'Desde losas de piso a techo hasta mosaicos en espiga, el azulejo transforma una chimenea en punto focal de la sala.',
      'Instalamos azulejo de chimenea con juntas de expansión y materiales compatibles con calor.',
    ],
  },
  {
    category: 'ceramic',
    titleKey: 'repairCrackedCeramic',
    title: 'Repairing Cracked Ceramic Tile',
    titleEs: 'Reparación de Azulejo Cerámico Agrietado',
    excerpt: 'Some cracks can be repaired; others signal deeper issues.',
    excerptEs: 'Algunas grietas se pueden reparar; otras señalan problemas más profundos.',
    paragraphs: [
      'Hairline cracks in a single tile may be filled with color-matched epoxy. If the crack runs across multiple tiles or the tile sounds hollow, substrate movement or moisture may be the cause.',
      'Replacing one or two tiles is feasible when matching tile is available. Hidden damage behind the surface warrants a professional inspection before cosmetic fixes.',
      'We assess cracked tile to determine whether repair, partial replacement, or full renovation is the most cost-effective path.',
    ],
    paragraphsEs: [
      'Grietas finas en un solo azulejo pueden rellenarse con epóxi del mismo color. Si la grieta cruza varios azulejos o suena hueco, puede haber movimiento del sustrato o humedad.',
      'Reemplazar uno o dos azulejos es factible cuando hay material disponible. Daño oculto requiere inspección profesional.',
      'Evaluamos azulejos agrietados para determinar si reparación, reemplazo parcial o renovación completa es más costo-efectivo.',
    ],
  },
  {
    category: 'ceramic',
    titleKey: 'ceramicTrends2026',
    title: 'Ceramic Tile Trends for 2026',
    titleEs: 'Tendencias de Azulejo Cerámico para 2026',
    excerpt: 'Warm tones, textured surfaces, and zellige-inspired looks lead the way.',
    excerptEs: 'Tonos cálidos, superficies texturizadas y looks inspirados en zellige lideran.',
    paragraphs: [
      'Homeowners are gravitating toward warm terracotta tones, soft matte finishes, and handmade-look ceramics. Large slabs with stone visuals remain popular for minimal grout lines.',
      'Biophilic design influences bring earthy palettes into bathrooms and living spaces. Mixed-format installations combine mosaics with field tile for visual depth.',
      'Trends come and go, but quality installation ensures any style performs beautifully for years.',
    ],
    paragraphsEs: [
      'Los propietarios gravitan hacia tonos terracota cálidos, acabados mate suaves y cerámicas de aspecto artesanal. Losas grandes con visual de piedra siguen populares.',
      'El diseño biofílico trae paletas terrosas a baños y salas. Instalaciones de formato mixto combinan mosaicos con azulejo de campo.',
      'Las tendencias van y vienen, pero la instalación de calidad garantiza que cualquier estilo funcione por años.',
    ],
  },

  // BATHROOM (10)
  {
    category: 'bathroom',
    titleKey: 'masterBathPlanning',
    title: 'Master Bathroom Renovation Planning Guide',
    titleEs: 'Guía de Planificación para Renovación de Baño Principal',
    excerpt: 'A clear plan keeps bathroom remodels on budget and on schedule.',
    excerptEs: 'Un plan claro mantiene remodelaciones de baño en presupuesto y plazo.',
    paragraphs: [
      'Start with how you use the space: dual vanities, walk-in showers, soaking tubs, and storage needs drive layout. Measure existing plumbing locations—moving drains adds cost.',
      'Select tile early; lead times vary. Waterproofing, electrical (lighting, heated floors), and ventilation should be scoped before demolition begins.',
      'Phased planning with a tile contractor prevents surprises and delivers a cohesive master bath built for daily comfort.',
    ],
    paragraphsEs: [
      'Comience con cómo usa el espacio: lavabos dobles, duchas walk-in, tinas y almacenamiento impulsan el diseño. Mida ubicaciones de plomería existentes.',
      'Seleccione azulejo temprano; los tiempos de entrega varían. Impermeabilización, eléctrica y ventilación deben planificarse antes de demolición.',
      'La planificación por fases con un contratista de azulejos previene sorpresas y entrega un baño principal cohesivo.',
    ],
  },
  {
    category: 'bathroom',
    titleKey: 'walkInShowerDesign',
    title: 'Walk-In Shower Design Ideas',
    titleEs: 'Ideas de Diseño para Duchas Walk-In',
    excerpt: 'Curbless, corner, and spa-style showers expand design possibilities.',
    excerptEs: 'Duchas sin bordillo, de esquina y tipo spa expanden posibilidades de diseño.',
    paragraphs: [
      'Curbless showers create seamless floor transitions and accessibility. Linear drains allow single-slope floors with large-format wall tile. Frameless glass keeps sight lines open.',
      'Built-in niches, benches, and handheld shower sets add function. Consider lighting niches and contrasting accent bands for visual interest.',
      'Proper slope, waterproofing, and drain placement are non-negotiable—we engineer shower assemblies that look custom and perform reliably.',
    ],
    paragraphsEs: [
      'Las duchas sin bordillo crean transiciones de piso continuas y accesibilidad. Desagües lineales permiten pendiente única con azulejo de formato grande.',
      'Nichos integrados, bancos y duchas de mano añaden función. Considere iluminación en nichos y bandas de acento contrastantes.',
      'Pendiente, impermeabilización y ubicación de desagüe son innegociables—diseñamos duchas que se ven personalizadas y funcionan confiablemente.',
    ],
  },
  {
    category: 'bathroom',
    titleKey: 'smallBathroomTile',
    title: 'Small Bathroom Tile Tricks to Maximize Space',
    titleEs: 'Trucos de Azulejo para Maximizar Baños Pequeños',
    excerpt: 'Smart tile choices make compact bathrooms feel larger.',
    excerptEs: 'Elecciones inteligentes de azulejo hacen que baños compactos se sientan más grandes.',
    paragraphs: [
      'Run floor tile diagonally or use large-format tile with minimal grout to reduce visual clutter. Light colors reflect more light; glossy wall tile can brighten windowless baths.',
      'Extend the same tile from floor to shower walls for continuity. Floating vanities and wall-mounted fixtures free floor space visually.',
      'Every inch counts in small baths—precise tile layout and thoughtful material selection create a spacious feel without adding square footage.',
    ],
    paragraphsEs: [
      'Coloque el piso en diagonal o use formato grande con mínimas juntas para reducir desorden visual. Colores claros reflejan más luz.',
      'Extienda el mismo azulejo del piso a paredes de ducha para continuidad. Vanidades flotantes liberan espacio visual.',
      'Cada pulgada cuenta en baños pequeños—diseño preciso y selección de materiales crean sensación de amplitud.',
    ],
  },
  {
    category: 'bathroom',
    titleKey: 'vanityBacksplashIdeas',
    title: 'Bathroom Vanity Backsplash Ideas',
    titleEs: 'Ideas de Backsplash para Vanidad de Baño',
    excerpt: 'A vanity backsplash protects walls and adds personality.',
    excerptEs: 'Un backsplash de vanidad protege paredes y añade personalidad.',
    paragraphs: [
      'Extend tile from the counter to the mirror or bottom of the medicine cabinet. Subway, pencil mosaic, and slab backsplashes each create a different mood.',
      'Coordinate backsplash tile with floor and shower materials for harmony, or use a contrasting accent to frame the vanity as a feature.',
      'We install vanity backsplashes with clean edge profiles and sealed joints to handle daily splashes and cleaning.',
    ],
    paragraphsEs: [
      'Extienda azulejo desde el mostrador hasta el espejo o gabinete de medicina. Subway, mosaico lápiz y losas crean ambientes diferentes.',
      'Coordine backsplash con materiales de piso y ducha, o use un acento contrastante para enmarcar la vanidad.',
      'Instalamos backsplashes con perfiles limpios y juntas selladas para salpicaduras diarias.',
    ],
  },
  {
    category: 'bathroom',
    titleKey: 'tubToShowerConversion',
    title: 'Tub-to-Shower Conversion: What to Know',
    titleEs: 'Conversión de Tina a Ducha: Lo Que Debe Saber',
    excerpt: 'Replacing a tub with a shower is one of the most requested bathroom upgrades.',
    excerptEs: 'Reemplazar una tina por ducha es una de las mejoras de baño más solicitadas.',
    paragraphs: [
      'Conversions free floor space and improve accessibility. The existing drain location often dictates shower size; moving plumbing increases scope and cost.',
      'Full waterproofing, a properly sloped base, and quality glass or curtain enclosure complete the system. Tile selection should prioritize slip resistance on the floor.',
      'Most conversions take one to three weeks depending on customization, permits, and material lead times.',
    ],
    paragraphsEs: [
      'Las conversiones liberan espacio y mejoran accesibilidad. La ubicación del desagüe existente a menudo dicta el tamaño de la ducha.',
      'Impermeabilización completa, base con pendiente adecuada y mampara de calidad completan el sistema.',
      'La mayoría de conversiones toman una a tres semanas según personalización y tiempos de materiales.',
    ],
  },
  {
    category: 'bathroom',
    titleKey: 'bathroomFloorSlip',
    title: 'Bathroom Floor Tile: Slip Resistance Matters',
    titleEs: 'Piso de Baño: La Resistencia al Resbalón Importa',
    excerpt: 'Wet floors need tile rated for safety and performance.',
    excerptEs: 'Pisos mojados necesitan azulejo clasificado para seguridad y rendimiento.',
    paragraphs: [
      'Look for DCOF (Dynamic Coefficient of Friction) ratings of 0.42 or higher for wet-area floors. Textured porcelain and matte finishes generally offer better traction than polished stone.',
      'Smaller tiles with more grout lines can add grip but require more cleaning. Test samples wet when possible before finalizing your choice.',
      'Safety and aesthetics can coexist—we specify floor tile that meets traction needs without sacrificing style.',
    ],
    paragraphsEs: [
      'Busque clasificaciones DCOF de 0.42 o superior para pisos en áreas húmedas. Porcelanato texturizado y acabados mate ofrecen mejor tracción.',
      'Azulejos más pequeños con más juntas pueden añadir agarre pero requieren más limpieza. Pruebe muestras mojadas cuando sea posible.',
      'Seguridad y estética pueden coexistir—especificamos piso que cumple necesidades de tracción sin sacrificar estilo.',
    ],
  },
  {
    category: 'bathroom',
    titleKey: 'showerNicheBench',
    title: 'Niche and Bench Ideas for Shower Tile',
    titleEs: 'Ideas de Nicho y Banco para Azulejo de Ducha',
    excerpt: 'Built-in features add storage and comfort to shower designs.',
    excerptEs: 'Elementos integrados añaden almacenamiento y confort al diseño de duchas.',
    paragraphs: [
      'Recessed niches hold shampoo and soap without cluttering the shower floor. Size niches to fit tallest bottles and slope the sill slightly for drainage.',
      'Floating benches suit walk-in showers and aging-in-place design. Tile the bench with the same waterproofing system as walls and floors.',
      'Planning niches and benches during layout avoids awkward cuts and ensures cohesive grout lines across the shower.',
    ],
    paragraphsEs: [
      'Nichos empotrados guardan shampoo sin desordenar el piso de la ducha. Tamaño nichos para botellas más altas y incline el alféizar ligeramente.',
      'Bancos flotantes sirven para duchas walk-in y diseño para envejecer en casa. Azuleje el banco con el mismo sistema de impermeabilización.',
      'Planificar nichos y bancos durante el diseño evita cortes incómodos y garantiza juntas cohesivas.',
    ],
  },
  {
    category: 'bathroom',
    titleKey: 'bathroomLightingTile',
    title: 'Bathroom Lighting and Tile Color Coordination',
    titleEs: 'Coordinación de Iluminación y Color de Azulejo en Baños',
    excerpt: 'Lighting changes how tile color reads—plan both together.',
    excerptEs: 'La iluminación cambia cómo se ve el color del azulejo—planifique ambos juntos.',
    paragraphs: [
      'Warm LED lighting complements beige and terracotta tile; cool light enhances gray and white palettes. View tile samples in your bathroom lighting before ordering.',
      'Accent lighting in niches and under floating vanities highlights tile texture. Natural light from windows affects how dark tile reads throughout the day.',
      'Coordinated design between electrician and tile installer prevents rework and delivers the ambiance you expect.',
    ],
    paragraphsEs: [
      'Iluminación LED cálida complementa azulejos beige y terracota; luz fría realza paletas grises y blancas. Vea muestras en la iluminación de su baño.',
      'Iluminación de acento en nichos y bajo vanidades flotantes resalta textura del azulejo.',
      'Diseño coordinado entre electricista e instalador de azulejos previene retrabajo y entrega la ambientación esperada.',
    ],
  },
  {
    category: 'bathroom',
    titleKey: 'guestBathBudget',
    title: 'Guest Bathroom Refresh on a Budget',
    titleEs: 'Actualización de Baño de Visitas con Presupuesto Limitado',
    excerpt: 'Strategic tile updates transform guest baths without full gut renovations.',
    excerptEs: 'Actualizaciones estratégicas de azulejo transforman baños de visitas sin demolición total.',
    paragraphs: [
      'Focus impact where guests notice most: new floor tile, a fresh vanity backsplash, updated fixtures, and paint. Keeping existing layout saves plumbing costs.',
      'Standard-size tile and simple patterns reduce labor. Prefabricated shower surrounds can pair with custom tile accents for a upgraded look.',
      'Even modest budgets achieve noticeable improvement when material and labor are prioritized on high-visibility surfaces.',
    ],
    paragraphsEs: [
      'Enfóquese donde los visitantes más notan: piso nuevo, backsplash fresco, accesorios actualizados y pintura. Mantener diseño existente ahorra plomería.',
      'Azulejo de tamaño estándar y patrones simples reducen mano de obra.',
      'Incluso presupuestos modestos logran mejora notable cuando se priorizan superficies de alta visibilidad.',
    ],
  },
  {
    category: 'bathroom',
    titleKey: 'adaBathroomTile',
    title: 'ADA-Compliant Bathroom Tile Layout',
    titleEs: 'Diseño de Azulejo de Baño Compatible con ADA',
    excerpt: 'Accessible bathrooms require thoughtful layout and slip-resistant surfaces.',
    excerptEs: 'Baños accesibles requieren diseño cuidadoso y superficies antideslizantes.',
    paragraphs: [
      'Turning radius, grab bar blocking, and curbless shower thresholds must be planned before tile installation. Blocking goes in walls during framing—not after tile is set.',
      'Slip-resistant floor tile and contrast at transitions help users with visual impairments. Controls and fixtures should be reachable from seated and standing positions.',
      'Commercial and residential accessible baths benefit from installers familiar with ADA guidelines and local code requirements.',
    ],
    paragraphsEs: [
      'Radio de giro, bloques para barras de apoyo y umbrales sin bordillo deben planificarse antes de instalar azulejo.',
      'Piso antideslizante y contraste en transiciones ayudan a usuarios con discapacidad visual.',
      'Baños accesibles comerciales y residenciales se benefician de instaladores familiarizados con guías ADA y códigos locales.',
    ],
  },

  // BEDROOM (10)
  {
    category: 'bedroom',
    titleKey: 'bedroomFlooringOptions',
    title: 'Bedroom Flooring: Tile vs Hardwood vs Carpet',
    titleEs: 'Piso de Dormitorio: Azulejo vs Madera vs Alfombra',
    excerpt: 'Each flooring type suits different lifestyles and climates.',
    excerptEs: 'Cada tipo de piso se adapta a diferentes estilos de vida y climas.',
    paragraphs: [
      'Tile in bedrooms is growing in warm climates and modern designs—especially with radiant heat. It is hypoallergenic, easy to clean, and pairs with area rugs for softness.',
      'Hardwood adds warmth and resale appeal; carpet muffles sound and feels cozy underfoot. Tile excels in en-suite bedrooms where moisture from baths is a concern.',
      'Your lifestyle, HVAC, and design goals determine the best fit—we help clients weigh options for master and guest bedrooms.',
    ],
    paragraphsEs: [
      'El azulejo en dormitorios crece en climas cálidos y diseños modernos—especialmente con calor radiante. Es hipoalergénico y fácil de limpiar.',
      'La madera añade calidez; la alfombra amortigua sonido. El azulejo destaca en dormitorios con baño en suite donde la humedad es preocupación.',
      'Su estilo de vida y objetivos de diseño determinan la mejor opción.',
    ],
  },
  {
    category: 'bedroom',
    titleKey: 'calmBedroomTile',
    title: 'Creating a Calm Bedroom with Neutral Tile Accents',
    titleEs: 'Creando un Dormitorio Tranquilo con Acentos de Azulejo Neutro',
    excerpt: 'Neutral tile tones support restful bedroom environments.',
    excerptEs: 'Tonos neutros de azulejo apoyan ambientes de dormitorio descansados.',
    paragraphs: [
      'Soft gray, warm white, and sand-tone tile create serenity on fireplace surrounds, accent walls, and en-suite bathroom transitions. Matte finishes reduce glare in morning light.',
      'Limit bold pattern to one surface—perhaps a headboard wall—while keeping floors and adjacent walls subdued. Natural textures add interest without visual noise.',
      'Calm bedrooms start with a restrained palette executed with precise tile craftsmanship.',
    ],
    paragraphsEs: [
      'Gris suave, blanco cálido y tonos arena crean serenidad en chimeneas, paredes de acento y transiciones a baño en suite.',
      'Limite patrones audaces a una superficie mientras mantiene pisos y paredes adyacentes sobrios.',
      'Dormitorios tranquilos comienzan con una paleta contenida ejecutada con artesanía precisa.',
    ],
  },
  {
    category: 'bedroom',
    titleKey: 'bedroomAccentWall',
    title: 'Bedroom Accent Wall Tile Ideas',
    titleEs: 'Ideas de Pared de Acento con Azulejo en Dormitorio',
    excerpt: 'A tiled accent wall adds depth behind the bed or fireplace.',
    excerptEs: 'Una pared de acento con azulejo añade profundidad detrás de la cama o chimenea.',
    paragraphs: [
      'Large-format slabs, vertical subway stacks, and textured ceramic panels all work behind a bed frame. Consider outlet and switch placement before finalizing layout.',
      'Accent walls need proper backer and adhesive for vertical weight. Floor-to-ceiling tile makes low ceilings feel taller when grout lines run vertically.',
      'We install bedroom feature walls with laser-level precision for a furniture-quality finish.',
    ],
    paragraphsEs: [
      'Losas de formato grande, subway vertical y paneles cerámicos texturizados funcionan detrás de la cama. Considere ubicación de tomacorrientes.',
      'Paredes de acento necesitan respaldo y adhesivo adecuados para peso vertical.',
      'Instalamos paredes destacadas con precisión de nivel láser para un acabado de calidad mueble.',
    ],
  },
  {
    category: 'bedroom',
    titleKey: 'ensuiteCoordination',
    title: 'En-Suite Bedroom Bathroom Coordination',
    titleEs: 'Coordinación de Baño En Suite con Dormitorio',
    excerpt: 'Matching tile between bedroom and en-suite creates a unified retreat.',
    excerptEs: 'Emparejar azulejo entre dormitorio y baño en suite crea un retiro unificado.',
    paragraphs: [
      'Carry floor tile from the bedroom into the bath threshold for flow, or use a complementary palette that shares undertones. Consistent grout color ties spaces together.',
      'Sliding barn doors, pocket doors, and open transitions each change how tile should meet at the doorway. Plan transitions before ordering materials.',
      'Coordinated en-suites feel like boutique hotels—details matter at every threshold and corner.',
    ],
    paragraphsEs: [
      'Lleve piso del dormitorio al umbral del baño para fluidez, o use paleta complementaria con matices compartidos.',
      'Puertas correderas y transiciones abiertas cambian cómo el azulejo debe encontrarse en la puerta.',
      'Baños en suite coordinados se sienten como hoteles boutique—los detalles importan en cada umbral.',
    ],
  },
  {
    category: 'bedroom',
    titleKey: 'bedroomFireplaceTile',
    title: 'Tile Fireplace Surrounds in Master Bedrooms',
    titleEs: 'Revestimientos de Chimenea con Azulejo en Dormitorios Principales',
    excerpt: 'A tiled fireplace anchors the master bedroom as a luxury focal point.',
    excerptEs: 'Una chimenea con azulejo ancla el dormitorio principal como punto focal de lujo.',
    paragraphs: [
      'Floor-to-ceiling tile around a bedroom fireplace creates drama. Marble-look porcelain, zellige, and elongated subway tile are popular choices for residential retreats.',
      'Heat clearance and mantel proportions should guide tile layout. Integrate TV cabling and hearth details during planning.',
      'A well-tiled bedroom fireplace elevates the entire room and adds lasting value to the home.',
    ],
    paragraphsEs: [
      'Azulejo de piso a techo alrededor de chimenea de dormitorio crea drama. Porcelanato tipo mármol y subway alargado son opciones populares.',
      'Distancia al calor y proporciones de repisa deben guiar el diseño del azulejo.',
      'Una chimenea bien azulejada eleva toda la habitación y añade valor duradero.',
    ],
  },
  {
    category: 'bedroom',
    titleKey: 'closetFloorTile',
    title: 'Bedroom Closet Floor Tile Solutions',
    titleEs: 'Soluciones de Piso de Azulejo para Closets de Dormitorio',
    excerpt: 'Tile in walk-in closets handles moisture and cleaning with ease.',
    excerptEs: 'Azulejo en walk-in closets maneja humedad y limpieza con facilidad.',
    paragraphs: [
      'Walk-in closets adjacent to en-suite baths benefit from tile floors that handle damp feet and resist mold. Small-format tile or LVP alternatives each have trade-offs.',
      'Heated closet floors are a luxury touch in cold climates. Ensure transitions to bedroom carpet or hardwood are flush and attractive.',
      'Closet flooring is often overlooked—tile delivers durability where daily traffic concentrates.',
    ],
    paragraphsEs: [
      'Walk-in closets junto a baños en suite se benefician de pisos de azulejo que resisten pies húmedos y moho.',
      'Pisos radiantes en closets son un lujo en climas fríos. Asegure transiciones niveladas con alfombra o madera.',
      'El piso del closet a menudo se pasa por alto—el azulejo ofrece durabilidad donde se concentra el tráfico diario.',
    ],
  },
  {
    category: 'bedroom',
    titleKey: 'bedroomSoundproofing',
    title: 'Soundproofing Considerations with Tile Floors',
    titleEs: 'Consideraciones de Insonorización con Pisos de Azulejo',
    excerpt: 'Hard tile surfaces reflect sound—plan accordingly in bedrooms.',
    excerptEs: 'Superficies duras de azulejo reflejan sonido—planifique en consecuencia en dormitorios.',
    paragraphs: [
      'Tile over concrete transmits less sound than tile over wood joists. Underlayment, crack isolation membranes, and area rugs reduce footfall noise in upper-level bedrooms.',
      'Bedrooms above living spaces may need sound mats beneath tile. Discuss STC ratings with your builder when bedroom tile is part of a multi-story renovation.',
      'Combining tile durability with soft furnishings achieves practical, peaceful bedroom environments.',
    ],
    paragraphsEs: [
      'Azulejo sobre concreto transmite menos sonido que sobre vigas de madera. Subcapas y alfombras reducen ruido de pasos en dormitorios de niveles superiores.',
      'Dormitorios sobre salas pueden necesitar colchonetas acústicas bajo azulejo.',
      'Combinar durabilidad del azulejo con muebles suaves logra dormitorios prácticos y tranquilos.',
    ],
  },
  {
    category: 'bedroom',
    titleKey: 'radiantBedroom',
    title: 'Warm Underfoot: Radiant Heat in Bedrooms',
    titleEs: 'Calor Bajo los Pies: Calefacción Radiante en Dormitorios',
    excerpt: 'Radiant floor heat makes bedroom tile comfortable year-round.',
    excerptEs: 'Piso radiante hace cómodo el azulejo de dormitorio todo el año.',
    paragraphs: [
      'Electric radiant mats under bedroom tile eliminate cold morning floors. Programmable thermostats warm the room before wake-up and reduce energy use overnight.',
      'Tile conducts heat efficiently—better than carpet over the same system. Pair with lightweight area rugs that can be removed in summer if desired.',
      'Installation requires coordination between electrician and tile setter for a seamless, safe assembly.',
    ],
    paragraphsEs: [
      'Mantas radiantes eléctricas bajo azulejo de dormitorio eliminan pisos fríos por la mañana. Termostatos programables calientan antes de despertar.',
      'El azulejo conduce calor eficientemente—mejor que alfombra sobre el mismo sistema.',
      'La instalación requiere coordinación entre electricista y colocador de azulejos.',
    ],
  },
  {
    category: 'bedroom',
    titleKey: 'minimalistBedroomTile',
    title: 'Minimalist Bedroom Design with Large-Format Tile',
    titleEs: 'Diseño Minimalista de Dormitorio con Azulejo de Formato Grande',
    excerpt: 'Minimalism pairs naturally with large tile and clean grout lines.',
    excerptEs: 'El minimalismo combina naturalmente con azulejo grande y juntas limpias.',
    paragraphs: [
      'Large-format tile on bedroom floors and accent walls reduces visual fragmentation. Stick to two or three materials max—tile, wood, and one textile—for cohesion.',
      'Hidden storage, flush transitions, and neutral palettes reinforce minimalist calm. Less grout means easier maintenance in low-clutter spaces.',
      'Minimalist bedrooms depend on flawless installation—every edge and joint is visible.',
    ],
    paragraphsEs: [
      'Azulejo de formato grande en pisos y paredes de acento reduce fragmentación visual. Limítese a dos o tres materiales máximo.',
      'Almacenamiento oculto, transiciones niveladas y paletas neutras refuerzan calma minimalista.',
      'Dormitorios minimalistas dependen de instalación impecable—cada borde y junta es visible.',
    ],
  },
  {
    category: 'bedroom',
    titleKey: 'bedroomRenovationTimeline',
    title: 'Bedroom Renovation Timeline and Budget Tips',
    titleEs: 'Plazos y Consejos de Presupuesto para Renovación de Dormitorio',
    excerpt: 'Plan bedroom tile work alongside flooring, paint, and electrical.',
    excerptEs: 'Planifique trabajo de azulejo junto con piso, pintura y eléctrica.',
    paragraphs: [
      'Bedroom renovations with en-suite tile often span two to five weeks. Sequence matters: demo, plumbing/electrical rough-in, tile in bath, bedroom flooring, then paint and trim.',
      'Budget 40–60% for labor when tile is involved; materials vary widely by stone vs porcelain vs ceramic. Contingency of 10–15% covers hidden issues in older homes.',
      'A written scope and phased schedule from your tile contractor keeps bedroom projects predictable and stress-free.',
    ],
    paragraphsEs: [
      'Renovaciones de dormitorio con azulejo en suite suelen tomar dos a cinco semanas. La secuencia importa: demo, plomería/eléctrica, azulejo en baño, piso, pintura.',
      'Presupueste 40–60% para mano de obra cuando hay azulejo; materiales varían ampliamente. Contingencia de 10–15% cubre problemas ocultos.',
      'Un alcance escrito y cronograma por fases mantiene proyectos predecibles y sin estrés.',
    ],
  },

  // LIVING ROOM (10)
  {
    category: 'livingroom',
    titleKey: 'openConceptLivingTile',
    title: 'Open-Concept Living Room Tile Flooring',
    titleEs: 'Piso de Azulejo en Sala de Concepto Abierto',
    excerpt: 'Continuous tile flooring unifies kitchen, dining, and living areas.',
    excerptEs: 'Piso de azulejo continuo unifica cocina, comedor y sala.',
    paragraphs: [
      'Open floor plans benefit from one flooring material flowing through multiple zones. Large-format porcelain mimics stone while handling heavy foot traffic and pet activity.',
      'Expansion joints at large spans and doorways accommodate building movement. Color continuity makes spaces feel larger; area rugs define seating zones without breaking the floor.',
      'We plan open-concept layouts with proper expansion, transitions at exterior doors, and level alignment with adjacent rooms.',
    ],
    paragraphsEs: [
      'Planos abiertos se benefician de un material de piso fluyendo por múltiples zonas. Porcelanato de formato grande imita piedra y maneja tráfico pesado.',
      'Juntas de expansión en vanos grandes acomodan movimiento del edificio. Continuidad de color hace espacios más grandes.',
      'Planificamos diseños abiertos con expansión adecuada y transiciones en puertas exteriores.',
    ],
  },
  {
    category: 'livingroom',
    titleKey: 'livingFeatureWall',
    title: 'Living Room Feature Wall Tile Designs',
    titleEs: 'Diseños de Pared Destacada con Azulejo en Sala',
    excerpt: 'Feature walls anchor open living rooms with texture and color.',
    excerptEs: 'Paredes destacadas anclan salas abiertas con textura y color.',
    paragraphs: [
      'Media walls, fireplaces, and entry sightlines are ideal for tile features. Slab porcelain, 3D textured tile, and wood-look ceramic create distinct moods.',
      'Balance a bold feature wall with neutral surroundings. LED backlighting and floating shelves integrate with tile layout during planning.',
      'Feature walls are installation showcases—precision at outlets, corners, and edges defines the finished look.',
    ],
    paragraphsEs: [
      'Muros de TV, chimeneas y líneas visuales de entrada son ideales para azulejo destacado. Losas, azulejo 3D y cerámica tipo madera crean ambientes distintos.',
      'Equilibre una pared audaz con alrededores neutros. Iluminación LED se integra durante la planificación.',
      'Paredes destacadas son vitrinas de instalación—precisión en tomacorrientes y esquinas define el acabado.',
    ],
  },
  {
    category: 'livingroom',
    titleKey: 'livingFireplaceTile',
    title: 'Tile Around Living Room Fireplaces',
    titleEs: 'Azulejo Alrededor de Chimeneas en Sala',
    excerpt: 'Fireplace tile ranges from rustic stone to sleek modern slabs.',
    excerptEs: 'Azulejo de chimenea va desde piedra rústica hasta losas modernas.',
    paragraphs: [
      'Living room fireplaces are natural tile focal points. Extend tile to the ceiling for height, or frame the opening with contrasting border tile for tradition.',
      'Gas and electric inserts have different clearance requirements than wood-burning units. Always follow manufacturer specs and local code.',
      'We tile fireplaces with heat-aware materials and clean joints that complement surrounding living room finishes.',
    ],
    paragraphsEs: [
      'Chimeneas de sala son puntos focales naturales para azulejo. Extienda hasta el techo para altura o enmarque con borde contrastante.',
      'Insertos de gas y eléctricos tienen requisitos de distancia diferentes a leña. Siga especificaciones del fabricante y código local.',
      'Azulejamos chimeneas con materiales conscientes del calor y juntas limpias.',
    ],
  },
  {
    category: 'livingroom',
    titleKey: 'kitchenLivingTransition',
    title: 'Transitioning Tile from Kitchen to Living Room',
    titleEs: 'Transición de Azulejo de Cocina a Sala',
    excerpt: 'Smooth transitions connect cooking and living zones visually.',
    excerptEs: 'Transiciones suaves conectan zonas de cocina y sala visualmente.',
    paragraphs: [
      'When kitchen and living room share tile, use the same product for continuity. Different heights between rooms need reducers or Schluter profiles to avoid tripping hazards.',
      'Island peninsulas and partial walls create natural break points if you want different materials in each zone. Align grout lines across thresholds when possible for a professional look.',
      'Transition planning during design prevents awkward strips and last-minute compromises at installation.',
    ],
    paragraphsEs: [
      'Cuando cocina y sala comparten azulejo, use el mismo producto para continuidad. Diferentes alturas necesitan reductores para evitar tropiezos.',
      'Penínsulas de isla crean puntos de quiebre naturales si desea materiales diferentes en cada zona.',
      'Planificar transiciones durante el diseño previene tiras incómodas en la instalación.',
    ],
  },
  {
    category: 'livingroom',
    titleKey: 'durableLivingTile',
    title: 'Durable Tile for High-Traffic Living Areas',
    titleEs: 'Azulejo Duradero para Áreas de Sala de Alto Tráfico',
    excerpt: 'Living rooms need floors that handle pets, kids, and entertaining.',
    excerptEs: 'Salas necesitan pisos que manejen mascotas, niños y entretenimiento.',
    paragraphs: [
      'Porcelain tile with PEI 4+ ratings withstands daily family life. Matte and textured finishes hide scratches better than high-gloss polished tile.',
      'Spills from entertaining clean up easily on tile compared to carpet. Consider darker grout in dining-adjacent living areas to reduce visible staining.',
      'Durable does not mean dull—today\'s porcelain offers wood, stone, and concrete visuals with commercial-grade performance.',
    ],
    paragraphsEs: [
      'Porcelanato con clasificación PEI 4+ resiste la vida familiar diaria. Acabados mate ocultan rayones mejor que pulido alto brillo.',
      'Derrames de entretenimiento se limpian fácilmente en azulejo comparado con alfombra.',
      'Duradero no significa aburrido—el porcelanato actual ofrece visuales de madera y piedra con rendimiento comercial.',
    ],
  },
  {
    category: 'livingroom',
    titleKey: 'rugLayeringTile',
    title: 'Living Room Rug Layering Over Tile Floors',
    titleEs: 'Capas de Alfombra sobre Pisos de Azulejo en Sala',
    excerpt: 'Rugs add warmth and define seating areas on tile floors.',
    excerptEs: 'Alfombras añaden calidez y definen áreas de asiento sobre azulejo.',
    paragraphs: [
      'Tile provides a stable, easy-care base; rugs add acoustic softness and color. Use rug pads rated for hard surfaces to prevent slipping and protect tile.',
      'Size rugs to fit seating groups—front legs on the rug anchors furniture visually. Leave tile exposed at edges for a layered, designer look.',
      'Seasonal rug swaps let you refresh the room without changing the permanent tile foundation.',
    ],
    paragraphsEs: [
      'El azulejo proporciona base estable y fácil cuidado; alfombras añaden suavidad acústica y color. Use bases antideslizantes.',
      'Tamaño alfombras para grupos de asientos—patas delanteras en alfombra anclan muebles visualmente.',
      'Cambios estacionales de alfombra refrescan la habitación sin cambiar la base de azulejo.',
    ],
  },
  {
    category: 'livingroom',
    titleKey: 'stoneVsPorcelainLiving',
    title: 'Natural Stone vs Porcelain in Living Spaces',
    titleEs: 'Piedra Natural vs Porcelanato en Espacios de Sala',
    excerpt: 'Both materials excel in living rooms with different maintenance profiles.',
    excerptEs: 'Ambos materiales destacan en salas con perfiles de mantenimiento diferentes.',
    paragraphs: [
      'Natural stone—marble, travertine, limestone—offers unique veining and luxury appeal. It requires sealing and gentle cleaners to prevent etching.',
      'Porcelain replicates stone visuals with lower maintenance and consistent sizing. For busy households, porcelain often delivers the look without the upkeep.',
      'We help clients compare samples side-by-side for their lifestyle before committing to a living room floor.',
    ],
    paragraphsEs: [
      'Piedra natural—mármol, travertino—ofrece veta única y atractivo de lujo. Requiere sellado y limpiadores suaves.',
      'Porcelanato replica visuales de piedra con menor mantenimiento. Para hogares ocupados, porcelanato a menudo entrega el look sin tanto cuidado.',
      'Ayudamos a comparar muestras según estilo de vida antes de comprometerse con un piso de sala.',
    ],
  },
  {
    category: 'livingroom',
    titleKey: 'livingColorPalettes',
    title: 'Living Room Color Palettes with Tile',
    titleEs: 'Paletas de Color de Sala con Azulejo',
    excerpt: 'Tile color sets the foundation for furniture and decor choices.',
    excerptEs: 'El color del azulejo establece la base para muebles y decoración.',
    paragraphs: [
      'Warm gray tile pairs with navy, cream, and brass accents. Cool white tile supports Scandinavian and coastal palettes. Terracotta-tone tile anchors Mediterranean and bohemian styles.',
      'Sample tile alongside paint chips, fabric swatches, and cabinet finishes in the room\'s natural light before ordering.',
      'A cohesive palette from floor up creates living rooms that feel intentionally designed rather than assembled piecemeal.',
    ],
    paragraphsEs: [
      'Azulejo gris cálido combina con azul marino, crema y acentos dorados. Azulejo blanco frío apoya paletas escandinavas y costeras.',
      'Muestree azulejo junto con pintura y telas en la luz natural de la habitación antes de ordenar.',
      'Una paleta cohesiva desde el piso crea salas que se sienten diseñadas intencionalmente.',
    ],
  },
  {
    category: 'livingroom',
    titleKey: 'builtInShelvingTile',
    title: 'Built-In Shelving and Tile Integration',
    titleEs: 'Integración de Estanterías Empotradas y Azulejo',
    excerpt: 'Tile and built-ins work together on media walls and alcoves.',
    excerptEs: 'Azulejo y empotrados trabajan juntos en muros de TV y alcobas.',
    paragraphs: [
      'Media walls combine tile surfaces with shelving and cabinetry. Plan conduit and outlet locations before tile goes up. Niches can display decor without protruding shelves.',
      'Flanking a fireplace with built-in bookcases and tile infill creates a custom library feel. Coordinate grout color with shelf paint for unity.',
      'Integrated designs require carpentry and tile trades to align on dimensions—a collaborative approach yields the best results.',
    ],
    paragraphsEs: [
      'Muros de TV combinan azulejo con estanterías y gabinetes. Planifique conductos y tomacorrientes antes de colocar azulejo.',
      'Flanquear chimenea con estanterías y azulejo crea sensación de biblioteca personalizada.',
      'Diseños integrados requieren que carpintería y azulejos alineen dimensiones.',
    ],
  },
  {
    category: 'livingroom',
    titleKey: 'livingRenovationPhasing',
    title: 'Living Room Renovation: Phasing Your Project',
    titleEs: 'Renovación de Sala: Fases de Su Proyecto',
    excerpt: 'Phased renovations let you live at home while upgrading tile surfaces.',
    excerptEs: 'Renovaciones por fases permiten vivir en casa mientras mejora azulejos.',
    paragraphs: [
      'Phase one might address the fireplace surround; phase two covers flooring; phase three adds a feature wall. Sequencing minimizes downtime and spreads budget over time.',
      'Protect existing finishes during each phase. Dust containment and cure times for thinset and grout affect when furniture can return.',
      'A phased plan with your tile contractor clarifies timelines, access paths, and which rooms stay usable throughout the project.',
    ],
    paragraphsEs: [
      'Fase uno puede abordar chimenea; fase dos cubre piso; fase tres añade pared destacada. Secuenciar minimiza tiempo de inactividad.',
      'Proteja acabados existentes en cada fase. Contención de polvo y tiempos de curado afectan cuándo regresa el mobiliario.',
      'Un plan por fases con su contratista clarifica plazos y qué habitaciones permanecen usables.',
    ],
  },
];

// Generate dates spread across 2025-2026
const startDate = new Date('2025-06-01');
let postIndex = 0;

const blogPostsMeta = POSTS.map((post) => {
  const slug = slugify(post.title);
  const date = new Date(startDate);
  date.setDate(date.getDate() + postIndex * 4);
  postIndex++;
  const dateStr = date.toISOString().slice(0, 10);
  const imageHeading = post.title;
  const imageKey = `blog/${slugify(imageHeading)}`;
  const categoryImages = CATEGORY_IMAGES[post.category];
  const imageIndex = POSTS.filter((p) => p.category === post.category).indexOf(post);

  return {
    meta: {
      id: String(postIndex),
      slug,
      titleKey: post.titleKey,
      category: post.category,
      date: dateStr,
      imageHeading,
      imageKey,
    },
    imageUrl: categoryImages[imageIndex % categoryImages.length],
    en: {
      title: post.title,
      excerpt: post.excerpt,
      paragraphs: post.paragraphs,
    },
    es: {
      title: post.titleEs,
      excerpt: post.excerptEs,
      paragraphs: post.paragraphsEs,
    },
  };
});

// Write blog.ts
const blogTs = `import { imagePath } from '../utils/slugify';
import type { StockImage } from './images';

export const blogCategories = ['tile', 'ceramic', 'bathroom', 'bedroom', 'livingroom'] as const;
export type BlogCategory = (typeof blogCategories)[number];

export interface BlogPost {
  id: string;
  slug: string;
  titleKey: string;
  category: BlogCategory;
  date: string;
  image: StockImage;
}

function blogImage(heading: string, alt: string): StockImage {
  return { src: imagePath('blog', heading), alt };
}

export const blogPosts: BlogPost[] = [
${blogPostsMeta
  .map(
    ({ meta }) => `  {
    id: '${meta.id}',
    slug: '${meta.slug}',
    titleKey: '${meta.titleKey}',
    category: '${meta.category}',
    date: '${meta.date}',
    image: blogImage('${meta.imageHeading.replace(/'/g, "\\'")}', '${meta.imageHeading.replace(/'/g, "\\'")}'),
  }`
  )
  .join(',\n')}
];
`;

// Write blog.en.ts
const blogEnTs = `export const blogPostsEn = {
${blogPostsMeta
  .map(
    ({ meta, en }) => `  ${meta.titleKey}: {
    title: ${JSON.stringify(en.title)},
    excerpt: ${JSON.stringify(en.excerpt)},
    paragraphs: [
      ${en.paragraphs.map((p) => JSON.stringify(p)).join(',\n      ')},
    ],
  }`
  )
  .join(',\n')}
} as const;
`;

// Write blog.es.ts
const blogEsTs = `export const blogPostsEs = {
${blogPostsMeta
  .map(
    ({ meta, es }) => `  ${meta.titleKey}: {
    title: ${JSON.stringify(es.title)},
    excerpt: ${JSON.stringify(es.excerpt)},
    paragraphs: [
      ${es.paragraphs.map((p) => JSON.stringify(p)).join(',\n      ')},
    ],
  }`
  )
  .join(',\n')}
} as const;
`;

// Image URL map entries
const imageMapEntries = blogPostsMeta
  .map(({ meta, imageUrl }) => `  '${meta.imageKey}': '${imageUrl}',`)
  .join('\n');

fs.writeFileSync(path.join(root, 'client/src/data/blog.ts'), blogTs);
fs.writeFileSync(path.join(root, 'client/src/i18n/blog.en.ts'), blogEnTs);
fs.writeFileSync(path.join(root, 'client/src/i18n/blog.es.ts'), blogEsTs);

// Append to image-url-map
const mapPath = path.join(root, 'scripts/image-url-map.mjs');
let mapContent = fs.readFileSync(mapPath, 'utf-8');
if (!mapContent.includes('// Blog posts')) {
  mapContent = mapContent.replace(
    '};\n',
    `\n  // Blog posts\n${imageMapEntries}\n};\n`
  );
  fs.writeFileSync(mapPath, mapContent);
}

console.log(`Generated ${blogPostsMeta.length} blog posts.`);

const manifest = blogPostsMeta.map(({ meta, en }) => ({
  slug: meta.slug,
  titleKey: meta.titleKey,
  category: meta.category,
  date: meta.date,
  title: en.title,
  excerpt: en.excerpt,
  imagePath: `/images/blog/${slugify(meta.imageHeading)}.jpg`,
}));

manifest.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const manifestDir = path.join(root, 'server/src/data');
fs.mkdirSync(manifestDir, { recursive: true });
fs.writeFileSync(
  path.join(manifestDir, 'blog-manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`
);
console.log(`Generated blog manifest with ${manifest.length} posts.`);
