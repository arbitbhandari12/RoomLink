import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <h2 className="text-2xl font-bold mb-4">RoomLink</h2>

            <p className="text-gray-400 hover:text-white mb-4">
              Discover your perfect living space with ease.
            </p>
            <div className="flex items-center justify-center gap-7 mt-4">
              <Facebook size={20} className="text-white hover:text-blue-500" />
              <Instagram size={20} className="text-white hover:text-blue-500" />
              <FiTwitter size={20} className="text-white hover:text-blue-500" />
            </div>
          </div>

          <div className="lg:w-1/3 ">
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <div className="space-y-2 ">
              <a href="/" className="text-gray-400 hover:text-white block">
                Home
              </a>
              <a href="/PropertyAvailability" className="text-gray-400 hover:text-white block">
                Find Rooms
              </a>
              <a
                href="/addproperty"
                className="text-gray-400 hover:text-white block"
              >
                List Your Rooms
              </a>
              <a href="/about" className="text-gray-400 hover:text-white block">
                About Us
              </a>
            </div>
          </div>
          <div className="mb-8 lg:mb-0 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="flex items-center mb-4">
              <Mail className="mr-3" size={20} color="white" />
              <a
                href="mailto:support@company.com"
                className="text-lg font-semibold text-blue-400 hover:text-blue-300"
              >
                sastoproperty7@gmail.com
              </a>
            </div>
            <div className="flex items-center mb-4">
              <Phone className="mr-3" size={20} color="white" />
              <p className="text-lg text-gray-400 hover:text-white font-semibold">
                +977 9863935190
              </p>
            </div>
            <div className="flex items-center mb-4">
              <MapPin className="mr-3" size={20} color="white" />
              <div>
                <p className="text-lg text-gray-400 hover:text-white font-semibold">
                  Santinagar, Kathmandu
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm mt-4">© 2024 RoomLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
