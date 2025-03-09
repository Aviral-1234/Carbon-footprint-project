import React, { useEffect, useRef } from 'react';
import Navbar from '../components/navBar';

const IndiaCarbonEmissionsMap = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Load Google Charts scripts dynamically
    const loadGoogleCharts = () => {
      return new Promise((resolve, reject) => {
        // Check if Google Charts is already loaded
        if (window.google && window.google.charts) {
          window.google.charts.load('current', {
            packages: ['geochart'],
            callback: resolve
          });
          return;
        }

        // Create script element
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.onload = () => {
          if (window.google && window.google.charts) {
            window.google.charts.load('current', {
              packages: ['geochart'],
              callback: resolve
            });
          } else {
            reject(new Error('Google Charts not available'));
          }
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Function to initialize the chart
    const initializeChart = () => {
      try {
        // Carbon emissions data for each state (in million tons of CO2 equivalent)
        const data = window.google.visualization.arrayToDataTable([
          ["State Code", "State", "Carbon Emissions"],
          ["IN-UP", "Uttar Pradesh", 187.6],
          ["IN-MH", "Maharashtra", 159.4],
          ["IN-TN", "Tamil Nadu", 143.2],
          ["IN-GJ", "Gujarat", 137.8],
          ["IN-RJ", "Rajasthan", 126.5],
          ["IN-MP", "Madhya Pradesh", 115.3],
          ["IN-KA", "Karnataka", 108.7],
          ["IN-WB", "West Bengal", 103.9],
          ["IN-AP", "Andhra Pradesh", 97.2],
          ["IN-BR", "Bihar", 89.5],
          ["IN-JH", "Jharkhand", 84.3],
          ["IN-DL", "Delhi", 78.9],
          ["IN-HR", "Haryana", 74.7],
          ["IN-CT", "Chhattisgarh", 69.5],
          ["IN-KL", "Kerala", 63.2],
          ["IN-PB", "Punjab", 58.9],
          ["IN-OR", "Orissa", 56.4],
          ["IN-JK", "Jammu and Kashmir", 43.2],
          ["IN-AS", "Assam", 38.7],
          ["IN-UT", "Uttarakhand", 35.9],
          ["IN-HP", "Himachal Pradesh", 28.4],
          ["IN-TR", "Tripura", 24.3],
          ["IN-ML", "Meghalaya", 18.7],
          ["IN-MN", "Manipur", 16.2],
          ["IN-NL", "Nagaland", 14.5],
          ["IN-GA", "Goa", 12.9],
          ["IN-AR", "Arunachal Pradesh", 10.8],
          ["IN-PY", "Puducherry", 9.4],
          ["IN-MZ", "Mizoram", 8.2],
          ["IN-SK", "Sikkim", 7.1],
          ["IN-TG", "Telangana", 5.9],
          ["IN-CH", "Chandigarh", 5.3],
          ["IN-LD", "Lakshadweep", 3.7],
          ["IN-DN", "Dadra and Nagar Haveli and Daman and Diu", 3.2],
          ["IN-LA", "Ladakh", 2.1],
          ["IN-AN", "Andaman and Nicobar Islands", 1.5]
        ]);

        // Chart options
        const options = {
          region: "IN",
          domain: "IN",
          displayMode: "regions",
          colorAxis: { 
            colors: ["#E6F7FF", "#005599"], // Light blue to dark blue - from your Highcharts
            minValue: 0
          },
          resolution: "provinces",
          defaultColor: "#f5f5f5",
          backgroundColor: '#18181B', // Dark background (zinc-900)
          datalessRegionColor: '#18181B',
          legend: {
            textStyle: {
              color: 'white', // White text for legend
              fontSize: 14
            }
          },
          tooltip: {
            textStyle: {
              color: '#000000',
              fontSize: 14
            }
          }
        };

        // Create and draw the chart
        const chart = new window.google.visualization.GeoChart(chartRef.current);
        
        // Handle responsive sizing
        const resizeChart = () => {
          chart.draw(data, options);
        };
        
        // Add event listener for window resize
        window.addEventListener('resize', resizeChart);
        
        // Initial draw
        resizeChart();
        
        console.log('Google GeoChart initialized with carbon emission data');
        
        // Return cleanup function
        return () => {
          window.removeEventListener('resize', resizeChart);
        };
      } catch (error) {
        console.error('Error initializing GeoChart:', error);
      }
    };

    // Variable to track if component is mounted
    let isMounted = true;
    
    // Load Google Charts and initialize
    loadGoogleCharts()
      .then(() => {
        if (isMounted) {
          // Add a small delay to ensure DOM is ready
          setTimeout(initializeChart, 100);
        }
      })
      .catch(error => console.error('Failed to load Google Charts:', error));

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-zinc-900">
      <Navbar />
      <div className="container max-w-screen mx-auto p-4">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-white mb-2">Carbon Emissions by Indian State</h1>
          <p className="text-white mb-4">Million tons of CO2 equivalent per year</p>
          <div 
            ref={chartRef} 
            className="w-full h-screen bg-zinc-900"
            style={{
              minHeight: '480px',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default IndiaCarbonEmissionsMap;