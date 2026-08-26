import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const citiesPath = path.join(root, 'client/src/data/service-area-cities.json');
const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));

const manifest = cities.map((city) => ({
  slug: city.slug,
  path: `/service-area/${city.slug}`,
}));

const outPath = path.join(root, 'server/src/data/city-manifest.json');
fs.writeFileSync(outPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${manifest.length} city URLs to ${outPath}`);
