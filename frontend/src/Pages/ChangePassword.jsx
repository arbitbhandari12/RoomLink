import React from 'react';
import { useAuth } from '../Store/auth';
import { useFormik } from 'formik';

const ChangePassword = () => {
  const { user, authorization } = useAuth();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: ''
    },
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
        console.log('good');
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center mt-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
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
