const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

router.get('/product/:productId', asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });
  res.json(reviews);
}));

router.post('/', protect, asyncHandler(async (req, res) => {
  const { productId, rating, title, comment } = req.body;
  const existing = await Review.findOne({ user: req.user._id, product: productId });
  if (existing) return res.status(400).json({ message: 'You already reviewed this product' });

  const review = await Review.create({ user: req.user._id, product: productId, rating, title, comment });

  const reviews = await Review.find({ product: productId });
  const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  await Product.findByIdAndUpdate(productId, { rating: avg.toFixed(1), numReviews: reviews.length });

  res.status(201).json(review);
}));

router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Not authorized' });
  await review.deleteOne();
  res.json({ message: 'Review removed' });
}));

module.exports = router;
