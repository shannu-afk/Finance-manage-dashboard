import express from 'express';
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountBalance,
} from '../controllers/accountController.js';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSpendingByCategory,
  getMonthlyTrend,
} from '../controllers/transactionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Account routes
router.use(protect);
router.get('/', getAccounts);
router.post('/', createAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);
router.get('/balance/total', getAccountBalance);

// Transaction routes
router.get('/transactions/all', getTransactions);
router.post('/transactions', createTransaction);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);
router.get('/analytics/spending', getSpendingByCategory);
router.get('/analytics/trend', getMonthlyTrend);

export default router;
