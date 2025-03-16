import React from 'react';
import { useAuth } from '../Store/auth';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const YourProfile = () => {
  const { user } = useAuth();
  const { authorization } = useAuth();

  const validationSchema = yup.object({
    username: yup
      .string()
      .matches(/^[A-Za-z0-9\s]+$/, 'Username can only contain letters, numbers, and spaces')
      .trim()
      .required('Username is required')
      .min(5, 'Username must be at least 5 characters')
      .max(20, 'Username must be at most 20 characters'),

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
      .matches(/^[0-9]{10}$/, 'Phone number must be Valid')
  });

  const formik = useFormik({
    initialValues: {
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const response = await fetch(
        `http://localhost:4001/api/auth/updateProfile/${user._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorization
          },
          body: JSON.stringify(values)
        }
      );
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile information has been successfully updated.'
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:
            errorData.message || 'Something went wrong. Please try again later.'
        });
      }
    }
  });

  return (
    <div className="flex mt-8 w-full justify-center border border-gray-400">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl border border-gray-400 m-7">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Personal Details
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="username"
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username && formik.touched.username && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.phone}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default YourProfile;
