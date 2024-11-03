import express from 'express';
import healthRouter from './health.routes';

const router = express.Router();

// Mount routes
router.use('/health', healthRouter);

export default router;
