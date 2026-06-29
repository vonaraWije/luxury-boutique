import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { RiVipCrownLine } from 'react-icons/ri';

export default function BannerStrip() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[420px]">
      {/* Left panel – New Arrivals */}
      <div className="relative overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80"
          alt="New Arrivals"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 flex flex-col justify-end h-full p-10 md:p-14">
          <p className="text-[10px] tracking-[0.6em] uppercase text-gold-400 font-body mb-3">Limited Edition</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-snug">
            New Arrivals<br />Just Dropped
          </h2>
          <p className="text-white/65 font-body text-sm max-w-xs mb-8 leading-relaxed">
            Be the first to discover the season's most coveted pieces — from statement jewellery to effortless eveningwear.
          </p>
          <Link
            to="/products?newArrival=true"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-body text-gold-400 border-b border-gold-400/50 pb-1 hover:text-gold-300 hover:border-gold-300 transition-colors duration-200 self-start"
          >
            Shop New Arrivals <FiArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Right panel – Bestsellers */}
      <div className="relative overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
          alt="Bestsellers"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 flex flex-col justify-end h-full p-10 md:p-14">
          <div className="flex items-center gap-3 mb-3">
            <RiVipCrownLine size={14} className="text-gold-400" />
            <p className="text-[10px] tracking-[0.6em] uppercase text-gold-400 font-body">Most Loved</p>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-snug">
            Bestsellers<br />This Season
          </h2>
          <p className="text-white/65 font-body text-sm max-w-xs mb-8 leading-relaxed">
            Our most coveted styles, loved by thousands of clients worldwide. Timeless pieces that never go out of fashion.
          </p>
          <Link
            to="/products?bestseller=true"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-body text-gold-400 border-b border-gold-400/50 pb-1 hover:text-gold-300 hover:border-gold-300 transition-colors duration-200 self-start"
          >
            Shop Bestsellers <FiArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
