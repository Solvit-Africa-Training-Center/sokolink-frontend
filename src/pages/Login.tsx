// Update your Login.tsx component
import React, { useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from '../assets/logo.png';
import { useRetailerWholesalerLoginMutation } from '../services/api/sokoLinkApi'; // 👈 Change this import
import { setCredentials as setRetailerCredentials } from '../slices/retailerAuthSlice';
import { setCredentials as setWholesalerCredentials } from '../slices/wholesalerAuthSlice';
import { decodeToken } from '../utils/tokenUtils';
import { getRoleName } from '../utils/roleMapping';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [retailerWholesalerLogin] = useRetailerWholesalerLoginMutation(); // 👈 Use the new mutation

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // In your handleSubmit function in Login.tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email Address is invalid.';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    setIsLoading(true);

    try {
      const response = await retailerWholesalerLogin({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (response.success) {
        const token = response.data.token;
        const decodedToken = decodeToken(token);
        const roleName = getRoleName(decodedToken.role);

        // 👇 ADD THESE CONSOLE LOGS TO SEE THE ROLE DATA
        console.log('🔐 RAW TOKEN:', token);
        console.log('🔓 DECODED TOKEN:', decodedToken);
        console.log('🎭 ROLE ID FROM TOKEN:', decodedToken.role);
        console.log('👤 ROLE NAME MAPPED:', roleName);
        console.log('📧 USER EMAIL:', decodedToken.email);
        console.log('🆔 USER ID:', decodedToken.id);

        const userData = {
          id: decodedToken.id,
          email: decodedToken.email,
          name: decodedToken.email.split('@')[0],
        };

        // Redirect based on role
        if (roleName === 'retailer') {
          console.log('➡️ Redirecting to Retailer Dashboard');
          dispatch(setRetailerCredentials({ user: userData, token }));
          navigate('/retailer/dashboard', { replace: true });
        } else if (roleName === 'wholesaler') {
          console.log('➡️ Redirecting to Wholesaler Dashboard');
          dispatch(setWholesalerCredentials({ user: userData, token }));
          navigate('/wholesaler/dashboard', { replace: true });
        } else {
          console.log('❌ Unknown role:', roleName);
          alert('Access denied. Please use the appropriate login page.');
        }
      }
    } catch (error: any) {
      console.error('❌ Login error:', error);
      setErrors({
        email: 'Invalid email or password',
        password: 'Invalid email or password'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-[#eaf4f3] p-4'>
      <div className='w-full max-w-lg rounded-xl bg-white p-8 shadow-lg'>
        <div className='mb-6 flex flex-col items-center justify-center'>
          <Link to="/">
            <img src={Logo} alt="SokoLink Logo" className="h-10 w-auto cursor-pointer" />
          </Link>
          <h1 className='mt-4 text-3xl font-bold'>Welcome Back</h1>
          <p className='mt-1 text-center text-sm text-gray-500'>
            Sign in to your retailer or wholesaler account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Email Address</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border p-2 focus:ring-teal-500 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-teal-500'
                }`}
              placeholder='Enter your email'
            />
            {errors.email && <p className='mt-1 text-xs text-red-500'>{errors.email}</p>}
          </div>

          {/* Password */}
          <div className='mb-6 relative'>
            <label className='block text-sm font-medium text-gray-700'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border p-2 pr-10 focus:ring-teal-500 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-teal-500'
                }`}
              placeholder='Enter your password'
            />
            <span
              onClick={togglePasswordVisibility}
              className='absolute inset-y-0 right-0 top-6 flex cursor-pointer items-center pr-3 text-gray-400'
            >
              {showPassword ? (
                <MdOutlineVisibilityOff className='h-5 w-5' />
              ) : (
                <MdOutlineVisibility className='h-5 w-5' />
              )}
            </span>
            {errors.password && <p className='mt-1 text-xs text-red-500'>{errors.password}</p>}
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full rounded-md bg-teal-600 p-3 font-semibold text-white transition-colors duration-200 hover:bg-teal-700 disabled:opacity-50'
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-gray-500'>
          Don't have an account?{' '}
          <Link to='/signup' className='font-semibold text-teal-600 hover:underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;