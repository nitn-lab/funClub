import React, { useState, useEffect } from "react";
import NearbyPeople from "./NearbyPeople.json";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneIcon from "@mui/icons-material/Phone";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ForumIcon from "@mui/icons-material/Forum";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const Nearby = () => {
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    const initializedData = NearbyPeople.map((item) => ({
      ...item,
      isFollowing: false, // Add isFollowing state to each caller
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

  return (
    <>
      <div className="scrollable-div grid grid-cols-4 sm:grid-cols-3 mx-6 xs:mx-1 my-1 gap-5 xs:gap-1.5 items-center h-[96vh] md:h-[87vh] overflow-auto xs:mt-3">
        {nearby.map((item, index) => (
          <div
            key={item.id}
            className="rounded-md h-52 xs:h-44 cursor-pointer relative overflow-hidden group"
          >
            <img
              src={item.profile_url}
              className="h-full w-full object-cover rounded-md"
            />
            <div
              className="absolute top-2 xs:top-1 left-2 xs:left-1 flex items-center bg-main-gradient text-white rounded-md px-2 py-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the main caller click
                toggleFollow(item._id); // Toggle follow status
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
            <div className="absolute bottom-2 right-2 flex items-center bg-lime-500 text-white p-2.5 rounded-full  ">

            </div>

            <div className="h-[50%] w-[100%] absolute right-0 -bottom-[100%] bg-[#1f3d4738] opacity-100 backdrop-blur-sm rounded-md group-hover:bottom-0 duration-700 flex flex-col items-center justify-center">
              <div className="flex items-center gap-x-3">
                <div className=" bg-main-gradient text-white rounded-full px-2 py-1">
                  <ForumIcon style={{ fontSize: "1.25rem" }} />
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
    </>
  );
};

export default Nearby;
