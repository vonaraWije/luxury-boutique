import { FiTruck, FiShield, FiGift, FiAward } from 'react-icons/fi';
import { RiVipCrownLine } from 'react-icons/ri';

const promises = [
  {
    Icon: FiTruck,
    title: 'Complimentary Shipping',
    desc: 'Free express worldwide delivery on all orders over $500.',
  },
  {
    Icon: FiShield,
    title: 'Authenticity Guaranteed',
    desc: 'Every piece is verified and certified for genuine luxury provenance.',
  },
  {
    Icon: FiGift,
    title: 'Luxury Packaging',
    desc: 'Signature gift-ready presentation in our branded keepsake boxes.',
  },
  {
    Icon: RiVipCrownLine,
    title: 'Exclusive Access',
    desc: 'Members-only collections, private sales and curated style edits.',
  },
];

export default function LuxuryPromise() {
  return (
    <section className="relative overflow-hidden bg-[#faf9f7] py-20">
      {/* Decorative background motif */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center opacity-[0.03]">
        <span className="font-serif text-[30rem] text-gold-500 leading-none">L</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gold-500/40" />
            <FiAward size={14} className="text-gold-500" />
            <div className="h-px w-16 bg-gold-500/40" />
          </div>
          <p className="text-[10px] tracking-[0.6em] uppercase text-gold-500 font-body mb-3">Why Choose Us</p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">The Lumière Promise</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
          {promises.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-white px-8 py-10 flex flex-col items-center text-center hover:bg-charcoal transition-colors duration-500"
            >
              <div className="w-16 h-16 border border-gold-500/40 flex items-center justify-center mb-6 group-hover:border-gold-400 transition-colors duration-500">
                <Icon size={26} className="text-gold-500 group-hover:text-gold-400 transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-lg text-charcoal group-hover:text-white mb-3 transition-colors duration-500">
                {title}
              </h3>
              <p className="text-sm font-body text-gray-500 group-hover:text-white/60 leading-relaxed transition-colors duration-500">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
