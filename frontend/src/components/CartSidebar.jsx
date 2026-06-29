import { FiX, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { cartItems, removeFromCart, updateQty, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useCart();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 flex flex-col shadow-2xl transition-transform duration-400 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FiShoppingBag size={18} className="text-gold-600" />
            <h2 className="font-serif text-xl text-charcoal">Your Bag</h2>
            {cartCount > 0 && <span className="text-xs text-gold-500 font-body">({cartCount} items)</span>}
          </div>
          <button onClick={() => setIsCartOpen(false)} className="text-charcoal hover:text-gold-600 transition-colors">
            <FiX size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <FiShoppingBag size={48} className="text-gray-200" />
              <p className="font-serif text-xl text-charcoal">Your bag is empty</p>
              <p className="text-sm text-gray-400 font-body">Discover our latest collections</p>
              <button onClick={() => setIsCartOpen(false)} className="btn-gold mt-2">
                <Link to="/products">Shop Now</Link>
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item._id}-${item.size}-${item.color}`} className="flex gap-4 pb-5 border-b border-gray-100">
                <div className="w-20 h-24 bg-gray-50 overflow-hidden flex-shrink-0">
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      {item.brand && <p className="text-[9px] tracking-widest uppercase text-gold-500 font-body">{item.brand}</p>}
                      <p className="font-serif text-sm text-charcoal leading-snug mt-0.5">{item.name}</p>
                      <div className="flex gap-2 mt-1">
                        {item.size  && <span className="text-[10px] text-gray-400 font-body uppercase">Size: {item.size}</span>}
                        {item.color && <span className="text-[10px] text-gray-400 font-body">· {item.color}</span>}
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item._id, item.size, item.color)} className="text-gray-300 hover:text-red-400 transition-colors ml-2">
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center border border-gray-200">
                      <button onClick={() => updateQty(item._id, item.size, item.color, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-charcoal hover:bg-champagne transition-colors">
                        <FiMinus size={10} />
                      </button>
                      <span className="w-8 text-center text-xs font-body text-charcoal">{item.qty}</span>
                      <button onClick={() => updateQty(item._id, item.size, item.color, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-charcoal hover:bg-champagne transition-colors">
                        <FiPlus size={10} />
                      </button>
                    </div>
                    <span className="font-serif text-base text-charcoal">${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-6 py-6 border-t border-gray-200 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs tracking-widest uppercase font-body text-charcoal">Subtotal</span>
              <span className="font-serif text-xl text-charcoal">${cartTotal.toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-gray-400 font-body text-center">Shipping and taxes calculated at checkout</p>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn-gold w-full text-center"
            >
              Proceed to Checkout
            </Link>
            <button onClick={() => setIsCartOpen(false)} className="btn-outline-gold w-full text-center">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
