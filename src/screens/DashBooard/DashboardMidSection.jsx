import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { PlayArrow } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const videos = [
  'https://videos.pexels.com/video-files/8135646/8135646-sd_360_640_25fps.mp4',
  'https://videos.pexels.com/video-files/6584519/6584519-sd_360_640_25fps.mp4',
  'https://videos.pexels.com/video-files/6003986/6003986-sd_360_640_30fps.mp4',
  'https://videos.pexels.com/video-files/6784449/6784449-sd_360_640_24fps.mp4',
  'https://videos.pexels.com/video-files/4881632/4881632-sd_960_506_25fps.mp4',
  'https://videos.pexels.com/video-files/7293850/7293850-sd_640_360_30fps.mp4'
];

const DashboardMidSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade:true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    appendDots: dots => (
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <ul style={{ margin: 0, padding: 0, display: 'flex', listStyleType: 'none', justifyContent: "center" }}>
          {dots.map((dot, index) => (
            <li key={index} style={{ margin: '0 1px', listStyleType: 'none' }}>
              <button
                style={{
                  backgroundColor: currentSlide === index ? 'white' : 'black',
                  borderRadius: '50%',
                  width: '10px',
                  height: '10px',
                  border: 'none',
                }}
                onClick={() => sliderRef.current.slickGoTo(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    ),
  };

  useEffect(() => {
    const startAutoplay = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setCurrentSlide((prevSlide) => {
          const nextSlide = (prevSlide + 1) % videos.length;
          sliderRef.current.slickGoTo(nextSlide);
          return nextSlide;
        });
      }, 5000); // Change slide every 5 seconds
    };

    startAutoplay();

    return () => clearInterval(intervalRef.current); // Cleanup interval on component unmount
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => {
      const newSlide = (prevSlide - 1 + videos.length) % videos.length;
      sliderRef.current.slickGoTo(newSlide);
      return newSlide;
    });
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => {
      const newSlide = (prevSlide + 1) % videos.length;
      sliderRef.current.slickGoTo(newSlide);
      return newSlide;
    });
  };

  return (
    <div className="video-carousel relative w-[900px] xs:w-screen   mx-auto overflow-hidden flex justify-center items-center mt-4">
      <Slider ref={sliderRef} {...settings} className="w-full h-full">
        {videos.map((videoSrc, index) => (
          <div key={index} className="relative w-full h-full">
            <video
              src={videoSrc}
              controls
              autoPlay
              muted
              loop
              className=" w-full  h-[500px] object-cover rounded-lg"
              
            >
             
            </video>
          </div>
        ))}
      </Slider>
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-tr from-violet-500 to-pink-500  text-white p-2 rounded-full shadow-md z-10 hover:scale-125"
        onClick={handlePrev}
      >
        <ArrowBackIosNewIcon />
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-tr from-violet-500 to-pink-500  text-white p-2 rounded-full shadow-md z-20 hover:scale-125"
        onClick={handleNext}
      >
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};

export default DashboardMidSection;