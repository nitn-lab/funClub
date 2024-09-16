import React, { useState, useEffect } from "react";
import NearbyPeople from "./NearbyComponent/NearbyPeople.json";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ForumIcon from "@mui/icons-material/Forum";
import DoneAllIcon from "@mui/icons-material/DoneAll";


const Suggestions = () => {
  const [nearby, setNearby] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const initializedData = NearbyPeople.map((item) => ({
      ...item,
      isFollowing: false,
      isOnline: Math.random() > 0.5, // Randomly set online/offline status
    }));
    setNearby(initializedData);
  }, []);

  const toggleFollow = (id) => {
    setNearby((prevData) =>
      prevData.map((item) =>
        item._id === id
          ? { ...item, isFollowing: !item.isFollowing }
          : item
      )
    );
  };

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
          className={`px-3 rounded-md ${filter === "all" ? "bg-violet-500 text-white" : "bg-white text-black"
            }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 rounded-md ${filter === "online"
              ? "bg-lime-500 text-white"
              : "bg-white text-black"
            }`}
          onClick={() => setFilter("online")}
        >
          Online
        </button>
        <button
          className={`px-4 rounded-md ${filter === "offline"
              ? "bg-red-500 text-white"
              : "bg-white text-black"
            }`}
          onClick={() => setFilter("offline")}
        >
          Offline
        </button>
      </div>

      {/* Nearby Users Grid */}
      <div className="scrollable-div grid grid-cols-5 gap-4 mx-4 xs:mx-1 my-1 items-center h-[89vh] overflow-auto xs:mt-3">
        {filteredNearby.map((item, index) => (
          <div key={item._id} className="relative">
            <div
              className={`relative h-44 w-44 xs:h-28 xs:w-28 cursor-pointer overflow-hidden  animate-blob group`} 
              style={{ animationDelay: `${index * 0.4}s` }} 
            >
              
              <div
                className="absolute top-4 left-14 transform -translate-y-1/2 bg-main-gradient text-white rounded-md px-1 cursor-pointer follow-btn hidden group-hover:flex items-center duration-700"
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
              {/* User Image */}
              <img
                src={item.profile_url}
                className="h-full w-full object-cover rounded-full "
                alt={item.firstname}
              />
              {/* Online/Offline Status Indicator */}
              <div
                className={`absolute bottom-4 right-4 w-4 h-4 rounded-full border-2 ${item.isOnline
                    ? "bg-lime-500 border-lime-500"
                    : "bg-red-500 border-red-500"
                  }`}
              />
              {/* Audio/Video Icons */}
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