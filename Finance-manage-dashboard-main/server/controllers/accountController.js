import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id });
    res.status(200).json({
      success: true,
      accounts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAccount = async (req, res) => {
  try {
    const { accountName, accountType, balance } = req.body;

    const account = await Account.create({
      userId: req.user.id,
      accountName,
      accountType,
      balance,
      isConnected: true,
    });

    res.status(201).json({
      success: true,
      account,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAccount = async (req, res) => {
  try {
    let account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // Check if user is the account owner
    if (account.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this account' });
    }

    account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      account,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (account.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this account' });
    }

    // Also delete associated transactions
    await Transaction.deleteMany({ accountId: req.params.id });

    await Account.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Account deleted',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAccountBalance = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id });
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    res.status(200).json({
      success: true,
      totalBalance,
      accountCount: accounts.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
