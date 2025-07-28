import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingBagIcon,
  MapPinIcon,
  PlusCircleIcon,
  EyeIcon,
  Bars3Icon,
  XMarkIcon,
  HomeModernIcon,
  PlusIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowPathRoundedSquareIcon
} from '@heroicons/react/24/outline';
import { ArrowBigLeftDashIcon, DoorClosed, DoorClosedLockedIcon, DoorOpenIcon, LucideDoorOpen } from 'lucide-react';

const NavBar = ({setIsLoggedIn}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Navigation items configuration
  const navigationItems = [
    {
      name: 'Home',
      path: '/',
      icon: HomeIcon
    },
    {
      name: 'Orders',
      path: '/orders',
      icon: ShoppingBagIcon
    },
    {
      name: 'Locations',
      path: '/Locations',
      icon: MapPinIcon
    },
    {
      name: 'Add Products',
      path: '/addProduct',
      icon: PlusCircleIcon
    },
    {
      name: 'View Products',
      path: '/viewProducts',
      icon: EyeIcon
    },
    {
      name:"Add Shop",
      path:'/addShop',
      icon:PlusIcon
    },
    {
      name:"View Shops",
      path:'/viewShops',
      icon:HomeModernIcon
    },
    
   
  ];
  const handleLogout=()=>{
    setIsLoggedIn(false);
  }

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Auto-open drawer on large screens
      if (!mobile) {
        setIsDrawerOpen(true);
      } else {
        setIsDrawerOpen(false);
      }
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle drawer function
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Close drawer when clicking on mobile nav links
  const handleMobileNavClick = () => {
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleDrawer}
        />
      )}

      {/* Hamburger Menu Button - Mobile Only */}
      {isMobile && (
        <button
          onClick={toggleDrawer}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg lg:hidden hover:bg-gray-50 transition-colors duration-200"
          aria-label="Toggle navigation menu"
        >
          {isDrawerOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      )}

      {/* Navigation Drawer */}
      <nav
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg z-50 
          transform transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-slate-900">
            Menu
          </h2>
        </div>

        {/* Navigation Links */}
        <div className="py-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              
              return (
                <> 
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={handleMobileNavClick}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-50 ${
                        isActive
                          ? 'text-shadow-slate-800 bg-gradient-to-r from-slate-300 to-slate-300 border-r-2 border-slate-900'
                          : 'text-gray-700 hover:text-gray-900'
                      }`
                    }
                  >
                    <IconComponent className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                </li>

                </>
                
              );
            })}
            <li>
                <li key="logout">
                  <button
                   
                    onClick={handleLogout}
                    className="
                      flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-50" 
                  >
                  <LucideDoorOpen/>
                    <span>Logout</span>
                  </button>
                </li>
            </li>
          </ul>
        </div>

        {/* Footer - Optional */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            © 2025 Mushroom
          </p>
        </div>
      </nav>

      {/* Main Content Spacer - Desktop Only */}
      <div className={`${isDrawerOpen ? 'lg:ml-64' : ''} transition-all duration-300`}>
        {/* This div ensures content is pushed when drawer is open on desktop */}
      </div>
    </>
  );
};

export default NavBar;
