import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="flex min-h-lvh items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h1 className="font-bold text-3xl text-center text-gray-800">
          Forgot Password
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <div className="mt-6">
          <label className="font-semibold text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email..."
            className="border border-gray-300 p-3 rounded-lg w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300">
            Send Reset Link
          </button>
          <Link
            to="/login"
            className="block text-center mt-4 text-blue-600 hover:underline"
          >
            Back to Login?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
