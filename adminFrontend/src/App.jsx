import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Layout from "./Layout";
import Home from "./pages/Home";
import Location from "./pages/Location";
import AddProduct from "./pages/AddProducts";
import Orders from "./pages/Orders";
import ViewProducts from "./pages/ViewProduct";
import AddShop from "./pages/AddShop";
import ViewShops from "./pages/ViewShops";
import Login from "./pages/Login";
import EditProduct from "./pages/EditProduct";
import EditShop from "./pages/EditShop";
import { Toaster } from "react-hot-toast";
import AddBanners from "./pages/AddBanners";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout setIsLoggedIn={setIsLoggedIn} />}>
        <Route path="" element={<Home />} />
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="viewProducts" element={<ViewProducts />} />
        <Route path="viewProducts/:productId" element={<EditProduct />} />
        <Route path="locations" element={<Location />} />
        <Route path="addShop" element={<AddShop />} />
        <Route path="viewShops" element={<ViewShops />} />
        <Route path="viewShops/:shopId" element={<EditShop />} />
        <Route path="addBanners" element={<AddBanners/>}/>
      </Route>
    )
  );
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "h-20",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#06274D",
            color: "#ffff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "black",
              secondary: "white",
            },
          },
        }}
      />
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
