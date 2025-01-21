import { useEffect, useState } from 'react';
import { Bed, Bath, MapPin } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

function Home() {
  const [properties, setProperties] = useState([]);
  const latestProperty = async () => {
    try {
      const response = await fetch(
        'http://localhost:4001/api/properties/homelatest',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const latestproperty = await response.json();
      setProperties(latestproperty);
      console.log(latestproperty);
    } catch {
      console.log(error);
    }
  };
  useEffect(() => {
    latestProperty();
  }, []);
  return (
    <>
      <div className="relative">
        <img
          src="intro.jpg"
          alt="Intro"
          className="h-[90vh] w-full object-cover"
        />

        <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl font-bold">Find Your Dream Room</h1>
          <p className="text-2xl mt-4">
            Discover comfortable and affordable rooms in your desired location.
          </p>
          <NavLink to='/PropertyAvailability' className="bg-white text-black px-6 py-2 mt-6 rounded hover:bg-gray-200">
            Start Exploring
          </NavLink>
        </div>
      </div>

      <div className="text-center font-bold text-3xl mt-10">
        <h1 className="font-extralight">Our Rooms</h1>
      </div>
      <div className="flex justify-end mr-8 mt-8 md:mt-0">
        <NavLink to='/PropertyAvailability' className="border bg-slate-500 text-white rounded-md p-1.5 hover:bg-black w-24 text-center">
          View All <span>&#8594;</span>
        </NavLink>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 p-6">
        {properties.map((property) => (
          <Link key={property._id} to={`/property/${property._id}`}>
            <div key={property._id}>
              <div className="border rounded-lg">
                <div className="">
                  <img
                    src={`http://localhost:4001/${property.photos[0]}`}
                    alt={property.title}
                    className="w-full h-48 rounded-t-lg"
                  />
                </div>
                <div className="">
                  <div className="border mt-4"></div>
                  <div className="flex justify-end mt-1 mb-1 mr-2 text-blue-500">
                    Rs: {property.price}/month
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center font-bold uppercase mt-4 ">
        <h1>Discover More</h1>
        <h2>
          Explore our extensive collection of rooms and find the perfect space
          that suits your needs and budget.
        </h2>
      </div>

      <div className="mx-auto p-5 md:p-20 text-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center border p-4 bg-sky-100 rounded-lg">
            <h1 className="font-bold">Search Rooms</h1>
            <h2 className="font-semibold mt-5">
              Find rooms that match your <br /> preferences and location.
            </h2>
            <button className="mt-6 mb-8 bg-slate-800 p-2 rounded-lg text-white font-thin w-36">
              Start Searching
            </button>
          </div>
          <div className="text-center border p-4 rounded-lg bg-[rgba(240,253,244,1)]">
            <h1 className="font-bold">List Your Rooms</h1>
            <h2 className="font-semibold mt-5">
              Have a room to rent? List it on <br /> our platform and find
              tenants.
            </h2>
            <button className="p-2 bg-slate-800 text-white rounded-lg mt-6 w-36 font-thin">
              List Now
            </button>
          </div>
          <div className="text-center border p-4 rounded-lg bg-[rgb(250,245,255)]">
            <h1 className="font-bold">Learn More</h1>
            <h2 className="font-semibold mt-5">
              Discover how RoomFinder works <br /> and why people love it.
            </h2>
            <button className="p-2 w-36 bg-slate-800 mt-6 text-white rounded-lg mb-8 font-thin">
              About Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
