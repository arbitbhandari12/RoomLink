import React from 'react';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHandsHelping,
  FaBox
} from 'react-icons/fa';

const TenantDetails = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Tenant Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
          <FaUser className="text-blue-500" size={24} />
          <div>
            <p className="text-sm text-gray-500 font-semibold">Name</p>
            <p className="text-lg text-gray-700">Arbit</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
          <FaPhone className="text-green-500" size={24} />
          <div>
            <p className="text-sm text-gray-500 font-semibold">Phone Number</p>
            <p className="text-lg text-gray-700">9863935190</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
          <FaEnvelope className="text-red-500" size={24} />
          <div>
            <p className="text-sm text-gray-500 font-semibold">Email</p>
            <p className="text-lg text-gray-700">arbitbhandari17@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
          <FaMapMarkerAlt className="text-yellow-500" size={24} />
          <div>
            <p className="text-sm text-gray-500 font-semibold">
              Pick-Up Location
            </p>
            <p className="text-lg text-gray-700">Kavresthali</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
          <FaMapMarkerAlt className="text-orange-500" size={24} />
          <div>
            <p className="text-sm text-gray-500 font-semibold">
              Drop-Off Location
            </p>
            <p className="text-lg text-gray-700">Balaju</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
          <FaCalendarAlt className="text-purple-500" size={24} />
          <div>
            <p className="text-sm text-gray-500 font-semibold">Date and Time</p>
            <p className="text-lg text-gray-700">2024-12-10, 8:00 AM</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
          <FaHandsHelping className="text-teal-500" size={24} />
          <div>
            <p className="text-sm text-gray-500 font-semibold">
              Helpers Required
            </p>
            <p className="text-lg text-gray-700">Yes</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
          <FaBox className="text-indigo-500" size={24} />
          <div>
            <p className="text-sm text-gray-500 font-semibold">Items</p>
            <p className="text-lg text-gray-700">
              Sofa, Coffee table, Television, Remote control, Bookshelves,
              Lamps, Curtains or blinds, Rugs, Throw pillows, Wall art or
              paintings, Speakers or sound system, Plants or decorative vases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDetails;
