import React, { useState, useEffect } from "react";
import VideoCarousel from "./VideoCarousel";
import Callers from "./Callers";
import VideoData from "./Videos.json";
import UserInfo from "./RightSidebar/UserInfo";
import Suggestions from "./RightSidebar/Suggestions";
import CallerProfile from "./RightSidebar/CallerProfile";
import Chats from "../SidebarComponents/chatScreen/Chats";
import chat from "../Global/icons/live-chat.png";
import axios from 'axios';
import tick from '../Global/icons/tick.png';
import crown from '../Global/icons/crown.png';
import { IoMdMenu } from "react-icons/io";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Dashboard = ({ socket }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videos, setVideos] = useState([]);
  const [selectedCaller, setSelectedCaller] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatClosing, setIsChatClosing] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // State to toggle sidebar width
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('jwtToken');
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [user, id]);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/userById/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setUser(response.data.data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  useEffect(() => {
    setVideos(VideoData);
  }, []);

  const handleSlideChange = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  const toggleChat = () => {
    if (isChatOpen) {
      setIsChatClosing(true);
      setTimeout(() => {
        setIsChatOpen(false);
        setIsChatClosing(false);
      }, 500);
    } else {
      setIsChatOpen(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isChatOpen ? "hidden" : "auto";
  }, [isChatOpen]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const leftSidebarCollapsed = localStorage.getItem('collapsed') === 'true';

  return (
    <div className="w-full flex justify-between items-start md:justify-normal md:gap-x-2 md:block font-gotham font-light bg-main-gradient">
      {/* Main Content with adjusted width based on sidebar state */}
      <div
        className={`relative 
  ${isSidebarExpanded && leftSidebarCollapsed ? "w-[calc(100vw-520px)] md:w-full" :
            isSidebarExpanded ? "w-[calc(100vw-345px)] md:w-full " :
              leftSidebarCollapsed ? "w-[calc(100vw-345px)] md:w-full" :
                "w-[calc(100vw-167px)]"} 
 h-[100vh]  mx-auto my-2 md:my-0 transition-all`}
      >
        <div>
          <VideoCarousel videos={videos} onSlideChange={handleSlideChange} className="transition-all" />
        </div>
        <div>
          <Callers />
        </div>
      </div>
      {/* Right Sidebar */}
      <div
        className={`relative ${isSidebarExpanded ? "w-[250px]" : "w-[70px]"} bg-black h-[100vh] md:hidden p-2 transition-width duration-300 ease-in-out`}
      >
        <div className="font-gotham font-light flex justify-between items-center bg-main-gradient px-3 py-2 rounded-sm mb-2">
          {isSidebarExpanded && <div className="flex items-center gap-3">
            <img src={user.profileImage} className="h-10 w-10 rounded-full object-cover" />
            <div className="flex items-center gap-1">
              <h2 className="truncate text-lg font-light text-white">{user.username}</h2>
              {user.role === 'creator' && <img src={tick} className="h-4" />}
              {user.role === 'vip creator' && <img src={crown} className="h-4" />}
            </div>
          </div>}
          <IoMdMenu className="text-white text-2xl cursor-pointer" onClick={toggleSidebar} />
        </div>
        <div>
          <img
            src={chat}
            onClick={toggleChat}
            className={`absolute h-12 z-10 bottom-4 ${isSidebarExpanded ? "right-5" : "right-2"} cursor-pointer`}
          />
        </div>
        {selectedCaller ? (
          <CallerProfile caller={selectedCaller} />
        ) : (
          <>
            {videos.length > 0 && (
              <>
                {isSidebarExpanded && <UserInfo
                  username={videos[currentSlide].username}
                  profileImage={videos[currentSlide].profileImage}
                />}
                {isSidebarExpanded && <Suggestions />}
              </>
            )}
          </>
        )}
      </div>
      {/* Chat Component */}
      <div className={`fixed bottom-0 ${isSidebarExpanded ? "right-2" : "right-0"} md:hidden w-[728px] h-[calc(100vh-12vh)] rounded-t-lg transition-transform duration-500 ease-in-out ${isChatOpen
        ? isChatClosing
          ? "translate-y-full"
          : "translate-y-0"
        : "translate-y-full"
        } `}>
        <div>
          {(isChatOpen || isChatClosing) && (
            <div className="h-full float-right w-[305px] ">
              <Chats
                socket={socket}
                showChatScreen={false}
                shouldNavigate={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;