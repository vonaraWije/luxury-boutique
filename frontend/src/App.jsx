import { Routes, Route, Navigate } from 'react-router-dom';
import { useScrollToTop } from './hooks/useScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import ShippingReturns from './pages/ShippingReturns';
import SizeGuide from './pages/SizeGuide';
import FAQs from './pages/FAQs';
import TrackOrder from './pages/TrackOrder';
import GiftCards from './pages/GiftCards';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  useScrollToTop();

  return (
    <>
      <Navbar />
      <CartSidebar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/products"    element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/register"    element={<Register />} />
        <Route path="/checkout"    element={<Checkout />} />
        <Route path="/profile"           element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/orders"            element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/contact"           element={<Contact />} />
        <Route path="/shipping-returns"  element={<ShippingReturns />} />
        <Route path="/size-guide"        element={<SizeGuide />} />
        <Route path="/faqs"              element={<FAQs />} />
        <Route path="/track-order"       element={<TrackOrder />} />
        <Route path="/gift-cards"        element={<GiftCards />} />
        <Route path="*"                  element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
