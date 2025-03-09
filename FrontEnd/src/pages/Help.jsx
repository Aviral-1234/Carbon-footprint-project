import React from 'react';
import Navbar from '../components/navBar';

const HelpComponent = () => {
  return (
    <div className='bg-zinc-900 h-screen'>
        <Navbar/>
    <div className='w-full flex justify-content align-center ml-[40%] mt-9'>
    
    <div className="bg-zinc-300 rounded-lg p-4 shadow-sm max-w-md ">
      <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
      <p className="text-gray-700 mb-3">Our support team is ready to assist you.</p>
      
      <div className="space-y-2 ">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>
        </div>
        
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="text-gray-700">(123) 456-7890</span>
        </div>
        
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          <a href="#faq" className="text-blue-600 hover:underline">Visit our FAQ</a>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-500">Available Monday-Friday, 9am-5pm ET</p>
      </div>
    </div>
    </div>
    
    </div>
  );
};

export default HelpComponent;