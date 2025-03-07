import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import { toast } from 'react-toastify';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const validationSchema = yup.object({
    username: yup
      .string()
      .matches(
        /^[a-zA-Z][a-zA-Z0-9]*$/,
        'Username must start with a letter and contain only letters and numbers'
      )
      .trim()
      .required('Username is required')
      .min(5, 'Username must be at least 5 characters')
      .max(10, 'Username must be 10 characters or less'),

    email: yup
      .string()
      .trim()
      .required('Email is required')
      .email('Enter a valid email address')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email format is invalid'
      )
      .max(254, 'Email must be 254 characters or less'),

    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be Valid'),

    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be 20 characters or less')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*]/,
        'Password must contain at least one special character (e.g., !@#$%^&*)'
      )
  });

  const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: ''
  };

  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await fetch(
          `http://localhost:4001/api/auth/register`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
          }
        );
        if (response.ok) {
          formik.resetForm();
          navigate('/');
        }

        const data = await response.json();
        toast.success(data.msg || 'Register Sucess');
        storeToken(data.token);
      } catch (error) {
        console.error('register error:', error.message);
      }
    }
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('room.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>

      <div className="relative bg-white bg-opacity-90 p-8 md:p-10 lg:p-12 rounded-lg shadow-lg w-full max-w-md lg:max-w-lg xl:max-w-xl z-10 mx-4">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-6 text-gray-800">
          Sign Up
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="username"
            >
              UserName
            </label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              id="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {formik.errors.username && formik.touched.username && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </div>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-medium" htmlFor="number">
              Number
            </label>
            <input
              type="number"
              name="phone"
              autoComplete="off"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.phone}
              </div>
            )}
          </div>

          <div className="mb-5 relative">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="off"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 top-8 right-3 flex items-center text-gray-500"
            >
              {showPassword ? 'Hide' : 'Show'} 
            </button>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/Login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
