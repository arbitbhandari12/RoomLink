import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminShifting = () => {
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
            <tr>
              <td className="py-3 px-4 border-b border-gray-300 text-center truncate max-w-[120px] text-sm lg:text-base">
                Kavresthali
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center truncate max-w-[100px] text-sm lg:text-base">
                Balaju
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center text-sm lg:text-base">
                2024-12-10, 8:00 AM
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center flex flex-wrap justify-center gap-2">
                <NavLink to="/admin/RoomShiftingDetailsPage">
                  <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 rounded">
                    View Details
                  </button>
                </NavLink>
                <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 rounded">
                  Approve
                </button>
                <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-red-700 rounded">
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminShifting;
