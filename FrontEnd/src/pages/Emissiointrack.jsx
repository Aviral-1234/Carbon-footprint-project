"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Navbar from "../components/navBar";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LiveCO2Dashboard() {
  const [co2Emission, setCo2Emission] = useState(2.5); // Default emission value
  const [dataHistory, setDataHistory] = useState([]);
  const [labels, setLabels] = useState([]);

  // Simulate real-time CO2 data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newEmission = (4+Math.random() * 1).toFixed(2); // Random CO2 values (0-5 tons)
      setCo2Emission(newEmission);
      setDataHistory((prev) => [...prev.slice(-9), newEmission]); // Keep last 10 records
      setLabels((prev) => [...prev.slice(-9), new Date().toLocaleTimeString()]);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Determine color based on CO2 level
  const getEmissionColor = (value) => {
    if (value > 3) return "bg-red-500"; // High CO2
    if (value > 1.5) return "bg-yellow-500"; // Medium CO2
    return "bg-green-500"; // Low CO2
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white p-6">
        
      <h1 className="text-3xl font-bold mb-4">Live CO₂ Emission Tracker</h1>

        <div className="bg-zinc-800 mt-4 p-5  rounded-md w-full max-w-2xl">
      {/* Live Emission Display */}
      <div className="w-64 h-44 ml-[30%] flex items-center justify-center rounded-full text-4xl font-bold ${getEmissionColor(co2Emission)">
        {co2Emission} Tons
      </div>

      {/* Line Chart for CO2 Trends */}
      <div className="w-full h-[330px] max-w-2xl mt-8 ">
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: "CO₂ Emissions (Tons)",
                data: dataHistory,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true },
              title: { display: true, text: "CO₂ Emission Trend", color: "#fff" },
            },
            scales: {
              x: { 
                ticks: { color: "#fff" },
                title: {
                  display: true,
                  text: 'Time',
                  color: '#fff',
                  font: {
                    size: 14,
                    weight: 'bold'
                  }
                }
              },
              y: { 
                ticks: { color: "#fff" },
                title: {
                  display: true,
                  text: 'CO₂ Emissions (Tons)',
                  color: '#fff',
                  font: {
                    size: 14,
                    weight: 'bold'
                  }
                }
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