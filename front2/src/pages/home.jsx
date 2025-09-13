// src/components/Navbar.jsx
import React from "react";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Left side menu */}
        <div className="flex space-x-8 text-gray-300 font-medium">
          <a href="#home" className="hover:text-white hover:scale-105 transition">Home</a>
          <a href="#mrv" className="hover:text-white hover:scale-105 transition">MRV</a>
          <a href="#blueproof" className="hover:text-white hover:scale-105 transition">Blueproof</a>
        </div>

        {/* Center logo + name */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-400 rounded-full shadow-lg"></div>
          <h1 className="text-white text-2xl font-bold tracking-wide">Carbonlens</h1>
        </div>

        {/* Right side menu */}
        <div className="flex space-x-8 text-gray-300 font-medium">
          <a href="#learn" className="hover:text-white hover:scale-105 transition">Learn</a>
          <a href="#community" className="hover:text-white hover:scale-105 transition">Community</a>
          <a href="#profile" className="hover:text-white hover:scale-105 transition">Profile</a>
        </div>

        {/* Sign In / Sign Up */}
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-gray-300 hover:text-white border border-gray-500 rounded-xl hover:border-green-400 transition">
            Sign In
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-md transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
