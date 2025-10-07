import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function Layout({setIsLoggedIn}) {
  return (
    <>
      <ScrollToTop/>
      <NavBar setIsLoggedIn={setIsLoggedIn} />
      <Outlet />
      <Footer/>

    </>
  );
}

export default Layout;
