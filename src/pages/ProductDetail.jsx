import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';

// Mock customer reviews (in a real app, this would come from an API)
const generateRandomReviews = () => [
  { id: 1, rating: 4, text: "Great product! Really satisfied with the quality.", user: "John D." },
  { id: 2, rating: 5, text: "Excellent purchase, exceeded my expectations!", user: "Sarah M." },
  { id: 3, rating: 3, text: "Good but could be improved.", user: "Mike R." },
];

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const wishlist = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === Number(id));

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      return response.json();
    },
  });

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-600 p-8 bg-red-100 rounded-lg m-4">
      Error: {error.message}
    </div>
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAddedToCart(true);
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
    setTimeout(() => setIsAddedToCart(false), 2000); // Reset button state after 2s
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    toast.info(`${product.title} ${isInWishlist ? 'removed from' : 'added to'} wishlist!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl">
        {/* Product Header */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
            <div className="flex items-center space-x-2">
              {renderStars(4)} {/* Assuming average rating of 4 */}
              <span className="text-gray-600 text-sm">(128 reviews)</span>
            </div>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            <p className="text-3xl font-bold text-grey-600">${product.price}</p>
            
            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  isAddedToCart 
                    ? 'bg-green-500 text-white' 
                    : 'bg-purple-600 text-white hover:bg-purple-900'
                }`}
              >
                {isAddedToCart ? 'Item Added ✓' : 'Add to Cart'}
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`p-3 rounded-lg border-2 transition-colors duration-300 ${
                  isInWishlist 
                    ? 'border-red-500 text-red-500' 
                    : 'border-purple-600 text-purple-600 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <FaHeart size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="p-6 border-t">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
          <div className="space-y-4">
            {generateRandomReviews().map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(review.rating)}
                  <span className="font-medium">{review.user}</span>
                </div>
                <p className="text-gray-600">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;