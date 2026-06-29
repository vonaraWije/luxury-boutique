import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

const CATEGORIES = ['clothing', 'jewellery', 'cosmetics', 'accessories'];
const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc',label: 'Highest Rated' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [total, setTotal]       = useState(0);
  const [pages, setPages]       = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const keyword  = searchParams.get('keyword')  || '';
  const category = searchParams.get('category') || '';
  const sort     = searchParams.get('sort')     || 'newest';
  const page     = Number(searchParams.get('page') || 1);
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sort, page, limit: 12 });
      if (keyword)  params.set('keyword', keyword);
      if (category) params.set('category', category);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);

      const { data } = await api.get(`/products?${params}`);
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [keyword, category, sort, page, minPrice, maxPrice]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const set = (key, val) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set(key, val); else p.delete(key);
    p.delete('page');
    setSearchParams(p);
  };

  const applyPrice = () => {
    const p = new URLSearchParams(searchParams);
    if (localMin) p.set('minPrice', localMin); else p.delete('minPrice');
    if (localMax) p.set('maxPrice', localMax); else p.delete('maxPrice');
    p.delete('page');
    setSearchParams(p);
    setFiltersOpen(false);
  };

  const clearAll = () => {
    setSearchParams({});
    setLocalMin('');
    setLocalMax('');
  };

  const activeFilters = [
    category && { label: category, key: 'category' },
    keyword  && { label: `"${keyword}"`, key: 'keyword' },
    minPrice && { label: `Min $${minPrice}`, key: 'minPrice' },
    maxPrice && { label: `Max $${maxPrice}`, key: 'maxPrice' },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-cream page-enter">
      {/* Header */}
      <div className="relative py-20 px-6 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
          alt="Collections"
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ filter: 'brightness(0.25)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase text-gold-400 font-body mb-3">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">
            {keyword ? `Results for "${keyword}"` : category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'Our Collections'}
          </h1>
          {total > 0 && <p className="text-white/40 text-sm font-body mt-3">{total} pieces</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 text-xs tracking-widest uppercase font-body text-charcoal border border-charcoal px-4 py-2 hover:bg-charcoal hover:text-white transition-colors duration-200"
            >
              <FiFilter size={13} />
              Filters
              {activeFilters.length > 0 && (
                <span className="bg-gold-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">{activeFilters.length}</span>
              )}
            </button>

            {/* Active filter pills */}
            {activeFilters.map((f) => (
              <span key={f.key} className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-body bg-champagne px-3 py-1.5 text-charcoal">
                {f.label}
                <button onClick={() => set(f.key, '')} className="hover:text-red-500 transition-colors">
                  <FiX size={10} />
                </button>
              </span>
            ))}
            {activeFilters.length > 1 && (
              <button onClick={clearAll} className="text-[10px] tracking-wider uppercase font-body text-gold-600 hover:underline">Clear all</button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-body hidden sm:block">Sort by:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => set('sort', e.target.value)}
                className="appearance-none text-xs tracking-wider font-body text-charcoal border border-gray-200 px-4 py-2 pr-8 focus:outline-none focus:border-gold-500 bg-white cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <FiChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div className="mb-8 p-6 bg-white border border-gray-100 shadow-sm animate-slide-up grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category filter */}
            <div>
              <h4 className="text-xs tracking-widest uppercase font-body text-charcoal mb-3">Category</h4>
              <div className="space-y-2">
                {CATEGORIES.map((c) => (
                  <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={category === c}
                      onChange={() => set('category', c)}
                      className="accent-gold-500"
                    />
                    <span className="text-sm font-body text-charcoal group-hover:text-gold-600 transition-colors capitalize">{c}</span>
                  </label>
                ))}
                {category && (
                  <button onClick={() => set('category', '')} className="text-xs text-gold-600 hover:underline font-body mt-1">Clear</button>
                )}
              </div>
            </div>

            {/* Price filter */}
            <div>
              <h4 className="text-xs tracking-widest uppercase font-body text-charcoal mb-3">Price Range</h4>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={localMin}
                  onChange={(e) => setLocalMin(e.target.value)}
                  className="input-luxury w-24 text-sm"
                />
                <span className="text-gray-400">–</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={localMax}
                  onChange={(e) => setLocalMax(e.target.value)}
                  className="input-luxury w-24 text-sm"
                />
              </div>
              <button onClick={applyPrice} className="btn-gold mt-4 text-xs px-5 py-2">Apply</button>
            </div>

            {/* Quick picks */}
            <div>
              <h4 className="text-xs tracking-widest uppercase font-body text-charcoal mb-3">Quick Picks</h4>
              <div className="space-y-2">
                {[
                  { label: 'New Arrivals',  params: { newArrival: 'true' } },
                  { label: 'Bestsellers',   params: { bestseller: 'true' } },
                  { label: 'Under $500',    params: { maxPrice: '500' } },
                  { label: '$500 – $2000',  params: { minPrice: '500', maxPrice: '2000' } },
                  { label: '$2000+',        params: { minPrice: '2000' } },
                ].map(({ label, params }) => (
                  <button
                    key={label}
                    onClick={() => { const p = new URLSearchParams(); Object.entries(params).forEach(([k,v]) => p.set(k,v)); setSearchParams(p); setFiltersOpen(false); }}
                    className="block text-sm font-body text-charcoal hover:text-gold-600 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-charcoal mb-3">No products found</p>
            <p className="text-sm text-gray-400 font-body mb-6">Try adjusting your filters or search term</p>
            <button onClick={clearAll} className="btn-gold">View All Products</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-14">
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => set('page', String(i + 1))}
                className={`w-9 h-9 text-xs font-body border transition-colors duration-200 ${page === i + 1 ? 'bg-charcoal text-white border-charcoal' : 'border-gray-200 text-charcoal hover:border-gold-500 hover:text-gold-600'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
