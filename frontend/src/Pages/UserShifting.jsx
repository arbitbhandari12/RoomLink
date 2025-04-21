import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Store/auth';
import Swal from 'sweetalert2';

function UserShifting() {
  const [shift, setShift] = useState([]);
  const { authorization } = useAuth();

  const shifting = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/shifting/requestHistory',
        {
          method: 'GET',
          headers: {
            Authorization: authorization
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setShift(data.request);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteShifting = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        shifting();
        const response = await fetch(
          `http://localhost:4001/api/shifting/deleteShifting/${id}`,
          {
            method: 'DELETE'
          }
        );
      }
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Request delete successfully!',
          confirmButtonColor: '#3085d6'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    shifting();
  }, []);

  return (
    <>
      <div>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden sm:table">
          <thead className="bg-gradient-to-r from-indigo-600 to-red-700 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Pick-Up Location
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Drop-Off Location
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Shifting Date
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Status
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {shift.length > 0 ? (
              shift.map((request, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
                >
                  <td className="py-3 px-4 border-b border-gray-300 text-center">
                    {request.pickup}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center">
                    {request.dropoff}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center">
                    {new Date(request.shiftingdate).toLocaleString()}
                  </td>
                  <td className="text-center py-3 px-4 border-b">
                    <span
                      className={`py-3 px-4 border-b border-gray-300 rounded-full 
                    ${
                      request.status === 'Pending'
                        ? 'bg-yellow-200'
                        : request.status === 'Rejected'
                          ? 'bg-red-200'
                          : 'bg-green-200'
                    }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center">
                    <Link
                      key={shift._id}
                      to={`/Roomshifting/Shifting/${request._id}`}
                    >
                      <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 mr-4">
                        View Details
                      </button>
                    </Link>
                    <Link
                      key={request._id}
                      to={`/RoomShifting/editShifting/${request._id}`}
                    >
                      <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 mr-4">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteShifting(request._id)}
                      className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No shifting requests available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="sm:hidden space-y-4">
          {shift.length > 0 ? (
            shift.map((request, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg shadow-lg p-4"
              >
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Pick-Up Location:</span>
                    {request.pickup}
                  </div>
                  <div>
                    <span className="font-semibold">Drop-Off Location:</span>
                    {request.dropoff}
                  </div>
                  <div>
                    <span className="font-semibold">Shifting Date:</span>
                    {new Date(request.shiftingdate).toLocaleString()}
                  </div>
                  <div>
                    <span
                      className={`py-1 px-4 border-b border-gray-300 mb-2 mt-2
                    ${
                      request.status === 'Pending'
                        ? 'bg-yellow-200'
                        : request.status === 'Rejected'
                          ? 'bg-red-200'
                          : 'bg-green-200'
                    }`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    <Link
                      key={shift._id}
                      to={`/Roomshifting/Shifting/${request._id}`}
                    >
                      <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 text-sm">
                        View Details
                      </button>
                    </Link>
                    <Link
                      key={request._id}
                      to={`/RoomShifting/editShifting/${request._id}`}
                    >
                      <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 text-sm">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteShifting(request._id)}
                      className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="flex justify-center">No shifting requests</span>
          )}
        </div>
      </div>
    </>
  );
}

export default UserShifting;
