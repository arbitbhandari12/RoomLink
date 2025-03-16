import React from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../Store/auth';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const RoomShifting = () => {
  const { authorization } = useAuth();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    pickup: Yup.string().required('Pick-up location is required'),
    dropoff: Yup.string().required('Drop-off location is required'),
    shiftingdate: Yup.string().required('Shifting date is required'),
    categories: Yup.string().required('Please select a category'),
    helper: Yup.string().required('Please select an option')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      pickup: '',
      dropoff: '',
      shiftingdate: '',
      categories: '',
      helper: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          'http://localhost:4001/api/shifting/shiftRequest',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: authorization
            },
            body: JSON.stringify(values)
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          Swal.fire({
            icon: 'warning',
            title: 'Login Required!',
            text: 'Please login first before submitting the request.'
          });
        } else if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Request submitted successfully!'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.error || 'Failed to submit request!'
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong! Please try again later.'
        });
      }
    }
  });
  return (
    <>
      <div className=" flex justify-center md:mt-6">
        <div className="border p-4 border-gray-300 bg-white transition w-full mx-auto rounded-lg">
          <div className="text-center font-bold text-2xl">
            <h1>Room Shifting Request</h1>
            <h2>
              Please fill out the form below to request room shifting
              assistance.
            </h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <h1 className="mt-10 font-bold text-xl">Personal Information</h1>
            <div className="grid md:flex mt-4 md:space-x-4">
              <div className="flex flex-col md:w-1/3">
                <label className="mb-2">Name</label>
                <input
                  type="text"
                  className="border border-slate-600 p-2 rounded"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500">{formik.errors.name}</div>
                )}
              </div>
              <div className="flex flex-col md:w-1/3">
                <label className="mb-2">Phone Number</label>
                <input
                  type="text"
                  className="border border-slate-600 p-2 rounded"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500">{formik.errors.phone}</div>
                )}
              </div>
              <div className="flex flex-col md:w-1/3">
                <label className="mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="border border-slate-600 p-2 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>
            </div>
            <h1 className="mt-4 font-bold text-xl mb-4">Shifting Details</h1>
            <div className="grid md:flex gap-2">
              <div className="flex flex-col md:w-1/3">
                <label>Pick-Up Location</label>
                <input
                  type="text"
                  name="pickup"
                  className="border border-slate-600 p-2 rounded mt-3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pickup}
                />
                {formik.touched.pickup && formik.errors.pickup && (
                  <div className="text-red-500">{formik.errors.pickup}</div>
                )}
              </div>
              <div className="flex flex-col md:w-1/3">
                <label>Drop-off Location</label>
                <input
                  type="text"
                  name="dropoff"
                  className="border border-slate-600 p-2 rounded mt-3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dropoff}
                />
                {formik.touched.dropoff && formik.errors.dropoff && (
                  <div className="text-red-500">{formik.errors.dropoff}</div>
                )}
              </div>
              <div className="flex flex-col md:w-1/3">
                <label>Shifting Date</label>
                <input
                  type="datetime-local"
                  name="shiftingdate"
                  className="bg-transparent border border-slate-600 rounded md:p-2 mt-2.5 p-3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.shiftingdate}
                />
                {formik.touched.shiftingdate && formik.errors.shiftingdate && (
                  <div className="text-red-500">
                    {formik.errors.shiftingdate}
                  </div>
                )}
              </div>
            </div>

            <div className="md:flex flex-row gap-6 items-center">
              <div className="flex flex-col md:w-1/2">
                <label className="text-xl md:mt-10 mt-6">
                  House Moving Categories
                </label>
                <select
                  name="categories"
                  className="border border-slate-600 p-3 md:p-2 mt-2 rounded"
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
                {formik.touched.categories && formik.errors.categories && (
                  <div className="text-red-500">{formik.errors.categories}</div>
                )}
              </div>

              <div className="flex flex-col md:w-1/2">
                <label className="text-xl md:mt-10 mt-5">
                  Need Helpers For Packing?
                </label>
                <select
                  className="border border-slate-600 p-3 md:p-2 rounded mt-2"
                  name="helper"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.helper}
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {formik.touched.helper && formik.errors.helper && (
                  <div className="text-red-500">{formik.errors.helper}</div>
                )}
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
