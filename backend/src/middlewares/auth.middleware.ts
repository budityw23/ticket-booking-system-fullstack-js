// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';
import { User } from '../types';

// Extend the Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    // This is a placeholder for JWT verification
    // Will be implemented in Phase 2
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Not authorized to access this route', 401);
    }

    // Placeholder for token verification
    // const token = authHeader.split(' ')[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    next(new AppError('Authentication not implemented yet', 401));
  } catch (error) {
    next(new AppError('Not authorized to access this route', 401));
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authorized to access this route', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

// Placeholder for token refresh middleware
export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new AppError('Token refresh not implemented yet', 401));
};

// Helper middleware to check if user is logged in (doesn't throw error)
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    // Will implement token verification in Phase 2
    next();
  } catch (error) {
    next();
  }
};

// Example usage of rate limiting (you'll need to install express-rate-limit)
export const rateLimiter = {
  loginLimiter: () => {
    // Will implement in Phase 2
    return (req: Request, res: Response, next: NextFunction) => next();
  },
  apiLimiter: () => {
    // Will implement in Phase 2
    return (req: Request, res: Response, next: NextFunction) => next();
  }
};
