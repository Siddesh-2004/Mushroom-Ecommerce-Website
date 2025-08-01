// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-4 sm:px-6 lg:px-8 text-gray-600 text-sm">
        {/* Left side */}
        <p className="order-2 md:order-1 mt-2 md:mt-0">
          © {year} Prakriti Admin. All rights reserved.
        </p>

        {/* Right side links */}
        <div className="order-1 md:order-2 flex space-x-4">
          <a
            href="/privacy"
            className="hover:text-gray-900 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-gray-900 transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="/support"
            className="hover:text-gray-900 transition-colors duration-200"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
