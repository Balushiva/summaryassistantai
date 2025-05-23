// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Todo Summary Assistant</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
