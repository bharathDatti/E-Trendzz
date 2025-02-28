import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { setProducts, setError, setLoading } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice'; // New import for wishlist
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Filter, X, ShoppingCart, Star, Heart } from 'lucide-react';

function Products() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    'All',
    'Electronics',
    "Men's Clothing",
    "Women's Clothing",
    'Jewelery'
  ];

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch(
          category && category !== 'all'
            ? `https://fakestoreapi.com/products/category/${category}`
            : 'https://fakestoreapi.com/products'
        );
        const data = await response.json();
        dispatch(setProducts(data));
        return data;
      } catch (err) {
        dispatch(setError(err.message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  const filteredProducts = products
    ?.filter((product) => {
      if (priceRange === 'all') return true;
      if (priceRange === '0-50') return product.price <= 50;
      if (priceRange === '50-100') return product.price > 50 && product.price <= 100;
      if (priceRange === '100-200') return product.price > 100 && product.price <= 200;
      if (priceRange === '200+') return product.price > 200;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return b.id - a.id;
      return 0;
    });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Item added to cart!', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    toast.success('Item added to wishlist!', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleCategoryChange = (cat) => {
    const categoryValue = cat.toLowerCase();
    setSelectedCategory(categoryValue);
    if (categoryValue === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryValue);
    }
    setSearchParams(searchParams);
    if (windowWidth < 768) {
      setMobileFiltersOpen(false);
    }
  };

  const getRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Error Loading Products</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-900">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
          </h1>
          
          <button 
            className="md:hidden flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <Filter size={18} />
            Filters
          </button>
          
          <button 
            className="hidden md:flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <AnimatePresence>
          {mobileFiltersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mb-6"
            >
              <div className="bg-white rounded-lg shadow-md p-6 relative">
                <button 
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <X size={20} />
                </button>
                
                <h2 className="text-xl font-semibold mb-4 text-purple-900">Filters</h2>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === cat.toLowerCase()
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-700">Price Range</h3>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-50">Under $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="200+">$200 & Above</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col md:flex-row gap-8">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:block md:w-1/4 lg:w-1/5 overflow-hidden"
              >
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                  <h2 className="text-xl font-semibold mb-4 text-purple-900">Filters</h2>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-gray-700">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleCategoryChange(cat)}
                          className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                            selectedCategory === cat.toLowerCase()
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-gray-700">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 text-gray-700">Price Range</h3>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="all">All Prices</option>
                      <option value="0-50">Under $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-200">$100 - $200</option>
                      <option value="200+">$200 & Above</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            layout
            className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:w-3/4 lg:w-4/5' : 'w-full'}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredProducts?.map((product, index) => (
                  <motion.div
                    key={product.id}
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
                    <Link to={`/products/${product.id}`} className="block">
                      <div className="aspect-square overflow-hidden bg-gray-100 relative">
                        <motion.img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain p-4"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        {product.price > 100 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            Premium
                          </div>
                        )}
                      </div>
                    </Link>
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
                      <Link to={`/products/${product.id}`} className="block">
                        <h2 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 h-14">
                          {product.title}
                        </h2>
                      </Link>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold text-purple-700">${product.price.toFixed(2)}</span>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddToCart(product)}
                            className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                          >
                            <ShoppingCart size={20} />
                          </motion.button>
                          <Link to="/wishlist">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAddToWishlist(product)}
                              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <Heart size={20} />
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredProducts?.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-md p-8 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try changing your filters or category selection.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('all');
                    setSortBy('featured');
                    searchParams.delete('category');
                    setSearchParams(searchParams);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const ChevronLeft = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default Products;