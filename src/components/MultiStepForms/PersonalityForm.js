import React, { useState, useEffect } from 'react';
import PersonalityTypes from "./PersonalityTypes";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dropdown from './Dropdown';

const PersonalityForm = ({ onInputChange }) => {
  const [formData, setFormData] = useState({
    personality: "",
    selectedTypes: []
  });
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    onInputChange(formData);
  }, [formData, onInputChange]);

  const handleClick = (index) => {
    setFormData((prevData) => {
      const updatedSelectedTypes = prevData.selectedTypes.includes(index)
        ? prevData.selectedTypes.filter((item) => item !== index)
        : [...prevData.selectedTypes, index];
      return {
        ...prevData,
        selectedTypes: updatedSelectedTypes
      };
    });
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const getBoxPosition = (index) => {
    const totalCols = 4;
    const rowIndex = Math.floor(index / totalCols);
    const colIndex = index % totalCols;
    const isLastRow = rowIndex >= Math.floor((PersonalityTypes.length - 1) / totalCols);
    
    let positionClass = "top-8";

    if (isLastRow) {
      positionClass = "bottom-8";
    }

    if (colIndex === 0 || colIndex === 1) {
      positionClass += " left-0";
    } else if (colIndex === 2 || colIndex === 3) {
      positionClass += " right-0";
    }

    return positionClass;
  };

  return (
    <div className="w-full py-5 text-primary-light dark:text-primary-dark">
      <h1 className="text-4xl font-bold xs:text-3xl">Personality Details!</h1>
      <p className="font-medium text-lg text-primary-light dark:text-primary-dark mt-4 md:mt-2">
        Please fill your Personality Type Details!
      </p>
      <div className="mt-5 md:mt-3 ">
        <div className="w-1/2">
          <Dropdown
            label="Personality"
            options={["Introvert", "Extrovert", "Ambivert"]}
            onSelect={(selectedOption) => handleDropdownChange('personality', selectedOption)}
          />
        </div>
        <div className="scrollable-div mt-5 w-1/2 md:w-full grid grid-cols-4 gap-3 md:gap-3 h-64 md:h-44 overflow-auto">
          {PersonalityTypes &&
            PersonalityTypes.map((item, index) => (
              <div
                className="relative w-fit cursor-pointer m-2 xs:m-1.5"
                key={index}
                onClick={() => handleClick(index)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className="flex border-2 border-primary-light dark:border-primary-dark py-1 px-2 rounded-full items-center gap-2">
                  <CheckCircleIcon
                    style={{
                      display: formData.selectedTypes.includes(index)
                        ? "block"
                        : "none"
                    }}
                  />
                  <h2 className="text-primary-light dark:text-primary-dark font-semibold">
                    {item.type}
                  </h2>
                </div>
                {hoverIndex === index && (
                  <div
                    className={`absolute ${getBoxPosition(index)} w-64 bg-gray-800 text-white p-2 rounded-md shadow-lg z-10`}
                  >
                    
                    <p className="text-base">{item.description}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalityForm;