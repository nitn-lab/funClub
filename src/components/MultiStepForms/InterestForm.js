import React, { useState } from "react";
import intrests from "./Interests";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const InterestForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);

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
    <div className="w-full  lg:px-4 py-10 text-white">
      <h1 className="text-5xl font-bold">Interest Details!</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Please Choose your Interests!!
      </p>
      <div className="intrests mt-8 flex flex-wrap">
        {intrests &&
          intrests.map((intrest, index) => {
            return (
              <div
                className=" w-fit shadow-xl cursor-pointer m-1.5"
                key={index}
                onClick={() => handleClick(index)}
                
              >
                <div className="flex border-2 border-white py-1 px-2 rounded-full items-center gap-2" >
                <CheckCircleIcon style={{
                  display: selectedItems.includes(index)
                    ? "block"
                    : "none",
                  
                }} />
                <h2 className=" font-semibold">
                  {intrest.type}
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
