import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          'http://localhost:4001/api/auth/forgotPassword',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(
            errorData.error || 'Something went wrong. Please try again.'
          );
          return;
        }
        toast.success('Otp send Sucessful');
        navigate('/verify-otp', { state: { email: values.email, isVerified:true } });
      } catch (error) {
        toast.error('Network error. Please try again.');
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
              name="email"
              placeholder="Enter Your Email..."
              className="border border-gray-300 p-3 rounded-lg w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300"
            >
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
    </form>
  );
};

export default ForgotPassword;
