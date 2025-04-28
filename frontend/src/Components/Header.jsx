import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Store/auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIN, user } = useAuth();
  const admin = user?.isAdmin;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking outside
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 flex items-center p-4 bg-white shadow-md z-50 justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2 sm:ml-4 md:ml-10">
          <NavLink to="/" className="flex items-center">
            <span className="text-2xl">🏠</span>
            <span className="text-xl font-bold hidden sm:inline ml-1">RoomLink</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center space-x-4 lg:space-x-8 xl:space-x-12">
          <NavLink 
            to="/" 
            className="hover:underline px-2 py-1 rounded transition-colors duration-200 hover:bg-gray-100"
            activeClassName="font-semibold text-blue-600"
          >
            Home
          </NavLink>
          <NavLink 
            to="/PropertyAvailability" 
            className="hover:underline px-2 py-1 rounded transition-colors duration-200 hover:bg-gray-100"
            activeClassName="font-semibold text-blue-600"
          >
            Find Rooms
          </NavLink>
          <NavLink 
            to="/addproperty" 
            className="hover:underline px-2 py-1 rounded transition-colors duration-200 hover:bg-gray-100"
            activeClassName="font-semibold text-blue-600"
          >
            List Your Rooms
          </NavLink>
          <NavLink 
            to="/RoomShifting" 
            className="hover:underline px-2 py-1 rounded transition-colors duration-200 hover:bg-gray-100"
            activeClassName="font-semibold text-blue-600"
          >
            Room Shifting
          </NavLink>
          <NavLink 
            to="/aboutus" 
            className="hover:underline px-2 py-1 rounded transition-colors duration-200 hover:bg-gray-100"
            activeClassName="font-semibold text-blue-600"
          >
            About Us
          </NavLink>
        </nav>

        {/* Right-side elements */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isLoggedIN ? (
            <>
              {admin && (
                <NavLink 
                  to="/admin" 
                  className="hidden sm:block px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  Admin
                </NavLink>
              )}
              <NavLink
                to="/user"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 flex items-center justify-center transition duration-200 hover:bg-blue-100"
              >
                <span className="text-lg">👤</span>
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/Login"
              className="px-3 py-1 sm:px-4 sm:py-2 rounded bg-blue-600 text-white flex items-center transition duration-200 hover:bg-blue-700"
            >
              <span className="mr-1 sm:mr-2">👤</span> 
              <span className="hidden sm:inline">SIGN IN</span>
              <span className="sm:hidden">Login</span>
            </NavLink>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none ml-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            <nav className="flex flex-col items-start space-y-4 p-6">
              <NavLink 
                to="/" 
                className="w-full px-4 py-2 rounded hover:bg-gray-100"
                onClick={closeMenu}
                activeClassName="font-semibold text-blue-600 bg-gray-100"
              >
                Home
              </NavLink>
              <NavLink 
                to="/PropertyAvailability" 
                className="w-full px-4 py-2 rounded hover:bg-gray-100"
                onClick={closeMenu}
                activeClassName="font-semibold text-blue-600 bg-gray-100"
              >
                Find Rooms
              </NavLink>
              <NavLink
                to="/addproperty"
                className="w-full px-4 py-2 rounded hover:bg-gray-100"
                onClick={closeMenu}
                activeClassName="font-semibold text-blue-600 bg-gray-100"
              >
                List Your Rooms
              </NavLink>
              <NavLink 
                to="/RoomShifting" 
                className="w-full px-4 py-2 rounded hover:bg-gray-100"
                onClick={closeMenu}
                activeClassName="font-semibold text-blue-600 bg-gray-100"
              >
                Room Shifting
              </NavLink>
              <NavLink 
                to="/aboutus" 
                className="w-full px-4 py-2 rounded hover:bg-gray-100"
                onClick={closeMenu}
                activeClassName="font-semibold text-blue-600 bg-gray-100"
              >
                About Us
              </NavLink>
              
              {/* User section in mobile menu */}
              <div className="w-full border-t border-gray-200 pt-4 mt-4">
                {isLoggedIN ? (
                  <>
                    <NavLink
                      to="/user"
                      className="w-full px-4 py-2 rounded hover:bg-gray-100 flex items-center"
                      onClick={closeMenu}
                      activeClassName="font-semibold text-blue-600 bg-gray-100"
                    >
                      <span className="mr-2">👤</span> My Account
                    </NavLink>
                    {admin && (
                      <NavLink
                        to="/admin"
                        className="w-full px-4 py-2 rounded hover:bg-gray-100"
                        onClick={closeMenu}
                        activeClassName="font-semibold text-blue-600 bg-gray-100"
                      >
                        Admin Panel
                      </NavLink>
                    )}
                  </>
                ) : (
                  <NavLink
                    to="/Login"
                    className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"
                    onClick={closeMenu}
                  >
                    <span className="mr-2">👤</span> Sign In
                  </NavLink>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;