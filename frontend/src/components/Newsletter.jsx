import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Welcome to the Inner Circle!');
    setEmail('');
  };

  return (
    <section className="py-20 bg-champagne">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="section-subtitle">Stay Connected</p>
        <h2 className="section-title text-charcoal">Join the Inner Circle</h2>
        <div className="gold-divider" />
        <p className="text-sm font-body text-charcoal/70 mt-6 mb-10 leading-relaxed">
          Subscribe for exclusive access to new arrivals, member-only offers, private sale events
          and curated style edits delivered directly to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="input-luxury flex-1 text-sm"
          />
          <button type="submit" className="btn-gold whitespace-nowrap">
            Subscribe
          </button>
        </form>
        <p className="text-[10px] text-charcoal/40 mt-4 font-body tracking-wide">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
