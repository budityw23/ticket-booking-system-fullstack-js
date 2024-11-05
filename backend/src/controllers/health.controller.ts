import { Request, Response } from 'express';
import { HealthCheck } from '../types';

export const healthController = {
  checkHealth: async (_req: Request, res: Response) => {
    const healthCheck: HealthCheck = {
      status: 'OK',
      timestamp: new Date()
    };
    res.status(200).json(healthCheck);
  }
};
