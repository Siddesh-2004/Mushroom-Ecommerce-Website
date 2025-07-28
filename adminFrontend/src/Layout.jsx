import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"

function Layout({setIsLoggedIn}) {
  return (
    <>
      <NavBar setIsLoggedIn={setIsLoggedIn} />
      <Outlet />
      <Footer/>

    </>
  );
}

export default Layout;
