import React, { useState, useEffect } from "react";
import VideoCarousel from "./VideoCarousel";
import Callers from "./Callers";
import VideoData from "./Videos.json";
import UserInfo from './RightSidebar/UserInfo';
import Suggestions from "./RightSidebar/Suggestions";
import CallerProfile from "./RightSidebar/CallerProfile";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chats from "../SidebarComponents/chatScreen/Chats"; 

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videos, setVideos] = useState([]);
  const [selectedCaller, setSelectedCaller] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatClosing, setIsChatClosing] = useState(false); // State to handle chat closing transition

  useEffect(() => {
    setVideos(VideoData);
  }, []);

  const handleSlideChange = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  const handleCallerSelect = (caller) => {
    setSelectedCaller(caller);
  };

  const handleCloseCallerProfile = () => {
    setSelectedCaller(null);
  };

  const toggleChat = () => {
    if (isChatOpen) {
      setIsChatClosing(true);
      setTimeout(() => {
        setIsChatOpen(false);
        setIsChatClosing(false);
      }, 500); // Match this duration with the transition duration
    } else {
      setIsChatOpen(true);
    }
  };

  useEffect(() => {
    // Toggle body scroll when chat is open
    document.body.style.overflow = isChatOpen ? 'hidden' : 'auto';
  }, [isChatOpen]);

  return (
    <div className="w-full flex justify-between items-start md:justify-normal md:gap-x-2 md:block">
      <div className="relative w-[calc(100vw-540px)] md:w-[100vw] h-[96vh] md:h-[87vh] mx-auto">
        <div>
          <VideoCarousel videos={videos} onSlideChange={handleSlideChange} />
        </div>
        <div>
          <Callers onCallerSelect={handleCallerSelect} />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className={`relative w-[250px] h-[96vh] bg-black rounded-lg md:hidden p-2 transition-opacity duration-500 ease-in-out`}>
        {/* Chat Icon */}
        {isChatOpen ? (
          <ExpandMoreIcon onClick={toggleChat} className="absolute z-10 text-black bottom-4 right-5 cursor-pointer p-1 bg-white rounded-full" style={{fontSize : "2rem"}}/>
        ) :  (
          <ExpandLessIcon onClick={toggleChat} className="absolute z-20 text-black bottom-4 right-5 cursor-pointer p-1 bg-white rounded-full" style={{fontSize : "2rem"}}/>
        )}

        {selectedCaller ? (
          <CallerProfile caller={selectedCaller} onClose={handleCloseCallerProfile} />
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
      <div className={`fixed bottom-0 right-4 md:hidden w-[710px] h-[calc(100vh-15vh)] rounded-t-lg transition-transform duration-500 ease-in-out ${isChatOpen ? (isChatClosing ? 'translate-y-full' : 'translate-y-0') : 'translate-y-full'} `}>
        {(isChatOpen || isChatClosing) && (
          <div className="h-full ">
            <Chats showChatScreen={false} shouldNavigate={true}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;