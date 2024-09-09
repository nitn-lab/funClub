import React, { useState, useEffect } from "react";
import NearbyPeople from "./NearbyComponent/NearbyPeople.json";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ForumIcon from "@mui/icons-material/Forum";
import DoneAllIcon from "@mui/icons-material/DoneAll";


const Suggestions = () => {
  const [nearby, setNearby] = useState([]);
  const [filter, setFilter] = useState("all"); // Filter state: "all", "online", or "offline"

  useEffect(() => {
    // Initialize the data with online/offline status
    const initializedData = NearbyPeople.map((item) => ({
      ...item,
      isFollowing: false, // Add isFollowing state to each caller
      isOnline: Math.random() > 0.5, // Randomly set online/offline status
    }));
    setNearby(initializedData);
  }, []);

  const toggleFollow = (id) => {
    setNearby((prevData) =>
      prevData.map((item) =>
        item._id === id
          ? { ...item, isFollowing: !item.isFollowing } // Toggle follow state
          : item
      )
    );
  };

  // Filter users based on the selected filter
  const filteredNearby = nearby.filter((item) => {
    if (filter === "all") return true;
    if (filter === "online") return item.isOnline;
    if (filter === "offline") return !item.isOnline;
    return true;
  });

  return (
    <>
      {/* Filter Toggle Buttons */}
      <div className="flex justify-end mx-6 xs:mx-1 gap-x-2 mb-3">
        <button
          className={`px-3 rounded-md ${
            filter === "all" ? "bg-violet-500 text-white" : "bg-white text-black"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 rounded-md ${
            filter === "online"
              ? "bg-lime-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setFilter("online")}
        >
          Online
        </button>
        <button
          className={`px-4 rounded-md ${
            filter === "offline"
              ? "bg-red-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setFilter("offline")}
        >
          Offline
        </button>
      </div>

      {/* Nearby Users Grid */}
      <div className="scrollable-div grid grid-cols-5 gap-4 mx-6 xs:mx-1 my-1 items-center h-[91vh] overflow-auto xs:mt-3">
        {filteredNearby.map((item, index) => (
           <div className="relative">
           <div
            key={item._id}
            className={`relative h-56 w-56 xs:h-44 xs:w-44 cursor-pointer overflow-hidden group rounded-full animate-bubble slide-up`} // Added slide-up class
            style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation
          >
          <div
              className="absolute top-4 left-14 transform -translate-y-1/2 bg-main-gradient text-white rounded-md px-1 cursor-pointer slide-up flex items-center"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={(e) => {
                e.stopPropagation(); 
                toggleFollow(item._id); 
              }}
             
            >
              {item.isFollowing ? (
                <DoneAllIcon style={{ fontSize: "1rem" }} />
              ) : (
                <GroupAddIcon style={{ fontSize: "1rem" }} />
              )}
              <span className="ml-1 text-sm">
                {item.isFollowing ? "Following" : "Follow"}
              </span>
            </div>
            <img
              src={item.profile_url}
              className="h-full w-full object-cover rounded-full"
              alt={item.firstname}
            />
            {/* Online/Offline Status Indicator */}
            <div
              className={`absolute bottom-10 right-10 w-4 h-4 rounded-full border-2 ${
                item.isOnline
                  ? "bg-lime-500 border-lime-500"
                  : "bg-red-500 border-red-500"
              }`}
            />
           
            <div className="h-[50%] w-[100%] absolute right-0 -bottom-[100%] bg-[#1f3d4738] opacity-100 backdrop-blur-sm group-hover:bottom-0 duration-700 flex flex-col items-center justify-center">
              <div className="flex items-center gap-x-3">
                <div className="bg-main-gradient text-white rounded-full px-2 py-1">
                  <ForumIcon style={{ fontSize: "1.25rem" }} />
                </div>
                <div className="bg-main-gradient text-white px-2 py-1 rounded-full my-3">
                  <PhoneIcon style={{ fontSize: "1.25rem" }} />
                </div>
                <div className="bg-main-gradient text-white px-2 py-1 rounded-full">
                  <VideocamIcon style={{ fontSize: "1.25rem" }} />
                </div>
              </div>
            </div>
          </div>
          

           </div>
        ))}
      </div>
    </>
  );
};

export default Suggestions;