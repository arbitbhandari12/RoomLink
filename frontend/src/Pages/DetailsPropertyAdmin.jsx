import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from '../Components/Image-Slider';
import {
  MapPin,
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
  Landmark
} from 'lucide-react';

function DetailsPropertyAdmin() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  const fetchProperty = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/admin/properties/${id}`,
        {
          method: 'GET'
        }
      );
      const data = await response.json();
      console.log(data)
      setProperty(data);
    } catch (error) {
      console.log('Error fetching property:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (!property) {
    return <p>Loading property details...</p>;
  }

  return (
    <>
      <div className="px-8 md:px-16 lg:px-36">
        {/* Image Section */}
        <div className="mt-3">
          <ImageSlider
            images={property.photos.map(
              (photo) => `http://localhost:4001/${photo}`
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start mt-8">
          {/* Left Side */}
          <div className="flex flex-col w-full md:w-1/1 pr-8">
            <div className="flex justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800 w-full break-words">
                {property.title}
              </h1>
            </div>
            <span className="text-sky-500 text-2xl">
              Rs.{`${property.price}/m`}
            </span>
            {/* Property Details Section */}
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

            <div className="border border-gray-500 mt-5 p-2 mb-10">
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
          </div>

          {/* Right Side: Map Placeholder */}
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
            <div className=" border border-gray-500 p-2 mt-4">
              <span className="text-2xl font-bold">Contact Owner</span>
              <div className="text-gray-700 mt-3">
                <span className="block">Name: {property.name}</span>
                <span className="block">Phone: {property.phone}</span>
                <span className="block">Email: {property.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPropertyAdmin;
