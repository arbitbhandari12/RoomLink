import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Fuse from 'fuse.js';

function PropertyAvailability() {
  const [approve, setApprove] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [loading, setLoading] = useState(true); 

  const approvedProperty = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/properties/available',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      console.log(data);
      setApprove(data.approved);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    approvedProperty();
  }, []);

  const handleSearch = () => {
    setLocationFilter(locationInput);
  };

  const fuse = new Fuse(approve, {
    keys: ['location'],
    threshold: 0.5
  });

  const filteredProperties = locationFilter
    ? fuse.search(locationFilter).map((result) => result.item)
    : approve;

  return (
    <>
      <div className="mt-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row sm:space-x-4"
          >
            <div className="flex-1 mb-4 sm:mb-0">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="mt-1 block w-full h-11 p-2 border border-gray-400 rounded-md"
              />
            </div>
            <div className="flex-1 mb-4 sm:mb-0">
              <label className="block text-sm font-medium text-gray-700">
                Room Type
              </label>
              <select
                name="type"
                className="mt-1 block w-full h-11 p-2 border border-gray-400 rounded-md shadow-sm"
              >
                <option value="">Select type</option>
                <option value="Private">Private</option>
                <option value="Shared">Shared</option>
              </select>
            </div>

            <div className="flex-1 mb-4 sm:mb-0">
              <label className="block text-sm font-medium text-gray-700">
                Budget
              </label>
              <input
                type="number"
                name="budget"
                placeholder="Enter maximum budget"
                className="mt-1 block w-full h-11 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="bg-blue-500 text-white font-medium py-2 px-6 mt-4 rounded-md shadow-sm hover:bg-blue-600 w-full sm:w-auto"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 mx-3 rounded-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:mx-auto max-w-screen-xl mb-5 ${
          loading ? 'min-h-[400px]' : ''
        }`}
      >
        {loading ? (
          <p className="text-center col-span-full text-gray-500">Loading properties...</p>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Link key={property._id} to={`/property/${property._id}`}>
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border hover:border-blue-600 mt-6 h-96">
                <div className="relative">
                  <img
                    src={`http://localhost:4001/${property.photos[0]}`}
                    alt={property.title}
                    className="w-full h-48 rounded-t-lg"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-blue-800 mb-1 truncate">
                    {property.title}
                  </h3>
                  <h1>{property.status}</h1>
                  <div className="flex justify-between mt-2">
                    <p className="text-gray-400 text-xl">Rs {property.price}</p>
                    <p className="text-gray-600">Room Type: {property.type}</p>
                  </div>
                  <p className="text-gray-600 flex items-center mt-2">
                    <MapPin size={13} color="blue" className="mr-0.5" />
                    {property.location}
                  </p>
                  <p className="text-gray-600 text-sm mt-4">
                    {property.description.length > 50
                      ? `${property.description.split(' ').slice(0, 10).join(' ')}...`
                      : property.description}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No properties available.</p>
        )}
      </div>
    </>
  );
}

export default PropertyAvailability;
