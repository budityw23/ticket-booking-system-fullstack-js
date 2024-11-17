import { Request, Response } from 'express';
import { AuthService } from '../services/auth.services';
import { asyncHandler } from '../utils/asyncHandler';
import { ResponseUtil } from '../utils/response.util';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await AuthService.register(req.body);
  ResponseUtil.success(res, { user, token }, 'Registration successful', 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await AuthService.login(email, password);
  ResponseUtil.success(res, { user, token }, 'Login successful');
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  ResponseUtil.success(res, { user: req.user }, 'User profile retrieved');
});
