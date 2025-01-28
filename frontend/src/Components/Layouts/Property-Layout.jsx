import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../Store/auth';

function PropertyLayout() {
  const { user } = useAuth();

  return (
    <div className="flex">
      <aside className="hidden sm:block sm:w-48 sm:p-4 min-h-screen border">
        <div>
          <span className="font-bold text-2xl justify-center flex">
            Hello {user?.username || 'Guest'}
          </span>
        </div>
        <hr className="my-4 border border-gray-300"></hr>
        <nav className="flex justify-center">
          <ul className="space-y-6 mt-8">
            <li>
              <NavLink to="/addproperty" className="text-center">
                Add Property
              </NavLink>
            </li>
            <li>
              <NavLink to="/addproperty/UserProperty" className="text-center">
                My Property
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-3">
        <Outlet />
      </main>
    </div>
  );
}

export default PropertyLayout;
