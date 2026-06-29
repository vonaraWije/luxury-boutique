const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

// GET /api/users/profile
router.get('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password').populate('wishlist');
  res.json(user);
}));

// PUT /api/users/profile
router.put('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = req.body.password;
  if (req.body.avatar) user.avatar = req.body.avatar;
  const updated = await user.save();
  res.json({ _id: updated._id, name: updated.name, email: updated.email, avatar: updated.avatar });
}));

// POST /api/users/wishlist/:productId
router.post('/wishlist/:productId', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const pid = req.params.productId;
  const idx = user.wishlist.indexOf(pid);
  if (idx === -1) user.wishlist.push(pid);
  else user.wishlist.splice(idx, 1);
  await user.save();
  res.json({ wishlist: user.wishlist });
}));

// PUT /api/users/address
router.put('/address', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.addresses.push(req.body);
  await user.save();
  res.json(user.addresses);
}));

// GET /api/users — admin
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
}));

module.exports = router;
