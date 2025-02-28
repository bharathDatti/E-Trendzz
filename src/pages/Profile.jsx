// Import necessary modules and hooks
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase/config'; // Firebase auth instance
import { db } from '../firebase/config'; // Firestore instance
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore methods
import { setUser } from '../store/slices/authSlice'; // Redux action
import { toast } from 'react-toastify'; // Toast notifications

// Profile Component
function Profile() {
  // Get authenticated user from Redux store
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for profile form data
  const [formData, setFormData] = useState({
    displayName: '',
    photo: null, // Base64 string or null
  });
  const [selectedFile, setSelectedFile] = useState(null); // State for uploaded file
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to view your profile', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/login');
    } else {
      // Load initial profile data from Firestore
      loadProfileData();
    }
  }, [isAuthenticated, navigate]);

  // Load existing profile data from Firestore using email as reference
  const loadProfileData = async () => {
    if (!user?.email) return;
    setIsLoading(true);
    try {
      const userDocRef = doc(db, 'users', user.email); // Use email as document ID
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        setFormData({
          displayName: data.displayName || '',
          photo: data.photo || null, // Retrieve base64 string
        });
      }
    } catch (error) {
      toast.error('Failed to load profile data', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection and convert to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
        toast.error('File size must be less than 5MB', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert to base64
      reader.onload = () => {
        setSelectedFile(file);
        setFormData((prev) => ({
          ...prev,
          photo: reader.result, // Store base64 string
        }));
      };
      reader.onerror = () => {
        toast.error('Failed to process image', {
          position: 'top-right',
          autoClose: 3000,
        });
      };
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userDocRef = doc(db, 'users', user.email); // Use email as document ID
      const updatedData = {
        displayName: formData.displayName,
        photo: formData.photo || null, // Base64 string or null
        email: user.email,
        uid: user.uid,
        updatedAt: new Date().toISOString(),
      };

      // Update Firestore document
      await setDoc(userDocRef, updatedData, { merge: true });

      // Update Redux store
      dispatch(
        setUser({
          ...user,
          displayName: formData.displayName,
          photo: formData.photo || null,
        })
      );

      // Show success notification
      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      setSelectedFile(null); // Clear file input
    } catch (error) {
      console.error('Error details:', error.code, error.message);
      toast.error(`Failed to update profile: ${error.message}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    auth.signOut();
    dispatch(setUser(null)); // Clear user in Redux
    toast.info('Logged out successfully', {
      position: 'top-right',
      autoClose: 3000,
    });
    navigate('/login');
  };

  if (!isAuthenticated) return null; // Render nothing while redirecting
  if (isLoading) {
    return (
      <div className="min-h-screen bg-orange-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-100 border shadow py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Profile</h1>

        <div className="bg-white rounded-xl shadow-lg p-6 md:flex md:space-x-6">
          {/* Profile Picture and Info */}
          <div className="md:w-1/3 flex flex-col items-center">
            <img
              src={formData.photo || 'https://via.placeholder.com/150'} // Display base64 or fallback
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-500"
            />
            <h2 className="text-xl font-semibold text-gray-800">{formData.displayName || 'User'}</h2>
            <p className="text-gray-600">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Log Out
            </button>
          </div>

          {/* Profile Form */}
          <div className="md:w-2/3 mt-6 md:mt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="displayName">
                  Display Name
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 transition ease-in-out duration-150"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="photoUpload">
                  Profile Picture
                </label>
                <input
                  id="photoUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition ease-in-out duration-150"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload an image (max 5MB, stored as base64 in Firestore)
                </p>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className={`py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-300 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <Link to="/" className="text-blue-600 hover:underline">
                  Back to Home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;