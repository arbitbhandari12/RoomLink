import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const AdminShifting = () => {
  const [request, setRequest] = useState([]);
  

  const requestShifting = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/shifting/adminShift',
        {
          method: 'GET'
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRequest(data.approve);
      }
    } catch (error) {
      console.log(error);
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
            {request.map((shift, index) => (
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
                  <Link
                    key={shift._id}
                    to={`/admin/Shifting/${shift._id}`}
                  >
                    <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 rounded">
                      View Details
                    </button>
                  </Link>
                  <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 rounded">
                    Approve
                  </button>
                  <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-red-700 rounded">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminShifting;
