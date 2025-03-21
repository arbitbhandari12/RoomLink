import React from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../Store/auth';

function AdminLayout() {
  const { user, isLoading } = useAuth();

  // Ensure `user.userData` exists before trying to access `isAdmin`
  const admin = user;

  if (isLoading) {
    return null; 
  }

  // If user is not an admin, navigate to home
  if (!admin?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex">
      <aside className="w-1/8 p-4 min-h-screen border-r border-gray-300">
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  `text-center block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-black'}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `text-center block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-black'}`
                }
              >
                User
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/listofproperty"
                className={({ isActive }) =>
                  `text-center block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-black'}`
                }
              >
                List of Property
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/requests"
                className={({ isActive }) =>
                  `text-center block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-black'}`
                }
              >
                Shifting Request
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/logout"
                className={({ isActive }) =>
                  `text-center block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-black'}`
                }
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-3 border-l border-gray-300">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
