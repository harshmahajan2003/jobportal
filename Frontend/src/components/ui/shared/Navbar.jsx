import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>
        {/* Navigation Links */}
        <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', gap: '0.5rem' }}>
          <li style={{ margin: '0 1.5rem' }}>Home</li>
          <li style={{ margin: '0 1.5rem' }}>Jobs</li>
          <li style={{ margin: '0 1.5rem' }}>Browse</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;