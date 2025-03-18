import React, { useState, useEffect } from 'react';
import { useAuth } from '../Store/auth';
import Swal from 'sweetalert2';

function AdminUser() {
  const { authorization } = useAuth();

  // State for storing the list of users and the search query
  const [user, setUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const allUsers = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/admin/users', {
        method: 'GET',
        headers: {
          Authorization: authorization
        }
      });
      const data = await response.json();
      setUser(data.user); // Set user state to the array
    } catch (error) {
      console.log('Error', error);
    }
  };

  const deleteUser = async (id) => {
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
        `http://localhost:4001/api/admin/users/delete/${id}`,
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
        allUsers();
        await Swal.fire({
          title: 'Deleted!',
          text: 'The user has been deleted successfully.',
          icon: 'success'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while deleting the user.',
        icon: 'error'
      });
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on the search query
  const filteredUsers = user.filter((curUser) =>
    curUser.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    allUsers();
  }, [user]);

  return (
    <>
      <div className="container mx-auto overflow-x-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by username"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Users Table */}
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
            {filteredUsers.map((curUser, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
              >
                <td className="py-3 px-4 border-b border-gray-300">
                  {curUser.username}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {curUser.email}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {curUser.phone}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  <button
                    onClick={() => deleteUser(curUser._id)}
                    className="text-white hover:bg-slate-600 font-semibold border px-4 py-1 bg-red-700"
                  >
                    Delete
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

export default AdminUser;
