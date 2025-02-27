import React from 'react';
import { useAuth } from '../Store/auth';
import { useFormik } from 'formik';

const YourProfile = () => {
  const { user } = useAuth();
  const { authorization } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: user.username || '',
      email: user.email || '',
      phone: user.phone || ''
    },
    enableReinitialize: true,
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
        console.log('Sucess');
      } else {
        console.log('not');
      }
    }
  });

  return (
    <div className="flex mt-8 w-full justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
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
                name="name"
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
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
