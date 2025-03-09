"use client";
import React from "react";
import Navbar from "../components/navBar";

// Custom SVG icons to replace lucide-react
const IconArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const IconDatabase = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

const IconLineChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/>
    <path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);

const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    <path d="M2 12h20"/>
  </svg>
);

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About Our Mission</h1>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Pioneering data-driven solutions to track, analyze, and reduce carbon emissions globally.
            </p>
          </div>

          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Leading The Way In Carbon Emission Analysis</h2>
              <p className="text-zinc-300 mb-6">
                Our team of environmental scientists, data analysts, and software engineers is dedicated to 
                developing cutting-edge technology that provides the most accurate, comprehensive, and 
                actionable carbon emission data available today.
              </p>
              <p className="text-zinc-300 mb-6">
                By combining satellite imagery, IoT sensor networks, and advanced AI algorithms, we've 
                created a platform that delivers real-time carbon emission tracking with unprecedented 
                precision across regional and national scales.
              </p>
              <div className="flex items-center">
                <a href="/contact" className="bg-emerald-600 hover:bg-emerald-700 transition-colors px-6 py-3 rounded-lg font-medium flex items-center">
                  Join Our Efforts <span className="ml-2"><IconArrowRight /></span>
                </a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img 
                src="/api/placeholder/600/400" 
                alt="Our team monitoring carbon data"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Our Approach */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Approach</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-zinc-800 p-6 rounded-lg">
                <div className="bg-emerald-600/20 p-3 rounded-full w-fit mb-4 text-emerald-500">
                  <IconDatabase />
                </div>
                <h3 className="text-xl font-bold mb-3">Comprehensive Data Collection</h3>
                <p className="text-zinc-300">
                  We aggregate data from multiple sources including satellite imagery, ground-level sensors, 
                  and industry reports to create the most comprehensive carbon emission database.
                </p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-lg">
                <div className="bg-emerald-600/20 p-3 rounded-full w-fit mb-4 text-emerald-500">
                  <IconLineChart />
                </div>
                <h3 className="text-xl font-bold mb-3">Advanced Analytics</h3>
                <p className="text-zinc-300">
                  Our proprietary algorithms process terabytes of data to identify emission patterns, 
                  predict trends, and highlight opportunities for carbon reduction with unmatched accuracy.
                </p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-lg">
                <div className="bg-emerald-600/20 p-3 rounded-full w-fit mb-4 text-emerald-500">
                  <IconGlobe />
                </div>
                <h3 className="text-xl font-bold mb-3">Actionable Insights</h3>
                <p className="text-zinc-300">
                  We transform complex data into clear, actionable insights that help governments, 
                  businesses, and communities make informed decisions to reduce their carbon footprint.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-6">Our Technology</h2>
            <p className="text-zinc-300 mb-10 max-w-3xl">
              Our platform leverages cutting-edge technologies to deliver the most accurate and timely 
              carbon emission data available:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
                <h3 className="text-xl font-bold mb-4">Data Collection Infrastructure</h3>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start">
                    <span className="bg-emerald-600 rounded-full p-1 mr-3 mt-1"></span>
                    <span>Distributed sensor network with over 10,000 monitoring points</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-600 rounded-full p-1 mr-3 mt-1"></span>
                    <span>Satellite imagery processing using spectral analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-600 rounded-full p-1 mr-3 mt-1"></span>
                    <span>API integrations with major industrial monitoring systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-600 rounded-full p-1 mr-3 mt-1"></span>
                    <span>Real-time data transmission with edge computing capabilities</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
                <h3 className="text-xl font-bold mb-4">Analysis & Visualization</h3>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start">
                    <span className="bg-emerald-600 rounded-full p-1 mr-3 mt-1"></span>
                    <span>Machine learning models for pattern recognition and prediction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-600 rounded-full p-1 mr-3 mt-1"></span>
                    <span>Advanced geospatial mapping with regional breakdowns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-600 rounded-full p-1 mr-3 mt-1"></span>
                    <span>Time-series analysis for trend identification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-emerald-600 rounded-full p-1 mr-3 mt-1"></span>
                    <span>Interactive dashboards with customizable visualization options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Our Impact */}
          <div className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 rounded-xl p-8 mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-emerald-400 mb-2">100+</div>
                <p className="text-zinc-300">Organizations using our data</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-emerald-400 mb-2">35%</div>
                <p className="text-zinc-300">Average emission reduction achieved</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-emerald-400 mb-2">27</div>
                <p className="text-zinc-300">Countries with active monitoring</p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Leadership</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {['CEO & Founder', 'Chief Science Officer', 'Head of Data', 'Technology Lead'].map((role, index) => (
                <div key={index} className="text-center">
                  <div className="bg-zinc-800 rounded-full w-40 h-40 mx-auto mb-4 overflow-hidden">
                    <img src={`/api/placeholder/160/160`} alt={`Team member - ${role}`} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">Team Member</h3>
                  <p className="text-emerald-400">{role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-6">Join Us in Creating a Sustainable Future</h2>
            <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
              Together, we can leverage data to make informed decisions that reduce carbon emissions 
              and protect our planet for future generations.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/contact" className="bg-emerald-600 hover:bg-emerald-700 transition-colors px-8 py-3 rounded-lg font-medium">
                Contact Us
              </a>
              <a href="/demo" className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors px-8 py-3 rounded-lg font-medium">
                Request Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}