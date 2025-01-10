import React from 'react';
import { Link } from 'react-router-dom';

function AdminlistProperty() {
  const properties = [
    {
      _id: '1',
      name: 'Arbit',
      price: '50,00,000 NPR',
      location: 'Kathmandu, Nepal'
    },
    {
      _id: '2',
      name: 'Alance',
      price: '75,00,000 NPR',
      location: 'Pokhara, Nepal'
    },
    {
      _id: '3',
      name: 'Devaki',
      price: '30,00,000 NPR',
      location: 'Chitwan, Nepal'
    }
  ];

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gradient-to-r from-indigo-600 to-red-700 text-white">
          <tr>
            <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
              Listed By
            </th>
            <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
              Price
            </th>
            <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
              Location
            </th>
            <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-100 ${
                index % 2 === 0 ? 'bg-gray-50' : ''
              }`}
            >
              <td className="py-3 px-4 border-b border-gray-300 text-center">
                {property.name}
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center">
                {property.price}
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center">
                {property.location}
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center">
                <Link to={`/admin/properties/${property._id}`}>
                  <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 mr-4">
                    View Details
                  </button>
                </Link>
                <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 mr-4">
                  Approve
                </button>
                <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-red-700">
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminlistProperty;