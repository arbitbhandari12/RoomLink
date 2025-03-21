import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import ImageSlider from '../Components/Image-Slider';
import { useAuth } from '../Store/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  MapPin,
  Bed,
  Bath,
  CookingPotIcon as Kitchen,
  Car,
  Home,
  Droplet,
  School,
  Hospital,
  TreesIcon as Tree,
  Bus,
  Church,
  Landmark
} from 'lucide-react';
import BookingButton from '../Components/Booking';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [comment, setComment] = useState();
  const [similar, setSimilarRooms] = useState([]);
  const { authorization } = useAuth();

  const initialValues = {
    comment: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => {
      const errors = {};
      if (!values.comment) {
        errors.comment = 'Comment is required';
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (!authorization) {
        toast.error('Please login first to comment.');
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:4001/api/properties/comment/${id}`,
          {
            method: 'POST',
            headers: {
              Authorization: authorization,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          }
        );

        if (response.status === 401) {
          toast.warning('Please login first to comment.');
          return;
        }

        if (response.ok) {
          const updatedCommentsResponse = await fetch(
            `http://localhost:4001/api/properties/getComment/${id}`,
            {
              method: 'GET',
              headers: {
                Authorization: authorization
              }
            }
          );

          const updatedComments = await updatedCommentsResponse.json();
          setComment(updatedComments);
          toast.success('Comment added successfully!');
          formik.resetForm();
        } else {
          console.error('Error submitting comment');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/api/properties/getComment/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: authorization
            }
          }
        );
        const data = await response.json();
        setComment(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (id) {
      fetchComments();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/properties/property/${id}`,
        {
          method: 'GET'
        }
      );
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.log('Error fetching property:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  useEffect(() => {
    const fetchSimilarRooms = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/api/properties/similar/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: authorization
            }
          }
        );
        const data = await response.json();
        console.log('Fetched similar rooms:', data);
        setSimilarRooms(data || []);
      } catch (error) {
        console.error('Error fetching similar rooms:', error);
      }
    };

    if (id) {
      fetchSimilarRooms();
    }
  }, [id]);

  if (!property) {
    return (
      <p className="text-2xl col-span-full text-grey-500 min-h-[700px] justify-center items-center flex">
        Loading property details...
      </p>
    );
  }

  return (
    <>
      <div className="px-3 md:px-16 lg:px-24">
        {/* Image Section */}
        <div className="mt-3">
          <ImageSlider
            images={property.photos.map(
              (photo) => `http://localhost:4001/${photo}`
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start mt-8">
          {/* Left Side */}
          <div className="flex flex-col w-full md:w-1/1 pr-8">
            <div className="flex justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800 w-full break-words">
                {property.title}
              </h1>
            </div>
            <span className="text-sky-500 text-2xl">
              Rs.{`${property.price}/m`}
            </span>
            {/* Property Details Section */}
            <div className="border p-2 border-gray-500 mt-4">
              <h1 className="font-bold text-2xl">
                Property Details
                <span className="text-gray-500 font-normal">
                  (#{property._id.substring(18, 24)})
                </span>
              </h1>
              <p className="text-gray-600 mt-4">{property.description}</p>

              <div className="grid sm:grid-cols-3 grid-cols-2 text-gray-700 mt-6">
                <span className="py-1 flex">
                  <Bed className="mr-2 " size={20} color="black" />
                  {property.bedroom} Bedroom
                </span>
                <span className="py-1 flex">
                  <Bath className="mr-2" size={20} color="black" />
                  Bathrooms: {property.bathroom}
                </span>
                <span className="flex py-1">
                  <Kitchen className="mr-2" size={20} color="black" />
                  Kitchen: {property.kitchen}
                </span>
                <span className="py-3 flex">
                  <Car className="mr-2" size={20} color="black" />
                  Parking: {property.parking}
                </span>
                <span className="flex py-3">
                  <Home className="mr-2" size={20} color="black" />
                  Balcony: {property.balcony}
                </span>
                <span className="flex py-3">
                  <Droplet className="mr-2" size={20} color="black" />
                  Water: {property.water}
                </span>
              </div>
            </div>

            <div className="border border-gray-500 mt-5 p-2">
              <h1 className="text-2xl font-bold ">Nearby Amenities</h1>
              <div className="grid sm:grid-cols-3 mt-6">
                <span className="flex">
                  <School className="mr-2" size={20} color="black" />
                  School: {property.school}
                </span>
                <span className="flex">
                  <Hospital className="mr-2" size={20} color="black" />
                  Healthcare: {property.healthcare}
                </span>
                <span className="flex">
                  <Tree className="mr-2" size={20} color="black" />
                  Park: {property.park}
                </span>
                <span className="flex sm:py-6">
                  <Bus className="mr-2" size={20} color="black" />
                  Public Transportation: {property.transport}
                </span>
                <span className="flex sm:py-6">
                  <Church className="mr-2" size={20} color="black" />
                  Temple: {property.temple}
                </span>
                <span className="flex sm:py-6">
                  <Landmark className="mr-2" size={20} color="black" />
                  Bank: {property.bank}
                </span>
              </div>
            </div>

            <div className="p-4 border mt-5 mb-5 border-gray-500 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Leave Your Feedback
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-2">User Feedback</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {comment &&
                      comment.map((comments) => (
                        <div
                          key={comments._id}
                          className="p-3 bg-white rounded-md shadow"
                        >
                          <p className="text-sm font-semibold text-gray-700">
                            {comments.name}
                          </p>
                          <p className="text-gray-800">{comments.comment}</p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Feedback Form */}
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium mb-2">
                      Your Comment
                    </label>
                    <textarea
                      name="comment"
                      onChange={formik.handleChange}
                      value={formik.values.comment}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your comment here"
                    />
                    {formik.errors.comment && formik.touched.comment && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.comment}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side: Map Placeholder */}
          <div className="flex flex-col w-full sm:w-1/2 mt-6">
            <div className="h-80">
              {property.location && (
                <iframe
                  className="w-full h-full rounded-lg shadow-lg"
                  title="Google Map"
                  src={`https://maps.google.com/maps?width=800&height=400&hl=en&q=${encodeURIComponent(property.location)}&t=k&z=13&ie=UTF8&iwloc=B&output=embed`}
                ></iframe>
              )}
            </div>
            <div className=" border border-gray-500 p-2 mt-4">
              <span className="text-2xl font-bold">Contact Owner</span>
              <div className="text-gray-700 mt-3">
                <span className="block">Name: {property.name}</span>
                <span className="block">Phone: {property.phone}</span>
                <span className="block">Email: {property.email}</span>
              </div>
            </div>

            <div className="flex gap-6 mt-6 mb-32">
              <div>
                <BookingButton
                  id={id}
                  disabled={property.roomStatus === 'Rented'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="flex text-2xl justify-center">Similar Rooms</h1>
      <div className="border mb-10 mt-5 border-gray-400 m-8">
        {similar.length === 0 ? (
          <div className="flex justify-center mt-10 p-10 font-bold">
            <p>No similar Rooms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 mx-3 rounded-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:mx-auto max-w-screen-xl mb-5">
            {similar.map((property, index) => (
              <div
                className="bg-white shadow-sm rounded-lg overflow-hidden border hover:border-blue-600 mt-6 h-80"
                key={index}
              >
                <Link to={`/property/${property._id}`}>
                  <div className="relative">
                    <img
                      src={`http://localhost:4001/${property.photos[0]}`}
                      alt={property.title}
                      className="w-full h-48 rounded-t-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-blue-800 mb-1 truncate">
                      {property.title}
                    </h3>
                    <div className="flex justify-between mt-2">
                      <p className="text-gray-400 text-xl">
                        Rs {property.price}
                      </p>
                      <p className="text-gray-600">
                        Room Type: {property.type}
                      </p>
                    </div>
                    <p className="text-gray-600 flex items-center mt-2">
                      <MapPin size={13} color="blue" className="mr-0.5" />
                      {property.location}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PropertyDetails;
