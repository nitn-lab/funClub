import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FaHeart, FaBookmark } from "react-icons/fa";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IoMdHome, IoMdCart } from "react-icons/io";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Feeds = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const loggedInUser = localStorage.getItem("id");

  useEffect(() => {
    const getUsersAndPosts = async () => {
      try {
       
        const res = await axios.get(`${BASE_URL}/api/v1/users`, {
          headers: { authorization: ` ${token}` },
        });
        const users = res.data.data;

       
        const usersWithPosts = await Promise.all(
          users.map(async (user) => {
            const postsRes = await axios.get(
              `${BASE_URL}/api/v1/user/${user._id}/posts`,
              {
                headers: { authorization: `${token}` },
              }
            );

            return {
              ...user,
              posts: postsRes.data.data || [],
            };
          })
        );

        setData(usersWithPosts);
      } catch (err) {
        console.error("Error fetching users or posts:", err);
      }
    };

    getUsersAndPosts();
  }, [token]);

  const toggleLike = async (id) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/v1/like/${id}`,
        {},
        {
          headers: { authorization: ` ${token}` },
        }
      );

      if (res.data.data.likes.includes(loggedInUser)) {
        setLikedPosts((prev) => [...prev, id]);
      } else {
        setLikedPosts((prev) => prev.filter((likeid) => likeid !== id));
      }

      
      const updatedPosts = data.map((user) => ({
        ...user,
        posts: user.posts.map((post) => {
          if (post._id === id) {
            return { ...post, likes: res.data.data.likes };
          }
          return post;
        }),
      }));

      setData(updatedPosts);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const toggleSave = async (id) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/v1/save/${id}`,
        {},
        {
          headers: { authorization: `${token}` },
        }
      );
      console.log(res.data.data)
      const savedByUsers = res.data.data.saves;

      if (savedByUsers.includes(loggedInUser)) {
        setSavedPosts((prev) => [...prev, id]);
      } else {
        setSavedPosts((prev) => prev.filter((saveid) => saveid !== id));
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "liked":
        return ((data
          .flatMap((user) => user.posts.map(post => post.createdBy._id === loggedInUser && post.likes.length > 0 ? post : ""))
        ));
      case "saved":
        return (data
          .flatMap((user) => user.posts)
          .map((post) => post.saves.includes(loggedInUser) ? post : ""));
      case "purchased":
        return data
          .flatMap((user) => user.posts)
          .filter((post) => post.purchased);
      default:
        return data.flatMap((user) => user.posts);
    }
  };

  return (
    <div className="font-gotham">
      {/* Tabs */}
      <div className="flex justify-around mx-auto w-[calc(100vw-30vw)] md:w-[100vw] rounded-md xs:rounded-none mb-3 mt-1 bg-black text-white py-3 xs:py-2">
        <button
          className={`${activeTab === "all" ? "border-b-2 border-white" : ""
            } text-lg px-4 xs:px-2 py-2 flex items-center gap-x-2 xs:gap-x-0`}
          onClick={() => setActiveTab("all")}
        >
          <IoMdHome className="xs:hidden" /> All
        </button>
        <button
          className={`${activeTab === "liked" ? "border-b-2 border-white" : ""
            } text-lg px-4 xs:px-2 py-2 gap-x-2 flex items-center xs:gap-x-0`}
          onClick={() => setActiveTab("liked")}
        >
          <FaHeart className="xs:hidden" /> Liked
        </button>
        <button
          className={`${activeTab === "saved" ? "border-b-2 border-white" : ""
            } text-lg px-4 xs:px-2 py-2 gap-x-2 flex items-center`}
          onClick={() => setActiveTab("saved")}
        >
          <FaBookmark className="xs:hidden" /> Saved
        </button>
        <button
          className={`${activeTab === "purchased" ? "border-b-2 border-white" : ""
            } text-lg px-4 xs:px-2 py-2 gap-x-2 flex items-center`}
          onClick={() => setActiveTab("purchased")}
        >
          <IoMdCart className="xs:hidden" /> Purchased
        </button>
      </div>

      {/* Feeds Content */}
      <div className="scrollable-div text-white overflow-y-auto h-[calc(100vh-18vh)] md:h-[77vh] grid grid-cols-2 xs:grid-cols-1 gap-x-10 sm:gap-x-2 w-[calc(100vw-30vw)] md:w-[98vw] mx-auto">
        {data.map(user => user.posts && user.posts.length > 0 && 
          renderContent().map((post) => (
            post && <div className="bg-black p-4 xs:px-2 rounded-md mb-3 h-fit" key={post._id}>
              <div className="flex justify-between items-center">
                <div className="flex gap-x-3 items-center">
                  <img
                    src="https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="h-11 w-11 rounded-full border-2 border-[#9c8fd0] p-1"
                    alt="User avatar"
                  />
                  <h3>{user.username}</h3>
                </div>
                <button className="border-2 border-white py-1 px-2.5 rounded-lg bg-main-gradient hover:scale-[1.03] mr-1">
                  Follow
                </button>
              </div>

              <div className="relative w-full h-[22rem] mt-4 mb-2 rounded-md border-2 border-gray-200">
                <img
                  src={post.image}
                  className={`w-full h-full rounded-md ${post.isPrivate ? "blur-md" : ""}`}
                  alt="Post Content"
                />

                {post.isPrivate && (
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
                  onClick={() => toggleLike(post._id)}
                >
                  {post.likes.includes(loggedInUser) ? (
                    <FavoriteIcon style={{ fontSize: "1.8rem", color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon style={{ fontSize: "1.8rem" }} />
                  )}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => toggleSave(post._id)}
                >
                  {post.saves.includes(loggedInUser) ? (
                    <BookmarkIcon style={{ fontSize: "1.8rem", color: "gold" }} />
                  ) : (
                    <BookmarkBorderIcon style={{ fontSize: "1.8rem" }} />
                  )}
                </div>
              </div>

              <div className="mt-2 mx-2">
                <p className="text-sm">
                  {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
                </p>
                <div className="flex items-center gap-x-2">
                <p>{user.username}</p>
                <p className="text-sm">{post.content}</p>

                </div>
              </div>
            </div>
          ))
       )}
      </div>
    </div>
  );
};

export default Feeds;