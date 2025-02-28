import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { items, total } = useSelector((state) => state.cart);
  // Assuming auth state is stored in Redux (adjust based on your setup)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Example path
  const navigate = useNavigate();

  // Form state for shipping details
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error('Please log in to place an order', {
        position: 'top-right',
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000);
      return;
    }

    // Validate form if authenticated
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fill in all required fields', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // Simulate order placement (replace with API call)
    toast.success('Order placed successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
    setTimeout(() => {
      navigate('/'); // Redirect to home or confirmation page
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add items to your cart to proceed with checkout.</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  rounded-xl  py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        {!isAuthenticated && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-lg">
            <p>You must be logged in to place an order. <Link to="/login" className="underline hover:text-yellow-900">Log in now</Link>.</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Shipping Form */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                  disabled={!isAuthenticated} // Disable if not logged in
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123 Main St"
                  disabled={!isAuthenticated}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="New York"
                    disabled={!isAuthenticated}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.postalCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="10001"
                    disabled={!isAuthenticated}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="United States"
                  disabled={!isAuthenticated}
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title || item.name}
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                  <div className="flex-grow">
                    <h3 className="text-gray-800 font-medium">
                      {item.title || item.name}
                    </h3>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleSubmit}
                className={`w-full mt-6 font-semibold py-3 rounded-lg transition-colors duration-300 ${
                  isAuthenticated
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
                disabled={!isAuthenticated}
              >
                {isAuthenticated ? 'Place Order' : 'Log In to Order'}
              </button>
              <Link
                to="/cart"
                className="block text-center mt-2 text-blue-600 hover:underline"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;