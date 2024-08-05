import React, { useState, useEffect } from "react";
import intrests from "./Interests";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const InterestForm = ({ onInputChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    onInputChange({ selectedInterests: selectedItems });
  }, [selectedItems, onInputChange]);

  const handleClick = (index) => {
    setSelectedItems((previousSelectedItems) => {
      if (previousSelectedItems.includes(index)) {
        return previousSelectedItems.filter((item) => item !== index);
      } else {
        return [...previousSelectedItems, index];
      }
    });
  };

  return (
    <div className="w-full py-5 text-primary-light dark:text-primary-dark">
      <h1 className="text-4xl font-bold xs:text-3xl">Interest Details!</h1>
      <p className="font-medium text-lg mt-4 md:mt-2">
        Please Choose your Interests!!
      </p>
      <div className="scrollable-div h-72 md:h-64 mt-5 md:mt-3 flex flex-wrap overflow-auto">
        {intrests &&
          intrests.map((interest, index) => {
            return (
              <div
                className="w-fit cursor-pointer m-2 xs:m-1.5"
                key={index}
                onClick={() => handleClick(index)}
              >
                <div className="flex border-2 border-primary-light dark:border-primary-dark py-1 px-2 rounded-full items-center gap-2">
                  <CheckCircleIcon
                    style={{
                      display: selectedItems.includes(index)
                        ? "block"
                        : "none",
                    }}
                  />
                  <h2 className="font-semibold">
                    {interest.type}
                  </h2>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default InterestForm;