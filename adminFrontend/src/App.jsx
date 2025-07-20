import './App.css';
import Navbar from './components/navbar';
import AdminProductAdd from './pages/addproduct';
import MushroomAdminLogin from './pages/login';
import OrdersPage from './pages/orderspage';
import ViewProductsPage from './pages/viewproduct';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <AdminProductAdd />
        </>
      ),
    },
    {
      path: "/addproduct",
      element: (
        <>
          <Navbar />
          <AdminProductAdd />
        </>
      ),
    },
    {
      path: "/orders",
      element: (
        <>
          <Navbar />
          <OrdersPage />
        </>
      ),
    },
    {
      path: "/viewproducts",
      element: (
        <>
          <Navbar />
          <ViewProductsPage />
        </>
      ),
    },
  ]);

  return (
    
    <RouterProvider router={router} />
  );
}

export default App;

