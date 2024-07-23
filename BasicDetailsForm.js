import React, { useEffect } from "react";

const BasicDetailsForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full pr-12 py-10 text-white">
      <h1 className="text-5xl font-bold">Basic Details!</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Please fill your Basic Details!
      </p>
      <div className="mt-8 flex gap-8">
        <div className="w-1/2">
          <input
            className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Enter your height"
          />
        </div>
        <div className="w-1/2">
          
            <select className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 text-black">
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
          
        </div>
      </div>
      <div className="mt-8 flex gap-8">
        <div className="w-1/2">
          <select className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 text-black">
            <option value="male">Aries</option>
            <option value="female">Taurus</option>
            <option value="other">Gemini</option>
            <option value="other">Cancer</option>
            <option value="other">Leo</option>
            <option value="other">Virgo</option>
            <option value="other">Libra</option>
            <option value="other">Scorpio</option>
            <option value="other">Sagittarius</option>
            <option value="other">Capricorn</option>
            <option value="other">Aquarius</option>
            <option value="other">Pisces</option>
          </select>
        </div>
        <div className="w-1/2">
          <input
            className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Enter your qualification"
            //   type="password"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-8">
       <div className="w-1/2">
       <input
          className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
          placeholder="Enter your school"
          //   type="password"
        />
       </div>
        <div className="w-1/2">
          <input
            className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Enter your college"
            //   type="password"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-8">
        <div className="w-1/2">
        <input
          className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
          placeholder="Enter your job title"
          //   type="password"
        />
        </div>
        <div className="w-1/2">
          <input
            className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Enter your organization url"
            //   type="password"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsForm;
