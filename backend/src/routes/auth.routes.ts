// src/routes/auth.routes.ts
import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = express.Router();

// Public routes (placeholder)
router.post('/login', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/register', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

// Protected routes (placeholder)
router.use(protect); // All routes below this will require authentication

router.get('/me', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/logout', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

// Admin only routes (placeholder)
router.use(restrictTo('admin')); // All routes below this will require admin role

router.get('/users', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;
