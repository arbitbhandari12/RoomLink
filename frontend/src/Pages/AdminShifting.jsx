import React, { useEffect, useState } from 'react';
import { useAuth } from '../Store/auth';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminShifting = () => {
  const { authorization } = useAuth();
  const [request, setRequest] = useState([]);

  const requestShifting = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/shifting/adminShift',
        {
          method: 'GET',
          headers: {
            Authorization: authorization
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRequest(data.pending);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveShifting = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/shifting/shiftApprove/${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: authorization
          }
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Approved',
          text: 'The shifting request has been approved.'
        });
        requestShifting();
      }
    } catch (error) {
      console.error('Error in approveShifting:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.'
      });
    }
  };

  const rejectShifting = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to reject this shifting request?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, reject it!'
      });
      if (!result.isConfirmed) return;

      const response = await fetch(
        `http://localhost:4001/api/shifting/shiftReject/${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: authorization
          }
        }
      );
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Rejected',
          text: 'The shifting request has been rejected.'
        });
        requestShifting();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.'
      });
    }
  };

  useEffect(() => {
    requestShifting();
  }, []);

  return (
    <>
      <h1 className="font-bold text-center text-2xl sm:text-xl lg:text-3xl mb-6">
        Room Shifting Dashboard
      </h1>
      <div className="overflow-x-auto px-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg mb-20">
          <thead className="bg-gradient-to-r from-indigo-600 to-red-700 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold text-sm lg:text-base">
                Pick-Up
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold text-sm lg:text-base">
                Drop-Off
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold text-sm lg:text-base">
                Date
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold text-sm lg:text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {request.length > 0 ? (
              request.map((shift, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
                >
                  <td className="py-3 px-4 border-b border-gray-300 text-center truncate max-w-[120px] text-sm lg:text-base">
                    {shift.pickup}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center truncate max-w-[100px] text-sm lg:text-base">
                    {shift.dropoff}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center text-sm lg:text-base">
                    {new Date(shift.shiftingdate).toLocaleString()}
                  </td>

                  <td className="py-3 px-4 border-b border-gray-300 text-center flex flex-wrap justify-center gap-2">
                    <Link key={shift._id} to={`/admin/Shifting/${shift._id}`}>
                      <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 rounded">
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => approveShifting(shift._id)}
                      className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectShifting(shift._id)}
                      className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-red-700 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No request available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminShifting;
