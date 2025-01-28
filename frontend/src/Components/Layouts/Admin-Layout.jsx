import React from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../Store/auth';

function AdminLayout() {
  const { user, isLoading } = useAuth();

  // Ensure `user.userData` exists before trying to access `isAdmin`
  const admin = user;

  // If still loading user data, show a loading state
  if (isLoading) {
    return <h1>Loading</h1>;
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
            <NavLink to="/admin/home" className="">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="">
              User
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/listofproperty" className="">
              List of Property
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/shifting" className="">
              Shifting Request
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/admin/complaintproperty" className="nav-link">
              Complaint Property
            </NavLink>
          </li> */}
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
