import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm]   = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex page-enter">
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80"
          alt="Luxury"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-16 left-12 text-white">
          <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400 font-body mb-3">New Member</p>
          <h2 className="font-serif text-4xl leading-tight">Join the<br />Inner Circle</h2>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <Link to="/" className="block text-center mb-10">
            <span className="font-serif text-3xl tracking-[0.3em] text-charcoal uppercase">Lumière</span>
            <p className="text-[9px] tracking-[0.4em] text-gold-500 uppercase font-body">Luxury Boutique</p>
          </Link>

          <h1 className="font-serif text-2xl text-charcoal mb-2 text-center">Create Account</h1>
          <p className="text-xs text-gray-400 font-body text-center mb-8 tracking-wide">
            Access exclusive collections and personalised service
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-body px-4 py-3 mb-6 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { key: 'name',     label: 'Full Name',       type: 'text',     ph: 'Your full name' },
              { key: 'email',    label: 'Email',           type: 'email',    ph: 'your@email.com' },
              { key: 'password', label: 'Password',        type: 'password', ph: '••••••••' },
              { key: 'confirm',  label: 'Confirm Password',type: 'password', ph: '••••••••' },
            ].map(({ key, label, type, ph }) => (
              <div key={key}>
                <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">{label}</label>
                <input
                  type={type}
                  required
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="input-luxury"
                  placeholder={ph}
                />
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-gold w-full mt-2">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-[10px] text-gray-400 font-body text-center mt-4 leading-relaxed">
            By creating an account you agree to our{' '}
            <a href="#" className="text-gold-600 hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-gold-600 hover:underline">Privacy Policy</a>.
          </p>

          <div className="mt-6 text-center">
            <p className="text-xs font-body text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-gold-600 hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
