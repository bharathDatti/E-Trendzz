// Import necessary modules and hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config'; // Firebase auth instance
import { setUser, setError } from '../store/slices/authSlice'; // Redux actions
import { toast } from 'react-toastify'; // Toast notifications

// Login Component
function Login() {
  // State for email, password, and loading status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Navigation hook
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      // Authenticate user with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Dispatch user data to Redux store
      dispatch(
        setUser({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        })
      );

      // Show success notification
      toast.success('Logged in successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Navigate to homepage after successful login
      navigate('/');
    } catch (error) {
      // Dispatch error message to Redux store
      dispatch(setError(error.message));

      // Show error notification
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      {/* Login Form Container */}
      <div className="w-full max-w-md bg-purple-900 rounded-xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-100 font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-900 transition ease-in-out duration-150"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-100 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-900 transition ease-in-out duration-150"
              required
            />
          </div>

          {/* Remember Me & Forgot Password Section */}
          <div className="flex items-center justify-between flex-wrap">
            <label className="flex items-center text-sm text-gray-100 cursor-pointer">
              <input
                className="mr-2 accent-blue-600"
                id="remember-me"
                type="checkbox"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password" // Adjust route as needed
              className="text-sm text-orange-200 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white transition-colors duration-300 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-100">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-orange-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;