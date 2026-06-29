const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const GiftCard = require('../models/GiftCard');
const { sendGiftCardEmail } = require('../utils/mailer');

// Generate a unique gift card code: LM-XXXX-XXXX
function generateCode() {
  const part = () => crypto.randomBytes(2).toString('hex').toUpperCase();
  return `LM-${part()}-${part()}`;
}

// POST /api/gift-cards — purchase & email a gift card
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { recipientName, recipientEmail, senderName, message, amount } = req.body;

    if (!recipientName || !recipientEmail || !senderName || !amount) {
      res.status(400);
      throw new Error('recipientName, recipientEmail, senderName and amount are required.');
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount < 50) {
      res.status(400);
      throw new Error('Minimum gift card value is $50.');
    }

    // Generate a unique code (retry on collision)
    let code;
    let attempts = 0;
    do {
      code = generateCode();
      attempts++;
      if (attempts > 10) throw new Error('Failed to generate unique code. Try again.');
    } while (await GiftCard.findOne({ code }));

    const giftCard = await GiftCard.create({
      code,
      amount: parsedAmount,
      recipientName,
      recipientEmail,
      senderName,
      message: message || '',
    });

    // Send email — if email fails, still return success but note it
    let emailSent = true;
    try {
      await sendGiftCardEmail({
        recipientName,
        recipientEmail,
        senderName,
        message,
        amount: parsedAmount,
        code,
        expiresAt: giftCard.expiresAt,
      });
    } catch (emailErr) {
      console.error('Gift card email failed:', emailErr.message);
      emailSent = false;
    }

    res.status(201).json({
      success: true,
      emailSent,
      code: giftCard.code,
      amount: giftCard.amount,
      expiresAt: giftCard.expiresAt,
    });
  })
);

// GET /api/gift-cards/:code — validate a code at checkout
router.get(
  '/:code',
  asyncHandler(async (req, res) => {
    const card = await GiftCard.findOne({ code: req.params.code.toUpperCase() });
    if (!card) {
      res.status(404);
      throw new Error('Gift card not found.');
    }
    if (card.redeemed) {
      res.status(400);
      throw new Error('This gift card has already been redeemed.');
    }
    if (new Date() > card.expiresAt) {
      res.status(400);
      throw new Error('This gift card has expired.');
    }
    res.json({ valid: true, amount: card.amount, code: card.code });
  })
);

module.exports = router;
