import { useState } from 'react';
import { FiGift, FiCheck, FiArrowRight, FiMail } from 'react-icons/fi';
import { RiVipCrownLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import api from '../utils/api';

const amounts = [100, 250, 500, 1000, 2500, 5000];

const perks = [
  { Icon: FiGift,         text: 'Delivered instantly by email' },
  { Icon: FiCheck,        text: 'Valid for 5 years from purchase' },
  { Icon: RiVipCrownLine, text: 'Redeemable on all products' },
  { Icon: FiMail,         text: 'Personalised message included' },
];

export default function GiftCards() {
  const [selected, setSelected] = useState(250);
  const [custom, setCustom] = useState('');
  const [form, setForm] = useState({ recipientName: '', recipientEmail: '', senderName: '', message: '' });
  const [loading, setLoading] = useState(false);

  const finalAmount = custom ? Number(custom) : selected;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (finalAmount < 50) { toast.error('Minimum gift card value is $50.'); return; }
    setLoading(true);
    try {
      const { data } = await api.post('/gift-cards', {
        recipientName: form.recipientName,
        recipientEmail: form.recipientEmail,
        senderName: form.senderName,
        message: form.message,
        amount: finalAmount,
      });
      if (data.emailSent) {
        toast.success(`Gift card for $${finalAmount} sent to ${form.recipientEmail}!`);
      } else {
        toast.success(`Gift card created! (Code: ${data.code}) — email delivery failed, please contact support.`);
      }
      setForm({ recipientName: '', recipientEmail: '', senderName: '', message: '' });
      setCustom('');
      setSelected(250);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream page-enter">
      {/* Hero */}
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600&q=80"
          alt="Gift Cards"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.6em] uppercase text-gold-400 font-body mb-3">The Gift of Choice</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Gift Cards</h1>
          <div className="w-16 h-px bg-gold-gradient mx-auto" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left – preview & perks */}
          <div>
            {/* Card preview */}
            <div className="relative overflow-hidden mb-8 aspect-[1.6/1]">
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=85"
                alt="Gift Card"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif text-2xl tracking-[0.3em] text-white uppercase">Lumière</span>
                    <p className="text-[8px] tracking-[0.4em] text-gold-400 uppercase font-body">Luxury Boutique</p>
                  </div>
                  <RiVipCrownLine size={28} className="text-gold-400 opacity-80" />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.4em] uppercase text-gold-400 font-body mb-1">Gift Card Value</p>
                  <p className="font-serif text-4xl text-white">${finalAmount > 0 ? finalAmount.toLocaleString() : '—'}</p>
                  {form.recipientName && (
                    <p className="text-xs text-white/60 font-body mt-2">For {form.recipientName}</p>
                  )}
                </div>
              </div>
              {/* Gold border accent */}
              <div className="absolute inset-0 border border-gold-500/30 pointer-events-none" />
            </div>

            {/* Perks */}
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-500 font-body mb-5">Why Choose a Lumière Gift Card</p>
            <div className="space-y-4">
              {perks.map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-9 h-9 border border-gold-500/40 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-gold-500" />
                  </div>
                  <p className="text-sm font-body text-charcoal/70">{text}</p>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div className="mt-10 p-6 bg-[#faf9f7] border-l-2 border-gold-500">
              <p className="text-xs tracking-widest uppercase font-body text-charcoal mb-3">How It Works</p>
              {['Purchase your gift card below.', 'Recipient receives a beautifully designed email instantly.', 'They redeem it at checkout — no expiry stress for 5 years.'].map((step, i) => (
                <div key={i} className="flex items-start gap-3 mb-2">
                  <span className="font-serif text-gold-500 text-sm mt-0.5">{i + 1}.</span>
                  <p className="text-sm font-body text-charcoal/65">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – form */}
          <div className="bg-white border border-gray-100 shadow-sm p-10">
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-500 font-body mb-2">Personalise</p>
            <h2 className="font-serif text-2xl text-charcoal mb-8">Send a Gift Card</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount */}
              <div>
                <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-3">Select Amount</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setSelected(amt); setCustom(''); }}
                      className={`py-2.5 text-sm font-body border transition-all duration-200 ${selected === amt && !custom ? 'bg-charcoal text-white border-charcoal' : 'border-gray-200 text-charcoal hover:border-gold-500 hover:text-gold-600'}`}
                    >
                      ${amt.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div>
                  <input
                    type="number"
                    min={50}
                    value={custom}
                    onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
                    className="input-luxury text-sm"
                    placeholder="Or enter custom amount (min $50)"
                  />
                </div>
              </div>

              {/* Recipient */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">Recipient Name</label>
                  <input type="text" required value={form.recipientName} onChange={(e) => setForm({ ...form, recipientName: e.target.value })} className="input-luxury" placeholder="Their name" />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">Recipient Email</label>
                  <input type="email" required value={form.recipientEmail} onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })} className="input-luxury" placeholder="their@email.com" />
                </div>
              </div>

              <div>
                <label className="text-[10px] tracking-widests uppercase font-body text-charcoal block mb-1.5">Your Name</label>
                <input type="text" required value={form.senderName} onChange={(e) => setForm({ ...form, senderName: e.target.value })} className="input-luxury" placeholder="Your name" />
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">Personal Message <span className="text-charcoal/30 normal-case tracking-normal">(optional)</span></label>
                <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-luxury resize-none" placeholder="Write a heartfelt message…" />
              </div>

              {/* Summary */}
              {finalAmount > 0 && (
                <div className="flex items-center justify-between py-4 border-t border-b border-gray-100">
                  <span className="text-sm font-body text-charcoal">Total</span>
                  <span className="font-serif text-2xl text-charcoal">${finalAmount.toLocaleString()}</span>
                </div>
              )}

              <button type="submit" disabled={loading || finalAmount < 50} className="btn-gold w-full">
                {loading ? 'Processing…' : <><FiGift size={13} /> Purchase Gift Card <FiArrowRight size={13} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
