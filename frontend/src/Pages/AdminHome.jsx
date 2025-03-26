import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import Swal from 'sweetalert2';

const AdminHome = () => {
  const { authorization } = useAuth();
  const [user, setUser] = useState();
  const [property, setProperty] = useState();
  const [remaining, setRemaining] = useState();
  const [remainingShift, setremainingShift] = useState();
  const [rooms, setRooms] = useState();

  const allRooms = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/admin/allRooms', {
        method: 'GET',
        headers: {
          Authorization: authorization
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalUser = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/admin/userCount',
        {
          method: 'GET',
          headers: {
            Authorization: authorization
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ListingCount = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/admin/ListingCount',
        {
          method: 'GET',
          headers: {
            Authorization: authorization
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRemaining(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const propertyCount = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/admin/propertyCount',
        {
          method: 'GET',
          headers: {
            Authorization: authorization
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProperty(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ShiftingCount = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/admin/shiftingCount',
        {
          method: 'GET',
          headers: {
            Authorization: authorization
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setremainingShift(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoom = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this room?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      });
      if (!result.isConfirmed) return;

      const response = await fetch(
        `http://localhost:4001/api/properties/delete/${id}`,
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
          title: 'Deleted!',
          text: 'The room has been deleted successfully.'
        });
        allRooms();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred. Please try again later.'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.'
      });
    }
  };

  useEffect(() => {
    totalUser();
    ListingCount();
    propertyCount();
    allRooms();
    ShiftingCount();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <h1 className="text-2xl font-semibold">RoomLink Dashboard</h1>
        </div>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
            <span className="font-semibold">Total Users</span>
            <span className="text-xl">{user}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
            <span className="font-semibold">Total Rooms</span>
            <span className="text-xl">{property}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
            <span className="font-semibold">Remaining Listing Rooms</span>
            <span className="text-xl">{remaining}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
            <span className="font-semibold">Remaining Shifting Request</span>
            <span className="text-xl">{remainingShift}</span>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="mb-6">
        <div className="mb-5 flex gap-3">
          <NavLink
            to="/admin/addProperty"
            className="bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            + Add Rooms
          </NavLink>
          <NavLink
            to="/admin/yourRooms"
            className="bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            Your Rooms
          </NavLink>
          <NavLink
            to="/admin/booking"
            className="bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            Your Bookings
          </NavLink>
        </div>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-indigo-600 to-red-700 text-white">
            <tr className="">
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Room Id
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Location
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Price
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Owner Email
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms && rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room._id} className="border-b">
                  <td className="py-3 px-4 border-b border-gray-300 text-center ">
                    (#{room._id.substring(18, 24)})
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center ">
                    {room.location}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center ">
                    {room.price}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center ">
                    {room.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center ">
                    <Link to={`/admin/properties/${room._id}`}>
                      <button className="bg-green-500 text-white px-4 py-1 rounded-lg mr-2">
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteRoom(room._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-4 text-center">
                  No rooms available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
