import React from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#0d141c]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em]">InventoryPro</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <NavLink className={(e)=>{return e.isActive?"text-white text-sm font-medium leading-normal bg-blue-500 p-4 rounded":"text-[#0d141c] text-sm font-medium leading-normal"}} to="/addproduct">Add Product</NavLink>
          <NavLink className={(e)=>{return e.isActive?"text-white text-sm font-medium leading-normal bg-blue-500 p-4 rounded":"text-[#0d141c] text-sm font-medium leading-normal"}} to="/vieworders">View Product</NavLink>
          <NavLink className={(e)=>{return e.isActive?"text-white text-sm font-medium leading-normal bg-blue-500 p-4 rounded":"text-[#0d141c] text-sm font-medium leading-normal"}} to="/orders">Orders</NavLink>
        </div>
        <button
          className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#e7edf4] text-[#0d141c] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
        >
          <div className="text-[#0d141c]" data-icon="Bell" data-size="20px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
              />
            </svg>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;