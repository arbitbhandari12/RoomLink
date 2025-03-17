import React, { useEffect, useState } from 'react';
import { useAuth } from '../Store/auth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const YourBooking = () => {
  const { authorization } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);

  const yourBookings = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/properties/bookingList',
        {
          method: 'GET',
          headers: {
            Authorization: authorization
          }
        }
      );

      if (response.ok) {
        const data = await response.json();

        setBookings(data.ownerBooking);
        setProperties(data.details);
        console.log(data);
      } else {
        console.log('Failed to fetch bookings');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this booking!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, cancel it!'
      });
      if (!result.isConfirmed) return;

      const response = await fetch(
        `http://localhost:4001/api/auth/cancelBooking/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: authorization
          }
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Cancelled',
          text: 'The booking has been successfully cancelled.'
        });
        yourBookings();
        const data = await updatedData.json();
        setBookings(data.ownerBooking);
      } else {
        console.log('Failed to cancel booking');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    yourBookings();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 justify-center flex">
        Your Bookings
      </h2>
      {properties.length > 0 ? (
        <ul className="space-y-2">
          {properties.map((property) => (
            <li key={property._id} className="p-4 border rounded-lg shadow-sm">
              <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-semibold">{property.title}</h3>
                <p className="text-gray-600">{property.description}</p>
                <p className="text-sm text-gray-500">
                  <strong>Type:</strong> {property.type}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Location:</strong> {property.location}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Price:</strong> Rs {property.price}/month
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Status: </strong>
                  <span
                    className={`${(property.roomStatus === 'Available' ? 'text-green-500' : 'text-red-500')}`}
                  >
                    {property.roomStatus}
                  </span>
                </p>

                <div className="mt-2">
                  <img
                    src={`http://localhost:4001/${property.photos[0]}`}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>

              {bookings
                .filter((booking) => booking.room.toString() === property._id)
                .map((booking) => (
                  <div key={booking._id} className="mt-4 flex space-x-2">
                    <Link to={`/user/yourproperty/${property._id}`}>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        View Room Details
                      </button>
                    </Link>
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel Booking
                    </button>
                    <div className="text-sm text-gray-500 mt-1">
                      Visit date for this room on{' '}
                      <span className="text-indigo-600">
                        {new Date(booking.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex justify-center">No bookings found.</p>
      )}
    </div>
  );
};

export default YourBooking;
