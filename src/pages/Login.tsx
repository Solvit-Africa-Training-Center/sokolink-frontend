import React, { useState } from 'react';
import googleLogo from "../assets/googlelogo.png";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    role: '',
    password: '',
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', role: '', password: '' };

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email Address is invalid.';
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = 'Role is required.';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login data:', formData);
      alert('Login successful!');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-[#eaf4f3] p-4'>
      <div className='w-full max-w-lg rounded-xl bg-white p-8 shadow-lg'>
        <div className='mb-6 flex flex-col items-center justify-center'>
          <div className="flex justify-center items-center mb-2">
            <div className="flex items-center">
  <Link to="/">
    <img 
      src={Logo} 
      alt="SokoLink Logo" 
      className="h-10 w-auto cursor-pointer" 
    />
  </Link>
</div>
          </div>
          <h1 className='mt-4 text-3xl font-bold'>Welcome Back</h1>
          <p className='mt-1 text-center text-sm text-gray-500'>
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Address */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Email Address
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border p-2 focus:ring-teal-500 ${
                errors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-teal-500'
              }`}
              placeholder='Enter your email'
            />
            {errors.email && (
              <p className='mt-1 text-xs text-red-500'>{errors.email}</p>
            )}
          </div>

          {/* Select Role */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Select Role
            </label>
            <select
              name='role'
              value={formData.role}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border p-2 focus:ring-teal-500 ${
                errors.role
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-teal-500'
              }`}
            >
              <option value='' disabled>Select Role</option>
              
              <option value='Retailer'>Retailer</option>
              <option value='Wholesaler'>Wholesaler</option>
              <option value='Admin'>Admin</option>
            </select>
            {errors.role && (
              <p className='mt-1 text-xs text-red-500'>{errors.role}</p>
            )}
          </div>

          {/* Password */}
          <div className='mb-4 relative'>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border p-2 pr-10 focus:ring-teal-500 ${
                errors.password
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-teal-500'
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
            {errors.password && (
              <p className='mt-1 text-xs text-red-500'>{errors.password}</p>
            )}
          </div>

          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500'
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                Remember me
              </label>
            </div>
            <div className='text-sm'>
              <Link
              to="/forgotpassword"
              className="text-sm text-teal-600 hover:text-teal-800"
            >
              Forgot Password?
            </Link>
            </div>
          </div>

          <button
            type='submit'
            className='w-full rounded-md bg-teal-600 p-3 font-semibold text-white transition-colors duration-200 hover:bg-teal-700'
          >
            Login
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-gray-500'>
          Don't have an account?{' '}
          <Link
            to='/signup'
            className='font-semibold text-teal-600 hover:underline'
          >
            Sign Up
          </Link>
        </p>

        <div className='my-6 flex items-center justify-center'>
          <div className='h-px w-full bg-gray-300'></div>
          <span className='mx-4 whitespace-nowrap text-sm text-gray-500'>Or Login with</span>
          <div className='h-px w-full bg-gray-300'></div>
        </div>

          <button
      className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 bg-[#f5f4ef] px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
    >
      <img src={googleLogo} alt="Google Logo" className="h-5 w-5" />
       Google
    </button>
      </div>
    </div>
  );
};

export default Login;