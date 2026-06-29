import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm]   = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(state?.from || '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex page-enter">
      {/* Left image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80"
          alt="Luxury Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-16 left-12 text-white">
          <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400 font-body mb-3">Welcome Back</p>
          <h2 className="font-serif text-4xl leading-tight">Luxury Awaits<br />Your Return</h2>
        </div>
      </div>

      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <Link to="/" className="block text-center mb-10">
            <span className="font-serif text-3xl tracking-[0.3em] text-charcoal uppercase">Lumière</span>
            <p className="text-[9px] tracking-[0.4em] text-gold-500 uppercase font-body">Luxury Boutique</p>
          </Link>

          <h1 className="font-serif text-2xl text-charcoal mb-2 text-center">Sign In</h1>
          <p className="text-xs text-gray-400 font-body text-center mb-8 tracking-wide">
            Welcome back to your personal boutique
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-body px-4 py-3 mb-6 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
            <div>
              <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-luxury"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full mt-2">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs font-body text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-gold-600 hover:underline">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
