/**
 * Maps each local image path (without /images/ prefix or .jpg) to a relevant stock photo URL.
 * Filenames are derived from page headings, service titles, and section headings.
 */
import { BLOG_IMAGE_URL_MAP } from './blog-image-urls.mjs';
import { MATERIAL_IMAGE_PATHS } from './material-image-urls.mjs';

export const IMAGE_URL_MAP = {
  // Homepage hero carousel
  'hero/transforming-spaces': 'https://images.pexels.com/photos/6580700/pexels-photo-6580700.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'hero/creating-quality': 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80',
  'hero/building-trust': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',

  // Homepage process steps
  'process/demolition-and-preparation': 'https://images.pexels.com/photos/10133578/pexels-photo-10133578.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'process/waterproofing': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Applying_waterproofing_material_to_the_outside_of_a_tunnel.jpg',
  'process/installation': 'https://static.wixstatic.com/media/b2144a_a5918ad7432e4d14ba9860e69cd532e6~mv2.webp',
  'process/grout-and-finishing': 'https://www.wrmeadows.com/wp-content/uploads/construction-grout.jpg',

  // Page heroes
  'pages/experience-you-can-trust': 'https://images.pexels.com/photos/5691646/pexels-photo-5691646.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'pages/our-services': 'https://images.pexels.com/photos/7534390/pexels-photo-7534390.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'pages/why-portillo': 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'pages/request-a-quote-today': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',

  // Shared sections
  'sections/your-space-deserves-the-best': 'https://production-next-images-cdn.thumbtack.com/i/302055787456274526/width/1024.jpeg',
  'sections/craftsmanship-you-can-see': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpONNhHPOUyzWUx6Je_j9B4gTeoKVjCqtrorLzx-aJZ3SYlwWGuK5r_TTQ&s=10',
  'sections/residential-projects': 'https://images.pexels.com/photos/1457844/pexels-photo-1457844.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'sections/commercial-projects': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXgAzTodqcmZG8i05Fkwuo7GlVZWoRCwPzTlKAJ8IFvnb98rMucZI5jbvB&s=10',
  'sections/contact-abel-portillo': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
  'sections/your-vision-our-craftsmanship': 'https://images.pexels.com/photos/6585758/pexels-photo-6585758.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'sections/precision-shower-tile': 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Homepage gallery (from gallery headings / descriptions)
  'gallery/spa-like-bathroom-with-floor-to-ceiling-tile': 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'gallery/kitchen-with-ceramic-tile-backsplash': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
  'gallery/designer-shower-with-geometric-tile-pattern': 'https://images.squarespace-cdn.com/content/v1/59a07b67e4fcb555d0391cdc/86042952-1ed3-4011-9948-18037f473a99/New+Build+or+Renovation+Checklist.jpg',
  'gallery/large-format-floor-tile-in-open-living-space': 'https://dkorinteriors.com/wp-content/uploads/2022/08/architec-designer-collaboration.jpg',
  'gallery/walk-in-shower-with-marble-look-porcelain-tile': 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
  'gallery/detailed-mosaic-tile-accent-wall': 'https://sheararchitecturaldesign.co.uk/wp-content/uploads/2023/03/Sustainable-Renovation-Materials-24.03.2023.webp',

  // Portfolio projects
  'projects/washington-capitals-capital-one-arena': 'https://www.capitalonearena.com/assets/img/Photo-Credit-2022-Craig-Hunter-Ross-0050-67b012132b.jpg',
  'projects/the-pentagon': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/The_Pentagon%2C_Headquarters_of_the_US_Department_of_Defense_%28cropped2%29.jpg',
  'projects/orangetheory-fitness': 'https://fitnesstestdrive.com/wp-content/uploads/2018/04/Screen-Shot-2018-01-22-at-1.45.19-PM.png',

  // Services – bathroom renovations
  'services/bathroom-renovations/bathroom-renovations': 'https://images.ctfassets.net/9aljq1ivr2md/HNm7Wko0M0i5t1J5rV0fP/0165f0276b27f39d47d09b818089d52f/solid-newhomebuild-39.jpg?w=1200&h=800&fl=progressive&q=50&fm=jpg&bg=transparent',
  'services/bathroom-renovations/complete-renovation-services': 'https://images.pexels.com/photos/6580700/pexels-photo-6580700.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/bathroom-renovations/floor-wall-and-shower-surfaces': 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/bathroom-renovations/built-for-daily-use': 'https://images.pexels.com/photos/1457844/pexels-photo-1457844.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Shower installation
  'services/shower-installation/shower-installation-and-renovation': 'https://images.pexels.com/photos/6585758/pexels-photo-6585758.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'services/shower-installation/new-shower-installation': 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
  'services/shower-installation/shower-renovations-and-upgrades': 'https://images.pexels.com/photos/6580704/pexels-photo-6580704.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/shower-installation/waterproofing-included': 'https://images.pexels.com/photos/6580702/pexels-photo-6580702.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Ceramic & porcelain
  'services/ceramic-porcelain/ceramic-and-porcelain-tile': 'https://www.rubi.com/us/blog/wp-content/uploads/2018/03/1420701275533.jpeg',
  'services/ceramic-porcelain/residential-tile-installation': 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/ceramic-porcelain/commercial-tile-applications': 'https://images.pexels.com/photos/1910482/pexels-photo-1910482.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/ceramic-porcelain/precision-matters': 'https://images.pexels.com/photos/6580701/pexels-photo-6580701.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Shower waterproofing
  'services/shower-waterproofing/shower-waterproofing': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQl5oZNnBUI9zNL98bObAuFC6Ki2faNtgWNLt1rn5PUhJ0vzZysyNlDS5H&s=10',
  'services/shower-waterproofing/why-waterproofing-matters': 'https://images.pexels.com/photos/6580704/pexels-photo-6580704.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/shower-waterproofing/wet-area-preparation': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  'services/shower-waterproofing/part-of-a-complete-installation': 'https://images.pexels.com/photos/3862131/pexels-photo-3862131.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Floor & wall tile
  'services/floor-wall-tile/floor-and-wall-tile': 'https://assets.wfcdn.com/im/27671814/resize-h800-w800%5Ecompr-r85/4326/432661050/Literary+License+12%27%27+W+x+12%27%27+L+Porcelain+Concrete+Look+Singular+Tile-63639316.jpg',
  'services/floor-wall-tile/floor-tile-installation': 'https://images.pexels.com/photos/7534391/pexels-photo-7534391.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/floor-wall-tile/wall-tile-installation': 'https://images.pexels.com/photos/6580703/pexels-photo-6580703.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/floor-wall-tile/consistent-finishing': 'https://images.pexels.com/photos/6580708/pexels-photo-6580708.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Commercial tile
  'services/commercial-tile/commercial-tile-installation': 'https://www.terratileandstone.net/wp-content/uploads/2023/11/commercial-tile-contractors.jpg',
  'services/commercial-tile/built-for-high-traffic-use': 'https://images.pexels.com/photos/1910488/pexels-photo-1910488.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/commercial-tile/professional-facility-experience': 'https://images.pexels.com/photos/5691646/pexels-photo-5691646.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/commercial-tile/reliable-project-execution': 'https://images.pexels.com/photos/5824906/pexels-photo-5824906.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Locker rooms
  'services/locker-rooms/locker-rooms': 'https://images.pexels.com/photos/6580705/pexels-photo-6580705.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'services/locker-rooms/moisture-resistant-surfaces': 'https://images.pexels.com/photos/6580706/pexels-photo-6580706.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/locker-rooms/professional-facility-standards': 'https://images.pexels.com/photos/6580705/pexels-photo-6580705.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/locker-rooms/complete-tile-scope': 'https://images.pexels.com/photos/3862134/pexels-photo-3862134.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Backsplashes
  'services/backsplashes/backsplashes': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'services/backsplashes/kitchen-backsplashes': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
  'services/backsplashes/bathroom-backsplashes': 'https://images.pexels.com/photos/11053437/pexels-photo-11053437.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/backsplashes/custom-layouts': 'https://images.pexels.com/photos/6580709/pexels-photo-6580709.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Tile replacement
  'services/tile-replacement/tile-replacement': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  'services/tile-replacement/remove-the-old-start-fresh': 'https://images.pexels.com/photos/6492405/pexels-photo-6492405.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/tile-replacement/upgrade-your-space': 'https://images.pexels.com/photos/1454805/pexels-photo-1454805.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/tile-replacement/targeted-or-full-replacement': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',

  // Tile repair
  'services/tile-repair/tile-repair': 'https://images.pexels.com/photos/6580708/pexels-photo-6580708.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'services/tile-repair/cracked-or-loose-tile': 'https://images.pexels.com/photos/6580701/pexels-photo-6580701.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/tile-repair/grout-and-surface-issues': 'https://images.pexels.com/photos/6580708/pexels-photo-6580708.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/tile-repair/honest-recommendations': 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Demolition & removal
  'services/demolition-removal/demolition-and-removal': 'https://images.pexels.com/photos/5824516/pexels-photo-5824516.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'services/demolition-removal/controlled-removal': 'https://images.pexels.com/photos/6492405/pexels-photo-6492405.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/demolition-removal/surface-evaluation': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  'services/demolition-removal/ready-for-installation': 'https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Custom designs
  'services/custom-designs/custom-tile-designs': 'https://images.pexels.com/photos/6580709/pexels-photo-6580709.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'services/custom-designs/pattern-and-layout-planning': 'https://images.pexels.com/photos/6580709/pexels-photo-6580709.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/custom-designs/showers-floors-and-feature-walls': 'https://images.pexels.com/photos/6580710/pexels-photo-6580710.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'services/custom-designs/craftsmanship-you-can-see': 'https://images.pexels.com/photos/6580707/pexels-photo-6580707.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Values – family owned
  'values/family-owned/family-owned': 'https://pmcconstructionco.com/wp-content/uploads/sites/1576/2025/09/badge-3.png',
  'values/family-owned/our-name-is-on-every-project': 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'values/family-owned/respect-for-your-home-and-business': 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'values/family-owned/direct-communication-you-can-count-on': 'https://images.pexels.com/photos/5824906/pexels-photo-5824906.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Professional experience
  'values/professional-experience/professional-experience': 'https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'values/professional-experience/residential-projects-done-right': 'https://images.pexels.com/photos/1454805/pexels-photo-1454805.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'values/professional-experience/commercial-and-high-traffic-facilities': 'https://images.pexels.com/photos/6580706/pexels-photo-6580706.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'values/professional-experience/notable-professional-experience': 'https://images.pexels.com/photos/1910491/pexels-photo-1910491.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Attention to detail
  'values/attention-to-detail/attention-to-detail': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1iz2oRNGzBg5mIGs16zsbvd_oTReHpNLSy0oBZA56-IMo4LrjjMr1JXo&s=10',
  'values/attention-to-detail/precise-layouts-and-clean-cuts': 'https://images.pexels.com/photos/6580701/pexels-photo-6580701.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'values/attention-to-detail/consistent-grout-lines': 'https://images.pexels.com/photos/6580708/pexels-photo-6580708.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'values/attention-to-detail/quality-finishing-touches': 'https://images.pexels.com/photos/6580710/pexels-photo-6580710.jpeg?auto=compress&cs=tinysrgb&w=1200',

  // Quality without shortcuts
  'values/quality-without-shortcuts/quality-without-shortcuts': 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'values/quality-without-shortcuts/proper-preparation-comes-first': 'https://images.pexels.com/photos/6492405/pexels-photo-6492405.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'values/quality-without-shortcuts/waterproofing-and-structural-steps-matter': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxv7B29u5t0IOtiK8AZFdSNRCMLxf_1AuK-oBq6Wb8U7z6H0DOi93boPU&s=10',
  'values/quality-without-shortcuts/built-to-our-standard-not-a-deadline': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRodk3Nfvn3AcynOAzP8-zdt8j3EF7slbO6skXO-pzyfXxnbnLL2Ai2Ar0&s=10',

  // Built to last
  'values/built-to-last/built-to-last': 'https://images.pexels.com/photos/6527032/pexels-photo-6527032.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'values/built-to-last/preparation-that-protects-your-investment': 'https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'values/built-to-last/materials-and-methods-for-real-world-use': 'https://images.pexels.com/photos/3862134/pexels-photo-3862134.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'values/built-to-last/performance-you-can-rely-on': 'https://images.pexels.com/photos/6585758/pexels-photo-6585758.jpeg?auto=compress&cs=tinysrgb&w=1200',

  'fallback/default-tile-installation': 'https://pmcconstructionco.com/wp-content/uploads/sites/1576/2025/09/badge-3.png',

  ...MATERIAL_IMAGE_PATHS,
  ...BLOG_IMAGE_URL_MAP,
};
