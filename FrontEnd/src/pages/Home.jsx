import React from 'react';
import { Circle } from 'lucide-react';
import Navbar from '../components/navBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const CarbonEmissionPage = () => {
  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-zinc-900 text-gray-200 flex items-center justify-center p-4">
    
      <div className="max-w-6xl w-full py-12 px-8">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-4">Carbon Footprint Tracker</h1>
            
            <div className="mb-6 border-l-4 border-blue-500 pl-4">
              <p className="text-xl italic text-gray-300">
                "The greatest threat to our planet is the belief that someone else will save it."
              </p>
              <p className="mt-2 text-gray-400">— Robert Swan</p>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-300 text-lg leading-relaxed">
                Tracking your carbon emissions is crucial in today's world. It helps you understand your 
                environmental impact and take meaningful action against climate change. By monitoring your carbon 
                footprint, you can identify high-impact areas in your daily life and make informed 
                choices that benefit both you and the planet.
              </p>
            </div>
            
            <Link to={"/form"}>
              <button 
                className="bg-transparent border-2 hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 w-fit"
              >
                Check Your Emissions
              </button>
            </Link>
          </div>
          
          {/* Right Column - Animated Earth */}
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="relative w-72 h-72">
              {/* Animated Earth with Orbiting Elements */}
              <div className="absolute w-56 h-56 bg-blue-800 rounded-full left-8 top-8 animate-pulse"></div>
              <div className="absolute w-56 h-56 bg-green-800 opacity-80 rounded-full left-8 top-8 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              
              {/* Overlay with continent shapes */}
              <div className="absolute w-56 h-56 left-8 top-8 rounded-full overflow-hidden">
                <div className="absolute bg-green-600 opacity-60 w-12 h-16 left-12 top-8"></div>
                <div className="absolute bg-green-600 opacity-60 w-20 h-12 left-28 top-12"></div>
                <div className="absolute bg-green-600 opacity-60 w-16 h-24 left-24 top-24"></div>
              </div>
              
              {/* Orbiting Carbon Molecules */}
              <div className="absolute w-full h-full animate-spin" style={{animationDuration: '15s'}}>
                <div className="absolute -left-4 top-1/2 bg-zinc-700 p-2 rounded-full border border-gray-600">
                  <Circle size={16} color="#22c55e" />
                </div>
              </div>
              
              <div className="absolute w-full h-full animate-spin" style={{animationDuration: '20s', animationDirection: 'reverse'}}>
                <div className="absolute -right-4 top-1/2 bg-zinc-700 p-2 rounded-full border border-gray-600">
                  <Circle size={16} color="#22c55e" />
                </div>
              </div>
              
              <div className="absolute w-full h-full animate-spin" style={{animationDuration: '25s'}}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-zinc-700 p-2 rounded-full border border-gray-600">
                  <Circle size={16} color="#22c55e" />
                </div>
              </div>
              
              <div className="absolute w-full h-full animate-spin" style={{animationDuration: '30s', animationDirection: 'reverse'}}>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-zinc-700 p-2 rounded-full border border-gray-600">
                  <Circle size={16} color="#22c55e" />
                </div>
              </div>
              
              {/* Text overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-green-400 font-bold text-3xl z-10">CO₂</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default CarbonEmissionPage;