import './loadEnv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import contactRoutes from './routes/contact';
import contentRoutes from './routes/content';
import chatRoutes from './routes/chat';
import wizardRoutes from './routes/wizard';
import commentRoutes from './routes/comments';

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
app.use('/api', commentRoutes);

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
