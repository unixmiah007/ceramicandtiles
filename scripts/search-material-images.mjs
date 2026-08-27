/**
 * Search each material header title and save a local JPEG to /images/materials.
 * Google Images is bot-blocked here; queries go through Bing/DuckDuckGo image search
 * using the same titles shown on /materials.
 * Run: node scripts/search-material-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dest = path.join(root, 'client/public/images/materials');
const urlsFile = path.join(root, 'scripts/material-image-urls.mjs');
const MIN_BYTES = 70_000;
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15';

const MATERIALS = [
  ['glazed-ceramic-wall-tile', 'Glazed ceramic wall tile'],
  ['unglazed-ceramic-floor-tile', 'Unglazed ceramic floor tile'],
  ['ceramic-subway-tile', 'Ceramic subway tile'],
  ['handmade-zellige-ceramic', 'Handmade zellige ceramic'],
  ['terracotta-saltillo-tile', 'Terracotta & Saltillo'],
  ['ceramic-mosaic-tile', 'Ceramic mosaic'],
  ['beveled-metro-ceramic', 'Beveled metro ceramic'],
  ['kitchen-backsplash-ceramic', 'Kitchen backsplash ceramic'],
  ['porcelain-floor-tile', 'Porcelain floor tile'],
  ['large-format-porcelain', 'Large-format porcelain'],
  ['rectified-porcelain', 'Rectified porcelain'],
  ['marble-look-porcelain', 'Marble-look porcelain'],
  ['wood-look-porcelain-plank', 'Wood-look porcelain plank'],
  ['cement-look-porcelain', 'Cement-look porcelain'],
  ['slate-look-porcelain', 'Slate-look porcelain'],
  ['hexagon-porcelain', 'Hexagon porcelain'],
  ['outdoor-porcelain-paver', 'Outdoor porcelain paver'],
  ['encaustic-look-porcelain', 'Encaustic-look porcelain'],
  ['travertine-look-porcelain', 'Travertine-look porcelain'],
  ['terrazzo-look-porcelain', 'Terrazzo-look porcelain'],
  ['shower-wall-porcelain', 'Shower-wall porcelain'],
  ['brick-look-porcelain', 'Brick-look porcelain'],
  ['thin-porcelain-slab', 'Thin porcelain slab'],
  ['glass-mosaic-tile', 'Glass mosaic'],
  ['pebble-mosaic-tile', 'Pebble mosaic'],
  ['penny-round-mosaic', 'Penny-round mosaic'],
  ['fish-scale-mosaic', 'Fish-scale mosaic'],
  ['quarry-tile', 'Quarry tile'],
];

const SKIP_HOST = /bing\.net|gstatic\.com|googleusercontent\.com|logo|sprite|favicon|svg\+xml/i;
const usedUrls = new Set();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url, extra = {}) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept-Language': 'en-US,en;q=0.9',
      Accept: 'text/html,application/json,image/*,*/*',
      ...extra,
    },
    redirect: 'follow',
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${url}`);
  }
  return response.text();
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'image/jpeg,image/png,image/webp,image/*,*/*',
      Referer: 'https://www.bing.com/',
    },
    redirect: 'follow',
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

function decode(value) {
  return value
    .replace(/\\u0026/g, '&')
    .replace(/\\u003d/g, '=')
    .replace(/\\\//g, '/')
    .replace(/&amp;/g, '&');
}

function isUsefulUrl(url) {
  if (!url.startsWith('http')) {
    return false;
  }
  if (SKIP_HOST.test(url)) {
    return false;
  }
  if (usedUrls.has(url)) {
    return false;
  }
  if (/\.(svg)(\?|$)/i.test(url)) {
    return false;
  }
  return true;
}

async function bingCandidates(query) {
  const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&qft=+filterui:imagesize-large&form=IRFLTR`;
  const html = await fetchText(url);
  const found = [];
  const patterns = [
    /murl&quot;:&quot;(https?:[^&"]+)/g,
    /"murl":"(https?:[^"]+)"/g,
    /mediaurl=(https?:[^&"]+)/g,
  ];
  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const candidate = decode(match[1]);
      if (isUsefulUrl(candidate) && !found.includes(candidate)) {
        found.push(candidate);
      }
    }
  }
  return found;
}

