import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { BsPinterest, BsYoutube } from 'react-icons/bs';

export default function Footer() {
  const socials = [
    { Icon: FiInstagram, label: 'Instagram' },
    { Icon: FiTwitter,   label: 'Twitter' },
    { Icon: FiFacebook,  label: 'Facebook' },
    { Icon: BsPinterest, label: 'Pinterest' },
    { Icon: BsYoutube,   label: 'YouTube' },
  ];

  return (
    <footer className="bg-charcoal text-cream/70">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-3xl text-cream tracking-widest uppercase mb-2">Lumière</h3>
          <p className="text-[9px] tracking-[0.4em] text-gold-500 uppercase mb-5 font-body">Luxury Boutique</p>
          <p className="text-sm font-body leading-relaxed text-cream/60">
            Curating the finest in clothing, jewellery and cosmetics for the discerning individual since 2010.
          </p>
          {/* Contact info */}
          <div className="mt-5 space-y-2">
            {[
              { Icon: FiMapPin, text: '12 Rue du Faubourg, Paris' },
              { Icon: FiPhone,  text: '+1 (800) 555-0192' },
              { Icon: FiMail,   text: 'hello@lumiere.com' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-cream/50 font-body">
                <Icon size={12} className="text-gold-500 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6 flex-wrap">
            {socials.map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label} className="w-9 h-9 border border-white/20 flex items-center justify-center text-cream/60 hover:border-gold-500 hover:text-gold-500 transition-colors duration-200">
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-xs tracking-widest uppercase font-body text-cream mb-5">Shop</h4>
          <ul className="space-y-3">
            {['Clothing','Jewellery','Cosmetics','Accessories','New Arrivals','Sale'].map((item) => (
              <li key={item}>
                <Link
                  to={`/products?category=${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm font-body text-cream/60 hover:text-gold-400 transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-xs tracking-widest uppercase font-body text-cream mb-5">Customer Care</h4>
          <ul className="space-y-3">
            {['Contact Us','Shipping & Returns','Size Guide','FAQs','Track Order','Gift Cards'].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm font-body text-cream/60 hover:text-gold-400 transition-colors duration-200">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs tracking-widest uppercase font-body text-cream mb-5">Join the Inner Circle</h4>
          <p className="text-sm font-body text-cream/60 mb-5 leading-relaxed">
            Subscribe for exclusive access to new arrivals, member-only offers and curated style edits.
          </p>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-white/5 border border-white/15 px-4 py-3 text-xs font-body text-cream placeholder-cream/30 focus:outline-none focus:border-gold-500 tracking-wide"
            />
            <button type="submit" className="btn-gold w-full">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-body text-cream/40 tracking-wide">
          © {new Date().getFullYear()} Lumière Luxury Boutique. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy','Terms of Service','Cookie Policy'].map((item) => (
            <a key={item} href="#" className="text-xs font-body text-cream/40 hover:text-gold-400 transition-colors duration-200">{item}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
