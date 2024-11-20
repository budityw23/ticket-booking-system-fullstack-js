import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';
import { User } from '../models/User';
import { asyncHandler } from '../utils/asyncHandler';
import rateLimit from 'express-rate-limit';

// JWT payload interface
interface JwtPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

// Update protect middleware with JWT verification
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('Not authorized to access this route', 401);
    }

    try {
      // 2. Verify token
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      // 3. Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        throw new AppError(
          'The user belonging to this token no longer exists',
          401
        );
      }

      // 4. Add user to request object
      req.user = currentUser;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid token', 401);
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError('Token expired', 401);
      }
      throw new AppError('Not authorized to access this route', 401);
    }
  }
);

// The restrictTo middleware remains largely the same but with type safety
export const restrictTo = (...roles: ('user' | 'admin' | 'manager')[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        throw new AppError('Not authorized to access this route', 401);
      }

      if (!roles.includes(req.user.role)) {
        throw new AppError(
          'You do not have permission to perform this action',
          403
        );
      }

      next();
    }
  );
};

// Updated isLoggedIn middleware with JWT verification
export const isLoggedIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        return next();
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      const currentUser = await User.findById(decoded.id);
      if (currentUser) {
        req.user = currentUser;
      }

      next();
    } catch (error) {
      // Don't throw error, just continue without setting user
      next();
    }
  }
);

export const rateLimiter = {
  loginLimiter: () =>
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // Limit each IP to 5 login attempts per window
      message: 'Too many login attempts, please try again after 15 minutes',
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false // Disable the `X-RateLimit-*` headers
    }),

  apiLimiter: () =>
    rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 100, // Limit each IP to 100 requests per hour
      message: 'Too many requests from this IP, please try again after an hour',
      standardHeaders: true,
      legacyHeaders: false
    })
};
