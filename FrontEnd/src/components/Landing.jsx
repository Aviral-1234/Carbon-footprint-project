import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StarryBackground = () => {
  const [stars, setStars] = useState([]);
  
  // Generate random stars on component mount
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const numStars = 200; // Number of stars
      
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // Random x position (0-100%)
          y: Math.random() * 100, // Random y position (0-100%)
          size: Math.random() * 0.2 + 0.1, // Random size (0.1-0.3rem)
          opacity: Math.random() * 0.8 + 0.2, // Random opacity (0.2-1)
          speed: Math.random() * 0.05 + 0.01, // Random speed
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
  }, []);
  
  // Animate stars
  useEffect(() => {
    const intervalId = setInterval(() => {
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          x: (star.x + star.speed) % 100, // Move star and wrap around at 100%
          opacity: 0.2 + Math.sin(Date.now() * 0.001 * star.speed * 10) * 0.3 + 0.5, // Pulsating opacity
        }))
      );
    }, 50); // Update every 50ms
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}rem`,
            height: `${star.size}rem`,
            opacity: star.opacity,
          }}
        />
      ))}
      
      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
          EcoTrack
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10">
            Achieve net Zero Carbon emmision with us! <br />
            help us by starting out with us
        </p>
        
        <Link to={"/home"}>
        <button className="bg-white-600 hover:bg-white border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white-500 focus:ring-opacity-50 hover:text-black">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  );
};

export default StarryBackground;