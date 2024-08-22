import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockIcon from '@mui/icons-material/Lock';

import NearbyPeople from "./NearbyComponent/NearbyPeople.json";

const Feeds = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    setData(NearbyPeople);
  }, []);

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const toggleSave = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter((id) => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "liked":
        return data.filter((item) => likedPosts.includes(item._id));
      case "saved":
        return data.filter((item) => savedPosts.includes(item._id));
      case "purchased":
        return data.filter((item) => item.purchased);
      default:
        return data;
    }
  };


  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-around mx-auto w-[calc(100vw-30vw)] md:w-[100vw] rounded-md mb-3 mt-1 bg-black text-white py-3">
        <button
          className={`${
            activeTab === "all" ? "border-b-2 border-white" : ""
          } text-lg px-4 py-2  flex items-center gap-x-2`}
          onClick={() => setActiveTab("all")}
        >
          <HomeIcon /> All
        </button>
        <button
          className={`${
            activeTab === "liked" ? "border-b-2 border-white" : ""
          } text-lg px-4 py-2 gap-x-2 flex items-center`}
          onClick={() => setActiveTab("liked")}
        >
          <FavoriteIcon /> Liked
        </button>
        <button
          className={`${
            activeTab === "saved" ? "border-b-2 border-white" : ""
          } text-lg px-4 py-2 gap-x-2 flex items-center`}
          onClick={() => setActiveTab("saved")}
        >
          <BookmarkIcon /> Saved
        </button>
        <button
          className={`${
            activeTab === "purchased" ? "border-b-2 border-white" : ""
          } text-lg px-4 py-2 gap-x-2 flex items-center`}
          onClick={() => setActiveTab("purchased")}
        >
          <ShoppingCartIcon /> Purchased
        </button>
      </div>

      {/* Feeds Content */}
      <div
        className="scrollable-div text-white overflow-y-auto mx-auto h-[calc(100vh-18vh)] md:h-[77vh] grid grid-cols-2 gap-x-10 w-[calc(100vw-30vw)] md:w-[98vw]"
      >
        {renderContent() &&
          renderContent().length > 0 &&
          renderContent().map((item) => {
            return (
              <div className="bg-black p-4 xs:px-2 rounded-md mb-3" key={item._id}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-x-3 items-center">
                    <img
                      src="https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=600"
                      className="h-11 w-11 rounded-full border-2 border-[#9c8fd0] p-1"
                      alt={item.username}
                    />
                    <h3>{item.username}</h3>
                  </div>
                  <button className="border-2 border-white py-1 px-2.5 rounded-lg bg-main-gradient hover:scale-[1.03] mr-1 ">
                    Follow
                  </button>
                </div>

                <div className="relative w-full h-[22rem] mt-4 mb-2 rounded-md border-2 border-gray-200">
                  <img
                    src={item.profile_url}
                    className={`w-full h-full rounded-md ${
                      item.isPrivate ? "blur-md" : ""
                    }`}
                    alt="User Content"
                  />
                  {item.isPrivate && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 rounded-md">
                     <LockIcon className="text-pink-500" style={{fontSize: "3rem"}}/>
                      <p className=" text-xl font-semibold my-2">
                        Private Post
                      </p>
                      <button className="bg-main-gradient text-white py-2 px-4 rounded-full">
                        Buy for 25 Credits
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mx-2">
                  <div 
                    className=" cursor-pointer"
                    onClick={() => toggleLike(item._id)}
                  >
                    {likedPosts.includes(item._id) ? (
                      <FavoriteIcon style={{ fontSize: "1.8rem", color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon style={{ fontSize: "1.8rem" }} />
                    )}
                  </div>
                  <div 
                    className=" cursor-pointer"
                    onClick={() => toggleSave(item._id)}
                  >
                    {savedPosts.includes(item._id) ? (
                      <BookmarkIcon style={{ fontSize: "1.8rem", color: "white" }} />
                    ) : (
                      <BookmarkBorderIcon style={{ fontSize: "1.8rem" }} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Feeds;