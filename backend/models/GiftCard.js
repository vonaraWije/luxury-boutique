const mongoose = require('mongoose');

const giftCardSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    amount: { type: Number, required: true, min: 50 },
    recipientName: { type: String, required: true },
    recipientEmail: { type: String, required: true },
    senderName: { type: String, required: true },
    message: { type: String, default: '' },
    redeemed: { type: Boolean, default: false },
    redeemedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000) },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GiftCard', giftCardSchema);
