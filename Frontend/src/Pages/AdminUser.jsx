import React from 'react';

function AdminUser() {
  const users = [
    {
      _id: '1',
      username: 'arbit',
      email: 'arbit@gmail.com',
      phone: '1234567890'
    },
    {
      _id: '2',
      username: 'alance',
      email: 'alance@gmail.com',
      phone: '9876543210'
    },
    {
      _id: '3',
      username: 'devaki',
      email: 'devaki@gmail.com',
      phone: '4567891230'
    }
  ];

  return (
    <div className="container mx-auto overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gradient-to-r from-indigo-600 to-red-700 text-white">
          <tr>
            <th className="py-3 px-4 border-b border-gray-300 text-left font-semibold">
              Username
            </th>
            <th className="py-3 px-4 border-b border-gray-300 text-left font-semibold">
              Email
            </th>
            <th className="py-3 px-4 border-b border-gray-300 text-left font-semibold">
              Phone
            </th>
            <th className="py-3 px-4 border-b border-gray-300 text-left font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-100 bg-gray-50 odd:bg-white"
            >
              <td className="py-3 px-4 border-b border-gray-300">{user.username}</td>
              <td className="py-3 px-4 border-b border-gray-300">{user.email}</td>
              <td className="py-3 px-4 border-b border-gray-300">{user.phone}</td>
              <td className="py-3 px-4 border-b border-gray-300">
                <button className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUser;
