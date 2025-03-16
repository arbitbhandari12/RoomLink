import React, { useEffect, useState } from 'react';
import { useAuth } from '../Store/auth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    myProperty();
  }, []);

  const deleteProperty = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
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
        myProperty();
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const rentProperty = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to rent this property!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, rent it!'
      });
  
      if (!result.isConfirmed) return;
      const response = await fetch(
        `http://localhost:4001/api/properties/roomStatus/${id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: authorization
          }
        }
      );
      if (response.ok) {
        myProperty();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {property.length > 0 ? (
            property.map((properties, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden border"
              >
                <Link to={`/addproperty/yourproperty/${properties._id}`}>
                  <div className="relative">
                    <img
                      src={`http://localhost:4001/${properties.photos[0]}`}
                      alt={properties.title}
                      className="w-full h-48 rounded-t-lg object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl mb-2">
                      Room Id: #{properties._id.substring(18, 24)}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {properties.title && properties.title.length > 20
                        ? properties.title.substring(0, 20) + '...'
                        : properties.title}
                    </p>
                    <div
                      className={`py-2 px-4 rounded-full mb-4 text-center 
                      ${
                        properties.status === 'Pending'
                          ? 'bg-yellow-300 text-black'
                          : properties.status === 'Rejected'
                            ? 'bg-red-400 text-white'
                            : 'bg-green-200 text-black'
                      }`}
                    >
                      {properties.status}
                    </div>
                  </div>
                </Link>
                <div className="flex flex-wrap justify-center gap-2 p-4">
                  <Link
                    key={properties._id}
                    to={`/addproperty/editProperty/${properties._id}`}
                  >
                    <button className="text-white bg-green-700 hover:bg-slate-600 font-semibold border rounded px-4 py-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="text-white bg-red-700 hover:bg-slate-600 font-semibold border rounded px-4 py-2"
                    onClick={() => deleteProperty(properties._id)}
                  >
                    Delete
                  </button>
                  {properties.status !== 'Pending' &&
                    properties.status !== 'Rejected' && (
                      <button
                        className={`text-white font-semibold border rounded px-4 py-2 ${
                          properties.roomStatus === 'Rented'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-400 hover:bg-slate-600'
                        }`}
                        onClick={() => rentProperty(properties._id)}
                        disabled={properties.roomStatus === 'Rented'}
                      >
                        {properties.roomStatus === 'Rented'
                          ? 'Already Rented'
                          : 'Rent'}
                      </button>
                    )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No properties listed yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProperty;
