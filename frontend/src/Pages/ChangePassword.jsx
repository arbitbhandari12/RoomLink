import React from 'react';
import { useAuth } from '../Store/auth';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const ChangePassword = () => {
  const { authorization } = useAuth();

  const validationSchema = yup.object({
    oldPassword: yup.string().required('Old password is required'),
    newPassword: yup
      .string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be 20 characters or less'),
  });
  
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await fetch(
        `http://localhost:4001/api/auth/changePassword`,
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
          title: 'Password changed!',
          text: 'Your password has been successfully changed.'
        });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong. Please try again later.'
        });
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center mt-16 border border-gray-400">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl border border-gray-400 m-7">
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Change Password
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Old Password
              </label>
              <input
                name="oldPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.oldPassword}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.oldPassword && formik.touched.oldPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.oldPassword}
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                New Password
              </label>
              <input
                name="newPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.newPassword}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
