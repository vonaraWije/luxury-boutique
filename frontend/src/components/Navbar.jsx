import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiUser, FiHeart, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const categories = [
  { label: 'Clothing',    path: '/products?category=clothing',   sub: ['Dresses','Coats','Blazers','Tops','Trousers'] },
  { label: 'Jewellery',   path: '/products?category=jewellery',  sub: ['Necklaces','Earrings','Bracelets','Rings'] },
  { label: 'Cosmetics',   path: '/products?category=cosmetics',  sub: ['Skincare','Lips','Eyes','Fragrance'] },
  { label: 'Accessories', path: '/products?category=accessories',sub: ['Bags','Scarves','Belts'] },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const { cartCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-charcoal text-cream text-center text-xs py-2 tracking-widest uppercase font-body">
        Complimentary shipping on orders over $500 &nbsp;|&nbsp; New Collection Arrived
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
        {/* Main navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button className="md:hidden text-charcoal" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-center">
              <span className="font-serif text-2xl md:text-3xl tracking-[0.3em] text-charcoal uppercase">Lumière</span>
              <span className="text-[9px] tracking-[0.4em] text-gold-500 uppercase font-body">Luxury Boutique</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="relative group"
                  onMouseEnter={() => setActiveMenu(cat.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={cat.path}
                    className="flex items-center gap-1 text-xs tracking-widest uppercase font-body text-charcoal hover:text-gold-600 transition-colors duration-200"
                  >
                    {cat.label}
                    <FiChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-200" />
                  </Link>

                  {/* Dropdown */}
                  {activeMenu === cat.label && (
                    <div className="absolute top-full left-0 w-44" style={{paddingTop: '8px'}}>
                    <div className="bg-white border border-gray-100 shadow-xl py-3 animate-fade-in">
                      {cat.sub.map((s) => (
                        <Link
                          key={s}
                          to={`/products?category=${cat.label.toLowerCase()}&subcategory=${s.toLowerCase()}`}
                          className="block px-5 py-2 text-xs tracking-wider text-charcoal hover:text-gold-600 hover:bg-champagne transition-colors duration-150 uppercase font-body"
                        >
                          {s}
                        </Link>
                      ))}
                    </div>
                    </div>
                  )}
                </div>
              ))}
              <NavLink to="/products" className={({ isActive }) =>
                `text-xs tracking-widest uppercase font-body transition-colors duration-200 ${isActive ? 'text-gold-600' : 'text-charcoal hover:text-gold-600'}`
              }>
                All
              </NavLink>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3 md:gap-5">
              <button onClick={() => setSearchOpen(!searchOpen)} className="text-charcoal hover:text-gold-600 transition-colors duration-200">
                <FiSearch size={18} />
              </button>

              {user ? (
                <div
                  className="relative hidden md:block"
                  onMouseEnter={() => setProfileOpen(true)}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <button className="text-charcoal hover:text-gold-600 transition-colors duration-200">
                    <FiUser size={18} />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full w-44" style={{paddingTop: '8px'}}>
                      <div className="bg-white border border-gray-100 shadow-xl py-2 animate-fade-in">
                        <Link to="/profile" onClick={() => setProfileOpen(false)} className="block px-5 py-2 text-xs tracking-wider uppercase text-charcoal hover:text-gold-600 hover:bg-champagne">My Profile</Link>
                        <Link to="/orders" onClick={() => setProfileOpen(false)} className="block px-5 py-2 text-xs tracking-wider uppercase text-charcoal hover:text-gold-600 hover:bg-champagne">My Orders</Link>
                        <Link to="/wishlist" onClick={() => setProfileOpen(false)} className="block px-5 py-2 text-xs tracking-wider uppercase text-charcoal hover:text-gold-600 hover:bg-champagne">Wishlist</Link>
                        <hr className="my-1 border-gray-100" />
                        <button onClick={() => { logout(); setProfileOpen(false); }} className="w-full text-left px-5 py-2 text-xs tracking-wider uppercase text-charcoal hover:text-gold-600 hover:bg-champagne">Sign Out</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="hidden md:block text-charcoal hover:text-gold-600 transition-colors duration-200">
                  <FiUser size={18} />
                </Link>
              )}

              <Link to="/wishlist" className="hidden md:block text-charcoal hover:text-gold-600 transition-colors duration-200">
                <FiHeart size={18} />
              </Link>

              <button onClick={() => setIsCartOpen(true)} className="relative text-charcoal hover:text-gold-600 transition-colors duration-200">
                <FiShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-gradient text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-white animate-slide-up">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center gap-3 px-6 py-4">
              <FiSearch className="text-gold-500 flex-shrink-0" size={18} />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for clothing, jewellery, cosmetics..."
                className="flex-1 bg-transparent text-sm font-body text-charcoal placeholder-gray-400 focus:outline-none tracking-wide"
              />
              <button type="button" onClick={() => setSearchOpen(false)}>
                <FiX className="text-gray-400 hover:text-charcoal" size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal/95 md:hidden animate-fade-in pt-24 px-8 overflow-y-auto">
          <button className="absolute top-5 right-5 text-cream" onClick={() => setMobileOpen(false)}>
            <FiX size={24} />
          </button>
          {categories.map((cat) => (
            <div key={cat.label} className="mb-6">
              <Link
                to={cat.path}
                onClick={() => setMobileOpen(false)}
                className="block text-cream font-serif text-2xl mb-3 hover:text-gold-400"
              >
                {cat.label}
              </Link>
              <div className="pl-4 space-y-1">
                {cat.sub.map((s) => (
                  <Link
                    key={s}
                    to={`/products?category=${cat.label.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="block text-xs tracking-widest uppercase text-gold-400 hover:text-gold-300 font-body py-1"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-8 border-t border-white/10 pt-6 space-y-3">
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="block text-cream text-xs tracking-widest uppercase font-body">My Profile</Link>
                <Link to="/orders" onClick={() => setMobileOpen(false)} className="block text-cream text-xs tracking-widest uppercase font-body">My Orders</Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="block text-gold-400 text-xs tracking-widest uppercase font-body">Sign Out</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-cream text-xs tracking-widest uppercase font-body">Sign In / Register</Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
