import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <>
      <div className="border min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-600 w-full max-w-md p-6">
          <h1 className="font-bold text-2xl text-center">Forgot Password </h1>
          <h2 className="font-extralight text-gray-500 text-center">
            Enter your email address and we'll send you a link to reset your
            password.
          </h2>
          <div className="mt-6">
            <label className="font-bold">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email...."
              className="border border-slate-600 p-2 rounded w-full mt-2"
            />
          </div>
          <div>
            <button className="w-full bg-black text-white p-2 rounded mt-5">
              Send Reset Link
            </button>
            <Link
              to="/login"
              className="flex justify-center mt-3 text-blue-600"
            >
              Back to Login?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
