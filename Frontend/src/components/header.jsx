import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 flex items-center p-4 bg-white shadow-md z-50 justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:ml-10">
          <NavLink to="/">
            <span className="text-2xl">🏠</span>
            <span className="sm:text-xl sm:font-bold">RoomLink</span>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 hidden sm:flex justify-center space-x-8">
          <NavLink
            to="/"
            className="hover:underline"
            activeClassName="text-blue-500"
          >
            Home
          </NavLink>
          <NavLink
            to="/availableRooms"
            className="hover:underline"
            activeClassName="text-blue-500"
          >
            Find Rooms
          </NavLink>
          <NavLink
            to="/addProperty"
            className="hover:underline"
            activeClassName="text-blue-500"
          >
            List Your Rooms
          </NavLink>
          <NavLink
            to="/RoomShifting"
            className="hover:underline"
            activeClassName="text-blue-500"
          >
            Room Shifting
          </NavLink>
          <NavLink
            to="/aboutus"
            className="hover:underline"
            activeClassName="text-blue-500"
          >
            About Us
          </NavLink>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg z-50">
          <nav className="flex flex-col items-start space-y-4 p-4">
            <NavLink
              to="/"
              onClick={toggleMenu}
              className="hover:underline"
              activeClassName="text-blue-500"
            >
              Home
            </NavLink>
            <NavLink
              to=""
              onClick={toggleMenu}
              className="hover:underline"
              activeClassName="text-blue-500"
            >
              Find Rooms
            </NavLink>
            <NavLink
              to=""
              onClick={toggleMenu}
              className="hover:underline"
              activeClassName="text-blue-500"
            >
              List Your Rooms
            </NavLink>
            <NavLink
              to=""
              onClick={toggleMenu}
              className="hover:underline"
              activeClassName="text-blue-500"
            >
              Room Shifting
            </NavLink>
            <NavLink
              to=""
              onClick={toggleMenu}
              className="hover:underline"
              activeClassName="text-blue-500"
            >
              About Us
            </NavLink>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
