import React, { useState, useEffect } from "react";
import VideoCarousel from "./VideoCarousel";
import Callers from "./Callers";
import VideoData from "./Videos.json";
import UserInfo from "./userInfo";
import Suggestions from "./Suggestions";
import CallerProfile from "./CallerProfile";

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(VideoData);
  }, []);

  const handleSlideChange = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  const [selectedCaller, setSelectedCaller] = useState(null);

  const handleCallerSelect = (caller) => {
    setSelectedCaller(caller);
  };
  return (
    <div>
      <div className="w-full flex justify-between  items-start md:justify-normal md:gap-x-2 md:block">
        <div
          className="relative w-[calc(100vw-540px)]  md:w-[100vw]  h-[96vh] md:h-[87vh]  mx-auto
        "
        >
          <div>
            <VideoCarousel videos={videos} onSlideChange={handleSlideChange} />
          </div>
          <div>
            <Callers onCallerSelect={handleCallerSelect} />
          </div>
        </div>

        <div className="right-sidebar  w-[250px] h-[96vh] bg-black rounded-lg md:hidden p-2">
        {selectedCaller ? (
          <CallerProfile caller={selectedCaller} />
        ) : (
          <>
            {videos.length > 0 && (
              <UserInfo
                username={videos[currentSlide].username}
                profileImage={videos[currentSlide].profileImage}
              />
            )}
            <Suggestions />
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
