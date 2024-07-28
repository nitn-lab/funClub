import React, { useState, useEffect } from "react";
import LookingFor from "./LookingForData";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LookingForForm = ({ onInputChange, onSkip }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    onInputChange({ lookingFor: selectedItems });
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
    <div className="w-full py-5 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold xs:text-3xl">Looking For Details!</h1>
        <button
          className="w-max active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-3 rounded-xl bg-white text-lg font-bold text-black"
          onClick={onSkip}
        >
          Skip
        </button>
      </div>
      <p className="font-medium text-lg text-gray-200 mt-4 md:mt-2">
        Please Choose your Looking For!!
      </p>
      <div className="mt-5 md:mt-3 flex flex-wrap">
        {LookingFor &&
          LookingFor.map((item, index) => {
            return (
              <div
                className="w-fit cursor-pointer m-2 xs:m-1.5"
                key={index}
                onClick={() => handleClick(index)}
              >
                <div className="flex border-2 border-white py-1 px-2 rounded-full items-center gap-2">
                  <CheckCircleIcon
                    style={{
                      display: selectedItems.includes(index)
                        ? "block"
                        : "none",
                    }}
                  />
                  <h2 className="font-semibold">
                    {item.type}
                  </h2>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LookingForForm;