import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

const Login = () => {
  const initialValues = {
    email: '',
    password: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
      // The backend call and token storage have been removed
    }
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-coer bg-center relative"
      style={{ backgroundImage: "url('room.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>

      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div className="">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <Link to="/forgotpassword" className="flex justify-end text-blue-600 mt-2 mb-5">
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/Register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
