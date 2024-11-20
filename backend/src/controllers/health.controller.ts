// src/controllers/health.controller.ts
import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import mongoose from 'mongoose';
import { HealthCheck } from '../types';

export const checkHealth = asyncHandler(async (req: Request, res: Response) => {
  const healthcheck: HealthCheck & {
    uptime: number;
    database: string;
    message: string;
  } = {
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    database:
      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    message: 'Server is healthy'
  };

  res.status(200).json(healthcheck);
});
