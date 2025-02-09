import React from 'react';
import { useFormik } from 'formik';

const RoomShifting = () => {
  const initialValues = {
    name: '',
    phone: '',
    email: '',
    pickup: '',
    dropoff: '',
    shiftingdate: '',
    categories: '',
    helper: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const response = await fetch(
        'http://localhost:4001/api/shifting/shiftRequest',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }
      );
      if (response.ok) {
        formik.resetForm();
      }
    }
  });
  return (
    <>
      <div className="bg-blue-100 min-h-screen flex items-center justify-center p-6">
        <div className="border p-4 border-gray-300 bg-white transition w-full max-w-6xl mx-auto m-6 rounded-lg">
          <div className="text-center font-bold text-2xl">
            <h1>Room Shifting Request</h1>
            <h2>
              Please fill out the form below to request room shifting
              assistance.
            </h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <h1 className="mt-10 font-bold text-xl">Personal Information</h1>
            <div className="flex mt-4 space-x-4">
              <div className="flex flex-col w-1/3">
                <label className="mb-2">Name</label>
                <input
                  type="text"
                  className="border border-slate-600 p-2 rounded"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label className="mb-2">Phone Number</label>
                <input
                  type="text"
                  className="border border-slate-600 p-2 rounded"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label className="mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="border border-slate-600 p-2 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
            </div>
            <h1 className="mt-4 font-bold text-xl mb-4">Shifting Details</h1>
            <div className="flex gap-2">
              <div className="flex flex-col w-1/3">
                <label>Pick-Up Location</label>
                <input
                  type="text"
                  name="pickup"
                  className="border border-slate-600 p-2 rounded mt-3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pickup}
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label>Drop-off Location</label>
                <input
                  type="text"
                  name="dropoff"
                  className="border border-slate-600 p-2 rounded mt-3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dropoff}
                />
              </div>
              <div>
                <div className="flex flex-col w-96">
                  <label>Shifting Date</label>
                  <input
                    type="datetime-local"
                    name="shiftingdate"
                    className="border border-slate-600 rounded p-2 mt-2.5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.shiftingdate}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-6 items-center">
              <div className="flex flex-col w-1/2">
                <label className="text-xl mt-10">House Moving Categories</label>
                <select
                  name="categories"
                  className="border border-slate-600 p-2 mt-2 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categories}
                >
                  <option value="">Select an option</option>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">Flat</option>
                  <option value="3BHK">House Moving</option>
                </select>
              </div>

              <div className="flex flex-col w-1/2">
                <label className="text-xl mt-10 ">
                  Need Helpers For Packing?
                </label>
                <select
                  className="border border-slate-600 p-2 rounded mt-2"
                  name="helper"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.helper}
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="border bg-blue-500 w-full mt-8 p-3 rounded-lg hover:bg-blue-200 "
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RoomShifting;
