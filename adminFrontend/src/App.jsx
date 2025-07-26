import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Location from "./pages/Location";
import AddProduct from "./pages/AddProducts"
import Orders from "./pages/Orders";
import ViewProducts from "./pages/ViewProduct";
function App() {
const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<Home/>}/>
      <Route path="addProduct" element={<AddProduct/>}/>
      <Route path="orders" element={<Orders/>}/>
      <Route path="viewProducts" element={<ViewProducts/>}/>
      <Route path="locations" element={<Location/>}/>
    </Route>
  )
)
return (
    <>
       <RouterProvider router={router}/>
    </>
);
}

export default App;
