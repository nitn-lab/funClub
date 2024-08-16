import React, { useState, useEffect } from 'react';
import PersonalityTypes from "./PersonalityTypes";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dropdown from './Dropdown';

const PersonalityForm = ({ onInputChange }) => {
  // Find the index of the 'INTJ' type in the PersonalityTypes array
  const defaultTypeIndex = PersonalityTypes.findIndex(type => type.type === "INTJ");

  const [formData, setFormData] = useState({
    personality: "INTJ",  // Set 'INTJ' as the default personality type
    selectedType: defaultTypeIndex // Set 'INTJ' as the selected type by default
  });
  const [hoverIndex, setHoverIndex] = useState(null); // For hover effect

  useEffect(() => {
    onInputChange(formData);
  }, [formData, onInputChange]);

  const handleClick = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedType: index  // Update the selected type
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const getHoverBoxPosition = (index) => {
    const totalCols = 4;
    const rowIndex = Math.floor(index / totalCols);
    const totalRows = Math.ceil(PersonalityTypes.length / totalCols);
    
    // Determine if the item is in one of the last two rows
    const isInLastTwoRows = rowIndex >= totalRows - 2;

    if (isInLastTwoRows) {
      return "bottom-full mb-0"; // Position the box above the item
    } else {
      return "top-full mt-0"; // Position the box below the item
    }
  };

  const getHorizontalPosition = (index) => {
    const colIndex = index % 4;
    if (colIndex < 2) {
      return "left-0 ml-0";
    } else {
      return "right-0 mr-0";
    }
  };

  return (
    <div className="w-full py-5 text-primary-light dark:text-primary-dark relative">
      <h1 className="text-4xl font-bold xs:text-3xl">Personality Details!</h1>
      <p className="font-medium text-lg text-primary-light dark:text-primary-dark mt-4 md:mt-2">
        Please fill your Personality Type Details!
      </p>
      <div className="mt-5 md:mt-3">
        <div className="w-1/2">
          <Dropdown
            label="Personality"
            options={["Introvert", "Extrovert", "Ambivert"]}
            onSelect={(selectedOption) => handleDropdownChange('personality', selectedOption)}
            selectedOption={formData.personality}  // Show the selected option in the dropdown
          />
        </div>

        {/* Main container with flex layout */}
        <div className="flex justify-start items-center mt-5 w-full md:w-full h-64 md:h-44 overflow-auto">
          <div className="grid grid-cols-4 gap-3 md:gap-3">
            {PersonalityTypes &&
              PersonalityTypes.map((item, index) => (
                <div
                  className="relative w-fit cursor-pointer m-2 xs:m-1.5"
                  key={index}
                  onClick={() => handleClick(index)}
                  onMouseEnter={() => setHoverIndex(index)} // Show box on hover
                  onMouseLeave={() => setHoverIndex(null)} // Hide box on mouse leave
                >
                  <div className={`flex border-2 py-1 px-2 rounded-full items-center gap-2
                    ${formData.selectedType === index ? 'border-primary-light dark:border-primary-dark' : 'border-gray-400'}`}>
                    <CheckCircleIcon
                      style={{
                        display: formData.selectedType === index ? "block" : "none"
                      }}
                    />
                    <h2 className={`text-primary-light dark:text-primary-dark font-semibold`}>
                      {item.type}
                    </h2>
                  </div>
                  
                  {/* Display the hover box near the hovered item */}
                  {hoverIndex === index && (
                    <div
                      className={`absolute ${getHoverBoxPosition(index)} ${getHorizontalPosition(index)} w-60 bg-main-gradient text-white p-2 rounded-md shadow-lg z-10`}
                    >
                      <p className="text-base">{item.description}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Display the description box next to the selected personality type */}
          {PersonalityTypes[formData.selectedType] && (
            <div
              className="ml-5 flex-1 bg-main-gradient h-fit text-primary-dark p-4 rounded-lg shadow-2xl z-20"
              style={{ boxShadow: "0 4px 20px purple" }} // Add elevation effect
            >
              <p className="text-lg">{PersonalityTypes[formData.selectedType].description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalityForm;