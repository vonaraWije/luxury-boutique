const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number },
    category: {
      type: String,
      required: true,
      enum: ['clothing', 'jewellery', 'cosmetics', 'accessories'],
    },
    subcategory: { type: String },
    brand: { type: String },
    images: [{ type: String }],
    stock: { type: Number, required: true, default: 0 },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    tags: [{ type: String }],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    weight: { type: String },
    material: { type: String },
    careInstructions: { type: String },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
