import { Link } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import { useEffect, useState } from 'react';

const OwnerBooking = ({ basePath }) => {
  const { authorization } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/properties/landloardBooking',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorization
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBookings(data.ownerBooking);
        setRooms(data.details);
        setFilteredRooms(data.details);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(room => 
        room.title.toLowerCase().includes(term)
      );
      setFilteredRooms(filtered);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Upcoming Visits
      </h2>
      {rooms.length > 0 && (
        <div className="flex justify-center">
          <label className="block mb-2 font-bold mr-2 mt-2">
            Search Booking
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by room title..."
            className="border w-64 p-2 rounded border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      )}
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => (
          <div
            key={room._id}
            className="border rounded-lg p-6 mb-8 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                {room.title} - {room.location}
              </h3>
              <Link key={room._id} to={`${basePath}/properties/${room._id}`}>
                <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  View Details
                </button>
              </Link>
            </div>
            <p className="text-gray-600 text-lg">Price: Rs{room.price}</p>

            <div className="mt-6 space-y-2 max-h-56 overflow-y-auto">
              <h4 className="text-xl font-semibold text-gray-800">
                Visit for this Room:
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
                      <div className="text-sm text-gray-500 mt-1">
                        Visit date for this room on{' '}
                        <span className="text-indigo-600">
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Email: {booking.email} | Phone: {booking.phone}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          {searchTerm ? 'No matching rooms found.' : 'No upcoming visits.'}
        </p>
      )}
    </div>
  );
};

export default OwnerBooking;