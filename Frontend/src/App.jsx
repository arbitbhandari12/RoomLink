import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import PropertyAvailability from './Pages/PropertyAvailibility';
import PropertyDetails from './Pages/DetailsPage';
import AddProperty from './Pages/AddProperty';
import RoomShifting from './Pages/RoomShifting';
import Login from './Pages/Login';
import Signup from './Pages/Register';
import Header from './components/header';
import Footer from './components/footer';
import AboutUs from './Pages/AboutUs';
import AdminHome from './Pages/AdminHome';
import AdminUser from './Pages/AdminUser';
import AdminlistProperty from './Pages/AdminListProperty';
import AdminShifting from './Pages/AdminShift';
import TenantDetails from './Pages/AdminShftingdetails';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/availableRooms" element={<PropertyAvailability />} />
        <Route path="/details" element={<PropertyDetails />} />
        <Route path="/addProperty" element={<AddProperty />} />
        <Route path="/roomShifting" element={<RoomShifting />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/adminUser" element={<AdminUser />} />
        <Route path="/adminListProperty" element={<AdminlistProperty />} />
        <Route path="/adminShift" element={<AdminShifting />} />
        <Route path="/adminShiftDetails" element={<TenantDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
