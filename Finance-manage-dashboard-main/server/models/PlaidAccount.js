import mongoose from 'mongoose';

const plaidAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  accountId: String,
  institutionId: String,
  institutionName: String,
  mask: String,
  name: String,
  officialName: String,
  type: String,
}, { timestamps: true });

export default mongoose.model('PlaidAccount', plaidAccountSchema);
