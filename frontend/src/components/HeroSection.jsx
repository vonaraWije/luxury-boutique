import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90',
    tag: 'New Collection 2026',
    title: ['The Art of', 'Refined', 'Living'],
    sub: 'Haute couture clothing & exquisite jewellery — each piece a testament to impeccable craftsmanship.',
    cta: { label: 'Explore Collection', to: '/products' },
    cta2: { label: 'New Arrivals', to: '/products?newArrival=true' },
  },
  {
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1800&q=90',
    tag: 'Fine Jewellery',
    title: ['Adorned in', 'Pure', 'Brilliance'],
    sub: 'Diamonds, sapphires and pearls set in 18k gold — crafted to be worn across generations.',
    cta: { label: 'Shop Jewellery', to: '/products?category=jewellery' },
    cta2: { label: 'View Bestsellers', to: '/products?bestseller=true' },
  },
  {
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1800&q=90',
    tag: 'Luxury Beauty',
    title: ['Rare Beauty', 'Rituals for', 'the Discerning'],
    sub: 'Caviar serums, velvet lips and intoxicating fragrances — beauty as an act of self-reverence.',
    cta: { label: 'Shop Cosmetics', to: '/products?category=cosmetics' },
    cta2: { label: 'Discover Fragrances', to: '/products?category=cosmetics&subcategory=fragrance' },
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 400);
  };

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#060606]">

      {/* Background */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <img
          key={current}
          src={slide.image}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.38)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-10 top-0 bottom-0 hidden lg:flex flex-col items-center gap-0 z-10">
        <div className="flex-1 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-14 lg:px-20 py-32">
          <div className={`max-w-3xl transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>

            {/* Tag */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-gold-500" />
              <p className="text-[10px] tracking-[0.6em] uppercase text-gold-400 font-body">{slide.tag}</p>
            </div>

            {/* Headline */}
            <h1 className="font-serif leading-[1.1] mb-8">
              <span className="block text-5xl md:text-6xl lg:text-7xl text-white">{slide.title[0]}</span>
              <span className="block text-5xl md:text-6xl lg:text-8xl text-gold-400 italic">{slide.title[1]}</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl text-white">{slide.title[2]}</span>
            </h1>

            {/* Sub */}
            <p className="text-sm md:text-base text-white/60 font-body leading-relaxed mb-12 max-w-xl">
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={slide.cta.to} className="btn-gold text-xs tracking-widest">
                {slide.cta.label} <FiArrowRight size={13} />
              </Link>
              <Link
                to={slide.cta2.to}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/30 text-white text-xs tracking-widest uppercase font-body hover:border-gold-500 hover:text-gold-400 transition-all duration-300"
              >
                {slide.cta2.label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20 py-6 flex items-center justify-between">

          {/* Slide dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-1 bg-gold-500' : 'w-2 h-1 bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center gap-10">
            {[['500+', 'Curated Pieces'], ['15+', 'Luxury Brands'], ['10K+', 'Happy Clients']].map(([num, label]) => (
              <div key={label} className="text-right">
                <p className="font-serif text-xl text-gold-400">{num}</p>
                <p className="text-[9px] tracking-widest uppercase text-white/40 font-body">{label}</p>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2 text-white/30">
            <div className="w-px h-8 bg-gold-500/40 animate-pulse" />
            <span className="text-[8px] tracking-widest uppercase font-body">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
