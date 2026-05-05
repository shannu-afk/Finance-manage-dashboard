import Transaction from '../models/Transaction.js';
import Account from '../models/Account.js';

export const getTransactions = async (req, res) => {
  try {
    const { accountId, category, startDate, endDate } = req.query;
    let filter = { userId: req.user.id };

    if (accountId) filter.accountId = accountId;
    if (category) filter.category = category;

    if (startDate || endDate) {
      filter.transactionDate = {};
      if (startDate) filter.transactionDate.$gte = new Date(startDate);
      if (endDate) filter.transactionDate.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(filter)
      .populate('accountId', 'accountName')
      .sort({ transactionDate: -1 });

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { accountId, amount, type, category, merchant, description, transactionDate } = req.body;

    // Check if account exists and belongs to user
    const account = await Account.findById(accountId);
    if (!account || account.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Account not found or not authorized' });
    }

    const transaction = await Transaction.create({
      userId: req.user.id,
      accountId,
      amount,
      type,
      category,
      merchant,
      description,
      transactionDate: transactionDate || new Date(),
      isManual: true,
    });

    // Update account balance based on transaction type
    if (type === 'debit') {
      account.balance -= amount;
    } else {
      account.balance += amount;
    }
    await account.save();

    res.status(201).json({
      success: true,
      transaction,
      account,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this transaction' });
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this transaction' });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Transaction deleted',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSpendingByCategory = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let match = { userId: req.user.id, type: 'debit' };

    if (startDate || endDate) {
      match.transactionDate = {};
      if (startDate) match.transactionDate.$gte = new Date(startDate);
      if (endDate) match.transactionDate.$lte = new Date(endDate);
    }

    const spending = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.status(200).json({
      success: true,
      spending,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMonthlyTrend = async (req, res) => {
  try {
    const trend = await Transaction.aggregate([
      {
        $match: { userId: req.user.id },
      },
      {
        $group: {
          _id: {
            year: { $year: '$transactionDate' },
            month: { $month: '$transactionDate' },
          },
          income: {
            $sum: { $cond: [{ $eq: ['$type', 'credit'] }, '$amount', 0] },
          },
          expense: {
            $sum: { $cond: [{ $eq: ['$type', 'debit'] }, '$amount', 0] },
          },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      trend,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
