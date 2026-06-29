import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMail, FiArrowRight, FiCheck } from 'react-icons/fi';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Welcome to the Inner Circle!');
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Image side */}
      <div className="relative hidden lg:block min-h-[520px]">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=85"
          alt="Luxury lifestyle"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        {/* Floating quote */}
        <div className="absolute inset-0 flex flex-col justify-end p-14">
          <div className="border-l-2 border-gold-500/60 pl-6">
            <p className="font-serif text-2xl text-white leading-relaxed mb-4">
              "Luxury is the ease of a t-shirt<br />in a very expensive dress."
            </p>
            <p className="text-xs tracking-[0.4em] uppercase text-gold-300 font-body">— Karl Lagerfeld</p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="bg-charcoal flex items-center justify-center px-10 py-20">
        <div className="max-w-sm w-full">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold-500/50" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400 font-body">Stay Connected</p>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">
            Join the<br />Inner Circle
          </h2>
          <div className="w-12 h-px bg-gold-gradient mb-6 mt-4" />
          <p className="text-sm font-body text-cream/55 mb-8 leading-relaxed">
            Subscribe for exclusive access to new arrivals, member-only offers,
            private sale events and curated style edits.
          </p>

          {/* Perks list */}
          <ul className="space-y-2 mb-8">
            {['Early access to new collections', 'Members-only private sales', 'Curated weekly style edits'].map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-xs font-body text-cream/60">
                <FiCheck size={13} className="text-gold-500 flex-shrink-0" />
                {perk}
              </li>
            ))}
          </ul>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50 pointer-events-none" size={14} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/15 px-4 py-3 pl-11 text-sm font-body text-cream placeholder-cream/30 focus:outline-none focus:border-gold-500 transition-colors duration-200 tracking-wide"
              />
            </div>
            <button
              type="submit"
              className="btn-gold w-full"
            >
              {submitted ? (
                <><FiCheck size={13} /> Subscribed!</>
              ) : (
                <>Subscribe <FiArrowRight size={13} /></>
              )}
            </button>
          </form>

          <p className="text-[10px] text-cream/25 mt-5 font-body tracking-wide">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
