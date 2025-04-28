import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../Store/auth';
import Swal from 'sweetalert2';
import { useRef } from 'react';

function AddProperty() {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const validationSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required('Name is required')
      .min(3, 'Title must be at least 5 characters')
      .max(30, 'Title must be 30 characters or less'),

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
      .matches(/^[0-9]{10}$/, 'Phone number must be Valid'),

    title: yup
      .string()
      .trim()
      .required('Title is required')
      .min(5, 'Title must be at least 5 characters')
      .max(30, 'Title must be 30 characters or less'),

    description: yup
      .string()
      .trim()
      .required('Description is required')
      .min(5, 'Title must be at least 5 characters'),

    location: yup.string().trim().required('Location is required'),

    type: yup
      .string()
      .required('Property type is required')
      .notOneOf(
        ['Select Property Type'],
        'Please select a valid property type'
      ),

    photos: yup.mixed().required('Image is required'),

    price: yup
      .string()
      .required('Price is required')
      .matches(/^[0-9]+$/, 'Invalid Input'),

    bedroom: yup
      .string()
      .required('Bedroom is required')
      .matches(/^[0-9]+$/, 'Invalid Input'),

    bathroom: yup
      .string()
      .required('Bathroom is required')
      .matches(/^[0-9]+$/, 'Invalid Input'),

    kitchen: yup
      .string()
      .required('Please select if the property has a kitchen')
      .notOneOf(['Kitchen'], 'Please select if the property has a kitchen'),

    parking: yup
      .string()
      .required('Please select if the property has a Parking')
      .notOneOf(['parking'], 'Please select if the property has a Parking'),

    balcony: yup
      .string()
      .required('Please select if the property has a Balcony')
      .notOneOf(['parking'], 'Please select if the property has a Balcony'),

    bank: yup
      .string()
      .required('Please select if the property has a nearby bank')
      .notOneOf(['bank'], 'Please select if the property has a nearby bank'),

    school: yup
      .string()
      .required('Please select if the property has a nearby school')
      .notOneOf(
        ['school'],
        'Please select if the property has a nearby school'
      ),

    healthcare: yup
      .string()
      .required(
        'Please select if the property has a nearby healthcare facility'
      )
      .notOneOf(
        ['healthcare'],
        'Please select if the property has a nearby healthcare facility'
      ),

    park: yup
      .string()
      .required('Please select if the property has a nearby park')
      .notOneOf(['park'], 'Please select if the property has a nearby park'),

    transport: yup
      .string()
      .required('Please select if the property has public transport nearby')
      .notOneOf(
        ['transport'],
        'Please select if the property has public transport nearby'
      ),

    temple: yup
      .string()
      .required('Please select if the property has a nearby temple')
      .notOneOf(
        ['temple'],
        'Please select if the property has a nearby temple'
      ),

    furnishing: yup
      .string()
      .required('Please select a furnishing option')
      .notOneOf(['furnishing'], 'Please select a valid furnishing option'),

    water: yup
      .string()
      .required('Please select a water facility option')
      .notOneOf(['water'], 'Please select a valid water facility option')
  });

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
    validationSchema: validationSchema,
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
        if (response.ok) {
          formik.resetForm();
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Room added successfully!',
            confirmButtonColor: '#3085d6'
          });
        } else if (response.status === 401) {
          Swal.fire({
            icon: 'warning',
            title: 'Login Required!',
            text: 'Please login first before listing the Room.',
            confirmButtonColor: '#d33'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.error || 'Failed to submit request!'
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Something went wrong. Please try again laterrrrrrr.',
          confirmButtonColor: '#d33'
        });
      }
    }
  });

  return (
    <div className="container border border-gray-300 hover:border-blue-600 rounded-md shadow-lg mt-5 w-full mx-auto p-8 bg-white">
      <div>
        <h1 className="flex justify-start text-4xl font-bold text-gray-800">
          List Your Room
        </h1>
        <h2 className="flex justify-start text-lg text-gray-500 mt-2 mb-6">
          Fill out the form below to list your room for rent.
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div className="mb-6">
          <label className="flex mt-2 text-lg font-semibold">
            Title of the Room
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
          {formik.errors.description && formik.touched.description && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="flex mt-2 text-lg font-semibold">Room Type</label>
          <select
            className="flex border w-full mt-1 p-3 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
          >
            <option className="flex">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
            <option value="Flat">Flat</option>
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
          {formik.errors.location && formik.touched.location && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.location}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="text-lg font-semibold">Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
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
          {formik.errors.photos && formik.touched.photos && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.photos}
            </div>
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
            {formik.errors.kitchen && formik.touched.kitchen && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.kitchen}
              </div>
            )}
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
            {formik.errors.parking && formik.touched.parking && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.parking}
              </div>
            )}
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
            {formik.errors.balcony && formik.touched.balcony && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.balcony}
              </div>
            )}
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
            {formik.errors.furnishing && formik.touched.furnishing && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.furnishing}
              </div>
            )}
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
            {formik.errors.water && formik.touched.water && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.water}
              </div>
            )}
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
            {formik.errors.school && formik.touched.school && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.school}
              </div>
            )}
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
            {formik.errors.healthcare && formik.touched.healthcare && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.healthcare}
              </div>
            )}
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
            {formik.errors.park && formik.touched.park && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.park}
              </div>
            )}
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
            {formik.errors.bank && formik.touched.bank && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.bank}
              </div>
            )}
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
            {formik.errors.transport && formik.touched.transport && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.transport}
              </div>
            )}
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
            {formik.errors.temple && formik.touched.temple && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.temple}
              </div>
            )}
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
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
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
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.phone}
            </div>
          )}
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
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md mt-4 hover:bg-blue-600 transition"
        >
          List Room
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