async function duckDuckGoCandidates(query) {
  const home = await fetchText(`https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`);
  const vqd = home.match(/vqd=([0-9-]+)/)?.[1];
  if (!vqd) {
    return [];
  }
  const api = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,isz:l&p=1`;
  const json = JSON.parse(
    await fetchText(api, { Referer: 'https://duckduckgo.com/', Accept: 'application/json' })
  );
  return (json.results || [])
    .map((item) => item.image)
    .filter((item) => item && isUsefulUrl(item));
}

function looksLikeJpeg(buffer) {
  return buffer[0] === 0xff && buffer[1] === 0xd8;
}

function looksLikePng(buffer) {
  return buffer[0] === 0x89 && buffer[1] === 0x50;
}

function looksLikeWebp(buffer) {
  return buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
}

function convertToJpeg(inputPath, outputPath) {
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '80', inputPath, '--out', outputPath], {
    stdio: 'pipe',
  });
}

async function saveImage(url, outputPath) {
  const buffer = await fetchBuffer(url);
  if (buffer.length < MIN_BYTES) {
    throw new Error(`too small ${buffer.length}`);
  }
  const temp = `${outputPath}.tmp`;
  fs.writeFileSync(temp, buffer);
  if (looksLikeJpeg(buffer)) {
    fs.renameSync(temp, outputPath);
    return buffer.length;
  }
  if (looksLikePng(buffer) || looksLikeWebp(buffer)) {
    convertToJpeg(temp, outputPath);
    fs.unlinkSync(temp);
    const size = fs.statSync(outputPath).size;
    if (size < MIN_BYTES) {
      throw new Error(`converted too small ${size}`);
    }
    return size;
  }
  fs.unlinkSync(temp);
  throw new Error('not an image');
}

async function searchAndSave(id, title) {
  const query = `${title} tile`;
  const candidates = [];
  try {
    candidates.push(...(await bingCandidates(query)));
  } catch (error) {
    console.warn(`bing failed for ${id}: ${error.message}`);
  }
  try {
    candidates.push(...(await duckDuckGoCandidates(query)));
  } catch (error) {
    console.warn(`ddg failed for ${id}: ${error.message}`);
  }
  const unique = [...new Set(candidates)];
  const outputPath = path.join(dest, `${id}.jpg`);
  for (const url of unique.slice(0, 18)) {
    try {
      const bytes = await saveImage(url, outputPath);
      usedUrls.add(url);
      return { url, bytes };
    } catch {
      // try next candidate
    }
  }
  throw new Error(`no usable image among ${unique.length} candidates`);
}

function writeUrlMap(entries) {
  const lines = Object.entries(entries)
    .map(([id, url]) => `  '${id}':\n    ${JSON.stringify(url)},`)
    .join('\n');
  const contents = `/** Hi-res image URLs for the material library. App always serves local /images/materials/*.jpg. */
export const MATERIAL_IMAGE_URLS = {
${lines}
};

export const MATERIAL_IMAGE_PATHS = Object.fromEntries(
  Object.entries(MATERIAL_IMAGE_URLS).map(([name, url]) => [\`materials/\${name}\`, url])
);
`;
  fs.writeFileSync(urlsFile, contents);
}

async function main() {
  fs.mkdirSync(dest, { recursive: true });
  const saved = {};
  for (const [id, title] of MATERIALS) {
    process.stdout.write(`search ${title} ... `);
    try {
      const result = await searchAndSave(id, title);
      saved[id] = result.url;
      console.log(`saved ${id}.jpg (${result.bytes} bytes)`);
    } catch (error) {
      console.log(`FAILED ${error.message}`);
    }
    await sleep(700);
  }

  if (Object.keys(saved).length > 0) {
    const existing = {};
    try {
      const mod = await import(`./material-image-urls.mjs?t=${Date.now()}`);
      Object.assign(existing, mod.MATERIAL_IMAGE_URLS);
    } catch {
      // rewrite from saved only
    }
    writeUrlMap({ ...existing, ...saved });
  }

  console.log(`Replaced ${Object.keys(saved).length} / ${MATERIALS.length} material images`);
  if (Object.keys(saved).length !== MATERIALS.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
