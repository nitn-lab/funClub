 import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FaHeart, FaBookmark } from "react-icons/fa";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IoMdHome, IoMdCart } from "react-icons/io";
import LockIcon from '@mui/icons-material/Lock';
import NearbyPeople from "./NearbyComponent/NearbyPeople.json";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Feeds = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const token = localStorage.getItem("jwtToken");
  
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [creatingPost, setCreatingPost] = useState(false);

  useEffect(() => {
    setData(NearbyPeople);
  }, []);

  const toggleLike = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/v1/like/${id}`, {
        headers: { Authorization: `${token}` },
      });
      console.log(res)
      if (res.data.liked) {
        setLikedPosts([...likedPosts, id]);
      } else {
        setLikedPosts(likedPosts.filter((likeid) => likeid !== id));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  
  const toggleSave = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/v1/toggleSave/${id}`,{}, {
        headers: { Authorization: `${token}` },
      });
      if (res.data.saved) {
        setSavedPosts([...savedPosts, id]);
      } else {
        setSavedPosts(savedPosts.filter((postid) => postid !== id));
      }
    } catch (error) {
      console.error("Error toggling save:", error);
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

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!imageFile || !caption) {
      alert("Please provide both an image and a caption.");
      return;
    }

    // Convert the file to a URL
    const reader = new FileReader();
    reader.onloadend = async () => {
      const newPost = {
        image: reader.result, // Base64 URL
        content: caption,
      };

      try {
        // Send the post data to the API
        const res = await axios.post(`${BASE_URL}/api/v1/create`, newPost, {
          headers: { Authorization: `${token}` },
        });
        console.log(res);
        setData([...data, newPost]);
        // Reset form fields
        setImageFile(null);
        setCaption("");
        setCreatingPost(false);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    };
    reader.readAsDataURL(imageFile); // Convert to Base64 URL
  };

  return (
    <div className="font-gotham">
      {/* Tabs */}
      <div className="flex justify-around mx-auto w-[calc(100vw-30vw)] md:w-[100vw] rounded-md xs:rounded-none mb-3 mt-1 bg-black text-white py-3 xs:py-2">
        <button
          className={`${activeTab === "all" ? "border-b-2 border-white" : ""} text-lg px-4 xs:px-2 py-2 flex items-center gap-x-2 xs:gap-x-0`}
          onClick={() => setActiveTab("all")}
        >
          <IoMdHome className="xs:hidden" /> All
        </button>
        <button
          className={`${activeTab === "liked" ? "border-b-2 border-white" : ""} text-lg px-4 xs:px-2 py-2 gap-x-2 flex items-center xs:gap-x-0`}
          onClick={() => setActiveTab("liked")}
        >
          <FaHeart className="xs:hidden" /> Liked
        </button>
        <button
          className={`${activeTab === "saved" ? "border-b-2 border-white" : ""} text-lg px-4 xs:px-2 py-2 gap-x-2 flex items-center`}
          onClick={() => setActiveTab("saved")}
        >
          <FaBookmark className="xs:hidden" /> Saved
        </button>
        <button
          className={`${activeTab === "purchased" ? "border-b-2 border-white" : ""} text-lg px-4 xs:px-2 py-2 gap-x-2 flex items-center`}
          onClick={() => setActiveTab("purchased")}
        >
          <IoMdCart className="xs:hidden" /> Purchased
        </button>
      </div>

      {/* Create Post Button */}
      <div className="mb-4">
        <button
          className="bg-main-gradient text-white py-2 px-4 rounded-full"
          onClick={() => setCreatingPost(!creatingPost)}
        >
          {creatingPost ? "Cancel" : "Create Post"}
        </button>
      </div>

      {/* Create Post Form */}
      {creatingPost && (
        <form onSubmit={handleCreatePost} className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="bg-gray-800 text-white p-2 rounded mb-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded mb-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-main-gradient text-white py-2 px-4 rounded-full"
          >
            Post
          </button>
        </form>
      )}

      {/* Feeds Content */}
      <div
        className="scrollable-div text-white overflow-y-auto h-[calc(100vh-18vh)] md:h-[77vh] grid grid-cols-2 xs:grid-cols-1 gap-x-10 sm:gap-x-2 w-[calc(100vw-30vw)] md:w-[98vw] mx-auto"
      >
        {renderContent() &&
          renderContent().length > 0 &&
          renderContent().map((item) => {
            return (
              <div className="bg-black p-4 xs:px-2 rounded-md mb-3 h-fit" key={item._id}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-x-3 items-center">
                    <img
                      src="https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=600"
                      className="h-11 w-11 rounded-full border-2 border-[#9c8fd0] p-1"
                      alt={item.username}
                    />
                    <h3>{item.username}</h3>
                  </div>
                  <button className="border-2 border-white py-1 px-2.5 rounded-lg bg-main-gradient hover:scale-[1.03] mr-1">
                    Follow
                  </button>
                </div>

                <div className="relative w-full h-[22rem] mt-4 mb-2 rounded-md border-2 border-gray-200">
                  <img
                    src={item.image}
                    className={`w-full h-full rounded-md ${item.isPrivate ? "blur-md" : ""}`}
                    alt="User Content"
                  />
                  {item.isPrivate && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 rounded-md">
                      <LockIcon className="text-pink-500" style={{ fontSize: "3rem" }} />
                      <p className="text-xl font-semibold my-2">Private Post</p>
                      <button className="bg-main-gradient text-white py-2 px-4 rounded-full">
                        Buy for 25 Credits
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mx-2">
                  <div
                    className="cursor-pointer"
                    onClick={() => toggleLike(item._id)}
                  >
                    {likedPosts.includes(item._id) ? (
                      <FavoriteIcon style={{ fontSize: "1.8rem", color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon style={{ fontSize: "1.8rem" }} />
                    )}
                  </div>
                   <div
                      className="cursor-pointer"
                      onClick={() => toggleSave(item._id)}
                    >
                      {savedPosts.includes(item._id) ? (
                        <BookmarkIcon style={{ fontSize: "1.8rem", color: "gold" }} />
                      ) : (
                        <BookmarkBorderIcon style={{ fontSize: "1.8rem" }} />
                      )}
                    </div>
                </div>
                <p className="mx-2 mt-2">{item.content}</p>
              </div>
            );
          })}
        {renderContent() && renderContent().length === 0 && (
          <p className="text-center text-gray-500 mt-4">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Feeds;