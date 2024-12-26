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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
