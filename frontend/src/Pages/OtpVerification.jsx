import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, isVerified } = location.state || {};

  useEffect(() => {
    if (!isVerified) {
      navigate('/');
    }
  }, []);

  const initialValues = {
    code: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      setError('');
      setSuccessMessage('');
      try {
        const response = await fetch(
          'http://localhost:4001/api/auth/otpVerification',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...values, email })
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(
            errorData.message || 'OTP verification failed. Please try again.'
          );
        } else {
          toast.success('OTP verified successfully!');
          navigate('/ResetPassword', { state: { email, isVerified: true } });
        }
      } catch (error) {
        toast.error('Network error. Please try again.');
      }
    }
  });

  const resendCode = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/auth/forgotPassword',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          errorData.message || 'Failed to resend OTP. Please try again.'
        );
      } else {
        toast.success('OTP has been resent successfully.');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">
            Enter Confirmation Code
          </h2>
          <p className="text-gray-600 mb-4">
            We have sent a code to your email. Please enter it below to proceed.
          </p>

          <input
            type="text"
            name="code"
            placeholder="Enter code"
            onChange={formik.handleChange}
            value={formik.values.code}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => resendCode()}
            type="button"
            className="flex w-full justify-end mt-4 text-blue-500 hover:text-blue-600"
          >
            Resend Code
          </button>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Confirm Code
          </button>
        </div>
      </div>
    </form>
  );
};

export default OtpVerification;
