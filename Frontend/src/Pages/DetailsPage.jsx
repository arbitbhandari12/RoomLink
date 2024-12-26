import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Bed,
  Bath,
  CookingPotIcon as Kitchen,
  Car,
  Home,
  Droplet,
  School,
  Hospital,
  TreesIcon as Tree,
  Bus,
  Church,
  Landmark,
  MapPin
} from 'lucide-react';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [similar, setSimilar] = useState([]);

  const fetchProperty = () => {
    const Details = {
      _id: '123456789012345678901234',
      title: 'Beautiful Apartment',
      price: '25,000',
      description: 'A beautiful apartment located in the city center.',
      bedroom: 3,
      bathroom: 2,
      kitchen: 1,
      parking: 'Available',
      balcony: 'Yes',
      water: 'morning',
      school: 'Nearby',
      healthcare: 'Far',
      park: 'Nearby',
      transport: 'Nearby',
      temple: 'Nearby',
      bank: 'Nearby',
      location: 'City Center',
      name: 'Arbit',
      phone: '9863935190',
      email: 'arbitgmail.com'
    };
    setProperty(Details);
  };

  const recommendation = () => [
    {
      _id: '1',
      title: 'Cozy Studio Apartment',
      price: 15000,
      type: '1 BHK',
      location: 'Kathmandu, Nepal',
      description: 'A small but cozy studio apartment perfect for singles.'
    },
    {
      _id: '2',
      title: 'Luxury Villa',
      price: 85000,
      type: '1 BHK',
      location: 'Patan, Nepal',
      description: 'A luxurious villa with modern amenities.'
    },
    {
      _id: '3',
      title: 'Budget-Friendly Room',
      price: 7000,
      type: '1 BHK',
      location: 'Bhaktapur, Nepal',
      description: 'Affordable room for students or workers.'
    },
    {
      _id: '4',
      title: 'Spacious Family Apartment',
      price: 30000,
      type: '1 BHK',
      location: 'Pokhara, Nepal',
      description: 'Ideal for families, with spacious living area.'
    }
  ];

  useEffect(() => {
    fetchProperty();
    setSimilar(recommendation());
  }, [id]);

  if (!property) {
    return <p>Loading property details...</p>;
  }

  return (
    <>
      <div className="px-8 md:px-16 lg:px-36">
        <div className="mt-3">
          <img
            src="intro.jpg"
            alt={property.title}
            className="w-full h-full max-h-[35em] rounded-t-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row items-start mt-8">
          <div className="flex flex-col w-full md:w-1/1 pr-8">
            <div className="flex justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800 w-full break-words">
                {property.title}
              </h1>
            </div>
            <span className="text-sky-500 text-2xl">
              Rs.{`${property.price}/m`}
            </span>
            <div className="border p-2 border-gray-500 mt-4">
              <h1 className="font-bold text-2xl">
                Property Details{' '}
                <span className="text-gray-500 font-normal">
                  (#{property._id.substring(18, 24)})
                </span>
              </h1>
              <p className="text-gray-600 mt-4">{property.description}</p>

              <div className="grid sm:grid-cols-3 grid-cols-2 text-gray-700 mt-6">
                <span className="py-1 flex">
                  <Bed className="mr-2 " size={20} color="black" />
                  {property.bedroom} Bedroom
                </span>
                <span className="py-1 flex">
                  <Bath className="mr-2" size={20} color="black" />
                  Bathrooms: {property.bathroom}
                </span>
                <span className="flex py-1">
                  <Kitchen className="mr-2" size={20} color="black" />
                  Kitchen: {property.kitchen}
                </span>
                <span className="py-3 flex">
                  <Car className="mr-2" size={20} color="black" />
                  Parking: {property.parking}
                </span>
                <span className="flex py-3">
                  <Home className="mr-2" size={20} color="black" />
                  Balcony: {property.balcony}
                </span>
                <span className="flex py-3">
                  <Droplet className="mr-2" size={20} color="black" />
                  Water: {property.water}
                </span>
              </div>
            </div>

            <div className="border border-gray-500 mt-5 p-2">
              <h1 className="text-2xl font-bold ">Nearby Amenities</h1>
              <div className="grid sm:grid-cols-3 mt-6">
                <span className="flex">
                  <School className="mr-2" size={20} color="black" />
                  School: {property.school}
                </span>
                <span className="flex">
                  <Hospital className="mr-2" size={20} color="black" />
                  Healthcare: {property.healthcare}
                </span>
                <span className="flex">
                  <Tree className="mr-2" size={20} color="black" />
                  Park: {property.park}
                </span>
                <span className="flex sm:py-6">
                  <Bus className="mr-2" size={20} color="black" />
                  Public Transportation: {property.transport}
                </span>
                <span className="flex sm:py-6">
                  <Church className="mr-2" size={20} color="black" />
                  Temple: {property.temple}
                </span>
                <span className="flex sm:py-6">
                  <Landmark className="mr-2" size={20} color="black" />
                  Bank: {property.bank}
                </span>
              </div>
            </div>
            {/* Feedback form */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                Leave Your Feedback
              </h2>
              <form className="space-y-4">
                <div>
                  <textarea
                    id="comment"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your comment here"
                    rows="4"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-1/2 mt-6">
            <div className="h-80">
              {property.location && (
                <iframe
                  className="w-full h-full rounded-lg shadow-lg"
                  title="Google Map"
                  src={`https://maps.google.com/maps?width=800&height=400&hl=en&q=${encodeURIComponent(property.location)}&t=k&z=13&ie=UTF8&iwloc=B&output=embed`}
                ></iframe>
              )}
            </div>
            <div className="border border-gray-500 p-2 mt-4">
              <span className="text-2xl font-bold">Contact Owner</span>
              <div className="text-gray-700 mt-3">
                <span className="block">Name: {property.name}</span>
                <span className="block">Phone: {property.phone}</span>
                <span className="block">Email: {property.email}</span>
              </div>
            </div>

            <div className="flex gap-6 mt-6">
              <div className="bg-blue-700 p-2 text-white rounded-md w-28 text-center">
                <button>Book Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className=" mb-40 ">
          <h1 className="mt-20 text-center font-bold text-2xl">
            Similar Properties
          </h1>
          <div className="grid grid-cols-1 mx-3 rounded-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:mx-auto max-w-screen-xl mb-5">
            {similar.map((property) => (
              <div
                key={property._id}
                className="bg-white shadow-sm rounded-lg overflow-hidden border hover:border-blue-600 mt-6 h-96"
              >
                <div className="relative">
                  <img
                    src="intro.jpg"
                    alt={property.title}
                    className="w-full h-48 rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-blue-800 mb-1 truncate">
                    {property.title}
                  </h3>
                  <div className="flex justify-between mt-2">
                    <p className="text-gray-400 text-xl">Rs {property.price}</p>
                    <p className="text-gray-600">
                      Room Type: {property.type}
                    </p>
                  </div>
                  <p className="text-gray-600 flex items-center mt-2">
                    <MapPin size={13} color="blue" className="mr-0.5" />
                    {property.location}
                  </p>
                  <p className="text-gray-600 text-sm mt-4">
                    {property.description.length > 50
                      ? `${property.description.split(' ').join(' ')}...`
                      : property.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDetails;
