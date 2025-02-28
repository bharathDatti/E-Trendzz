import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screenflex items-center justify-center py-12 px-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven’t added anything yet!</p>
          <Link
            to="/products"
            className="inline-block bg-purple-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        {/* Cart Items Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center py-4 border-b border-gray-200 last:border-b-0"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title || item.name} // Fallback to 'name' if 'title' isn't available
                  className="w-20 h-20 object-contain rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-grow ml-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.title || item.name}
                  </h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal for Item */}
                <div className="ml-4 text-gray-800 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 p-6 border-t">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-grey-600">${total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-purple-600 text-white text-center font-semibold py-3 rounded-lg hover:bg-purple-900 transition-colors duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;