import React, { useState, useEffect } from "react";
import VideoCarousel from "./VideoCarousel";
import Callers from "./Callers";
import VideoData from "./Videos.json";
import UserInfo from "./RightSidebar/UserInfo";
import Suggestions from "./RightSidebar/Suggestions";
import CallerProfile from "./RightSidebar/CallerProfile";
import Chats from "../SidebarComponents/chatScreen/Chats";
import chat from "../Global/icons/live-chat.png";



const Dashboard = ({socket}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videos, setVideos] = useState([]);
  const [selectedCaller, setSelectedCaller] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatClosing, setIsChatClosing] = useState(false);

  // console.log("dash sok", socket);
  
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

  return (
    <div className="w-full flex justify-between items-start md:justify-normal md:gap-x-2 md:block font-gotham font-light bg-main-gradient">
      <div className="relative w-[calc(100vw-520px)] md:w-[100vw] h-[100vh] md:h-[87vh] mx-auto my-2 md:my-0 ">
        <div>
          <VideoCarousel videos={videos} onSlideChange={handleSlideChange} />
        </div>
        <div>
          <Callers />
        </div>
      </div>
      {/* Right Sidebar */}
      <div
        className={`relative w-[250px] bg-black h-[100vh] md:hidden p-2 transition-opacity duration-500 ease-in-out`}
      >
        {/* Icons */}
       <div>
      
         <img
          src={chat}
          onClick={toggleChat}
          className="absolute h-12 z-10 bottom-4 right-5 cursor-pointer"
        />
       </div>
        {selectedCaller ? (
          <CallerProfile caller={selectedCaller} />
        ) : (
          <>
            {videos.length > 0 && (
              <>
                <UserInfo
                  username={videos[currentSlide].username}
                  profileImage={videos[currentSlide].profileImage}
                />
                <Suggestions />
              </>
            )}
          </>
        )}
      </div>
      {/* Chat Component */}
      <div
        className={`fixed bottom-0 right-2 md:hidden w-[728px] h-[calc(100vh-12vh)] rounded-t-lg transition-transform duration-500 ease-in-out ${
          isChatOpen
            ? isChatClosing
              ? "translate-y-full"
              : "translate-y-0"
            : "translate-y-full"
        } `}
      >
        {(isChatOpen || isChatClosing) && (
          <div className="h-full ">
            <Chats
              socket={socket}
              showChatScreen={false}
              shouldNavigate={true}
            />
          </div>
        )}
      </div>
   
    </div>
  );
};

export default Dashboard;
