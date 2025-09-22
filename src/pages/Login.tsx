import React, { useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    if (isValid) {
      // 🔹 Hardcoded login for presentation
      if (
        formData.email === "ganzad73@gmail.com" &&
        formData.password === "12345"
      ) {
        navigate("/admin", { replace: true });
      } else {
        alert("User doesn't exist");
      }
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
            Sign in to your account to continue
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
              className={`mt-1 block w-full rounded-md border p-2 focus:ring-teal-500 ${
                errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-teal-500'
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
              className={`mt-1 block w-full rounded-md border p-2 pr-10 focus:ring-teal-500 ${
                errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-teal-500'
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

          {/* Remember me & forgot password */}
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
              <Link to="/forgotpassword" className="text-sm text-teal-600 hover:text-teal-800">
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
          <Link to='/signup' className='font-semibold text-teal-600 hover:underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
