import React from 'react';
import { Building, Search, Users, Clock, ThumbsUp, Truck } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About RoomLink</h1>
          <p className="text-xl">
            Connecting Landlords and Tenants in Kathmandu
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-xl max-w-3xl mx-auto">
          RoomLink aims to simplify the process of finding and renting rooms in
          Kathmandu, creating a seamless connection between landlords and
          tenants through a user-friendly platform.
        </p>
      </section>

      {/* Key Features */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="text-blue-600 mb-2">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Room Search</h3>
              <p className="text-gray-600">
                Find rooms based on location, budget, and preferences.
              </p>
            </div>
            <div className="p-4">
              <div className="text-blue-600 mb-2">
                <Building size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Accurate Listings</h3>
              <p className="text-gray-600">
                Up-to-date and verified room listings.
              </p>
            </div>
            <div className="p-4">
              <div className="text-blue-600 mb-2">
                <Users size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Direct Communication
              </h3>
              <p className="text-gray-600">
                Connect directly with landlords, no middlemen.
              </p>
            </div>
            <div className="p-4">
              <div className="text-blue-600 mb-2">
                <Clock size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Time-Saving</h3>
              <p className="text-gray-600">
                Efficient process for finding and listing rooms.
              </p>
            </div>
            <div className="p-4">
              <div className="text-blue-600 mb-2">
                <ThumbsUp size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">User Reviews</h3>
              <p className="text-gray-600">
                Tenant feedback for informed decision-making.
              </p>
            </div>
            <div className="p-4">
              <div className="text-blue-600 mb-2">
                <Truck size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Moving Assistance</h3>
              <p className="text-gray-600">
                Optional transportation arrangement for tenants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem We Solve */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold mb-8">The Problem We Solve</h2>
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <p className="text-lg mb-4">
            Every year, Kathmandu attracts people from surrounding areas seeking
            better opportunities. Finding suitable accommodation has been a
            challenging and time-consuming process, especially for newcomers.
          </p>
          <p className="text-lg">
            RoomLink bridges the gap between landlords and tenants, offering a
            centralized, reliable platform that streamlines the room-finding
            process, saving time and reducing stress for all parties involved.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Join RoomLink Today</h2>
          <p className="text-xl mb-8">
            Whether you're a landlord looking to list your property or a tenant
            searching for the perfect room, RoomLink is here to help you
            connect.
          </p>
          <div className="flex justify-center gap-4">
            <NavLink
              to="/addproperty"
              className="bg-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-700"
            >
              List Your Room
            </NavLink>
            <NavLink
              to="/availableRooms"
              className="bg-green-500 px-6 py-3 rounded-full font-semibold hover:bg-green-700"
            >
              Find a Room
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
