import React from 'react';

const TenantDetails = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4">Tenant Details</h2>
      <div className="grid grid-cols-2 gap-y-4 text-gray-700">
        <div>
          <p className="text-gray-500 font-semibold">Name</p>
          <p>Arbit</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Phone Number</p>
          <p>9863935190</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Email</p>
          <p>arbitbhandari17@gmail.com</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Pick-Up Location</p>
          <p>Kavresthali</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Drop-Off Location</p>
          <p>Balaju</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Date and Time</p>
          <p>2024-12-10, 8:00 AM</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Helpers Required</p>
          <p>Yes</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Items</p>
          <p>
            Sofa, Coffee table, Television, Remote control, Bookshelves, Lamps,
            Curtains or blinds, Rugs, Throw pillows, Wall art or paintings,
            Speakers or sound system, Plants or decorative vases.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TenantDetails;
