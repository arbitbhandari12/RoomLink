import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PropertyAvailability from './Pages/PropertyAvailability';
import Logout from './Pages/Logout';
import AdminLayout from './Components/Layouts/Admin-Layout';
import AdminUser from './Pages/Admin-User';
import AdminListProperty from './Pages/Admin-listProperty';
import AddProperty from './Pages/AddProperty';
import PropertyDetails from './Pages/SingleProperty';
import UserProperty from './Pages/UserProperty';
import EditProperty from './Pages/EditProperty';
import PropertyLayout from './Components/Layouts/Property-Layout';
import Footer from './Components/Footer';
import ShiftingLayout from './Components/Layouts/Shift-Layout';
import RoomShifting from './Pages/RoomShifting';
import DetailsPropertyAdmin from './Pages/DetailsPropertyAdmin';
import ForgotPassword from './Pages/ForgotPassword';
import PersonalPropertyDetails from './Pages/PersonalPropertyDetails';
import AdminShift from './Pages/AdminShifting';
import AdminShifting from './Pages/RoomShiftingDetailsPage';
import AdminHome from './Pages/AdminHome';
import AboutUs from './Pages/AboutUs';
import UserShifting from './Pages/UserShifting';
import EditShifting from './Pages/EditShifting';
import OwnerBooking from './Pages/ownerBooking';
import AdminProperty from './Pages/adminProperty';
import AdminEdit from './Pages/adminEditProperty';
import UserLayout from './Components/Layouts/User-Layout';
import YourProfile from './Pages/YourProfile';
import ChangePassword from './Pages/ChangePassword';
import YourBooking from './Pages/YourBooking';

function App() {
  const location = useLocation();

  // Check if the current path starts with '/admin'
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/PropertyAvailability"
          element={<PropertyAvailability />}
        />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addproperty" element={<PropertyLayout />}>
          <Route index element={<AddProperty />} />
          <Route path="yourproperty/:id" element={<PersonalPropertyDetails />} />
          <Route path="UserProperty" element={<UserProperty />}></Route>
          <Route path="properties/:id" element={<DetailsPropertyAdmin />} />
          <Route path="booking" element={<OwnerBooking />}></Route>
          <Route path="editProperty/:id" element={<EditProperty />}></Route>
        </Route>
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/Roomshifting" element={<ShiftingLayout />}>
          <Route index element={<RoomShifting />} />
          <Route path="yourRequest" element={<UserShifting />}></Route>
          <Route path="Shifting/:id" element={<AdminShifting />} />
          <Route path="editShifting/:id" element={<EditShifting />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route path="yourProfile" element={<YourProfile />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="YourBooking" element={<YourBooking />} />

        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="addProperty" element={<AddProperty />} />
          <Route path="yourRooms" element={<AdminProperty />} />
          <Route path="edit/:id" element={<AdminEdit />} />
          <Route path="users" element={<AdminUser />} />
          <Route path="listofproperty" element={<AdminListProperty />} />
          <Route path="properties/:id" element={<DetailsPropertyAdmin />} />
          <Route path="requests" element={<AdminShift />} />
          <Route path="Shifting/:id" element={<AdminShifting />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
