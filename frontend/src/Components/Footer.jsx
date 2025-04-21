import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { FiTwitter } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">RoomLink</h2>
            <p className="text-sm text-gray-400 hover:text-gray-600 mb-4">
              Discover your perfect living space with ease.
            </p>
            <div className="flex items-center justify-center gap-7 mt-4">
              <a
                href="https://www.facebook.com/sastoroomfinderagent?mibextid=ZbWKwL"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/sasto_room_finder_official?igsh=MWVwaGZ1cXJmcnh5Zw=="
                className="text-primary hover:text-primary-dark transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@sastoroomfinder?_t=ZS-8uz101CncBk&_r=1"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                <FaTiktok size={24} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                Home
              </a>
              <a
                href="/PropertyAvailability"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                Find Rooms
              </a>
              <a
                href="/addproperty"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                List Your Rooms
              </a>
              <a href="/aboutus" className="text-gray-400 hover:text-gray-600 transition-colors">
                About Us
              </a>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Contact Us</h3>
            <div className="space-y-2">
              <a
                href="mailto:sastoproperty7@gmail.com"
                className="flex items-center hover:text-gray-600 transition-colors"
              >
                <Mail size={18} className="mr-2 text-primary" />
                sastoroomfinder@gmail.com
              </a>
              <p className="flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                <Phone size={18} className="mr-2 text-primary" />
                +977 9818067008
              </p>
              <p className="flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                <MapPin size={18} className="mr-2 text-primary" />
                Santinagar, Kathmandu
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} RoomLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
