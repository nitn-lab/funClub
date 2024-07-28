import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown"; // Ensure the path is correct

const AdvanceForm = ({ onInputChange }) => {
  const [formData, setFormData] = useState({
    ethnicity: "",
    exercise: "",
    drinking: "",
    smoking: "",
    sexualOrientation: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    onInputChange(formData);
  }, [formData, onInputChange]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="w-full py-5 text-black">
      <h1 className="text-4xl font-bold text-white xs:text-3xl">Advance Details!</h1>
      <p className="font-medium text-lg text-gray-200 mt-4 md:mt-2">
        Please fill your Advance Details!
      </p>
      <div className="mt-5 md:mt-3 flex gap-8 xs:gap-4">
        <div className="w-1/2">
          <label className="text-lg font-medium text-white">Ethnicity</label>
          <input
            name="ethnicity"
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Enter Ethnicity"
            value={formData.ethnicity}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-1/2">
          <Dropdown
            label="Exercise"
            options={["Everyday", "Often", "Sometimes", "Never"]}
            onSelect={(selectedOption) => handleDropdownChange('exercise', selectedOption)}
          />
        </div>
      </div>
      <div className="mt-5 md:mt-3 flex gap-8 xs:gap-4">
        <div className="w-1/2">
          <Dropdown
            label="Drinking"
            options={[
              "Not for me",
              "Sober",
              "Sober curious",
              "On special occasions",
              "Socially on weekends",
              "Most nights",
            ]}
            onSelect={(selectedOption) => handleDropdownChange('drinking', selectedOption)}
          />
        </div>
        <div className="w-1/2">
          <Dropdown
            label="Smoking"
            options={[
              "Social smoker",
              "Smoker when drinking",
              "Non-smoker",
              "Smoker",
              "Trying to quit",
            ]}
            onSelect={(selectedOption) => handleDropdownChange('smoking', selectedOption)}
          />
        </div>
      </div>
      <div className="mt-5 md:mt-3">
        <div className="w-1/2">
          <Dropdown
            label="Sexual Orientation"
            options={[
              "Straight",
              "Gay",
              "Lesbian",
              "Bisexual",
              "Asexual",
              "Demisexual",
              "Pansexual",
              "Queer",
              "Bicurious",
              "Aromantic",
            ]}
            onSelect={(selectedOption) => handleDropdownChange('sexualOrientation', selectedOption)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvanceForm;