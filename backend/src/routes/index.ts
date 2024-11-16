import express from 'express';
import healthRouter from './health.routes';
import authRouter from './auth.routes';

const router = express.Router();

// Mount routes
router.use('/health', healthRouter);
router.use('/auth', authRouter);

export default router;
