import React, { useState, useEffect } from "react";
import LookingFor from "./LookingForData";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LookingForForm = ({ onInputChange, onSkip }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
   
    onInputChange({ looking_for: selectedItems });
  }, [selectedItems]);

  const handleClick = (dataType) => {
    setSelectedItems((previousSelectedItems) => {
      if (previousSelectedItems.includes(dataType)) {
        return previousSelectedItems.filter((item) => item !== dataType);
      } else {
        return [...previousSelectedItems, dataType];
      }
    });
  };

  return (
    <div className="w-full py-5 text-primary-light dark:text-primary-dark">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold xs:text-3xl">Looking For Details!</h1>
        <button
          className="w-max active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 px-3 rounded-xl bg-primary-light dark:bg-primary-dark text-lg font-bold text-primary-dark dark:text-primary-light"
          onClick={onSkip}
        >
          Skip
        </button>
      </div>
      <p className="font-medium text-lg mt-4 md:mt-2">
        Please Choose your Looking For!!
      </p>
      <div className="mt-5 md:mt-3 grid grid-cols-4">
        {LookingFor &&
          LookingFor.map((item, index) => {
            return (
              <div
                className="w-fit cursor-pointer m-2 xs:m-1.5"
                key={index}
                onClick={() => handleClick(item.type)}
              >
                <div className="flex border-2 border-primary-light dark:border-primary-dark py-1 px-2 rounded-full items-center gap-2">
                  <CheckCircleIcon
                    style={{
                      display: selectedItems.includes(item.type) 
                        ? "block"
                        : "none",
                    }}
                  />
                  <h2 className="font-semibold">
                    {item.type === "Care" ? (
                      <div className="flex items-center gap-x-1">
                        <img src={item.imageUrl} className="h-5 w-5" alt="care icon"/>
                        <span>{item.type}</span>
                      </div>
                    ) : (
                      <h2>{item.type}</h2>
                    )}
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