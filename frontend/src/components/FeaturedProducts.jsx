import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import api from '../utils/api';

export default function FeaturedProducts({ title = 'Featured', subtitle = 'Handpicked For You', endpoint = '/products/featured' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.get(endpoint)
      .then(({ data }) => setProducts(Array.isArray(data) ? data : data.products || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <p className="section-subtitle">{subtitle}</p>
        <h2 className="section-title">{title}</h2>
        <div className="gold-divider" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 animate-pulse aspect-[3/4]" />
        ))}
      </div>
    </section>
  );

  if (!products.length) return null;

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <p className="section-subtitle">{subtitle}</p>
        <h2 className="section-title">{title}</h2>
        <div className="gold-divider" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
    </section>
  );
}
