import { useState } from 'react'; // Removed useEffect since dark mode is not used
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { logout } from '../store/slices/authSlice';
import { toast } from 'react-toastify'; // Added for notifications

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const { items } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirect after logout
  const isAdmin = user?.email === 'admin@example.com';

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Books',
    'Sports',
  ];

  // Handle logout with Firebase and Redux
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      setShowProfileMenu(false);
      setIsOpen(false);
      toast.success('Logged out successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to log out', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <nav className="shadow-md backdrop-blur-md bg-purple-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white">
            E-Trendzz
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category.toLowerCase()}`}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/wishlist" // Lowercased for consistency
              className="text-gray-300 hover:text-red-400 transition-colors relative"
            >
              <FaHeart className="h-6 w-6" />
            </Link>
            <Link
              to="/cart"
              className="text-gray-300 hover:text-blue-400 transition-colors relative"
            >
              <FaShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {user?.email?.[0]?.toUpperCase() || <FaUser />}
                  </div>
                </button>
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Orders
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Settings
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
             
              
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-100 hover:text-blue-400 transition-colors"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-purple-800 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${category.toLowerCase()}`}
                  className="block px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {category}
                </Link>
              ))}
              <Link
                to="/wishlist"
                className="block px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                onClick={() => setIsOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                to="/cart"
                className="block px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                onClick={() => setIsOpen(false)}
              >
                Cart
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-200 hover:bg-purple-700 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;