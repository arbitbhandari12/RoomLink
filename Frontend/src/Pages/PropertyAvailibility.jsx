import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

function PropertyAvailability() {
  const properties = [
    {
      _id: '1',
      title: 'Cozy Studio Apartment',
      price: 15000,
      furnishing: 'Yes',
      location: 'Kathmandu, Nepal',
      description: 'A small but cozy studio apartment perfect for singles.'
    },
    {
      _id: '2',
      title: 'Luxury Villa',
      price: 85000,
      furnishing: 'No',
      location: 'Patan, Nepal',
      description: 'A luxurious villa with modern amenities.'
    },
    {
      _id: '3',
      title: 'Budget-Friendly Room',
      price: 7000,
      furnishing: 'No',
      location: 'Bhaktapur, Nepal',
      description: 'Affordable room for students or workers.'
    },
    {
      _id: '4',
      title: 'Spacious Family Apartment',
      price: 30000,
      furnishing: 'Yes',
      location: 'Pokhara, Nepal',
      description: 'Ideal for families, with spacious living area.'
    },
    {
      _id: '5',
      title: 'Modern Shared Room',
      price: 10000,
      furnishing: 'Yes',
      location: 'Lalitpur, Nepal',
      description: 'Shared room in a modern apartment.'
    },
    {
      _id: '6',
      title: 'Elegant Penthouse',
      price: 120000,
      furnishing: 'No',
      location: 'Kathmandu, Nepal',
      description: 'Experience luxury living in this elegant penthouse.'
    }
  ];

  return (
    <>
      <div className="mt-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl">
          <form className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1 mb-4 sm:mb-0">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
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
              className="bg-blue-500 text-white font-medium py-2 px-6 mt-4 rounded-md shadow-sm hover:bg-blue-600 w-full sm:w-auto"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 mx-3 rounded-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:mx-auto max-w-screen-xl mb-5">
        {properties.map((property) => (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border hover:border-blue-600 mt-6 h-96">
            <div className="relative">
              <img
                src="intro.jpg"
                alt={property.title}
                className="w-full h-48 rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-bold text-blue-800 mb-1 truncate">
                {property.title}
              </h3>
              <div className="flex justify-between mt-2">
                <p className="text-gray-400 text-xl">Rs {property.price}</p>
                <p className="text-gray-600">
                  Furnished: {property.furnishing}
                </p>
              </div>
              <p className="text-gray-600 flex items-center mt-2">
                <MapPin size={13} color="blue" className="mr-0.5" />
                {property.location}
              </p>
              <p className="text-gray-600 text-sm mt-4">
                {property.description.length > 50
                  ? `${property.description.split(' ').join(' ')}...`
                  : property.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PropertyAvailability;
