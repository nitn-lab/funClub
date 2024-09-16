import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown"; // Ensure the path is correct

const BasicDetailsForm = ({ onInputChange }) => {
  const [selectedReligion, setSelectedReligion] = useState("");
  const [otherReligion, setOtherReligion] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm"); // Default unit
  const [formData, setFormData] = useState({
    religion: "",
    heightCm: "",
    heightFeet: "",
    heightInches: "",
    heightUnit: "cm",
    zodiac: "",
    qualification: "",
    school: "",
    college: "",
    jobTitle: "",
    organizationUrl: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    onInputChange(formData);
  }, [formData, onInputChange]);

  const handleReligionChange = (selectedOption) => {
    setSelectedReligion(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      religion: selectedOption !== "Other" ? selectedOption : otherReligion
    }));
    if (selectedOption !== "Other") {
      setOtherReligion(""); // Clear other religion input if not "Other"
    }
  };

  const handleOtherReligionChange = (event) => {
    const value = event.target.value;
    setOtherReligion(value);
    setFormData((prevData) => ({
      ...prevData,
      religion: value
    }));
  };

  const handleHeightCmChange = (event) => {
    const cmValue = event.target.value;
    setHeightCm(cmValue);
    const totalInches = cmValue / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    setHeightFeet(feet);
    setHeightInches(inches);
    setFormData((prevData) => ({
      ...prevData,
      heightCm: cmValue,
      heightFeet: feet,
      heightInches: inches,
      heightUnit: "cm"
    }));
  };

  const handleHeightFeetChange = (event) => {
    const feetValue = event.target.value;
    setHeightFeet(feetValue);
    const totalInches = parseInt(feetValue) * 12 + parseInt(heightInches);
    const cmValue = totalInches * 2.54;
    setHeightCm(cmValue.toFixed(2));
    setFormData((prevData) => ({
      ...prevData,
      heightFeet: feetValue,
      heightCm: cmValue.toFixed(2),
      heightUnit: "ft/in"
    }));
  };

  const handleHeightInchesChange = (event) => {
    const inchesValue = event.target.value;
    setHeightInches(inchesValue);
    const totalInches = parseInt(heightFeet) * 12 + parseInt(inchesValue);
    const cmValue = totalInches * 2.54;
    setHeightCm(cmValue.toFixed(2));
    setFormData((prevData) => ({
      ...prevData,
      heightInches: inchesValue,
      heightCm: cmValue.toFixed(2),
      heightUnit: "ft/in"
    }));
  };

  const handleHeightUnitChange = (selectedOption) => {
    setHeightUnit(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      heightUnit: selectedOption
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="w-full py-5 text-primary-light ">
      <h1 className="text-4xl font-bold text-primary-light dark:text-primary-dark xs:text-3xl">Basic Details!</h1>
      <p className="font-medium text-lg text-primary-light dark:text-primary-dark mt-4 md:mt-2">
        Please fill your Basic Details!
      </p>
      <div className="mt-5 md:mt-3 flex gap-8 xs:gap-4">
        <div className="w-1/2 flex gap-2.5">
          {heightUnit === "cm" ? (
            <div className="">
              <input
                className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
                placeholder="Height"
                value={heightCm}
                onChange={handleHeightCmChange}
              />
            </div>
          ) : (
            <div className="flex gap-2.5 xs:gap-1.5">
              <div>
                <input
                  className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
                  placeholder="Feet"
                  value={heightFeet}
                  onChange={handleHeightFeetChange}
                />
              </div>
              <div>
                <input
                  className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
                  placeholder="Inches"
                  value={heightInches}
                  onChange={handleHeightInchesChange}
                />
              </div>
            </div>
          )}
          <div className="w-1/2">
            <Dropdown
              label=""
              options={["cm", "ft/in"]}
              onSelect={handleHeightUnitChange}
            />
          </div>
        </div>

        <div className="w-1/2">
          <Dropdown
            label=""
            options={[
              "Religion",
              "Buddhism",
              "Chinese traditional religion",
              "Christianity",
              "Hinduism",
              "Islam",
              "Jainism",
              "Juche",
              "Judaism",
              "Secular",
              "Shinto",
              "Sikhism",
              "Spiritism",
              "Zoroastrianism",
              "primal-indigenous",
              "Other"
            ]}
            onSelect={handleReligionChange}
          />
          {selectedReligion === "Other" && (
            <input
              className="w-full border-2 rounded-lg p-2.5 focus:outline-violet-500 focus:ring-violet-500 placeholder-black mt-3 bg-white"
              placeholder="Religion"
              value={otherReligion}
              onChange={handleOtherReligionChange}
            />
          )}
        </div>
      </div>
      <div className="mt-5 md:mt-3 flex gap-8 xs:gap-4">
        <div className="w-1/2">
          <Dropdown
            label=""
            options={[
              "Zodiac",
              "Leo ♌",
              "Aries ♈",
              "Virgo ♍",
              "Libra ♎",
              "Taurus ♉",
              "Gemini ♊",
              "Cancer ♋",
              "Pisces ♓",
              "Scorpio ♏",
              "Aquarius ♒",
              "Capricorn ♑",
              "Sagittarius ♐"
            ]}
            onSelect={(selectedOption) => handleDropdownChange('zodiac', selectedOption)}
          />
        </div>
        <div className="w-1/2">
          <Dropdown
            label=""
            options={[
              "Qualification",
              "High School",
              "Trade School",
              "In College",
              "Bachelor's",
              "Master's",
              "PhD"
            ]}
            onSelect={(selectedOption) => handleDropdownChange('qualification', selectedOption)}
          />
        </div>
      </div>

      <div className="mt-5 md:mt-3 flex gap-8 xs:gap-4">
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 xs:0.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="School"
            value={formData.school}
            onChange={(e) => handleDropdownChange('school', e.target.value)}
          />
        </div>
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="College"
            value={formData.college}
            onChange={(e) => handleDropdownChange('college', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-5 md:mt-3 flex gap-8 xs:gap-4">
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Job title"
            value={formData.jobTitle}
            onChange={(e) => handleDropdownChange('jobTitle', e.target.value)}
          /></div>
          <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Organization Url"
            value={formData.organizationUrl}
            onChange={(e) => handleDropdownChange('organizationUrl', e.target.value)}
          />
          </div>
          </div>
          </div>
  );
};

export default BasicDetailsForm;