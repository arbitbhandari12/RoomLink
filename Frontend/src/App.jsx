import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import PropertyAvailability from './Pages/PropertyAvailibility';
import PropertyDetails from './Pages/DetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/availableRooms" element={<PropertyAvailability />} />
        <Route path="/details" element={<PropertyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
