 import React, { useState } from 'react';
import { MdStar } from 'react-icons/md'; 
import { FaUserAlt } from 'react-icons/fa'; 
import { CiStreamOn } from "react-icons/ci";
import { FaTowerBroadcast } from "react-icons/fa6";

const Live = () => {
  const [activeTab, setActiveTab] = useState("popular");

  const renderContent = () => {
    if (activeTab === "popular") {
      return (
        <div className="grid grid-cols-2 xs:grid-cols-1 gap-4 xs:gap-2 w-[calc(100vw-25vw)] mx-auto">
          {/* First User: Live Ended Overlay */}
          <div className="relative p-4 xs:p-2 rounded-md bg-black">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#292929] bg-opacity-70 text-white rounded-md">
              
              <p className="text-xl">Live Ended</p>
            </div>
            <img
              src="https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="User"
              className="w-full h-96 rounded-md border-2 border-gray-200"
            />
            <div className="flex items-center mb-3 mt-2">
              <img
                src="https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="User"
                className="h-11 w-11 rounded-full border-2 border-[#9c8fd0] p-1 mr-3"
              />
              <h3 className="text-white">User 1</h3>
            </div>
          </div>

          {/* Second User: Join Live Button */}
          <div className="relative p-4 xs:p-2 rounded-md bg-black">
            <div className="absolute inset-0 flex items-center justify-center  bg-[#292929] bg-opacity-70 text-white rounded-md">
              <button className="bg-main-gradient text-white px-4 py-2 rounded-full ">
               Join Live
              </button>
            </div>
            <img
              src="https://images.pexels.com/photos/12345678/pexels-photo-12345678.jpeg"
              alt="Stream"
              className="w-full h-96 rounded-md border-2 border-gray-200"
            />
            <div className="flex items-center mb-3 mt-2">
              <img
                src="https://images.pexels.com/photos/12345678/pexels-photo-12345678.jpeg"
                alt="User"
                className="h-11 w-11 rounded-full border-2 border-[#9c8fd0] p-1 mr-3"
              />
              <h3 className="text-white">User 2</h3>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-23vh)] text-white">
          <FaTowerBroadcast className="text-4xl mb-4 animate-ping" />
          <p className="text-xl">Nobody is live near you</p>
        </div>
      );
    }
  };

  return (
    <div className="p-4 xs:p-2 scrollable-div overflow-y-auto">
      {/* Tabs and Go Live Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-x-3 xs:gap-x-1">
          <button
            className={`px-4 xs:px-1 py-2 xs:py-1 rounded-md flex gap-x-2 xs:gap-x-0.5 items-center ${activeTab === "popular" ? "bg-white text-black" : "bg-black text-white"}`}
            onClick={() => setActiveTab("popular")}
          >
            <MdStar /> Popular Streams
          </button>
          <button
            className={`px-4 xs:px-1 py-2 xs:py-1 rounded-md flex gap-x-2 xs:gap-x-0.5 items-center ${activeTab === "popular" ? "bg-black text-white" : "bg-white text-black"}`}
            onClick={() => setActiveTab("nearby")}
          >
            <FaUserAlt /> Near You
          </button>
        </div>
        <button className="bg-black text-white px-4 xs:px-1 xs:py-1 py-2 rounded-md flex gap-x-2 xs:gap-x-0.5 items-center">
          <CiStreamOn className='text-xl xs:text-lg'/> Go Live
        </button>
      </div>

      {/* Content */}
      <div className="p-4 xs:p-2 rounded-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default Live;
