import React, { useState, useEffect } from 'react';
import '../pages/formpage.css';

// Carbon emission factors (these are approximate values)
const EMISSION_FACTORS = {
  electricity: 0.5, // kg CO2 per kWh
  fuel: 2.68,       // kg CO2 per liter of diesel
  transport: 0.14,  // kg CO2 per km
  production: 1.2    // kg CO2 per kg of product
};

// Ficus religiosa (Peepal tree) CO2 sequestration rate
// A mature Peepal tree can absorb approximately 22 kg of CO2 per year
const PEEPAL_TREE_ABSORPTION = 22; // kg CO2 per year per tree

const SustainabilityDataForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    state: '',
    date: '',
    energyUsageKwh: '',
    fuelConsumptionLiters: '',
    transportDistanceKm: '',
    productionQuantityKg: ''
  });

  const [emissionData, setEmissionData] = useState({
    totalEmissions: 0,
    breakdownBySource: {
      energy: 0,
      fuel: 0,
      transport: 0,
      production: 0
    },
    treesRequired: 0
  });

  const [apiResponse, setApiResponse] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Calculate carbon emissions based on form data
  const calculateEmissions = (data) => {
    // Convert string inputs to numbers
    const energyUsage = parseFloat(data.energyUsageKwh) || 0;
    const fuelConsumption = parseFloat(data.fuelConsumptionLiters) || 0;
    const transportDistance = parseFloat(data.transportDistanceKm) || 0;
    const productionQuantity = parseFloat(data.productionQuantityKg) || 0;

    // Calculate emissions by source
    const energyEmissions = energyUsage * EMISSION_FACTORS.electricity;
    const fuelEmissions = fuelConsumption * EMISSION_FACTORS.fuel;
    const transportEmissions = transportDistance * EMISSION_FACTORS.transport;
    const productionEmissions = productionQuantity * EMISSION_FACTORS.production;

    // Calculate total emissions
    const totalEmissions = energyEmissions + fuelEmissions + transportEmissions + productionEmissions;

    // Calculate number of Peepal trees required to offset emissions
    const treesRequired = Math.ceil(totalEmissions / PEEPAL_TREE_ABSORPTION);

    return {
      totalEmissions: totalEmissions,
      breakdownBySource: {
        energy: energyEmissions,
        fuel: fuelEmissions,
        transport: transportEmissions,
        production: productionEmissions
      },
      treesRequired: treesRequired
    };
  };

  const sendDataToApi = async (formData, emissionData) => {
    try {
      setIsSubmitting(true);
      
      // Prepare data for API with the new parameter names
      const dataToSend = {
        company: formData.companyName,
        location: formData.location,
        state: formData.state,
        date: formData.date,
        energyUsage: parseFloat(formData.energyUsageKwh) || 0,
        fuelConsumption: parseFloat(formData.fuelConsumptionLiters) || 0,
        transportDistance: parseFloat(formData.transportDistanceKm) || 0,
        productionQuantity: parseFloat(formData.productionQuantityKg) || 0,
        emissionThreshold: emissionData.totalEmissions // Adding the new parameter
      };
      
      // Send data to API
      const response = await fetch('http://localhost:8000/calculate-emissions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      // Handle API response
      const responseData = await response.json();
      console.log('API Response:', responseData);
      setApiResponse(responseData);
      
    } catch (error) {
      console.error('Error sending data to API:', error);
      // You could set an error state here and display it to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emissions = calculateEmissions(formData);
    setEmissionData(emissions);
    setShowResults(true);
    
    // Log locally as before
    console.log('Form submitted:', formData);
    console.log('Emission calculation:', emissions);
    
    // Send data to API
    sendDataToApi(formData, emissions);
  };

  // Helper function to render regional emissions as bullet points
  const renderRegionalEmissions = (regionalEmissions) => {
    if (!regionalEmissions || !Array.isArray(regionalEmissions)) {
      return null;
    }

    const sections = {};
    let currentSection = '';

    // Group lines by section headers
    regionalEmissions.forEach(line => {
      if (line.includes('1️⃣') || line.includes('2️⃣') || line.includes('3️⃣') || line.includes('4️⃣') || line.includes('📢')) {
        currentSection = line;
        sections[currentSection] = [];
      } else if (currentSection) {
        sections[currentSection].push(line);
      }
    });

    // Render each section
    return Object.entries(sections).map(([header, lines], index) => (
      <div key={index} className="mb-4">
        <h5 className="text-lg font-semibold mb-2">{header}</h5>
        <ul className="space-y-1 pl-5 list-disc">
          {lines.filter(line => line.trim()).map((line, lineIndex) => (
            <li key={lineIndex}>{line}</li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Sustainability Data Analysis</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Location */}
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-300">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* State - Added new field */}
            <div className="space-y-2">
              <label htmlFor="state" className="block text-sm font-medium text-gray-300">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Energy Usage kWh */}
            <div className="space-y-2">
              <label htmlFor="energyUsageKwh" className="block text-sm font-medium text-gray-300">
                Energy Usage (kWh)
              </label>
              <input
                type="number"
                id="energyUsageKwh"
                name="energyUsageKwh"
                value={formData.energyUsageKwh}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Fuel Consumption Liters */}
            <div className="space-y-2">
              <label htmlFor="fuelConsumptionLiters" className="block text-sm font-medium text-gray-300">
                Fuel Consumption (Liters)
              </label>
              <input
                type="number"
                id="fuelConsumptionLiters"
                name="fuelConsumptionLiters"
                value={formData.fuelConsumptionLiters}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Transport Distance km */}
            <div className="space-y-2">
              <label htmlFor="transportDistanceKm" className="block text-sm font-medium text-gray-300">
                Transport Distance (km)
              </label>
              <input
                type="number"
                id="transportDistanceKm"
                name="transportDistanceKm"
                value={formData.transportDistanceKm}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* Production Quantity kg */}
            <div className="space-y-2">
              <label htmlFor="productionQuantityKg" className="block text-sm font-medium text-gray-300">
                Production Quantity (kg)
              </label>
              <input
                type="number"
                id="productionQuantityKg"
                name="productionQuantityKg"
                value={formData.productionQuantityKg}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-transparent border-2 hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Calculate Carbon Footprint"}
            </button>
          </div>
        </form>

        {/* Results Section */}
        {showResults && (
          <div className="mt-8 bg-zinc-700 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">Carbon Emission Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Emissions Breakdown</h4>
                <div className="space-y-2">
                  <p>Energy: <span className="font-bold">{emissionData.breakdownBySource.energy.toFixed(2)} kg CO₂</span></p>
                  <p>Fuel: <span className="font-bold">{emissionData.breakdownBySource.fuel.toFixed(2)} kg CO₂</span></p>
                  <p>Transport: <span className="font-bold">{emissionData.breakdownBySource.transport.toFixed(2)} kg CO₂</span></p>
                  <p>Production: <span className="font-bold">{emissionData.breakdownBySource.production.toFixed(2)} kg CO₂</span></p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Total Impact</h4>
                <p className="text-2xl font-bold">{emissionData.totalEmissions.toFixed(2)} kg CO₂</p>
                
                <div className="mt-4 pt-4 border-t border-zinc-600">
                  <h4 className="text-xl font-semibold">Offset Requirements</h4>
                  <p className="mt-2">
                    <span className="text-2xl font-bold text-green-400">{emissionData.treesRequired}</span> 
                    <span className="ml-2">Ficus religiosa trees required for net zero</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* API Response Data */}
            {apiResponse && (
              <div className="mt-8 pt-6 border-t border-zinc-600">
                <h3 className="text-2xl font-bold mb-6 text-center">Detailed Sustainability Report</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Emissions Breakdown from API */}
                  {apiResponse.breakdown && (
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <h4 className="text-xl font-semibold mb-3">Advanced Emissions Breakdown</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p>Energy Usage: <span className="font-bold">{apiResponse.breakdown["Energy Usage"]}</span></p>
                          <p>Fuel Consumption: <span className="font-bold">{apiResponse.breakdown["Fuel Consumption"]}</span></p>
                        </div>
                        <div>
                          <p>Production Quantity: <span className="font-bold">{apiResponse.breakdown["Production Quantity"]}</span></p>
                          <p>Transport Distance: <span className="font-bold">{apiResponse.breakdown["Transport Distance"]}</span></p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Reduction Strategies Section */}
                  {apiResponse.reduction_strategies && (
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <h4 className="text-xl font-semibold mb-3">Reduction Strategies</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(apiResponse.reduction_strategies).map(([key, value], index) => (
                          key !== "Prototype" && (
                            <p key={index}>{key}: <span className="font-bold text-green-400">{value}</span></p>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Optimized Utilization Section */}
                  {apiResponse.optimized_utilization && (
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <h4 className="text-xl font-semibold mb-3">Optimized Resource Utilization</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(apiResponse.optimized_utilization).map(([key, value], index) => (
                          key !== "Prototype" && (
                            <p key={index}>{key}: <span className="font-bold text-green-400">{value}</span></p>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Comprehensive Report Section */}
                  {apiResponse.regional_emissions && (
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <h4 className="text-xl font-semibold mb-3">Comprehensive Report</h4>
                      {renderRegionalEmissions(apiResponse.regional_emissions)}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SustainabilityDataForm;