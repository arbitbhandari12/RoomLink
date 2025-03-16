import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import Swal from 'sweetalert2';

const EditShifting = () => {
  const { id } = useParams();
  const [shift, setShift] = useState();
  const authorization = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: shift || {
      name: '',
      phone: '',
      email: '',
      pickup: '',
      dropoff: '',
      shiftingdate: '',
      categories: '',
      helper: ''
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const response = await fetch(
        `http://localhost:4001/api/shifting/editShifting/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorization
          },
          body: JSON.stringify(values)
        }
      );
      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Edit Request successfully!'
        }).then(() => {
          navigate('/RoomShifting/yourRequest');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text:
            result.error || 'Failed to update request. Please try again later.',
          confirmButtonColor: '#d33'
        });
      }
    }
  });

  const shiftingEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/shifting/shiftingEdit/${id}`,
        {
          method: 'GET'
        }
      );
      if (response.ok) {
        const data = await response.json();
        setShift(data);
        console.log(data);

        if (data.shiftingdate) {
          const date = new Date(data.shiftingdate);
          data.shiftingdate = date.toISOString().slice(0, 16);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    shiftingEdit();
  }, []);

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

export default EditShifting;
