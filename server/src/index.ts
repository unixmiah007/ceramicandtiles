import './loadEnv.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import contactRoutes from './routes/contact.js';
import contentRoutes from './routes/content.js';
import chatRoutes from './routes/chat.js';
import wizardRoutes from './routes/wizard.js';
import estimateRoutes from './routes/estimate.js';
import commentRoutes from './routes/comments.js';
import seoRoutes from './routes/seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet({ contentSecurityPolicy: false }));
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
app.use(express.static(clientBuildPath));

app.get('*', (_req, res) => {
  const indexPath = path.join(clientBuildPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).json({ message: 'Not found' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
