// src/routes/auth.routes.ts
import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { register, login, getMe } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { authValidation } from '../utils/validationRules';

const router = express.Router();

router.post('/register', authValidation.register, validateRequest, register);
router.post('/login', authValidation.login, validateRequest, login);
router.get('/me', protect, getMe);

// Protected routes (placeholder)
router.use(protect); // All routes below this will require authentication

router.post('/logout', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

// Admin only routes (placeholder)
router.use(restrictTo('admin')); // All routes below this will require admin role

router.get('/users', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;
