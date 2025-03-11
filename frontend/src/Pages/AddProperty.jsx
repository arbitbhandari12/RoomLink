import { Formik, useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useAuth } from '../Store/auth';
import Swal from 'sweetalert2';

function AddProperty() {
  const { user } = useAuth();

  // const validationSchema = yup.object({
  //   title: yup
  //   .string()
  //   .matches(
  //     /^[a-zA-Z][a-zA-Z0-9]*$/,
  //     'Title must start with a letter and contain only letters and numbers'
  //   )
  //   .trim()
  //   .required('Title is required')
  //   .min(5, 'Title must be at least 5 characters')
  //   .max(30, 'Title must be 30 characters or less'),

  // type: yup
  //   .string()
  //   .required('Property type is required')
  //   .notOneOf(
  //     ['Select Property Type'],
  //     'Please select a valid property type'
  //   ),
  // price: yup
  //   .string()
  //   .required('Price is required')
  //   .matches(/^[0-9]+$/, 'Invalid Input'),
  // bedroom: yup
  //   .string()
  //   .required('Bedroom is required')
  //   .matches(/^[0-9]+$/, 'Invalid Input'),
  // bathroom: yup
  //   .string()
  //   .required('Bathroom is required')
  //   .matches(/^[0-9]+$/, 'Invalid Input')
  // });

  const initialValues = {
    title: '',
    description: '',
    type: '',
    location: '',
    price: '',
    bedroom: '',
    bathroom: '',
    kitchen: '',
    parking: '',
    balcony: '',
    furnishing: '',
    water: '',
    photos: '',
    school: '',
    healthcare: '',
    bank: '',
    park: '',
    transport: '',
    temple: '',
    name: user.username || '',
    phone: user.phone || '',
    email: user.email || ''
  };

  const { authorization } = useAuth();

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    enableReinitialize: true,

    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        if (key === 'photos') {
          Array.from(values.photos).forEach((photo) => {
            formData.append('photos', photo);
          });
        } else {
          formData.append(key, values[key]);
        }
      }
      console.log(values);
      try {
        const response = await fetch(
          'http://localhost:4001/api/properties/addproperty',
          {
            method: 'POST',
            headers: {
              Authorization: authorization
            },
            body: formData
          }
        );

        const data = await response.json();

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Property added successfully!',
            confirmButtonColor: '#3085d6'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text:
              data.error || 'Failed to add property. Please try again later.',
            confirmButtonColor: '#d33'
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Something went wrong. Please try again later.',
          confirmButtonColor: '#d33'
        });
      }

      // if (response.ok) {
      //   formik.resetForm({
      //     values: {
      //       ...initialValues,
      //       name: name,
      //       phone: phone,
      //       email: email
      //     }
      //   });
      //   if (fileInputRef.current) {
      //     fileInputRef.current.value = '';
      //   }
      // }
    }
  });

  return (
    <div className="container border border-gray-300 hover:border-blue-600 rounded-md shadow-lg mt-5 w-full mx-auto p-8 bg-white">
      <div>
        <h1 className="flex justify-start text-4xl font-bold text-gray-800">
          List Your Property
        </h1>
        <h2 className="flex justify-start text-lg text-gray-500 mt-2 mb-6">
          Fill out the form below to list your property for rent.
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div className="mb-6">
          <label className="flex mt-2 text-lg font-semibold">
            Title of the Property
          </label>
          <input
            type="text"
            className="border w-full p-3 rounded-md mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g Luxury Apartment"
            autoComplete="off"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.errors.title && formik.touched.title && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.title}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="flex mt-2 text-lg font-semibold">Description</label>
          <textarea
            type="text"
            className="border w-full p-3 h-28 rounded-md mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Enter the Description for your property"
            name="description"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
        </div>

        <div className="mb-6">
          <label className="flex mt-2 text-lg font-semibold">
            Property Type
          </label>
          <select
            className="flex border w-full mt-1 p-3 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
          >
            <option className="flex">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
            <option value="Flat">Flat</option>
            <option value="Bunglow">Bunglow</option>
          </select>
          {formik.errors.type && formik.touched.type && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.type}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="flex mt-2 text-lg font-semibold">Location</label>
          <input
            type="text"
            className="border w-full p-3 rounded-md mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the complete address"
            name="location"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
          />
        </div>

        <div className="mb-6">
          <label className="text-lg font-semibold">Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => formik.setFieldValue('photos', e.target.files)}
            className="border w-full p-3 rounded-md mt-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          {formik.values.photos && formik.values.photos.length > 0 && (
            <ul className="mt-2">
              {Array.from(formik.values.photos).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col mb-6 lg:flex-row lg:gap-4">
          <div className="flex flex-col lg:w-1/2">
            <label className="text-lg font-semibold">Rental Price</label>
            <input
              type="number"
              placeholder="e.g. 7500"
              className="p-3 mt-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.errors.price && formik.touched.price && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.price}
              </div>
            )}
          </div>
          <div className="flex flex-col lg:w-1/2">
            <label className="text-lg font-semibold">Bedrooms</label>
            <input
              type="number"
              placeholder="e.g. 2"
              className="p-3 mt-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
              name="bedroom"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bedroom}
            />
            {formik.errors.bedroom && formik.touched.bedroom && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.bedroom}
              </div>
            )}
          </div>
          <div className="flex flex-col lg:w-1/2">
            <label className="text-lg font-semibold">Bathrooms</label>
            <input
              type="number"
              placeholder="e.g. 1"
              className="p-3 mt-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
              name="bathroom"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bathroom}
            />
            {formik.errors.bathroom && formik.touched.bathroom && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.bathroom}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row  sm:gap-4">
          <div className="flex flex-col sm:w-1/3">
            <label className="font-bold">Kitchen</label>
            <select
              className="flex border p-3 mt-2  rounded-md"
              name="kitchen"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.kitchen}
            >
              <option value="">Kitchen</option>
              <option className="" value="Yes">
                Yes
              </option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col mt-4 sm:mt-0 sm:w-1/3">
            <label className="font-bold">Parking</label>
            <select
              className="mt-2 p-3 border rounded-md"
              name="parking"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.parking}
            >
              <option value="">Parking</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="flex flex-col mt-4 sm:mt-0 sm:w-1/3">
            <label className="font-bold">Balcony</label>
            <select
              className="mt-2 p-3 border rounded-md"
              name="balcony"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.balcony}
            >
              <option value="">Balcony</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col mt-4 sm:flex-row gap-4">
          <div className="flex flex-col sm:w-1/3">
            <label className="font-bold">Furnishing</label>
            <select
              className="border flex rounded-md p-3 mt-2"
              name="furnishing"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.furnishing}
            >
              <option value="">Furnishing</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="flex flex-col sm:w-1/3">
            <label className="font-bold">Water Facility</label>
            <select
              className="border flex rounded-md p-3 mt-2"
              name="water"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.water}
            >
              <option value="">Water Facility</option>
              <option value="24hrs">24 Hrs</option>
              <option value="morning">Morning</option>
              <option value="day">Day</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>

        <div className="mt-10">
          <span className="font-semibold text-2xl">Area Facilities</span>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row  sm:gap-4">
          <div className="flex flex-col sm:w-1/3">
            <label>School</label>
            <select
              name="school"
              onChange={formik.handleChange}
              value={formik.values.school}
              className="border flex rounded-md p-3 mt-2"
            >
              <option value="">School</option>
              <option value="Nearby">Nearby</option>
              <option value="far">Far</option>
            </select>
          </div>
          <div className="flex flex-col mt-4 sm:mt-0 sm:w-1/3">
            <label>Healthcare</label>
            <select
              name="healthcare"
              onChange={formik.handleChange}
              value={formik.values.healthcare}
              className="border flex rounded-md p-3 mt-2"
            >
              <option value="">Healthcare</option>
              <option value="Nearby">Nearby</option>
              <option value="far">Far</option>
            </select>
          </div>
          <div className="flex flex-col mt-4 sm:mt-0 sm:w-1/3">
            <label>Parks</label>
            <select
              name="park"
              onChange={formik.handleChange}
              value={formik.values.park}
              className="border flex rounded-md p-3 mt-2"
            >
              <option value="">Parks</option>
              <option value="Nearby">Nearby</option>
              <option value="far">Far</option>
            </select>
          </div>
        </div>
        <div className="flex mt-4 flex-col sm:flex-row sm:gap-4">
          <div className="flex flex-col sm:w-1/3">
            <label>Banks</label>
            <select
              name="bank"
              onChange={formik.handleChange}
              value={formik.values.bank}
              className="border flex rounded-md p-3 mt-2 "
            >
              <option value="">Banks</option>
              <option value="Nearby">Nearby</option>
              <option value="far">Far</option>
            </select>
          </div>
          <div className="flex flex-col sm:w-1/3 mt-4 sm:mt-0">
            <label>Public Transport</label>
            <select
              name="transport"
              onChange={formik.handleChange}
              value={formik.values.transport}
              className="border flex rounded-md p-3 mt-2"
            >
              <option value="">Transport</option>
              <option value="Nearby">Nearby</option>
              <option value="far">Far</option>
            </select>
          </div>
          <div className="flex flex-col sm:w-1/3 mt-4 sm:mt-0">
            <label>Temple</label>
            <select
              id="temple"
              name="temple"
              onChange={formik.handleChange}
              value={formik.values.temple}
              className="border flex rounded-md p-3 mt-2"
            >
              <option value="">Temple</option>
              <option value="Nearby">Nearby</option>
              <option value="Far">Far</option>
            </select>
          </div>
        </div>

        <h2 className="flex mt-6 text-2xl font-semibold">
          Contact Information
        </h2>

        <div className="mb-6">
          <label className="flex mt-2 text-lg font-semibold">Name</label>
          <input
            type="text"
            className="flex w-full p-3 rounded-md mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>

        <div className="mb-6">
          <label className="flex mt-2 text-lg font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            className="flex w-full p-3 rounded-md mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </div>

        <div className="mb-6">
          <label className="flex mt-2 text-lg font-semibold">Email</label>
          <input
            type="email"
            className="flex w-full p-3 rounded-md mt-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md mt-4 hover:bg-blue-600 transition"
        >
          List Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
