import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "@/components/footer";
import Header from "@/components/header";

const Layout = () => {
  return (
    <>
      <main className="min-h-screen container">
        <Header/>
        <Outlet />
      </main>
      <div>
        <Footer/>
      </div>
    </>
  );
};

export default Layout;
