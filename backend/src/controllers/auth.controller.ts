import { Request, Response } from 'express';
import { AuthService } from '../services/auth.services';
import { asyncHandler } from '../utils/asyncHandler';
import { ResponseUtil } from '../utils/response.util';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, tokens } = await AuthService.register(req.body);

  // Set refresh token in HTTP-only cookie
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  ResponseUtil.success(
    res,
    {
      user,
      accessToken: tokens.accessToken
    },
    'Registration successful',
    201
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, tokens } = await AuthService.login(email, password);

  // Set refresh token in HTTP-only cookie
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  ResponseUtil.success(
    res,
    {
      user,
      accessToken: tokens.accessToken
    },
    'Login successful'
  );
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return ResponseUtil.error(res, 'No refresh token provided', 401);
    }

    const { tokens } = await AuthService.refreshToken(refreshToken);

    // Set new refresh token in HTTP-only cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    ResponseUtil.success(
      res,
      { accessToken: tokens.accessToken },
      'Token refreshed successfully'
    );
  }
);

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?._id) {
    return ResponseUtil.error(res, 'User not found', 404);
  }

  const user = await AuthService.getUserProfile(req.user._id.toString());
  ResponseUtil.success(res, { user }, 'User profile retrieved');
});

export const updatePassword = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?._id) {
      return ResponseUtil.error(res, 'User not found', 404);
    }

    const { currentPassword, newPassword } = req.body;

    const result = await AuthService.updatePassword(
      req.user._id.toString(),
      currentPassword,
      newPassword
    );

    // Set new refresh token in HTTP-only cookie
    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    ResponseUtil.success(
      res,
      { accessToken: result.tokens.accessToken },
      'Password updated successfully'
    );
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  // Clear refresh token cookie
  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  ResponseUtil.success(res, null, 'Logged out successfully');
});
