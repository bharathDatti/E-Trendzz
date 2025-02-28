import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config'; // No storage needed
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function AdminPanel() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [formData, setFormData] = useState({
    type: 'product',
    id: '',
    title: '',
    price: '',
    image: '',
    description: '',
    category: '',
    email: '',
    displayName: '',
    photo: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const isAdmin = user?.email === 'admin@example.com';

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Books',
    'Sports',
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to access the admin panel');
      navigate('/login');
    } else if (!isAdmin) {
      toast.error('You do not have admin privileges');
      navigate('/');
    } else {
      fetchData();
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const productsSnapshot = await getDocs(collection(db, 'products'));
      setProducts(productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      const usersSnapshot = await getDocs(collection(db, 'users'));
      setUsers(usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      toast.error(`Failed to fetch data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedImage(file);
        setFormData((prev) => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.onerror = () => {
        toast.error('Failed to process image');
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.type === 'product') {
        const productData = {
          title: formData.title,
          price: parseFloat(formData.price),
          image: formData.image,
          description: formData.description,
          category: formData.category || 'Uncategorized',
        };
        if (isEditing) {
          await updateDoc(doc(db, 'products', formData.id), productData);
          toast.success('Product updated successfully!');
        } else {
          await addDoc(collection(db, 'products'), productData);
          toast.success('Product added successfully!');
        }
      } else {
        const userData = {
          email: formData.email,
          displayName: formData.displayName,
          photo: formData.photo || '',
        };
        if (isEditing) {
          await updateDoc(doc(db, 'users', formData.email), userData);
          toast.success('User updated successfully!');
        } else {
          await setDoc(doc(db, 'users', formData.email), userData);
          toast.success('User added successfully!');
        }
      }
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error details:', error.code, error.message);
      toast.error(`Failed to save: ${error.message}`);
    }
  };

  const handleEdit = (item, type) => {
    setIsEditing(true);
    setFormData({
      type,
      id: item.id,
      title: item.title || '',
      price: item.price || '',
      image: item.image || '',
      description: item.description || '',
      category: item.category || '',
      email: item.email || '',
      displayName: item.displayName || '',
      photo: item.photo || '',
    });
    setSelectedImage(null);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      await deleteDoc(doc(db, type === 'product' ? 'products' : 'users', id));
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
      fetchData();
    } catch (error) {
      toast.error(`Failed to delete: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'product',
      id: '',
      title: '',
      price: '',
      image: '',
      description: '',
      category: '',
      email: '',
      displayName: '',
      photo: '',
    });
    setSelectedImage(null);
    setIsEditing(false);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Panel</h1>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {isEditing ? 'Edit' : 'Add'} {formData.type === 'product' ? 'Product' : 'User'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="product"
                  checked={formData.type === 'product'}
                  onChange={handleChange}
                  className="mr-2 accent-blue-600"
                />
                Product
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="user"
                  checked={formData.type === 'user'}
                  onChange={handleChange}
                  className="mr-2 accent-blue-600"
                />
                User
              </label>
            </div>

            {formData.type === 'product' ? (
              <>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Product Title"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  required
                />
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  required
                />
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="imageUrl">
                    Product Image URL {isEditing ? '(Leave blank to keep current)' : '(Required)'}
                  </label>
                  <input
                    id="imageUrl"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    required={!isEditing}
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-2 w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  rows="3"
                />
              </>
            ) : (
              <>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  required
                />
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="Display Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                />
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="photoUpload">
                    Profile Picture {isEditing && !selectedImage ? '(Leave blank to keep current)' : ''}
                  </label>
                  <input
                    id="photoUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  />
                  {formData.photo && (
                    <img
                      src={formData.photo}
                      alt="Preview"
                      className="mt-2 w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              </>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Products Section - Category Wise */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
          <div className="space-y-4">
            {Object.entries(groupedProducts).map(([category, items]) => (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-800">{category} ({items.length})</span>
                  {expandedCategories[category] ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedCategories[category] && (
                  <div className="overflow-x-auto mt-2">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="p-3">Title</th>
                          <th className="p-3">Price</th>
                          <th className="p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((product) => (
                          <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{product.title}</td>
                            <td className="p-3">${product.price.toFixed(2)}</td>
                            <td className="p-3 flex space-x-2">
                              <button
                                onClick={() => handleEdit(product, 'product')}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id, 'product')}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">Email</th>
                  <th className="p-3">Display Name</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.displayName || '-'}</td>
                    <td className="p-3 flex space-x-2">
                      <button onClick={() => handleEdit(user, 'user')} className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(user.id, 'user')} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;