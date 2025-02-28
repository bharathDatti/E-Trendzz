import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { setUser, setError } from '../store/slices/authSlice';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (email !== confirmEmail) {
      alert('Emails do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setUser({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        firstName,
        lastName,
        gender,
        dob
      }));
      navigate('/');
    } catch (error) {
      dispatch(setError(error.message));
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full max-w-md bg-purple-900 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign Up</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <input
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white text-gray-900 border border-gray-100 rounded-md p-2 w-1/2 focus:bg-gray-100 focus:ring-2 focus:ring-purple-400 transition ease-in-out duration-150"
              required
            />
            <input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white text-gray-900 border border-gray-100 rounded-md p-2 w-1/2 focus:bg-gray-100 focus:ring-2 focus:ring-purple-400 transition ease-in-out duration-150"
              required
            />
          </div>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-gray-900 border border-gray-600 rounded-md p-2 mb-4 focus:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
            required
          />
          <input
            placeholder="Confirm Email"
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="bg-white text-gray-900 border border-gray-600 rounded-md p-2 mb-4 focus:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-gray-900 border border-gray-600 rounded-md p-2 mb-4 focus:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
            required
          />
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white text-gray-900 border border-gray-600 rounded-md p-2 mb-4 focus:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
            required
          />
          <label className="text-sm mb-2 text-gray-300 cursor-pointer" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-white text-gray-900 border border-gray-600 rounded-md p-2 mb-4 focus:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
          >
            <option value="male" className="text-black">Male</option>
            <option value="female" className="text-black">Female</option>
            <option value="other" className="text-black">Other</option>
          </select>
          <label className="text-sm mb-2 text-gray-300 cursor-pointer" htmlFor="dob">
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="bg-gray-100 text-gray-900 border border-gray-600 rounded-md p-2 mb-4 focus:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-150"
            required
          />
          <p className="text-gray-100 mt-4">
            Already have an account?{' '}
            <Link 
              to="/login"
              className="text-orange-300 hover:underline"
            >
              Login
            </Link>
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold py-2 px-4 rounded-md mt-4 hover:from-blue-700 hover:to-blue-500 transition ease-in-out duration-150"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
