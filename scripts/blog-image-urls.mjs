/**
 * Subject-precise, high-quality stock images for each blog post.
 * Keys match slugified blog post titles under blog/<slug>.
 */
const Q = (w = 1600) => `auto=format&fit=crop&w=${w}&q=85`;
const P = (id, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const U = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?${Q(w)}`;

export const BLOG_IMAGE_URL_MAP = {
  // ── TILE (10) ──────────────────────────────────────────────────────────────
  'blog/how-to-choose-the-right-tile-size-for-your-space': P('7534390'), // ceramic tile samples and sizes
  'blog/large-format-tile-pros-and-cons-for-modern-homes': U('1600585154340-be6161a56a0c'), // expansive room with large-format floor tile
  'blog/tile-layout-patterns-that-elevate-any-room': U('1600607687920-4e2a09cf159d'), // herringbone pattern floor
  'blog/understanding-tile-pei-ratings-for-floor-durability': P('1454805'), // polished stone floor built for traffic
  'blog/how-to-calculate-tile-quantity-for-your-project': U('1504307651254-35680f356dfd'), // contractor measuring for install
  'blog/schluter-vs-traditional-waterproofing-for-tile-projects': P('6492405'), // tiler working in wet-area shower
  'blog/grout-color-selection-a-complete-guide': P('6580703'), // wall tile with visible grout lines
  'blog/tile-transition-strips-when-and-how-to-use-them': P('7534391'), // floor tile meeting another surface at doorway
  'blog/heated-floor-systems-under-tile': U('1620626011761-996317b8d101'), // spa-like heated bathroom floor tile
  'blog/maintaining-tile-floors-daily-care-tips': U('1628177142898-93e36e4e3a50'), // gleaming clean tile bathroom

  // ── CERAMIC (10) ───────────────────────────────────────────────────────────
  'blog/ceramic-vs-porcelain-which-is-right-for-you': P('7534390'), // ceramic tile stacks for comparison
  'blog/glazed-vs-unglazed-ceramic-tile-explained': P('6580701'), // glazed ceramic tile surface finish
  'blog/best-ceramic-tile-for-kitchen-backsplashes': U('1556911220-bff31c812dba'), // ceramic kitchen backsplash
  'blog/ceramic-tile-in-high-moisture-areas': P('1080721'), // ceramic wall tile in shower wet zone
  'blog/handcrafted-ceramic-tile-artisan-options': P('6580709'), // decorative artisan tile layout
  'blog/ceramic-tile-grout-and-sealant-best-practices': P('6580708'), // grout finishing on ceramic install
  'blog/eco-friendly-ceramic-tile-options': U('1600607687644-c7171b42498f'), // bright natural-material interior
  'blog/ceramic-tile-for-fireplace-surrounds': U('1600566753190-17f0baa2a6c3'), // tiled fireplace surround
  'blog/repairing-cracked-ceramic-tile': P('5691646'), // renovation crew repairing surfaces
  'blog/ceramic-tile-trends-for-2026': P('1910482'), // contemporary designer tile interior

  // ── BATHROOM (10) ──────────────────────────────────────────────────────────
  'blog/master-bathroom-renovation-planning-guide': P('1457842'), // luxury master bathroom suite
  'blog/walk-in-shower-design-ideas': U('1552321554-5fefe8c9ef14'), // frameless walk-in shower with tile
  'blog/small-bathroom-tile-tricks-to-maximize-space': P('6585758'), // compact smartly tiled bathroom
  'blog/bathroom-vanity-backsplash-ideas': P('1457844'), // vanity with tile backsplash
  'blog/tub-to-shower-conversion-what-to-know': U('1600607687939-ce8a6c25118c'), // modern shower conversion layout
  'blog/bathroom-floor-tile-slip-resistance-matters': P('6580704'), // textured bathroom floor tile
  'blog/niche-and-bench-ideas-for-shower-tile': P('6580700'), // tiled shower with niche detail
  'blog/bathroom-lighting-and-tile-color-coordination': P('1080721'), // bathroom tile illuminated by natural light
  'blog/guest-bathroom-refresh-on-a-budget': P('11053437'), // refreshed guest powder room
  'blog/ada-compliant-bathroom-tile-layout': P('6580702'), // wide open bathroom floor layout

  // ── BEDROOM (10) ───────────────────────────────────────────────────────────
  'blog/bedroom-flooring-tile-vs-hardwood-vs-carpet': U('1616486338812-3dadae4b4ace'), // bedroom comparing floor finishes
  'blog/creating-a-calm-bedroom-with-neutral-tile-accents': U('1616594039964-ae9021a400a0'), // serene neutral bedroom
  'blog/bedroom-accent-wall-tile-ideas': U('1615529328331-f8917597711f'), // bedroom with statement accent wall
  'blog/en-suite-bedroom-bathroom-coordination': U('1616486338812-3dadae4b4ace'), // master bedroom flowing to en-suite
  'blog/tile-fireplace-surrounds-in-master-bedrooms': U('1618220179428-22790b461013'), // bedroom with tiled fireplace feature
  'blog/bedroom-closet-floor-tile-solutions': U('1558618666-fcd25c85cd64'), // walk-in closet with hard-surface floor
  'blog/soundproofing-considerations-with-tile-floors': U('1631049307264-da0ec9d70304'), // soft rug layered on hard bedroom floor
  'blog/warm-underfoot-radiant-heat-in-bedrooms': U('1616594039964-ae9021a400a0'), // warm cozy bedroom interior
  'blog/minimalist-bedroom-design-with-large-format-tile': U('1615529328331-f8917597711f'), // clean minimalist bedroom design
  'blog/bedroom-renovation-timeline-and-budget-tips': P('3862130'), // bedroom/interior renovation planning scene

  // ── LIVING ROOM (10) ───────────────────────────────────────────────────────
  'blog/open-concept-living-room-tile-flooring': P('271816'), // open-plan living room with tile floor
  'blog/living-room-feature-wall-tile-designs': P('6580709'), // decorative tile feature wall
  'blog/tile-around-living-room-fireplaces': U('1600585154526-990dced4db0d'), // living room fireplace with tile detail
  'blog/transitioning-tile-from-kitchen-to-living-room': U('1600585154526-990dced4db0d'), // open kitchen-living floor flow
  'blog/durable-tile-for-high-traffic-living-areas': P('1910488'), // high-traffic living / lobby tile floor
  'blog/living-room-rug-layering-over-tile-floors': U('1600210492486-724fe5c67fb0'), // styled living room with rug on tile floor
  'blog/natural-stone-vs-porcelain-in-living-spaces': P('5824906'), // natural stone look living surface
  'blog/living-room-color-palettes-with-tile': U('1600607687644-c7171b42498f'), // color-coordinated designer living room
  'blog/built-in-shelving-and-tile-integration': P('1571460'), // built-in kitchen/living shelving with tiled wall
  'blog/living-room-renovation-phasing-your-project': P('3862131'), // living space mid-renovation
};
