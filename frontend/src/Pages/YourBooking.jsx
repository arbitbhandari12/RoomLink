import React, { useEffect, useState } from 'react';
import { useAuth } from '../Store/auth';
import { Link } from 'react-router-dom';

const YourBooking = () => {
  const { authorization } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [properties, setproperties] = useState([]);

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
        setproperties(data.details);
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
        console.log('good');
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
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
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
                  <strong>Price:</strong> ₹{property.price}/month
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Status:</strong> {property.roomStatus}
                </p>
                <div className="mt-2">
                  <img
                    src={`http://localhost:4001/${property.photos[0]}`}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Link to={`/user/yourproperty/${property._id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    View Room Details
                  </button>
                </Link>
                {bookings.map((booking) => (
                  <div key={booking._id}>
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel Booking
                    </button>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default YourBooking;
