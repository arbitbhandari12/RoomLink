import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Store/auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIN } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { user } = useAuth();
  const admin = user?.isAdmin;

  return (
    <>
      <header className="sticky top-0 flex items-center p-4 bg-white shadow-md z-50 justify-between">
        <div className="flex items-center gap-2 sm:ml-10">
          <NavLink to="/">
            <span className="text-2xl">🏠</span>
            <span className="sm:text-xl sm:font-bold sm:inline">RoomLink</span>
          </NavLink>
        </div>

        {/* Center navigation elements */}
        <nav className="flex-1 hidden sm:space-x-3 md:flex justify-center md:space-x-12">
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/PropertyAvailability" className="hover:underline">
            Find Rooms
          </NavLink>
          <NavLink to="/addproperty" className="hover:underline">
            List Your Rooms
          </NavLink>
          <NavLink to="/RoomShifting" className="">
            Room Shifting
          </NavLink>
          <NavLink to="/aboutus" className="hover:underline">
            About Us
          </NavLink>
        </nav>

        {/* Right-side elements */}
        <div className="flex items-center gap-4">
          {isLoggedIN ? (
            <>
              <NavLink
                to=""
                className="w-12 h-12 rounded-full bg-gray-200 text-white flex items-center justify-center transition duration-200 hover:bg-blue-700"
              >
                <span>👤</span>
              </NavLink>
              {/* {admin && <NavLink to="/admin" className="sm:block hidden">Admin</NavLink>} */}
            </>
          ) : (
            <NavLink
              to="/Login"
              className="px-4 py-2 rounded bg-blue-600 text-white flex items-center transition duration-200 hover:bg-blue-700"
            >
              <span>👤</span> SIGN IN
            </NavLink>
          )}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-1/2 h-full bg-white shadow-lg z-50">
          <nav className="flex flex-col items-start space-y-4 p-4">
            <NavLink to="/" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/PropertyAvailability" onClick={toggleMenu}>
              Find Rooms
            </NavLink>
            <NavLink
              to="/addproperty"
              className="hover:underline"
              onClick={toggleMenu}
            >
              List Your Rooms
            </NavLink>
            <NavLink to="/RoomShifting" onClick={toggleMenu}>
              Room Shifting
            </NavLink>
            <NavLink to="/aboutus" onClick={toggleMenu}>
              About Us
            </NavLink>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
