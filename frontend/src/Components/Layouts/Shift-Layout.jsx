import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../Store/auth';
import { FiMenu } from 'react-icons/fi';

function ShiftLayout() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <aside
        className={`sm:w-48 sm:p-4 min-h-screen border bg-white sm:block 
          ${isOpen ? 'fixed left-0 top-0 w-3/4 h-full z-50 p-6' : 'hidden sm:block'}
        `}
      >
        <div className="flex justify-between items-center">
          <span className="font-bold text-2xl flex">
            Hello {user?.username || 'Guest'}
          </span>
          <button
            className="sm:hidden text-xl"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>
        <hr className="my-4 border border-gray-300"></hr>
        <nav className="flex justify-center">
          <ul className="space-y-6 mt-8">
            <li>
              <NavLink
                to="/RoomShifting"
                className="text-center"
                onClick={() => setIsOpen(false)}
              >
                Shifting Request
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="text-center"
                onClick={() => setIsOpen(false)}
              >
                Your Requests
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
}

export default ShiftLayout;
