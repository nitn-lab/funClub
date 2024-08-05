import React, { useState, useEffect } from 'react';
import CallerData from "./RecentCallsData.json";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PhoneIcon from "@mui/icons-material/Phone";
import ForumIcon from '@mui/icons-material/Forum';
import VideocamIcon from '@mui/icons-material/Videocam';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
  
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowSize;
};
  
const Callers = ({ onCallerSelect }) => {
    const [callers, setCallers] = useState([]);
  
    const size = useWindowSize();
  
    useEffect(() => {
      setCallers(CallerData);
    }, []);
  
    const displayedCallers = size.width < 1200 ? callers.slice(-3) : callers.slice(-4);
  
    const handleCallerClick = (caller) => {
        onCallerSelect(caller);
    };
  
    return (
        <div className="caller-container grid grid-cols-4 lg:grid-cols-3 mt-2 gap-x-1 items-center">
            {displayedCallers.map((caller) => (
                <div
                  key={caller.id}
                  className="caller-profile rounded-md h-44 cursor-pointer relative overflow-hidden group"
                  onClick={() => handleCallerClick(caller)}
                >
                  <img
                    src={caller.profile_url}
                    className="h-full w-full object-cover rounded-md"
                  />
                  <div className="absolute top-2 left-2 flex items-center bg-main-gradient text-white rounded-md px-2 py-1">
                    <GroupAddIcon style={{ fontSize: "1rem" }} />
                    <span className="ml-1 text-sm">Follow</span>
                  </div>
                 
                  <div className="h-[100%] w-[100%] absolute top-0 -right-[100%] bg-[#1f3d4738] opacity-100 backdrop-blur-sm rounded-md group-hover:right-0 duration-700 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className=" bg-main-gradient text-white rounded-full px-2 py-1">
                        <ForumIcon style={{ fontSize: "1.25rem" }}/>
                      </div>
                      <div className=" bg-main-gradient text-white px-2 py-1 rounded-full my-3">
                        <PhoneIcon style={{ fontSize: "1.25rem" }} />
                      </div>
                      <div className="bg-main-gradient text-white px-2 py-1 rounded-full">
                        <VideocamIcon style={{ fontSize: "1.25rem" }} />
                      </div>
                    </div>
                  </div>
                </div>
            ))}
        </div>
    );
};

export default Callers;