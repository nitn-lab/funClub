import React, { useState, useEffect } from "react";

const BasicDetailsForm = () => {
  const [selectedReligion, setSelectedReligion] = useState("");
  const [otherReligion, setOtherReligion] = useState("");
  const [qualification, setQualification] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm"); // Default unit

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReligionChange = (event) => {
    setSelectedReligion(event.target.value);
    if (event.target.value !== "Other") {
      setOtherReligion(""); // Clear other religion input if not "Other"
    }
  };
  const handleHeightCmChange = (event) => {
    const cmValue = event.target.value;
    setHeightCm(cmValue);
    const totalInches = cmValue / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    setHeightFeet(feet);
    setHeightInches(inches);
  };

  const handleHeightFeetChange = (event) => {
    const feetValue = event.target.value;
    setHeightFeet(feetValue);
    const totalInches = parseInt(feetValue) * 12 + parseInt(heightInches);
    const cmValue = totalInches * 2.54;
    setHeightCm(cmValue.toFixed(2));
  };

  const handleHeightInchesChange = (event) => {
    const inchesValue = event.target.value;
    setHeightInches(inchesValue);
    const totalInches = parseInt(heightFeet) * 12 + parseInt(inchesValue);
    const cmValue = totalInches * 2.54;
    setHeightCm(cmValue.toFixed(2));
  };

  const handleHeightUnitChange = (event) => {
    const newUnit = event.target.value;
    setHeightUnit(newUnit);
  };

  return (
    <div className="w-full py-10 ">
      <h1 className="text-5xl font-bold text-white">Basic Details!</h1>
      <p className="font-medium text-lg text-gray-200 mt-4">
        Please fill your Basic Details!
      </p>
      <div className="mt-8 flex gap-8">
        <div className="w-1/2 flex gap-2.5">
        {heightUnit === "cm" ? (
          <div className="">
            <input
              className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
              placeholder="Enter your height"
              value={heightCm}
              onChange={handleHeightCmChange}
            />
          </div>
        ) : (
          <div className="flex gap-2.5">
            <div>
              <input
                className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
                placeholder="Feet"
                value={heightFeet}
                onChange={handleHeightFeetChange}
              />
            </div>
            <div>
              <input
                className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
                placeholder="Inches"
                value={heightInches}
                onChange={handleHeightInchesChange}
              />
            </div>
          </div>
        )}
        <div className="w-1/2">
          <select
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 text-black"
            value={heightUnit}
            onChange={handleHeightUnitChange}
          >
            <option value="cm">cm</option>
            <option value="ft/in">ft/in</option>
          </select>
        </div>
        </div>

        <div className="w-1/2">
          <select
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 text-black"
            value={selectedReligion}
            onChange={handleReligionChange}
          >
            <option value="">Select your religion</option>
            <option value="Buddhism">Buddhism</option>
            <option value="Chinese traditional religion">
              Chinese traditional religion
            </option>
            <option value="Christianity">Christianity</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Islam">Islam</option>
            <option value="Jainism">Jainism</option>
            <option value="Juche">Juche</option>
            <option value="Judaism">Judaism</option>
            <option value="Secular">Secular</option>
            <option value="Shinto">Shinto</option>
            <option value="Sikhism">Sikhism</option>
            <option value="Spiritism">Spiritism</option>
            <option value="Zoroastrianism">Zoroastrianism</option>
            <option value="primal-indigenous">primal-indigenous</option>
            <option value="Other">Other</option>
          </select>
          {selectedReligion === "Other" && (
            <input
              className="w-full border-2 rounded-lg p-2.5 focus:outline-violet-500 focus:ring-violet-500 placeholder-black mt-3"
              placeholder="Enter your religion"
              value={otherReligion}
              onChange={(e) => setOtherReligion(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="mt-8 flex gap-8">
        <div className="w-1/2">
          <select className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 text-black">
            <option value="">Select your Zodiac</option>
            <option value="aries">Aries ♈</option>
            <option value="taurus">Taurus ♉</option>
            <option value="gemini">Gemini ♊</option>
            <option value="cancer">Cancer ♋</option>
            <option value="leo">Leo ♌</option>
            <option value="virgo">Virgo ♍</option>
            <option value="libra">Libra ♎</option>
            <option value="scorpio">Scorpio ♏</option>
            <option value="sagittarius">Sagittarius ♐</option>
            <option value="capricorn">Capricorn ♑</option>
            <option value="aquarius">Aquarius ♒</option>
            <option value="pisces">Pisces ♓</option>
          </select>
        </div>
        <div className="w-1/2">
          <select
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 text-black"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          >
            <option value="">Select your qualification</option>
            <option value="High School">High School</option>
            <option value="Trade School">Trade School</option>
            <option value="In College">In College</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex gap-8">
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Enter your school"
          />
        </div>
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Enter your college"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-8">
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Enter your job title"
          />
        </div>
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Enter your organization url"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsForm;
