import express from 'express';
import { createLinkToken, exchangePublicToken, getPlaidAccounts } from '../controllers/plaidController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/link_token', protect, createLinkToken);
router.post('/exchange', protect, exchangePublicToken);
router.get('/', protect, getPlaidAccounts);

export default router;
