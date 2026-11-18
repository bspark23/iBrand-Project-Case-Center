import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

import healthRoutes from './modules/health/health.routes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const openapiPath = path.join(__dirname, '..', 'openapi.yaml');

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '1mb' }));

  // API contract, readable in the browser at /api/docs
  const openapi = YAML.parse(fs.readFileSync(openapiPath, 'utf8'));
  app.get('/api/openapi.json', (req, res) => res.json(openapi));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapi));

  // Feature routes. Each module adds one line here.
  app.use('/api/health', healthRoutes);
  // app.use('/api/auth', authRoutes);         // P1-A02
  // app.use('/api/clients', clientRoutes);    // P1-A04
  // app.use('/api/projects', projectRoutes);  // P1-A05

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
