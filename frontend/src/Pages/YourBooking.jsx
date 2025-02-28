import React, { useEffect, useState } from 'react';
import { useAuth } from '../Store/auth';
import { Link } from 'react-router-dom';

const YourBooking = () => {
  const { authorization } = useAuth();
  const [bookings, setBookings] = useState([]);

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
        console.log(data);
      } else {
        console.log('Failed to fetch bookings');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/auth/cancelBooking/${bookingId}`,
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
      {bookings.length > 0 ? (
        <ul className="space-y-2">
          {bookings.map((booking) => (
            <li key={booking._id} className="p-4 border rounded-lg shadow-sm">
              <p>
                <strong>Name:</strong> {booking.name}
              </p>
              <p>
                <strong>Email:</strong> {booking.email}
              </p>
              <p>
                <strong>Phone:</strong> {booking.phone}
              </p>
              <p>
                <strong>Date:</strong> {new Date(booking.date).toLocaleString()}
              </p>
              <p>
                <strong>Room:</strong> {booking.room}
              </p>
              <Link to={`/addproperty/yourproperty/${booking.room}`}>
                <button className="mt-2 mr-2 px-4 py-2 bg-blue-500 text-white rounded">
                  View Room Details
                </button>
              </Link>
              <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
                Cancel Booking
              </button>
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
