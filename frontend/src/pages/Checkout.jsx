import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const STEPS = ['Shipping', 'Payment', 'Review'];

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [shipping, setShipping] = useState({ street: '', city: '', state: '', zip: '', country: '' });
  const [payment, setPayment]   = useState({ method: 'Card', cardNumber: '', expiry: '', cvv: '', name: '' });

  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const TAX      = cartTotal * 0.08;
  const SHIPPING = cartTotal >= 500 ? 0 : 25;
  const TOTAL    = cartTotal + TAX + SHIPPING;

  const handlePlaceOrder = async () => {
    if (!user) return navigate('/login', { state: { from: '/checkout' } });
    setPlacing(true);
    try {
      const { data } = await api.post('/orders', {
        orderItems: cartItems.map((i) => ({ product: i._id, name: i.name, image: i.images?.[0], price: i.price, quantity: i.qty, size: i.size, color: i.color })),
        shippingAddress: shipping,
        paymentMethod: payment.method,
        itemsPrice: cartTotal,
        shippingPrice: SHIPPING,
        taxPrice: TAX,
        totalPrice: TOTAL,
      });
      setOrderId(data._id);
      clearCart();
      setStep(3); // success
      toast.success('Order placed successfully!');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  // Order success screen
  if (step === 3) return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 page-enter">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-8">
          <FiCheck size={36} className="text-white" />
        </div>
        <h1 className="font-serif text-3xl text-charcoal mb-3">Order Confirmed</h1>
        <p className="text-sm font-body text-gray-500 mb-2">Thank you for your purchase!</p>
        <p className="text-xs font-body text-gray-400 mb-8">Order #{orderId?.slice(-8).toUpperCase()}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders" className="btn-gold">View My Orders</Link>
          <Link to="/products" className="btn-outline-gold">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream page-enter">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-charcoal mb-1">Checkout</h1>
          <div className="flex items-center justify-center gap-0 mt-6">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-body transition-colors ${i === step ? 'text-gold-600' : i < step ? 'text-charcoal' : 'text-gray-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${i < step ? 'bg-gold-gradient text-white' : i === step ? 'border-2 border-gold-500 text-gold-600' : 'border border-gray-300 text-gray-400'}`}>
                    {i < step ? <FiCheck size={10} /> : i + 1}
                  </span>
                  {s}
                </div>
                {i < STEPS.length - 1 && <div className="w-12 h-px bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form area */}
          <div className="lg:col-span-2">
            {/* Step 0: Shipping */}
            {step === 0 && (
              <div className="bg-white p-8 border border-gray-100">
                <h2 className="font-serif text-xl text-charcoal mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'street',  label: 'Street Address', full: true },
                    { key: 'city',    label: 'City' },
                    { key: 'state',   label: 'State / Province' },
                    { key: 'zip',     label: 'Postal Code' },
                    { key: 'country', label: 'Country' },
                  ].map(({ key, label, full }) => (
                    <div key={key} className={full ? 'md:col-span-2' : ''}>
                      <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">{label}</label>
                      <input
                        required
                        value={shipping[key]}
                        onChange={(e) => setShipping({ ...shipping, [key]: e.target.value })}
                        className="input-luxury text-sm"
                        placeholder={label}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (!Object.values(shipping).every(Boolean)) return toast.error('Please fill all shipping fields');
                    setStep(1);
                  }}
                  className="btn-gold mt-6"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="bg-white p-8 border border-gray-100">
                <h2 className="font-serif text-xl text-charcoal mb-6">Payment Details</h2>
                <div className="flex gap-3 mb-6">
                  {['Card', 'PayPal', 'Bank Transfer'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setPayment({ ...payment, method: m })}
                      className={`flex-1 py-2.5 text-xs tracking-widest uppercase font-body border transition-colors ${payment.method === m ? 'bg-charcoal text-white border-charcoal' : 'border-gray-200 text-charcoal hover:border-charcoal'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                {payment.method === 'Card' && (
                  <div className="space-y-4">
                    {[
                      { key: 'name',       label: 'Name on Card',   ph: 'Full name as on card' },
                      { key: 'cardNumber', label: 'Card Number',    ph: '•••• •••• •••• ••••' },
                    ].map(({ key, label, ph }) => (
                      <div key={key}>
                        <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">{label}</label>
                        <input value={payment[key]} onChange={(e) => setPayment({ ...payment, [key]: e.target.value })} className="input-luxury text-sm" placeholder={ph} />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">Expiry</label>
                        <input value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} className="input-luxury text-sm" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-widest uppercase font-body text-charcoal block mb-1.5">CVV</label>
                        <input type="password" maxLength={4} value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} className="input-luxury text-sm" placeholder="•••" />
                      </div>
                    </div>
                  </div>
                )}
                {payment.method !== 'Card' && (
                  <p className="text-sm font-body text-gray-400 py-6 text-center">You will be redirected to complete payment after placing your order.</p>
                )}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn-outline-gold">Back</button>
                  <button onClick={() => setStep(2)} className="btn-gold">Review Order</button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="bg-white p-8 border border-gray-100">
                <h2 className="font-serif text-xl text-charcoal mb-6">Review Your Order</h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={`${item._id}-${item.size}-${item.color}`} className="flex gap-4 py-4 border-b border-gray-100">
                      <img src={item.images?.[0]} alt={item.name} className="w-16 h-20 object-cover bg-gray-50" />
                      <div className="flex-1">
                        <p className="font-serif text-sm text-charcoal">{item.name}</p>
                        <p className="text-xs text-gray-400 font-body mt-0.5">{[item.size, item.color].filter(Boolean).join(' · ')}</p>
                        <p className="text-xs font-body text-charcoal mt-1">Qty: {item.qty}</p>
                      </div>
                      <p className="font-serif text-base text-charcoal">${(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-champagne p-4 mb-6 text-xs font-body space-y-1">
                  <p className="font-semibold uppercase tracking-wider text-charcoal text-[10px] mb-2">Shipping to</p>
                  <p className="text-charcoal/70">{shipping.street}, {shipping.city}, {shipping.state} {shipping.zip}, {shipping.country}</p>
                  <p className="font-semibold uppercase tracking-wider text-charcoal text-[10px] mt-3 mb-1">Payment</p>
                  <p className="text-charcoal/70">{payment.method}{payment.cardNumber ? ` ···· ${payment.cardNumber.slice(-4)}` : ''}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-outline-gold">Back</button>
                  <button onClick={handlePlaceOrder} disabled={placing} className="btn-gold flex items-center gap-2">
                    <FiLock size={13} />
                    {placing ? 'Placing Order...' : `Place Order · $${TOTAL.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="bg-white border border-gray-100 p-6 h-fit sticky top-28">
            <h3 className="font-serif text-lg text-charcoal mb-5">Order Summary</h3>
            <div className="space-y-3 mb-5 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.size}-${item.color}`} className="flex items-center gap-3">
                  <div className="relative">
                    <img src={item.images?.[0]} alt="" className="w-12 h-14 object-cover bg-gray-50" />
                    <span className="absolute -top-1.5 -right-1.5 bg-charcoal text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">{item.qty}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-body text-charcoal line-clamp-1">{item.name}</p>
                    {item.size && <p className="text-[9px] text-gray-400 font-body">{item.size}</p>}
                  </div>
                  <p className="text-xs font-serif text-charcoal flex-shrink-0">${(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2.5">
              {[
                ['Subtotal', `$${cartTotal.toLocaleString()}`],
                ['Shipping', SHIPPING === 0 ? 'Free' : `$${SHIPPING}`],
                ['Tax (8%)', `$${TAX.toFixed(2)}`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-xs font-body text-charcoal/70">
                  <span>{label}</span><span>{val}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="text-sm font-body font-semibold text-charcoal uppercase tracking-wider">Total</span>
                <span className="font-serif text-lg text-charcoal">${TOTAL.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-[10px] tracking-wider uppercase font-body text-gray-400">
              <FiLock size={10} />
              Secure SSL checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
