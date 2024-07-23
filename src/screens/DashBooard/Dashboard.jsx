import React, { Component, useEffect } from "react";

import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Sidebarr from "../Global/Sidebar";
import Grid from "@mui/material/Grid";

const Dashboard = () => {
  return (
    <div
      class="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <div class="w1" style={{ width: "20%", backgroundColor: "transparent" }}>
        <Sidebarr />
      </div>
      <div
        class="w2"
        style={{ backgroundColor: "transparent", width: "60%", padding: 10 }}
      >
        <div style={{ backgroundColor: "pink", height: "50vh", borderRadius: 10 }}>
          gbgbfbgfbb
        </div>
        <div
          style={{
            display: "flex",
            backgroundColor: "transparent",
            height: "50vh",
            justifyContent: "space-between",
            padding: 10,
            alignItems: 'center'
          }}
        >
          <div style={{ backgroundColor: "blue", width: 180, height: 200 , borderRadius: 10}}></div>
          <div
            style={{ backgroundColor: "green", width: 180, height: 200 , borderRadius: 10 }}
          ></div>
          <div style={{ backgroundColor: "blue", width: 180, height: 200 , borderRadius: 10 }}></div>
          <div style={{ backgroundColor: "blue", width: 180, height: 200 , borderRadius: 10 }}></div>
        </div>
      </div>
      <div class="w3" style={{ width: "20%", backgroundColor: "transparent" }}>
        <div style={{ backgroundColor: "white", height: '100vh', width: "18.3vw", float: 'right'}}>gbgbfbgfbb</div>
      </div>
    </div>
  );
};

export default Dashboard;
