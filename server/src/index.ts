import './loadEnv.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRoutes from './routes/contact.js';
import contentRoutes from './routes/content.js';
import chatRoutes from './routes/chat.js';
import wizardRoutes from './routes/wizard.js';
import estimateRoutes from './routes/estimate.js';
import commentRoutes from './routes/comments.js';
import seoRoutes from './routes/seo.js';
import { injectCityHtmlMeta } from './seo/inject-city-meta.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  helmet({
    contentSecurityPolicy: false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Portillo Ceramic and Tile API' });
});

app.use('/api', contactRoutes);
app.use('/api', contentRoutes);
app.use('/api', chatRoutes);
app.use('/api', wizardRoutes);
app.use('/api', estimateRoutes);
app.use('/api', commentRoutes);

app.use(seoRoutes);

const clientBuildPath = path.join(__dirname, '../../client/dist');
const indexHtmlPath = path.join(clientBuildPath, 'index.html');
let cachedIndexHtml: string | null = null;

function getIndexHtml(): string | null {
  if (cachedIndexHtml) return cachedIndexHtml;
  if (!fs.existsSync(indexHtmlPath)) return null;
  cachedIndexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  return cachedIndexHtml;
}

app.use(express.static(clientBuildPath));

app.get('*', (req, res) => {
  const html = getIndexHtml();
  if (!html) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  const enriched = injectCityHtmlMeta(html, req.path);
  if (enriched) {
    res.type('html').send(enriched);
    return;
  }

  res.sendFile(indexHtmlPath, (err) => {
    if (err) {
      res.status(404).json({ message: 'Not found' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
