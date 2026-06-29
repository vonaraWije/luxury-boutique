import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() =>
    JSON.parse(localStorage.getItem('luxuryCart') || '[]')
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('luxuryCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1, size = '', color = '') => {
    setCartItems((prev) => {
      const key = `${product._id}-${size}-${color}`;
      const existing = prev.find((i) => `${i._id}-${i.size}-${i.color}` === key);
      if (existing) {
        toast.success('Quantity updated');
        return prev.map((i) =>
          `${i._id}-${i.size}-${i.color}` === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      toast.success('Added to bag');
      return [...prev, { ...product, qty, size, color }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, size, color) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i._id === id && i.size === size && i.color === color))
    );
  };

  const updateQty = (id, size, color, qty) => {
    if (qty < 1) return removeFromCart(id, size, color);
    setCartItems((prev) =>
      prev.map((i) =>
        i._id === id && i.size === size && i.color === color ? { ...i, qty } : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, i) => acc + i.qty, 0);
  const cartTotal = cartItems.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
