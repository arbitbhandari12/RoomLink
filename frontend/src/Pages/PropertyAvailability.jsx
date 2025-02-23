import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

function PropertyAvailability() {
  const [approve, setApprove] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [typeFilter, settypeFilter] = useState('');
  const [budgetInput, setBudgetInput] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);

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
      setApprove(data.properties);
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
    settypeFilter(typeInput);
    setBudgetFilter(budgetInput);
    setCurrentPage(1);
  };

  const filteredProperties = approve.filter(
    (property) =>
      (!locationFilter ||
        property.location
          .toLowerCase()
          .includes(locationFilter.toLowerCase())) &&
      (!typeFilter || property.type === typeFilter) &&
      (!budgetFilter || property.price <= Number(budgetFilter))
      
  );

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = filteredProperties.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(filteredProperties.length / postPerPage);

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
                value={typeInput}
                onChange={(e) => setTypeInput(e.target.value)}
                className="mt-1 block w-full h-11 p-2 border border-gray-400 rounded-md shadow-sm"
              >
                <option value="">Select type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="Flat">Flat</option>
                <option value="Bunglow">Bunglow</option>
              </select>
            </div>

            <div className="flex-1 mb-4 sm:mb-0">
              <label className="block text-sm font-medium text-gray-700">
                Budget
              </label>
              <input
                type="number"
                name="budget"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
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
          loading ? 'min-h-[470px]' : ''
        }`}
      >
        {loading ? (
          <p className="text-center col-span-full text-gray-500 items-center justify-center flex">
            Loading properties...
          </p>
        ) : currentPost.length > 0 ? (
          currentPost.map((property) => (
            <Link key={property._id} to={`/property/${property._id}`}>
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border hover:border-blue-600 mt-6 h-96">
                <div className="relative">
                  <img
                    src={`http://localhost:4001/${property.photos[0]}`}
                    alt={property.title}
                    className="w-full h-48 rounded-t-lg object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {property.roomStatus}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-blue-800 mb-1 truncate">
                    {property.title}
                  </h3>
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
          <p className="text-center col-span-full text-gray-500">
            No properties available.
          </p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mb-8">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default PropertyAvailability;
