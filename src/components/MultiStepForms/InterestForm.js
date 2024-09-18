import React, { useState, useEffect, useRef } from "react";
import interests from "./Interests";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const InterestForm = ({ onInputChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    onInputChange({ interest_details: selectedItems });
  }, [selectedItems]);

  const handleClick = (interest) => {
    setSelectedItems((previousSelectedItems) => {
      if (previousSelectedItems.includes(interest)) {
        return previousSelectedItems.filter((item) => item !== interest);
      } else {
        return [...previousSelectedItems, interest];
      }
    });
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
      setIsAtBottom(true);
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setIsAtBottom(false);
    }
  };

  return (
    <div className="w-full py-5 text-primary-light dark:text-primary-dark relative">
      <h1 className="text-4xl font-bold xs:text-3xl">Interest Details!</h1>
      <p className="font-medium text-lg mt-2">
        Please Choose your Interests!!
      </p>
      <div
        className="scrollable-div h-64 mt-1 flex flex-wrap overflow-auto"
        ref={scrollContainerRef} 
      >
        {interests &&
          interests.map((interest, index) => (
            <div
              className="w-fit cursor-pointer m-2 xs:m-1.5"
              key={index}
              onClick={() => handleClick(interest)}
            >
              <div className="flex border-2 border-primary-light dark:border-primary-dark py-1 px-2 rounded-full items-center gap-2">
                <CheckCircleIcon
                  style={{
                    display: selectedItems.includes(interest)
                      ? "block"
                      : "none",
                  }}
                />
                <h2 className="font-semibold">
                  {interest.type}
                </h2>
              </div>
            </div>
          ))}
      </div>

      {/* Arrow for scrolling to bottom */}
      {!isAtBottom && (
        <div
          className="absolute -bottom-8 bg-primary-light dark:bg-primary-dark right-0 p-1 cursor-pointer animate-bounce rounded-full"
          onClick={scrollToBottom}
        >
          <ArrowDownwardIcon className="text-primary-dark dark:text-primary-light" fontSize="medium" />
        </div>
      )}

      {/* Arrow for scrolling to top */}
      {isAtBottom && (
        <div
          className="absolute -bottom-8 bg-primary-light dark:bg-primary-dark animate-bounce rounded-full  right-0  cursor-pointer p-1"
          onClick={scrollToTop}
        >
          <ArrowUpwardIcon className="text-primary-dark dark:text-primary-light" fontSize="medium" />
        </div>
      )}
    </div>
  );
};

export default InterestForm;