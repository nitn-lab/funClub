import React, { useState, useEffect } from 'react';
import NearbyPeople from './NearbyPeople.json';
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneIcon from "@mui/icons-material/Phone";

const Nearby = () => {

    const [nearby, setNearby] = useState([]);

  useEffect(() => {
    setNearby(NearbyPeople);
  }, []);

     return(
        <>
            <div className="scrollable-div grid grid-cols-4 sm:grid-cols-3 mx-6 xs:mx-2 my-1 gap-7 xs:gap-3 items-center h-[96vh] md:h-[87vh] overflow-auto xs:mt-5">
              {nearby.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-md h-52 xs:h-44 cursor-pointer relative overflow-hidden group"
                >
                  <img
                    src={item.profile_url}
                    className="h-full w-full object-cover rounded-md"
                  />
                  <div className="absolute top-2 left-2 flex items-center bg-main-gradient text-white rounded-md px-2 py-1">
                    <VideocamIcon style={{ fontSize: "1rem" }} />
                    <span className="ml-1 text-sm">Live</span>
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center bg-main-gradient text-white rounded-full p-2">
                    <PhoneIcon style={{ fontSize: "1rem" }} />
                  </div>
                  <div className="h-[100%] w-[100%] absolute top-0 -right-[100%] bg-[#1f3d4738] opacity-100 backdrop-blur-sm rounded-md group-hover:right-0 duration-700 flex flex-col items-center justify-center">
                    <h2 className="text-white text-lg font-base tracking-wide xs:text-base">
                      {item.firstname}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
        </>
    );
};

export default Nearby;