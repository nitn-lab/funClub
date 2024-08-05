import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebarr from "../Global/Sidebar";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-2 md:p-0 bg-main-gradient h-screen flex md:block items-start w-full overflow-hidden">
      <div className="md:flex justify-between my-2 hidden ">
        <button
          className="hidden md:block text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <ArrowCircleLeftIcon /> : <ArrowCircleRightIcon />}
        </button>
        <h3 className=" text-white italic font-semibold hidden md:block">
          FUNCLUB
        </h3>
        <div></div>
      </div>
      <div
        className={ ` z-30 md:flex md:gap-x-3 items-start md:absolute transition-transform duration-300 ${
          open ? "md:translate-x-0" : "md:-translate-x-full"
        }`}
      >
        <Sidebarr />
      </div>

      <div className="w-full ">
      <Outlet/>
      </div>
    </div>
  );
};

export default MainLayout;
