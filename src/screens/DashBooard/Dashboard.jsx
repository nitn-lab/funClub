import React, { useState, Component, useEffect } from "react";
import DashboardMidSection from "./DashboardMidSection";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Sidebarr from "../Global/Sidebar";
import Grid from "@mui/material/Grid";
import Chats from "../../chatScreen/Chats";
import CallerData from "./RecentCallsData.json";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const Dashboard = () => {
  const [dataFromChlid, setDataFromChild] = useState("");
  const [callers, setCallers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCallers(CallerData);
  }, []);

  const handleData = (data) => {
    setDataFromChild(data);
  };
  return (
   <div >
   <button onClick={() => setOpen(true)} className={` ${open ? "hidden" : "block"}`}>
        
        <ArrowCircleRightIcon style={{ fontSize: "1.5rem"}} />
      </button>
     <div className="w-full flex items-start">
      

      <div
        className={`absolute z-20 items-start gap-3 flex transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebarr sendData={handleData} />
        <button onClick={() => setOpen(false)}>
          <ArrowCircleLeftIcon style={{ fontSize: "1.5rem" }} />
        </button>
      </div>

      {dataFromChlid === "" ? (
        <div className={` relative h-full ml-10 xs:ml-0 ${open ? "pt-7" : ""}`}>
          <div>
            <DashboardMidSection />
          </div>
          <div className="flex xs:w-screen justify-center gap-x-5 sm:gap-x-3  mt-6 items-center">
            {callers &&
              callers.length > 0 &&
              callers.map((caller) => {
                return (
                  <div className="caller-profile rounded-full  h-40 w-40 cursor-pointer relative overflow-hidden group">
                    <img
                      src={caller.profile_url}
                      className="h-full w-full object-cover rounded-full"
                    />
                    <div className="h-[100%] w-[100%] absolute top-0 -right-[100%] bg-[#1f3d4738] opacity-100 backdrop-blur-sm rounded-full group-hover:right-0 duration-700 flex items-center justify-center">
                      <h2 className="text-white text-lg font-base tracking-wide xs:text-base">
                        {caller.firstname}
                      </h2>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div style={{ width: "100%" }} className="relative">
          {dataFromChlid === "chats" && <Chats />}
        </div>
      )}
    </div>
   </div>
  );
};

export default Dashboard;
