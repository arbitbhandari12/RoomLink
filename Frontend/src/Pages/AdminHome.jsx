const AdminHome = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <h1 className="text-2xl font-semibold">RoomLink Dashboard</h1>
        </div>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
            <span className="font-semibold">Total Users</span>
            <span className="text-xl">100</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
            <span className="font-semibold">Total Rooms</span>
            <span className="text-xl">100</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
            <span className="font-semibold">Remaining Listing Rooms</span>
            <span className="text-xl">10</span>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Properties</h2>
          <input
            type="text"
            placeholder="Search property by email..."
            className="px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-5 flex gap-3">
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg">
            + Add Rooms
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg">
            Your Rooms
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-indigo-600 to-red-700 text-white">
            <tr className="">
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Room Id
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Location
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Price
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Owner Email
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Property rows */}
            <tr className="border-b">
              <td className="py-3 px-4 border-b border-gray-300 text-center ">
                #2038
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center ">
                Kathmandu
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center ">
                10000
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center ">
                arbit@gmail.com
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center ">
                <button className="bg-green-500 text-white px-4 py-1 rounded-lg mr-2">
                  View Details
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded-lg">
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4 border-b border-gray-300 text-center ">
                #203a
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center ">
                Kathmandu
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center ">
                10000
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center ">
                arbit@gmail.com
              </td>
              <td className="py-3 px-4 border-b border-gray-300 text-center ">
                <button className="bg-green-500 text-white px-4 py-1 rounded-lg mr-2">
                  View Details
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded-lg">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
