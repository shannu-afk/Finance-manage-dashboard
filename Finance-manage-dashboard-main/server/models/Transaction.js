import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['debit', 'credit'],
      required: true,
    },
    category: {
      type: String,
      default: 'Uncategorized',
    },
    merchant: {
      type: String,
      default: 'Unknown',
    },
    description: {
      type: String,
      default: '',
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    plaidTransactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isManual: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
