import { useEffect } from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { setUser, logout } from './store/slices/authSlice';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import About from './pages/About'
import Contact from './pages/Contact'
import Wishlist from './pages/wishList';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/Admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          email: user.email,
          uid: user.uid
        }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Admin Route Component
const AdminRoute = ({ element }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isAdmin = user?.email === 'admin@example.com'; // Adjust admin check
  return isAuthenticated && isAdmin ? element : <Navigate to="/admin" />;
};
  

  return (
    <div className="min-h-screen bg-orange-100">
     
      <Navbar />
     
      <main className="container mx-auto px-4 py-8">
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* Admin route */}
          <Route path="/admin" element={<AdminRoute element={<AdminPanel />} />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;