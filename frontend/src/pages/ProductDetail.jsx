import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiHeart, FiShoppingBag, FiArrowLeft, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct]   = useState(null);
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize]   = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty]           = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);

  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    Promise.all([
      api.get(`/products/${id}`),
      api.get(`/reviews/product/${id}`),
    ]).then(([{ data: p }, { data: r }]) => {
      setProduct(p);
      setReviews(r);
      if (p.sizes?.length)  setSelectedSize(p.sizes[0]);
      if (p.colors?.length) setSelectedColor(p.colors[0]);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.sizes?.length && !selectedSize) return toast.error('Please select a size');
    addToCart(product, qty, selectedSize, selectedColor);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please sign in to leave a review');
    setSubmitting(true);
    try {
      const { data } = await api.post('/reviews', { productId: id, ...reviewForm });
      setReviews((prev) => [{ ...data, user: { name: user.name } }, ...prev]);
      setReviewForm({ rating: 5, title: '', comment: '' });
      toast.success('Review submitted');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream gap-4">
      <p className="font-serif text-2xl text-charcoal">Product not found</p>
      <Link to="/products" className="btn-gold">Back to Shop</Link>
    </div>
  );

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-cream page-enter">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs font-body text-gray-400 uppercase tracking-wider">
          <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gold-600 transition-colors">Shop</Link>
          {product.category && <>
            <span>/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-gold-600 transition-colors capitalize">{product.category}</Link>
          </>}
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-gray-50 overflow-hidden">
              <img
                src={product.images?.[selectedImg] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-20 h-24 overflow-hidden border-2 transition-colors ${selectedImg === i ? 'border-gold-500' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.brand && (
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold-500 font-body mb-2">{product.brand}</p>
            )}
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 leading-tight">{product.name}</h1>

            {/* Rating */}
            {product.numReviews > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <FiStar key={s} size={14} className={s <= Math.round(product.rating) ? 'fill-gold-500 text-gold-500' : 'text-gray-200'} />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-body">{product.rating} · {product.numReviews} reviews</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-serif text-3xl text-charcoal">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through font-body">${product.originalPrice.toLocaleString()}</span>
              )}
              {discount && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wider">Save {discount}%</span>
              )}
            </div>

            <div className="w-12 h-px bg-gold-gradient mb-6" />

            <p className="text-sm font-body text-charcoal/70 leading-relaxed mb-8">{product.description}</p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase font-body text-charcoal mb-3">Colour: <span className="text-gold-600">{selectedColor}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-1.5 text-xs font-body border tracking-wider transition-colors duration-150 ${selectedColor === c ? 'bg-charcoal text-white border-charcoal' : 'border-gray-200 text-charcoal hover:border-charcoal'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase font-body text-charcoal mb-3">Size: <span className="text-gold-600">{selectedSize}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-12 text-xs font-body border transition-colors duration-150 ${selectedSize === s ? 'bg-charcoal text-white border-charcoal' : 'border-gray-200 text-charcoal hover:border-charcoal'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add to bag */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-gray-200">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-12 flex items-center justify-center text-charcoal hover:bg-champagne transition-colors">−</button>
                <span className="w-10 text-center text-sm font-body">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-12 flex items-center justify-center text-charcoal hover:bg-champagne transition-colors">+</button>
              </div>
              <button onClick={handleAddToCart} className="btn-gold flex-1">
                <FiShoppingBag size={15} />
                Add to Bag
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-gold-500 transition-colors"
              >
                <FiHeart size={16} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal'} />
              </button>
            </div>

            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-xs text-amber-600 font-body mb-4 tracking-wide">Only {product.stock} left in stock</p>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
              {[
                { icon: FiTruck,     label: 'Free Shipping', sub: 'Orders over $500' },
                { icon: FiRefreshCw, label: 'Easy Returns',  sub: '30-day policy' },
                { icon: FiShield,    label: 'Authenticity',  sub: '100% guaranteed' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon size={18} className="text-gold-500 mx-auto mb-1.5" />
                  <p className="text-[10px] tracking-wider uppercase font-body text-charcoal">{label}</p>
                  <p className="text-[9px] text-gray-400 font-body">{sub}</p>
                </div>
              ))}
            </div>

            {/* Product details */}
            {(product.material || product.careInstructions || product.weight) && (
              <div className="mt-8 pt-8 border-t border-gray-100 space-y-2">
                {product.material          && <p className="text-xs font-body text-charcoal/70"><span className="font-semibold uppercase tracking-wider text-charcoal text-[10px]">Material:</span> {product.material}</p>}
                {product.weight            && <p className="text-xs font-body text-charcoal/70"><span className="font-semibold uppercase tracking-wider text-charcoal text-[10px]">Weight/Size:</span> {product.weight}</p>}
                {product.careInstructions  && <p className="text-xs font-body text-charcoal/70"><span className="font-semibold uppercase tracking-wider text-charcoal text-[10px]">Care:</span> {product.careInstructions}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <p className="section-subtitle">What Clients Say</p>
            <h2 className="section-title">Reviews</h2>
            <div className="gold-divider" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Review list */}
            <div className="lg:col-span-2 space-y-6">
              {reviews.length === 0 ? (
                <p className="text-sm font-body text-gray-400 text-center py-10">No reviews yet. Be the first!</p>
              ) : reviews.map((r) => (
                <div key={r._id} className="bg-white p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex gap-0.5 mb-1.5">
                        {[1,2,3,4,5].map((s) => (
                          <FiStar key={s} size={12} className={s <= r.rating ? 'fill-gold-500 text-gold-500' : 'text-gray-200'} />
                        ))}
                      </div>
                      <p className="font-serif text-base text-charcoal">{r.title}</p>
                    </div>
                    <p className="text-[10px] text-gray-400 font-body">{new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm font-body text-charcoal/70 leading-relaxed">{r.comment}</p>
                  <p className="text-[10px] tracking-wider uppercase text-gold-500 font-body mt-3">— {r.user?.name}</p>
                </div>
              ))}
            </div>

            {/* Write review */}
            <div className="bg-champagne p-6">
              <h3 className="font-serif text-xl text-charcoal mb-5">Write a Review</h3>
              {!user ? (
                <div className="text-center py-6">
                  <p className="text-sm font-body text-charcoal/70 mb-4">Please sign in to leave a review</p>
                  <Link to="/login" className="btn-gold text-xs">Sign In</Link>
                </div>
              ) : (
                <form onSubmit={handleReview} className="space-y-4">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: s })}
                        >
                          <FiStar size={20} className={s <= reviewForm.rating ? 'fill-gold-500 text-gold-500' : 'text-gray-300 hover:text-gold-400'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">Title</label>
                    <input
                      required
                      value={reviewForm.title}
                      onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                      className="input-luxury text-sm"
                      placeholder="Review title"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">Comment</label>
                    <textarea
                      required
                      rows={4}
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      className="input-luxury text-sm resize-none"
                      placeholder="Share your experience..."
                    />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-gold w-full">
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
