import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiPackage, FiHeart, FiLogOut, FiEdit2, FiCheck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab]     = useState('profile');
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/orders/my').then(({ data }) => setOrders(data)).catch(console.error);
  }, [user, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/users/profile', form);
      toast.success('Profile updated');
      setEditing(false);
    } catch (e) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { key: 'profile', label: 'Profile',    icon: FiUser },
    { key: 'orders',  label: 'My Orders',  icon: FiPackage },
    { key: 'wishlist',label: 'Wishlist',   icon: FiHeart },
  ];

  const statusColors = {
    pending:    'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped:    'bg-purple-100 text-purple-700',
    delivered:  'bg-green-100 text-green-700',
    cancelled:  'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-cream page-enter">
      <div className="bg-charcoal py-12 px-6 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gold-400 font-body mb-2">My Account</p>
        <h1 className="font-serif text-3xl text-white">Welcome, {user?.name}</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-100 p-6">
            <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mb-3">
                <span className="font-serif text-2xl text-white">{user?.name?.[0]}</span>
              </div>
              <p className="font-serif text-base text-charcoal">{user?.name}</p>
              <p className="text-[10px] text-gray-400 font-body tracking-wide">{user?.email}</p>
            </div>
            <nav className="space-y-1">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs tracking-widest uppercase font-body transition-colors ${tab === key ? 'bg-champagne text-gold-700' : 'text-charcoal hover:bg-champagne'}`}
                >
                  <Icon size={14} />{label}
                </button>
              ))}
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs tracking-widest uppercase font-body text-red-400 hover:bg-red-50 transition-colors mt-4"
              >
                <FiLogOut size={14} />Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {/* Profile tab */}
          {tab === 'profile' && (
            <div className="bg-white border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl text-charcoal">Personal Information</h2>
                <button
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  className="flex items-center gap-1.5 text-xs tracking-widest uppercase font-body text-gold-600 hover:text-gold-700"
                >
                  {editing ? <><FiCheck size={13} /> Save</> : <><FiEdit2 size={13} /> Edit</>}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { key: 'name',  label: 'Full Name' },
                  { key: 'email', label: 'Email Address' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">{label}</label>
                    {editing ? (
                      <input
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="input-luxury text-sm"
                      />
                    ) : (
                      <p className="text-sm font-body text-charcoal/80 py-2 border-b border-gray-100">{user?.[key]}</p>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <button onClick={() => setEditing(false)} className="btn-outline-gold mt-4 text-xs px-5 py-2">Cancel</button>
              )}
            </div>
          )}

          {/* Orders tab */}
          {tab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl text-charcoal mb-6">My Orders</h2>
              {orders.length === 0 ? (
                <div className="bg-white border border-gray-100 p-12 text-center">
                  <FiPackage size={40} className="text-gray-200 mx-auto mb-4" />
                  <p className="font-serif text-xl text-charcoal mb-2">No orders yet</p>
                  <Link to="/products" className="btn-gold mt-4">Start Shopping</Link>
                </div>
              ) : orders.map((order) => (
                <div key={order._id} className="bg-white border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase font-body text-gray-400">Order #{order._id.slice(-8).toUpperCase()}</p>
                      <p className="text-xs font-body text-gray-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <span className={`text-[10px] font-body tracking-wider uppercase px-3 py-1 rounded-sm ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {order.orderItems.slice(0, 3).map((item, i) => (
                      <img key={i} src={item.image} alt="" className="w-14 h-16 object-cover bg-gray-50" />
                    ))}
                    {order.orderItems.length > 3 && (
                      <div className="w-14 h-16 bg-champagne flex items-center justify-center text-xs font-body text-charcoal">
                        +{order.orderItems.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base text-charcoal">${order.totalPrice.toFixed(2)}</span>
                    <Link to={`/orders/${order._id}`} className="text-xs tracking-widest uppercase font-body text-gold-600 hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wishlist tab */}
          {tab === 'wishlist' && (
            <div className="bg-white border border-gray-100 p-12 text-center">
              <FiHeart size={40} className="text-gray-200 mx-auto mb-4" />
              <p className="font-serif text-xl text-charcoal mb-2">Your wishlist is empty</p>
              <p className="text-sm font-body text-gray-400 mb-6">Save items you love by clicking the heart icon</p>
              <Link to="/products" className="btn-gold">Discover Pieces</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
