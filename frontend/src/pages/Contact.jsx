import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { BsPinterest, BsYoutube } from 'react-icons/bs';
import toast from 'react-hot-toast';

const info = [
  {
    Icon: FiMapPin,
    title: 'Visit Our Boutique',
    lines: ['12 Rue du Faubourg Saint-Honoré', 'Paris, 75008, France'],
  },
  {
    Icon: FiPhone,
    title: 'Call Us',
    lines: ['+1 (800) 555-0192', 'Mon – Sat, 9 am – 7 pm CET'],
  },
  {
    Icon: FiMail,
    title: 'Email Us',
    lines: ['hello@lumiere.com', 'We reply within 24 hours'],
  },
  {
    Icon: FiClock,
    title: 'Opening Hours',
    lines: ['Monday – Saturday: 10 am – 8 pm', 'Sunday: 12 pm – 6 pm'],
  },
];

const socials = [
  { Icon: FiInstagram, label: 'Instagram' },
  { Icon: FiTwitter, label: 'Twitter' },
  { Icon: FiFacebook, label: 'Facebook' },
  { Icon: BsPinterest, label: 'Pinterest' },
  { Icon: BsYoutube, label: 'YouTube' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Your message has been sent. We\'ll be in touch soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-cream page-enter">
      {/* Hero */}
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.6em] uppercase text-gold-400 font-body mb-3">We'd Love to Hear From You</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Contact Us</h1>
          <div className="w-16 h-px bg-gold-gradient mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left – Info */}
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-500 font-body mb-3">Get in Touch</p>
            <h2 className="font-serif text-3xl text-charcoal mb-6">How Can We Help?</h2>
            <div className="w-12 h-px bg-gold-gradient mb-8" />
            <p className="text-sm font-body text-charcoal/65 leading-relaxed mb-12">
              Our dedicated concierge team is here to assist with styling advice, product enquiries,
              bespoke gifting and anything else you need. Reach us through any of the channels below.
            </p>

            <div className="space-y-8">
              {info.map(({ Icon, title, lines }) => (
                <div key={title} className="flex items-start gap-5">
                  <div className="w-11 h-11 border border-gold-500/40 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase font-body text-charcoal mb-1">{title}</p>
                    {lines.map((l) => (
                      <p key={l} className="text-sm font-body text-charcoal/65">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-xs tracking-widest uppercase font-body text-charcoal mb-4">Follow Us</p>
              <div className="flex gap-3">
                {socials.map(({ Icon, label }) => (
                  <a key={label} href="#" aria-label={label} className="w-9 h-9 border border-charcoal/20 flex items-center justify-center text-charcoal/50 hover:border-gold-500 hover:text-gold-500 transition-colors duration-200">
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right – Form */}
          <div className="bg-white p-10 shadow-sm border border-gray-100">
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-500 font-body mb-2">Send a Message</p>
            <h3 className="font-serif text-2xl text-charcoal mb-8">Write to Us</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-luxury"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-luxury"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="input-luxury"
                  required
                >
                  <option value="">Select a subject</option>
                  {['Product Enquiry', 'Order Support', 'Returns & Exchanges', 'Styling Advice', 'Bespoke Gifting', 'Other'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-luxury resize-none"
                  placeholder="Tell us how we can help…"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-gold w-full">
                {loading ? 'Sending…' : <><FiSend size={13} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80"
          alt="Paris"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.6) saturate(0.8)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm border border-white/30 px-8 py-5 text-center">
            <FiMapPin size={20} className="text-gold-400 mx-auto mb-2" />
            <p className="font-serif text-lg text-white">12 Rue du Faubourg Saint-Honoré</p>
            <p className="text-xs tracking-widest uppercase text-gold-300 font-body mt-1">Paris, France</p>
          </div>
        </div>
      </div>
    </div>
  );
}
