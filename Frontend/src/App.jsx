import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PropertyAvailability from './Pages/PropertyAvailability';
import Logout from './Pages/Logout';
import AdminLayout from './Components/Layouts/Admin-Layout';
import AdminUser from './Pages/AdminUser';
import AdminListProperty from './Pages/AdminListProperty';
import AddProperty from './Pages/AddProperty';
import PropertyDetails from './Pages/SingleProperty';
import UserProperty from './Pages/UserProperty';
import EditProperty from './Pages/EditProperty';
import PropertyLayout from './Components/Layouts/Property-Layout';
import Footer from './Components/Footer';
import RoomShifting from './Pages/RoomShifting';
import DetailsPropertyAdmin from './Pages/DetailsPropertyAdmin';
import ForgotPassword from './Pages/ForgotPassword';
import PersonalPropertyDetails from './Pages/PersonalPropertyDetails';
import AdminShift from './Pages/AdminShift';
import AdminShifting from './Pages/AdminShifting';
import AdminHome from './Pages/AdminHome';
import AboutUs from './Pages/AboutUs';

function App() {
  const location = useLocation();

  // Check if the current path starts with '/admin'
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/PropertyAvailability"
          element={<PropertyAvailability />}
        />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/properties/:id" element={<DetailsPropertyAdmin />} />
        <Route path="/yourproperty/:id" element={<PersonalPropertyDetails />} />
        <Route path="editProperty/:id" element={<EditProperty />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addproperty" element={<PropertyLayout />}>
          <Route index element={<AddProperty />} />{' '}
          <Route path="UserProperty" element={<UserProperty />}></Route>
        </Route>
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/Roomshifting" element={<RoomShifting />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="users" element={<AdminUser />} />
          <Route path="listofproperty" element={<AdminListProperty />} />
          <Route path="properties/:id" element={<DetailsPropertyAdmin />} />
          {/* <Route path="complaint-property" element={<AdminComplaint />} /> */}
          <Route path="shifting" element={<AdminShift />} />
          <Route
            path="adminShifting"
            element={<AdminShifting />}
          />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
