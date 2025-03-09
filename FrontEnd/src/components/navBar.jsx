import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-3">
        <div className="flex justify-between h-16">
          {/* Logo - Left aligned */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-indigo-500 text-xl font-bold">EcoTracker</span>
            </div>
          </div>
          
          {/* Main Navigation - Center aligned */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <Link to="/home" className={`${isActive('/home') ? 'text-white border-indigo-500 border-b-2' : 'text-gray-300 hover:text-white border-transparent hover:border-gray-300 border-b-2'} px-1 pt-1 text-sm font-medium`}>
                Home
              </Link>
              <Link to="/livetracker" className={`${isActive('/livetracker') ? 'text-white border-indigo-500 border-b-2' : 'text-gray-300 hover:text-white border-transparent hover:border-gray-300 border-b-2'} px-1 pt-1 text-sm font-medium`}>
                Live Emission Tracker
              </Link>
              <Link to="/form" className={`${isActive('/form') ? 'text-white border-indigo-500 border-b-2' : 'text-gray-300 hover:text-white border-transparent hover:border-gray-300 border-b-2'} px-1 pt-1 text-sm font-medium`}>
                Analyze Data
              </Link>
              <Link to="/map" className={`${isActive('/map') ? 'text-white border-indigo-500 border-b-2' : 'text-gray-300 hover:text-white border-transparent hover:border-gray-300 border-b-2'} px-1 pt-1 text-sm font-medium`}>
                National data
              </Link>
            </div>
          </div>
          
          {/* Right side menu items */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/help">
              <button className="text-gray-300 hover:text-white px-3 py-1 rounded-md text-sm font-medium">
                Help
              </button>
            </Link>
            <Link to="/aboutus">
              <button className="bg-transparent border-2 hover:bg-white hover:text-black text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 transform hover:scale-105">
                About Us
              </button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icon when menu is open */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/home" className={`${isActive('/home') ? 'bg-zinc-800 text-white border-l-4 border-indigo-500' : 'border-transparent text-gray-300 hover:bg-zinc-800 hover:text-white hover:border-gray-300 border-l-4'} block pl-3 pr-4 py-2 text-base font-medium`}>
              Home
            </Link>
            <Link to="/livetracker" className={`${isActive('/livetracker') ? 'bg-zinc-800 text-white border-l-4 border-indigo-500' : 'border-transparent text-gray-300 hover:bg-zinc-800 hover:text-white hover:border-gray-300 border-l-4'} block pl-3 pr-4 py-2 text-base font-medium`}>
              Live Emission Tracker
            </Link>
            <Link to="/form" className={`${isActive('/form') ? 'bg-zinc-800 text-white border-l-4 border-indigo-500' : 'border-transparent text-gray-300 hover:bg-zinc-800 hover:text-white hover:border-gray-300 border-l-4'} block pl-3 pr-4 py-2 text-base font-medium`}>
              Analyze Data 
            </Link>
            <Link to="/map" className={`${isActive('/map') ? 'bg-zinc-800 text-white border-l-4 border-indigo-500' : 'border-transparent text-gray-300 hover:bg-zinc-800 hover:text-white hover:border-gray-300 border-l-4'} block pl-3 pr-4 py-2 text-base font-medium`}>
              National data
            </Link>
          </div>
          <div className="pt-2 pb-3 border-t border-zinc-800">
            <Link to="/help" className="border-transparent text-gray-300 hover:bg-zinc-800 hover:text-white hover:border-gray-300 border-l-4 block pl-3 pr-4 py-2 text-base font-medium">
              Help
            </Link>
            <Link to="/aboutus" className="border-transparent text-gray-300 hover:bg-zinc-800 hover:text-white hover:border-gray-300 border-l-4 block pl-3 pr-4 py-2 text-base font-medium">
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;