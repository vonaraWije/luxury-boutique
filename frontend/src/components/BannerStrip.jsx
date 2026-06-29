import { Link } from 'react-router-dom';

export default function BannerStrip() {
  return (
    <section className="relative py-28 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
        alt="New Arrivals"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 text-center px-6 animate-fade-in">
        <p className="text-xs tracking-[0.6em] uppercase text-gold-400 font-body mb-4">Limited Edition</p>
        <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
          New Arrivals Just Dropped
        </h2>
        <p className="text-white/70 font-body text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Be the first to discover the season's most coveted pieces — from statement jewellery to effortless eveningwear.
        </p>
        <Link to="/products?newArrival=true" className="btn-gold">
          Shop New Arrivals
        </Link>
      </div>
    </section>
  );
}
