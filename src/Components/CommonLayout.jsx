import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./CommonComponent/Sidebar";

const CommonLayout = () => {
  return (
    <div className="flex h-screen w-full commonlayout overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full p-5 bg-[rgba(255,255,255,0.77)] pt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default CommonLayout;
