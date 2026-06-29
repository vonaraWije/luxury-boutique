import { useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: 'Orders & Payment',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and bank transfer for orders over $5,000. All transactions are secured with SSL encryption.' },
      { q: 'Can I modify or cancel my order after placing it?', a: 'Orders can be modified or cancelled within 2 hours of placement. After this window, our fulfilment team begins processing. Please contact us immediately at hello@lumiere.com if you need to make changes.' },
      { q: 'Will I receive an order confirmation?', a: 'Yes — a confirmation email is sent immediately after your order is placed, followed by a shipping notification with your tracking number once dispatched.' },
      { q: 'Do you offer instalment payments?', a: 'Yes. We partner with Klarna and Afterpay to offer flexible 3 or 6-month instalment plans on orders over $200. Select your preferred option at checkout.' },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      { q: 'How long does delivery take?', a: 'Standard delivery takes 4 – 6 business days. Express delivery takes 2 – 3 business days. Next-day delivery is available for orders placed before 12 pm. International orders arrive within 3 – 7 business days.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to over 40 countries worldwide. International delivery costs and estimated times are shown at checkout. Please note that import duties and taxes may be applicable in your country.' },
      { q: 'Is my order insured during shipping?', a: 'Absolutely. All Lumière orders are fully insured from the moment they leave our boutique until they are signed for at your door.' },
      { q: 'How do I track my order?', a: 'Once your order is dispatched, you will receive an email with a tracking number. You can also track your order in real-time under My Profile → Orders.' },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      { q: 'What is your return policy?', a: 'We offer a 30-day return window on all full-price items. Items must be in their original, unworn condition with all tags attached and accompanied by the original receipt.' },
      { q: 'How do I initiate a return?', a: 'Log in to your account, navigate to My Profile → Orders, and select the item you wish to return. Follow the on-screen instructions to generate your return label (UK & EU) or return address.' },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 5 – 7 business days of us receiving your return. The funds will appear in your original payment method within 3 – 5 additional business days, depending on your bank.' },
      { q: 'Can I exchange for a different size?', a: 'Yes. Select "Exchange" when initiating your return and specify the new size. We will ship the replacement once we receive your original item. Exchanges are subject to stock availability.' },
    ],
  },
  {
    category: 'Products & Authenticity',
    items: [
      { q: 'Are all your products genuine?', a: 'Every product sold through Lumière is 100% authentic and sourced directly from luxury brands, official distributors, or authorised suppliers. Each item comes with its original brand documentation where applicable.' },
      { q: 'Do your products come with a warranty?', a: 'Fine jewellery carries a 12-month warranty against manufacturing defects. Clothing and accessories are covered by our 30-day quality guarantee. Contact us within this period for any quality-related issues.' },
      { q: 'How should I care for my Lumière pieces?', a: 'Care instructions are included with each item. As a rule: store jewellery in the provided dust bag away from direct sunlight, dry-clean delicate fabrics, and condition leather goods regularly with specialist products.' },
    ],
  },
  {
    category: 'Account & Membership',
    items: [
      { q: 'How do I create an account?', a: 'Click "Register" in the top navigation, enter your details and verify your email. Creating an account gives you access to order tracking, wishlists, saved addresses and exclusive member-only offers.' },
      { q: 'I forgot my password. What should I do?', a: 'Click "Forgot Password" on the Sign In page and enter your registered email. You will receive a reset link within a few minutes. Check your spam folder if it doesn\'t arrive.' },
      { q: 'What benefits do members receive?', a: 'Lumière members enjoy early access to new collections, exclusive sale events, curated style newsletters, birthday rewards and complimentary gift wrapping on all orders.' },
    ],
  },
];

export default function FAQs() {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState({});

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const filtered = faqs.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        !search ||
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-cream page-enter">
      {/* Hero */}
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=1600&q=80"
          alt="FAQs"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.6em] uppercase text-gold-400 font-body mb-3">We Have Answers</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Frequently Asked Questions</h1>
          <div className="w-16 h-px bg-gold-gradient mx-auto mb-8" />
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/60" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions…"
              className="w-full bg-white/10 backdrop-blur-sm border border-white/25 pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 font-body focus:outline-none focus:border-gold-500 tracking-wide"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 space-y-14">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-serif text-2xl text-charcoal mb-3">No results found</p>
            <p className="text-sm text-charcoal/50 font-body">Try a different search term or browse the categories below.</p>
          </div>
        ) : (
          filtered.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-gold-500/40" />
                <p className="text-[10px] tracking-[0.5em] uppercase text-gold-500 font-body">{cat.category}</p>
              </div>
              <div className="space-y-px">
                {cat.items.map((item, i) => {
                  const key = `${cat.category}-${i}`;
                  const isOpen = !!open[key];
                  return (
                    <div key={key} className="bg-white border border-gray-100 hover:border-gold-500/30 transition-colors duration-200">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between px-7 py-5 text-left group"
                      >
                        <span className="font-serif text-base text-charcoal group-hover:text-gold-600 transition-colors duration-200 pr-4">
                          {item.q}
                        </span>
                        <FiChevronDown
                          size={16}
                          className={`text-gold-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-7 pb-6 border-t border-gray-50">
                          <p className="text-sm font-body text-charcoal/65 leading-relaxed pt-4">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* Still need help? */}
        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
            alt="Help"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.15)' }}
          />
          <div className="relative z-10 text-center px-8 py-14">
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400 font-body mb-3">Still Have Questions?</p>
            <h3 className="font-serif text-3xl text-white mb-4">We're Here to Help</h3>
            <p className="text-sm text-white/60 font-body mb-8 max-w-sm mx-auto leading-relaxed">
              Our concierge team is available 7 days a week to assist you with any enquiry.
            </p>
            <Link to="/contact" className="btn-gold">Contact Our Team</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
