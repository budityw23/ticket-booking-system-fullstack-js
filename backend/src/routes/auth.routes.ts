// src/routes/auth.routes.ts
import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import {
  register,
  login,
  getMe,
  refreshToken,
  updatePassword,
  logout
} from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { authValidation } from '../utils/validationRules';

const router = express.Router();

// Public routes
router.post('/register', authValidation.register, validateRequest, register);

router.post('/login', authValidation.login, validateRequest, login);

router.post('/refresh-token', refreshToken);

// Protected routes
router.use(protect); // Middleware to protect all routes below

router.get('/me', getMe);

router.post(
  '/update-password',
  authValidation.updatePassword,
  validateRequest,
  updatePassword
);

router.post('/logout', logout);

// Admin only routes
router.use(restrictTo('admin')); // Middleware to restrict to admin role

router.get('/users', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;
