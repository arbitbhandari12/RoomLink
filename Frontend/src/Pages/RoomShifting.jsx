import React from 'react';
import { useFormik } from 'formik';

const RoomShifting = () => {
  const Formik = useFormik({
    name: '',
    phone: '',
    email: '',
    pickup: '',
    dropoff: '',
    shiftingdate: '',
    listofitems: '',
    helper: ''
  });
  return (
    <>
      <div className="border p-4 border-gray-300 hover:border-blue-500 transition w-full max-w-6xl mx-auto m-6">
        <div className="text-center font-bold text-2xl">
          <h1>Room Shifting Request</h1>
          <h2>
            Please fill out the form below to request room shifting assistance.
          </h2>
        </div>
        <h1 className="mt-10 font-bold text-xl">Personal Information</h1>
        <div className="flex mt-4 space-x-4">
          <div className="flex flex-col w-1/3">
            <label className="mb-2">Name</label>
            <input
              type="text"
              className="border border-slate-600 p-2 rounded"
              name="name"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label className="mb-2">Phone Number</label>
            <input
              type="text"
              className="border border-slate-600 p-2 rounded"
              name="phone"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label className="mb-2">Email</label>
            <input
              type="email"
              className="border border-slate-600 p-2 rounded"
            />
          </div>
        </div>
        <h1 className="mt-4 font-bold text-xl mb-4">Shifting Details</h1>
        <div className="flex gap-2">
          <div className="flex flex-col w-1/3">
            <label>Pick-Up Location</label>
            <input
              type="text"
              className="border border-slate-600 p-2 rounded mt-3"
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label>Drop-off Location</label>
            <input
              type="text"
              className="border border-slate-600 p-2 rounded mt-3"
            />
          </div>
          <div>
            <div className="flex flex-col w-96">
              <label>Shifting Date</label>
              <input
                type="datetime-local"
                className="border border-slate-600 rounded p-2 mt-2.5"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-xl mt-4">
            List of items to be shifted
          </h1>
          <input
            type="text"
            className="border border-slate-600 p-2 h-28 mt-3"
          />
        </div>
        <div className="flex flex-col mt-6">
          <label className="text-xl ">Need Helpers For Packing?</label>
          <select className="border border-slate-600 p-2 rounded mt-2 w-1/5">
            <option value="" className="flex">
              Need Helpers For Packing?
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <button type="submit" className="border bg-blue-500 w-full mt-8 p-3">
          Submit Request
        </button>
      </div>
    </>
  );
};

export default RoomShifting;
