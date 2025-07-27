import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Location from "./pages/Location";
import AddProduct from "./pages/AddProducts"
import Orders from "./pages/Orders";
import ViewProducts from "./pages/viewproduct";
import AddShop from "./pages/AddShop";
import ViewShops from "./pages/ViewShops";
import Login from "./pages/login";
import { useState } from "react";
function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<Home/>}/>
      <Route path="addProduct" element={<AddProduct/>}/>
      <Route path="orders" element={<Orders/>}/>
      <Route path="viewProducts" element={<ViewProducts/>}/>
      <Route path="locations" element={<Location/>}/>
      <Route path="addShop" element={<AddShop/>}/>
      <Route path="viewShops" element={<ViewShops/>}/>
    </Route>
  )
)
if(!isLoggedIn)
  return(
    <Login/>
  )
return (
    <>
       <RouterProvider router={router}/>
    </>
);
}

export default App;
