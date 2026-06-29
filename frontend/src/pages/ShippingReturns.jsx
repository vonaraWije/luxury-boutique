import { FiTruck, FiPackage, FiRefreshCw, FiGlobe, FiClock, FiShield } from 'react-icons/fi';

const shippingOptions = [
  {
    name: 'Complimentary Express',
    time: '2 – 3 Business Days',
    cost: 'Free on orders over $500',
    detail: 'Signature required on delivery. Fully tracked.',
  },
  {
    name: 'Standard Delivery',
    time: '4 – 6 Business Days',
    cost: '$15',
    detail: 'Tracked delivery to your door.',
  },
  {
    name: 'Next Day Delivery',
    time: 'Next Business Day',
    cost: '$35',
    detail: 'Order before 12 pm. Signature required.',
  },
  {
    name: 'International Express',
    time: '3 – 7 Business Days',
    cost: 'From $45',
    detail: 'Fully tracked. Duties & taxes may apply at destination.',
  },
];

const returnSteps = [
  { step: '01', title: 'Initiate Return', desc: 'Visit My Profile → Orders and select the item you\'d like to return within 30 days of delivery.' },
  { step: '02', title: 'Pack Securely', desc: 'Return items in their original packaging with all tags attached and the Lumière dust bag included.' },
  { step: '03', title: 'Ship It Back', desc: 'Attach the prepaid return label (UK & EU only) or ship via your preferred tracked courier.' },
  { step: '04', title: 'Refund Processed', desc: 'Once received and inspected, your refund will be credited within 5 – 7 business days.' },
];

export default function ShippingReturns() {
  return (
    <div className="min-h-screen bg-cream page-enter">
      {/* Hero */}
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80"
          alt="Shipping"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.6em] uppercase text-gold-400 font-body mb-3">Everything You Need to Know</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Shipping & Returns</h1>
          <div className="w-16 h-px bg-gold-gradient mx-auto" />
        </div>
      </div>

      {/* Quick icons */}
      <div className="bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { Icon: FiTruck,     label: 'Free Shipping', sub: 'Orders over $500' },
            { Icon: FiClock,     label: '30-Day Returns', sub: 'Hassle-free process' },
            { Icon: FiGlobe,     label: 'Worldwide Delivery', sub: '40+ countries' },
            { Icon: FiShield,    label: 'Fully Insured', sub: 'Every shipment' },
          ].map(({ Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon size={22} className="text-gold-400" />
              <p className="text-xs tracking-wider uppercase font-body text-white">{label}</p>
              <p className="text-[10px] text-white/40 font-body">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 space-y-20">

        {/* Shipping options */}
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-10 bg-gold-500/40" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-500 font-body">Delivery</p>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">Shipping Options</h2>
          <div className="w-12 h-px bg-gold-gradient mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {shippingOptions.map((opt) => (
              <div key={opt.name} className="bg-white border border-gray-100 p-7 hover:border-gold-500/40 transition-colors duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-lg text-charcoal">{opt.name}</h3>
                  <FiPackage size={16} className="text-gold-500 mt-1 flex-shrink-0" />
                </div>
                <p className="text-xs tracking-widest uppercase text-gold-500 font-body mb-1">{opt.time}</p>
                <p className="text-sm font-body text-charcoal font-semibold mb-3">{opt.cost}</p>
                <p className="text-sm font-body text-charcoal/60 leading-relaxed">{opt.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 bg-champagne border-l-2 border-gold-500">
            <p className="text-sm font-body text-charcoal/80 leading-relaxed">
              <strong className="text-charcoal">Please note:</strong> All orders are processed and dispatched within 1 – 2 business days. You will receive a tracking link via email once your order has been shipped.
            </p>
          </div>
        </div>

        {/* Returns */}
        <div>
          <div className="flex items-center gap-4 mb-3">
            <div className="h-px w-10 bg-gold-500/40" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-500 font-body">Returns</p>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">Returns & Exchanges</h2>
          <div className="w-12 h-px bg-gold-gradient mb-6" />
          <p className="text-sm font-body text-charcoal/65 leading-relaxed mb-10 max-w-2xl">
            We want you to love every piece from Lumière. If for any reason you're not completely satisfied, we offer a simple and convenient 30-day return policy on all full-price items.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
            {returnSteps.map(({ step, title, desc }) => (
              <div key={step} className="bg-white p-7">
                <p className="font-serif text-3xl text-gold-500/30 mb-4">{step}</p>
                <h4 className="font-serif text-base text-charcoal mb-3">{title}</h4>
                <p className="text-sm font-body text-charcoal/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Non-returnable */}
        <div className="bg-white border border-gray-100 p-8">
          <div className="flex items-start gap-4">
            <FiRefreshCw size={20} className="text-gold-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-3">Non-Returnable Items</h3>
              <p className="text-sm font-body text-charcoal/65 leading-relaxed mb-4">
                For hygiene and safety reasons, the following items cannot be returned or exchanged:
              </p>
              <ul className="space-y-1.5">
                {['Pierced jewellery (earrings)', 'Opened cosmetics & fragrances', 'Personalised or monogrammed items', 'Items marked as Final Sale', 'Gift cards'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm font-body text-charcoal/65">
                    <span className="w-1 h-1 bg-gold-500 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
