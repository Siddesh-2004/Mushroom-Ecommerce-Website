import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isNotificationActive, setIsNotificationActive] = useState(false);

  return (
    <header className="flex items-center justify-between whitespace-nowrap bg-gradient-to-r from-emerald-800 via-teal-700 to-green-800 px-10 py-4 backdrop-blur-md border-b border-white/20 shadow-lg relative">
      {/* Logo Section */}
      <div className="flex items-center gap-4 text-white group">
        <div className="size-8 transform transition-all duration-300 hover:scale-110 hover:rotate-12">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg relative">
            {/* Mushroom spots */}
            <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-white/80 rounded-full"></div>
            <div className="absolute top-2 right-1.5 w-1 h-1 bg-white/60 rounded-full"></div>
            <div className="absolute bottom-2 left-1.5 w-1 h-1 bg-white/70 rounded-full"></div>
            {/* Mushroom icon */}
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
              <path
                d="M12 2C8.5 2 6 4.5 6 8C6 8.5 6.1 9 6.2 9.5H17.8C17.9 9 18 8.5 18 8C18 4.5 15.5 2 12 2Z"
                fill="currentColor"
              />
              <path
                d="M10 10V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V10H10Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] transition-all duration-300 group-hover:text-emerald-200">
          🍄 Mushroom
        </h2>
      </div>

      {/* Navigation and Actions */}
      <div className="flex flex-1 justify-end gap-8 items-center">
        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <NavLink
            className={({ isActive }) =>
              `px-6 py-3 rounded-xl text-sm font-medium leading-normal transition-all duration-300 transform hover:scale-105 ${
                isActive
                  ? "text-white bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/25 border border-green-400/30"
                  : "text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40"
              }`
            }
            to="/addproduct"
          >
            <span className="flex items-center gap-2">
              <span>➕</span>
              Add Product
            </span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `px-6 py-3 rounded-xl text-sm font-medium leading-normal transition-all duration-300 transform hover:scale-105 ${
                isActive
                  ? "text-white bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/25 border border-green-400/30"
                  : "text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40"
              }`
            }
            to="/viewproducts"
          >
            <span className="flex items-center gap-2">
              <span>👁️</span>
              View Product
            </span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `px-6 py-3 rounded-xl text-sm font-medium leading-normal transition-all duration-300 transform hover:scale-105 ${
                isActive
                  ? "text-white bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/25 border border-green-400/30"
                  : "text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40"
              }`
            }
            to="/orders"
          >
            <span className="flex items-center gap-2">
              <span>📦</span>
              Orders
            </span>
          </NavLink>
        </div>

        {/* Logout Button */}
        <button
          className={`flex cursor-pointer items-center gap-2 justify-center overflow-hidden rounded-xl h-12 px-4 transition-all duration-300 transform hover:scale-110 hover:rotate-12 border border-white/30 backdrop-blur-sm relative ${
            isNotificationActive
              ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/25 text-white"
              : "bg-white/10 hover:bg-white/20 text-white hover:text-emerald-200"
          }`}
          onMouseEnter={() => setIsNotificationActive(true)}
          onMouseLeave={() => setIsNotificationActive(false)}
          onClick={() => {
            // Handle logout logic here
            console.log("Logged out");
          }}
        >
          <div className="text-current relative flex items-center gap-2">
            {/* Logout icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 17v-2h-4v-2h4v-2l4 3-4 3zM2 21h10v-2H4V5h8V3H2v18z" />
            </svg>
            {/* Logout text */}
            <span className="text-sm font-medium">Logout</span>
          </div>
        </button>
      </div>

      {/* Floating mushrooms decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div
          className="absolute text-2xl"
          style={{
            top: "10px",
            left: "200px",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          🍄
        </div>
        <div
          className="absolute text-xl"
          style={{
            top: "15px",
            right: "300px",
            animation: "floatDelayed 4s ease-in-out infinite 1s",
          }}
        >
          🍄
        </div>
        <div
          className="absolute text-lg"
          style={{
            top: "8px",
            right: "500px",
            animation: "floatSlow 5s ease-in-out infinite 2s",
          }}
        >
          🍄
        </div>
        <div
          className="absolute text-xl"
          style={{
            top: "12px",
            left: "600px",
            animation: "float 3s ease-in-out infinite 0.5s",
          }}
        >
          🍄
        </div>
      </div>

      {/* CSS Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          
          @keyframes floatDelayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(-3deg); }
          }
          
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-6px) rotate(2deg); }
          }
        `,
        }}
      />
    </header>
  );
};

export default Navbar;
