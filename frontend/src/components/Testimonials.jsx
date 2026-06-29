import { FiStar } from 'react-icons/fi';

const reviews = [
  {
    name: 'Sophia L.',
    role: 'Fashion Editor, Vogue',
    text: 'Lumière curates only the most extraordinary pieces. My silk evening gown arrived beautifully packaged and fits like it was made for me.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
  },
  {
    name: 'Isabelle D.',
    role: 'Interior Designer, London',
    text: 'The diamond necklace I purchased exceeded every expectation. The craftsmanship is extraordinary and the service impeccable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80',
  },
  {
    name: 'Elena M.',
    role: 'CEO, Maison Group',
    text: 'Their caviar skin serum has become an essential part of my daily ritual. My skin has never looked more radiant. Absolutely divine.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&q=80',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.12)' }}
        />
        <div className="absolute inset-0 bg-charcoal/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-gold-500/50" />
            <p className="text-[10px] tracking-[0.6em] uppercase text-gold-400 font-body">Client Stories</p>
            <div className="h-px w-16 bg-gold-500/50" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-white">Words of Distinction</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:border-gold-500/50 transition-all duration-400 group"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Quote mark */}
              <div className="font-serif text-6xl text-gold-500/20 leading-none mb-4 select-none">"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(r.rating)].map((_, idx) => (
                  <FiStar key={idx} size={12} className="fill-gold-500 text-gold-500" />
                ))}
              </div>

              <p className="font-serif text-base text-white/75 leading-relaxed mb-8 italic">
                {r.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover border border-gold-500/30"
                />
                <div>
                  <p className="text-sm font-body text-white font-semibold">{r.name}</p>
                  <p className="text-[9px] tracking-widest uppercase text-gold-400 font-body mt-0.5">{r.role}</p>
                </div>
              </div>

              {/* Hover gold accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold-gradient group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom trust badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-10 md:gap-16">
          {[
            ['10,000+', 'Happy Clients'],
            ['100%', 'Authentic Products'],
            ['5★', 'Average Rating'],
            ['Free', 'Luxury Packaging'],
          ].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="font-serif text-3xl text-gold-400 mb-1">{val}</p>
              <p className="text-[9px] tracking-widest uppercase text-white/40 font-body">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
