import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AdminLogin from './pages/login'
import './App.css';
import AdminProductAdd from './pages/addproduct';
import AdminOrdersPage from './pages/orderspage';
import Navbar from './components/navbar';
import ViewOrdersPage from './pages/viewproduct';


function App() {


  return (
    <div>
      <ViewOrdersPage/>
    </div>
  
  )
}

export default App
