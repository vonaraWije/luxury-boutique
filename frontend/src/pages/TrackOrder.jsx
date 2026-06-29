import { useState } from 'react';
import { FiSearch, FiPackage, FiTruck, FiCheckCircle, FiMapPin, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const mockSteps = [
  { Icon: FiCheckCircle, label: 'Order Confirmed', date: 'Jun 25, 2026 · 10:14 am', done: true },
  { Icon: FiPackage,     label: 'Preparing Your Order', date: 'Jun 25, 2026 · 3:47 pm', done: true },
  { Icon: FiTruck,       label: 'Dispatched', date: 'Jun 26, 2026 · 9:02 am', done: true },
  { Icon: FiMapPin,      label: 'Out for Delivery', date: 'Jun 27, 2026 · 7:30 am', done: false, active: true },
  { Icon: FiCheckCircle, label: 'Delivered', date: 'Estimated Jun 27, 2026', done: false },
];

export default function TrackOrder() {
  const [form, setForm] = useState({ order: '', email: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (form.order.toUpperCase().startsWith('LM')) {
        setResult({ orderNumber: form.order.toUpperCase(), status: 'Out for Delivery', steps: mockSteps });
      } else {
        setError('No order found with that number and email combination. Please check your details and try again.');
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-cream page-enter">
      {/* Hero */}
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80"
          alt="Track Order"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.6em] uppercase text-gold-400 font-body mb-3">Real-Time Updates</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Track Your Order</h1>
          <div className="w-16 h-px bg-gold-gradient mx-auto" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-20">
        {/* Search form */}
        <div className="bg-white border border-gray-100 shadow-sm p-10 mb-10">
          <p className="text-[10px] tracking-[0.5em] uppercase text-gold-500 font-body mb-2">Enter Your Details</p>
          <h2 className="font-serif text-2xl text-charcoal mb-6">Find Your Order</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-body px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">
                Order Number
              </label>
              <input
                type="text"
                required
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                className="input-luxury"
                placeholder="e.g. LM-2026-00123"
              />
              <p className="text-[10px] text-charcoal/40 font-body mt-1.5">Found in your order confirmation email</p>
            </div>
            <div>
              <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-luxury"
                placeholder="The email used at checkout"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full">
              {loading ? 'Searching…' : <><FiSearch size={13} /> Track Order</>}
            </button>
          </form>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-white border border-gray-100 shadow-sm p-10 animate-fade-in">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <div>
                <p className="text-[10px] tracking-widest uppercase font-body text-charcoal/50 mb-1">Order</p>
                <p className="font-serif text-xl text-charcoal">{result.orderNumber}</p>
              </div>
              <span className="flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 text-xs tracking-wider uppercase text-gold-600 font-body">
                <FiClock size={11} />
                {result.status}
              </span>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {result.steps.map(({ Icon, label, date, done, active }, i) => (
                <div key={label} className="flex gap-5">
                  {/* Line + dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${done ? 'bg-gold-500 border-gold-500' : active ? 'bg-white border-gold-500' : 'bg-white border-gray-200'}`}>
                      <Icon size={16} className={done ? 'text-white' : active ? 'text-gold-500' : 'text-gray-300'} />
                    </div>
                    {i < result.steps.length - 1 && (
                      <div className={`w-px flex-1 my-1 ${done ? 'bg-gold-500' : 'bg-gray-200'}`} style={{ minHeight: '32px' }} />
                    )}
                  </div>
                  {/* Text */}
                  <div className="pb-6">
                    <p className={`text-sm font-body font-semibold mb-0.5 ${done || active ? 'text-charcoal' : 'text-charcoal/35'}`}>
                      {label}
                    </p>
                    <p className={`text-xs font-body ${done ? 'text-charcoal/50' : active ? 'text-gold-600' : 'text-charcoal/25'}`}>
                      {date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help note */}
        <div className="mt-8 text-center">
          <p className="text-sm font-body text-charcoal/50">
            Can't find your order?{' '}
            <Link to="/contact" className="text-gold-600 hover:underline">Contact our team</Link>
            {' '}and we'll help right away.
          </p>
          <p className="text-xs font-body text-charcoal/35 mt-2">
            Signed-in members can track all orders under{' '}
            <Link to="/profile" className="text-gold-600 hover:underline">My Profile → Orders</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
