import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { removeFromWishlist, clearWishlist } from '../store/slices/wishlistSlice';
import { toast } from 'react-toastify';
import { X, ShoppingCart, Star, Trash2 } from 'lucide-react';

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Item removed from wishlist!', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.info('Wishlist cleared!', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const getRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
  };

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-900">My Wishlist</h1>
          {wishlistItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearWishlist}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors"
            >
              <Trash2 size={18} />
              Clear Wishlist
            </motion.button>
          )}
        </div>

        {/* Wishlist Items */}
        <AnimatePresence>
          {wishlistItems.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <Link to={`/products/${item.id}`} className="block">
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-4"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-2 right-2 bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
                      <X size={18} />
                    </motion.button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < Math.floor(parseFloat(getRandomRating())) ? "currentColor" : "none"} 
                            className={i < Math.floor(parseFloat(getRandomRating())) ? "text-yellow-400" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">{getRandomRating()}</span>
                    </div>
                    <Link to={`/products/${item.id}`} className="block">
                      <h2 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 h-14">
                        {item.title}
                      </h2>
                    </Link>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-purple-700">${item.price.toFixed(2)}</span>
                      <Link to={`/products/${item.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                        >
                          <ShoppingCart size={20} />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-8 text-center"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-6">Add some items to your wishlist to see them here!</p>
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
                >
                  Start Shopping
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Wishlist;