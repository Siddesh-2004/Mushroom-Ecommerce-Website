import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AdminLogin from './pages/login'
import './App.css';
import AdminProductAdd from './pages/addproduct';
import AdminOrdersPage from './pages/orderspage';
import Navbar from './components/navbar';
import ViewOrdersPage from './pages/viewproduct';
import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {

  const router=createBrowserRouter ([{
    path: "/",
    element:<><Navbar/><AdminProductAdd /></>
  }, {
    path: "/addproduct",
    element: <><Navbar/><AdminProductAdd /></>
  }, {
    path: "/orders",
    element: <><Navbar/><AdminOrdersPage /></>
  }, {
    path: "/vieworders",
    element: <><Navbar/><ViewOrdersPage /></>
  }]
)

  return (
    <div>
      
      <RouterProvider router={router} />
    </div>
  
  )
}

export default App
