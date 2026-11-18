import { Router } from 'express';

const router = Router();

// GET /api/health – used by Docker and by the frontend to check the server is up.
router.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'ipcc-backend', time: new Date().toISOString() });
});

export default router;
