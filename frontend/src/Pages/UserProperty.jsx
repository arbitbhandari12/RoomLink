import React, { useEffect, useState } from 'react';
import { useAuth } from '../Store/auth';
import { Link } from 'react-router-dom';

function UserProperty() {
  const [property, setProperty] = useState([]);
  const { authorization } = useAuth();

  const myProperty = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/properties/myProperty',
        {
          method: 'GET',
          headers: {
            Authorization: authorization
          }
        }
      );
      const data = await response.json();
      if (response.ok) {
        setProperty(data);
        myProperty();
      }
    } catch (error) {}
  };

  useEffect(() => {
    myProperty();
  }, []);

  const deleteProperty = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/properties/delete/${id}`,

        {
          method: 'DELETE',
          headers: {
            Authorization: authorization
          }
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const rentProperty = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/properties/roomStatus/${id}`,

        {
          method: 'PATCH',
          headers: {
            Authorization: authorization
          }
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg mb-20">
          <thead className="bg-gradient-to-r from-indigo-600 to-red-700 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Room Id
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Room Title
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {property.map((properties, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
              >
                <td className="py-3 px-4 border-b border-gray-300 text-center ">
                  (#{properties._id.substring(18, 24)})
                </td>
                <td className="py-3 px-4 border-b border-gray-300 text-center">
                  {properties.title.split(' ').slice(0, 4).join(' ')}
                  {properties.title.split(' ').length > 4 && '...'}
                </td>
                <td className="text-center py-3 px-4 border-b border-gray-300">
                  <Link
                    key={properties._id}
                    to={`/yourproperty/${properties._id}`}
                  >
                    <button className="text-white bg-green-700 hover:bg-slate-600 font-semibold border rounded px-3 py-1 md:px-6 md:py-2 mr-2">
                      View Details
                    </button>
                  </Link>
                  <Link>
                    <Link
                      key={properties._id}
                      to={`/addproperty/editProperty/${properties._id}`}
                    >
                      <button className="text-white bg-green-700 hover:bg-slate-600 font-semibold border rounded px-3 py-1 md:px-6 md:py-2 mr-2">
                        Edit
                      </button>
                    </Link>
                  </Link>
                  <button
                    className="text-white bg-red-700 hover:bg-slate-600 font-semibold border rounded px-3 py-1 md:px-6 md:py-2 mr-2"
                    onClick={() => deleteProperty(properties._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-white bg-blue-400 hover:bg-slate-600 font-semibold border rounded px-3 py-1 md:px-6 md:py-2"
                    onClick={() => rentProperty(properties._id)}
                  >
                    Rented
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

export default UserProperty;
