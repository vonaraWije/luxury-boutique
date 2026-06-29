import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { GiDiamondRing, GiPerfumeBottle, GiLipstick } from 'react-icons/gi';
import { MdOutlineCheckroom } from 'react-icons/md';
import { PiHandbag } from 'react-icons/pi';

const cats = [
  {
    label: 'Clothing',
    desc: 'Haute couture & ready-to-wear',
    path: '/products?category=clothing',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85',
    span: 'md:col-span-2 md:row-span-2',
    size: 'large',
    Icon: MdOutlineCheckroom,
  },
  {
    label: 'Jewellery',
    desc: 'Gold, diamonds & precious stones',
    path: '/products?category=jewellery',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85',
    span: '',
    size: 'small',
    Icon: GiDiamondRing,
  },
  {
    label: 'Cosmetics',
    desc: 'Rare formulations & fragrances',
    path: '/products?category=cosmetics',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=85',
    span: '',
    size: 'small',
    Icon: GiPerfumeBottle,
  },
  {
    label: 'Accessories',
    desc: 'Bags, belts, scarves & eyewear',
    path: '/products?category=accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85',
    span: 'md:col-span-2',
    size: 'small',
    Icon: PiHandbag,
  },
];

export default function CategorySection() {
  return (
    <section className="py-24 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-600 font-body mb-3">Curated For You</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Shop by Category</h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-body text-charcoal hover:text-gold-600 transition-colors duration-200 border-b border-charcoal/30 hover:border-gold-600 pb-1 self-start md:self-auto"
          >
            View All Collections <FiArrowRight size={12} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[260px]">
          {cats.map((cat) => (
            <Link
              key={cat.label}
              to={cat.path}
              className={`relative overflow-hidden group ${cat.span}`}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-500/60 transition-all duration-500" />

              {/* Category icon – top right */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <cat.Icon size={18} className="text-gold-400" />
              </div>

              {/* Text */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <p className="text-[9px] tracking-[0.4em] uppercase text-gold-400 font-body mb-2">{cat.desc}</p>
                <h3 className={`font-serif text-white mb-4 ${cat.size === 'large' ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                  {cat.label}
                </h3>
                <span className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-gold-400 font-body opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
                  Explore <FiArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
