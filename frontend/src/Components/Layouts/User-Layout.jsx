import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';

const UserLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex'>
      <aside
        className={`sm:w-48 sm:p-4 min-h-screen border bg-white sm:block 
          ${isOpen ? 'fixed left-0 top-0 w-3/4 h-full z-50 p-6' : 'hidden sm:block'}
        `}
      >
        <nav className="flex justify-center">
          <div>
            <button
              className="sm:hidden absolute left-56 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>
          <ul className="space-y-12 mt-4">
            <li>
              <NavLink
                to="yourProfile"
                className=" flex items-center justify-center"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="changePassword" className="flex items-center justify-center">
                Change Password
              </NavLink>
            </li>
            <li>
              <NavLink className="flex items-center justify-center">
                Your Booking
              </NavLink>
            </li>
            <li>
              <NavLink className="flex items-center justify-center">
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-3">
        <button
          className="sm:hidden text-2xl p-2"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu />
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
