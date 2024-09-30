import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebarr from "../Global/Sidebar";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CoinIcon from "@mui/icons-material/MonetizationOn"; 
import Signout from "../SidebarComponents/Signout";
import { useSignOut } from "../../components/context/SignOutContext";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [showCoin, setShowCoin] = useState(true);
  const [pageAnimation, setPageAnimation] = useState("opacity-0 blur-sm");
  const [scale, setScale] = useState("scale-0");
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const {isSignOutPopupOpen} = useSignOut();

  const handleScreenClick = () => {
    setShowCoin(false);
  };

  useEffect(() => {
    if(!token){
      navigate('/');
    }
   
    setTimeout(() => {
      setPageAnimation("opacity-100 blur-0"); 
    }, 100);

  
    setTimeout(() => {
      
      setScale("scale-100"); 
    }, 700); 
  }, []);

  return (
    <div
      className={`fixed inset-0 p-2 md:p-0 bg-main-gradient flex md:block items-start w-full transition-opacity duration-700 ease-out ${pageAnimation}`}
    >
      {/* Sidebar and header */}
      <div className="md:flex w-1/2 justify-between my-2 hidden">
        <button
          className="hidden md:block text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <ArrowCircleLeftIcon /> : <ArrowCircleRightIcon />}
        </button>
        
        <h3 className="text-white italic font-semibold hidden md:block md:text-center">
          FUNCLUB
        </h3>
        
      </div>
      
      {/* Sidebar transition */}
      <div
        className={`z-30 md:flex md:gap-x-3 items-start md:absolute transition-transform duration-300 ${
          open ? "md:translate-x-0" : "md:-translate-x-full"
        }`}
      >
        <Sidebarr />
      </div>

      {isSignOutPopupOpen && <Signout/>}

      {/* Main content */}
      <div className="w-full">
        <Outlet />
      </div>

    
      {showCoin && (
        <div
          className="fixed inset-0 bg-[#292929] bg-opacity-50 z-50 flex items-center justify-center"
          onClick={handleScreenClick}
        >
          <div
            className={`text-center transform transition-transform duration-700 ease-out ${scale}`}
          >
            <CoinIcon
              className="text-yellow-400 drop-shadow-[5px_5px_10px_rgba(0,0,0,0.5)]"
              style={{
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                fontSize : "4rem"
              }}
            /> 
            <p
              className="text-white mt-4 text-lg text-center w-96  font-normal drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsa inventore eaque quod ipsum provident?
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;