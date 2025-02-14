import { useAuth } from '../Store/auth';
import { useEffect, useState } from 'react';

const OwnerBooking = () => {
  const { authorization } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/properties/bookingList',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorization
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBookings(data.ownerBooking || []);
      setRooms(data.details || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    if (authorization) {
      fetchBookings();
    }
  }, [authorization]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Your Booking List
      </h2>
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div
            key={room._id}
            className="border rounded-lg p-6 mb-8 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                {room.title} - {room.location}
              </h3>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                View Details
              </button>
            </div>
            <p className="text-gray-600 text-lg">
              Price: Rs{room.price} | Status: {room.roomStatus}
            </p>

            {bookings.filter((booking) => booking.room === room._id).length >
              0 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-800">
                  Bookings for this Room:
                </h4>
                <ul className="mt-4 space-y-4">
                  {bookings
                    .filter((booking) => booking.room === room._id)
                    .map((booking) => (
                      <li
                        key={booking._id}
                        className="border p-4 rounded-md bg-gray-50 shadow-sm hover:bg-gray-100 transition-colors duration-300"
                      >
                        <div className="font-medium text-gray-700">
                          {booking.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          booked this room on{' '}
                          <span className="text-indigo-600">
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Email: {booking.email} | Phone: {booking.phone}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No rooms found.</p>
      )}
    </div>
  );
};

export default OwnerBooking;
