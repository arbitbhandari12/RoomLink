import React, { useEffect, useState } from 'react';
import { useAuth } from '../Store/auth';
import { Link } from 'react-router-dom';

function AdminlistProperty() {
  const { authorization } = useAuth();
  const [properties, setProperties] = useState([]);

  const allProperty = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/admin/property', {
        method: 'GET',
        headers: {
          Authorization: authorization
        }
      });
      const data = await response.json();
      setProperties(data.listProperty); // Set properties data
    } catch (error) {
      console.log('Error', error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/admin/property/delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: authorization
          }
        }
      );
      const data = await response.json();
      console.log(` after delete ${data}`);

      if (response.ok) {
        allProperty();
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const approveProperty = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/admin/property/approve/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: authorization
          }
        }
      );
      const data = await response.json();
      console.log(` after approve ${data}`);

      if (response.ok) {
        allProperty();
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    allProperty();
  }, []);

  return (
    <>
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
                className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
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
                <td className="py-3 px-4 border-b border-gray-300 text-center ">
                  <Link
                    key={property._id}
                    to={`/admin/properties/${property._id}`}
                  >
                    <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 mr-4">
                      View Details
                    </button>
                  </Link>
                  <button
                    className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-green-700 mr-4"
                    onClick={() => approveProperty(property._id)}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => deleteProperty(property._id)}
                    className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-red-700"
                  >
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
}

export default AdminlistProperty;
