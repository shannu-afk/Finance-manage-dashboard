import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// User profile routes would go here
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'User profile endpoint' });
});

export default router;
