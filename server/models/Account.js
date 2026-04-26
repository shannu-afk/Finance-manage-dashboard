import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plaidAccountId: {
      type: String,
      unique: true,
      sparse: true,
    },
    plaidAccessToken: {
      type: String,
      select: false,
    },
    accountName: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      default: 'Manual',
    },
    accountType: {
      type: String,
      enum: ['checking', 'savings', 'credit', 'investment', 'other'],
      default: 'other',
    },
    balance: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    isConnected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Account', accountSchema);
