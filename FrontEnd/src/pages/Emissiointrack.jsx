"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Navbar from "../components/navBar";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LiveCO2Dashboard() {
  const [co2Emission, setCo2Emission] = useState(0);
  const [dataHistory, setDataHistory] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("India");
  const [countryInput, setCountryInput] = useState("India");

  // Country-specific carbon intensity profiles
  const countryProfiles = {
    "India": {
      baseValue: 750,
      daytimeReduction: 720,
      eveningPeak: 820,
      nighttime: 780,
      minScale: 0.65,
      maxScale: 0.9,
      greenThreshold: 0.7,
      redThreshold: 0.8
    },
    "Germany": {
      baseValue: 300,
      daytimeReduction: 200,
      eveningPeak: 400,
      nighttime: 350,
      minScale: 0.1,
      maxScale: 0.5,
      greenThreshold: 0.2,
      redThreshold: 0.4
    },
    "USA": {
      baseValue: 450,
      daytimeReduction: 400,
      eveningPeak: 500,
      nighttime: 420,
      minScale: 0.3,
      maxScale: 0.6,
      greenThreshold: 0.4,
      redThreshold: 0.5
    },
    "France": {
      baseValue: 100,
      daytimeReduction: 80,
      eveningPeak: 150,
      nighttime: 90,
      minScale: 0.05,
      maxScale: 0.2,
      greenThreshold: 0.1,
      redThreshold: 0.15
    },
    "China": {
      baseValue: 650,
      daytimeReduction: 600,
      eveningPeak: 700,
      nighttime: 630,
      minScale: 0.55,
      maxScale: 0.8,
      greenThreshold: 0.6,
      redThreshold: 0.7
    },
    "UK": {
      baseValue: 250,
      daytimeReduction: 180,
      eveningPeak: 300,
      nighttime: 230,
      minScale: 0.15,
      maxScale: 0.35,
      greenThreshold: 0.2,
      redThreshold: 0.3
    }
  };

  // Default to India if country not found
  const getCountryProfile = (countryName) => {
    return countryProfiles[countryName] || countryProfiles["India"];
  };

  const handleCountrySubmit = (e) => {
    e.preventDefault();
    setCountry(countryInput);
    setIsLoading(true);
  };

  useEffect(() => {
    const fetchCarbonData = async () => {
      try {
        setIsLoading(true);
        // Simulating API response based on selected country's carbon intensity patterns
        const simulateApiResponse = () => {
          const now = new Date();
          const history = [];
          const profile = getCountryProfile(country);
          
          // Generate 24 hours of data points (1 per hour)
          for (let i = 24; i >= 0; i--) {
            const pointTime = new Date(now.getTime() - i * 60 * 60 * 1000);
            
            // Use country-specific carbon intensity profile
            const hour = pointTime.getHours();
            let baseValue = profile.baseValue;
            
            // Daytime hours generally have lower carbon intensity due to solar
            if (hour > 10 && hour < 16) {
              baseValue = profile.daytimeReduction;
            }
            // Evening peak
            else if (hour >= 18 && hour < 22) {
              baseValue = profile.eveningPeak;
            }
            // Nighttime
            else {
              baseValue = profile.nighttime;
            }
            
            // Add some randomness
            const carbonIntensity = baseValue + Math.floor(Math.random() * 100 - 50);
            
            history.push({
              datetime: pointTime.toISOString(),
              carbonIntensity: carbonIntensity
            });
          }
          
          return { history };
        };
        
        // Get simulated data
        const data = simulateApiResponse();
        
        // Process the data for our chart
        const historyData = data.history || [];
        
        // Map the data to get carbon intensity values and format timestamps
        const carbonValues = historyData.map(item => (item.carbonIntensity / 1000).toFixed(2)); // Convert from g to kg
        const timeLabels = historyData.map(item => {
          const date = new Date(item.datetime);
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });
        
        // Set the most recent value as the current CO2 emission
        if (carbonValues.length > 0) {
          setCo2Emission(carbonValues[carbonValues.length - 1]);
        }
        
        setDataHistory(carbonValues);
        setLabels(timeLabels);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching carbon data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    // Fetch data when country changes
    fetchCarbonData();
    
    // Set up polling every minute for simulated data
    const interval = setInterval(fetchCarbonData, 60 * 1000);
    
    return () => clearInterval(interval);
  }, [country]);

  // Determine color based on CO2 level - using country-specific thresholds
  const getEmissionColor = (value) => {
    const numValue = parseFloat(value);
    const profile = getCountryProfile(country);
    
    if (numValue > profile.redThreshold) return "bg-red-500"; 
    if (numValue > profile.greenThreshold) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
          <p>Loading carbon intensity data for {country}...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
          <p>Error loading data: {error}</p>
          <p>Please try again later.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Carbon Intensity Tracker</h1>
        
        {/* Country selection form */}
        <form onSubmit={handleCountrySubmit} className="mb-6 flex">
          <select 
            value={countryInput} 
            onChange={(e) => setCountryInput(e.target.value)}
            className="bg-zinc-700 rounded-md px-3 py-2 outline-none border-0"
          >
            {Object.keys(countryProfiles).map(countryName => (
              <option key={countryName} value={countryName}>{countryName}</option>
            ))}
          </select>
          <button 
            type="submit" 
            className="bg-blue-500 ml-2 hover:bg-blue-600 rounded-md px-4 py-2 transition-colors"
          >
            Update
          </button>
        </form>
        
        <p className="text-sm text-gray-400 mb-6">Based on typical {country} grid carbon intensity patterns</p>

        <div className="bg-zinc-800 mt-4 p-5 rounded-lg w-full max-w-2xl shadow-xl">
          {/* Current Emission Display */}
          <div className="flex items-center justify-center mb-8">
            <div className={`w-32 h-32 flex flex-col items-center justify-center rounded-full ${getEmissionColor(co2Emission)} shadow-lg`}>
              <span className="text-3xl font-bold">{co2Emission}</span>
              <span className="text-sm mt-1">kg/kWh</span>
            </div>
          </div>

          {/* Line Chart for CO2 Trends */}
          <div className="w-full h-[300px] max-w-2xl">
            <Line
              data={{
                labels: labels,
                datasets: [
                  {
                    label: "Carbon Intensity",
                    data: dataHistory,
                    borderColor: "rgba(56, 189, 248, 1)", // Sky blue color
                    backgroundColor: "rgba(56, 189, 248, 0.1)",
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 2,
                    pointHoverRadius: 5
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { 
                    display: false 
                  },
                  title: { 
                    display: true, 
                    text: `24-Hour Carbon Intensity - ${country}`, 
                    color: "#fff",
                    font: {
                      size: 16
                    }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    titleFont: {
                      size: 14
                    },
                    bodyFont: {
                      size: 13
                    },
                    callbacks: {
                      label: function(context) {
                        return `${context.raw} kg CO₂eq/kWh`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: { 
                      color: "#cbd5e1",
                      maxRotation: 45,
                      minRotation: 45,
                      autoSkip: true,
                      maxTicksLimit: 12
                    }
                  },
                  y: {
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: { 
                      color: "#cbd5e1" 
                    },
                    title: {
                      display: true,
                      text: 'kg CO₂eq/kWh',
                      color: '#cbd5e1',
                      font: {
                        size: 12
                      }
                    },
                    // Set min/max based on country profile
                    min: getCountryProfile(country).minScale,
                    max: getCountryProfile(country).maxScale
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}