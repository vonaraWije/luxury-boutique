import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useCart();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="group relative bg-white card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-50">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNewArrival  && <span className="badge-gold">New</span>}
          {product.isBestseller  && <span className="badge-dark">Bestseller</span>}
          {discount              && <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 tracking-wider uppercase">-{discount}%</span>}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm"
        >
          <FiHeart size={14} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal'} />
        </button>

        {/* Quick add - slides up on hover */}
        <div className={`absolute bottom-0 left-0 right-0 bg-charcoal/95 py-3 px-4 flex items-center justify-between transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <span className="text-xs tracking-widest uppercase text-cream font-body">Quick Add</span>
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product, 1); }}
            className="w-8 h-8 bg-gold-gradient flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <FiShoppingBag size={13} className="text-white" />
          </button>
        </div>
      </div>

      {/* Info */}
      <Link to={`/products/${product._id}`} className="block p-4">
        {product.brand && (
          <p className="text-[10px] tracking-widest uppercase text-gold-500 font-body mb-1">{product.brand}</p>
        )}
        <h3 className="font-serif text-base text-charcoal mb-2 line-clamp-2 leading-snug">{product.name}</h3>

        {/* Rating */}
        {product.numReviews > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <FiStar key={s} size={11} className={s <= Math.round(product.rating) ? 'fill-gold-500 text-gold-500' : 'text-gray-200'} />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-body">({product.numReviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg text-charcoal">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through font-body">${product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
