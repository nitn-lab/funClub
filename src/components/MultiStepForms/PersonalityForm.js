import React, { useState, useEffect } from 'react';
import PersonalityTypes from "./PersonalityTypes";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dropdown from './Dropdown';

const PersonalityForm = ({ onInputChange }) => {
  const [formData, setFormData] = useState({
    personality: "",
    selectedTypes: []
  });

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

  return (
    <div className="w-full py-5 text-white">
      <h1 className="text-4xl font-bold xs:text-3xl">Personality Details!</h1>
      <p className="font-medium text-lg text-gray-200 mt-4 md:mt-2">
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
        <div className="mt-5 flex flex-wrap">
          {PersonalityTypes &&
            PersonalityTypes.map((item, index) => (
              <div
                className="w-fit cursor-pointer m-2 xs:m-1.5"
                key={index}
                onClick={() => handleClick(index)}
              >
                <div className="flex border-2 border-white py-1 px-2 rounded-full items-center gap-2">
                  <CheckCircleIcon
                    style={{
                      display: formData.selectedTypes.includes(index)
                        ? "block"
                        : "none"
                    }}
                  />
                  <h2 className="text-white font-semibold">
                    {item.type}
                  </h2>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalityForm;