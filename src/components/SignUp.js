import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from 'primereact/calendar';

const SignUp = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [age, setAge] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBirthDate(selectedDate);
    if (selectedDate) {
      const birthDate = new Date(selectedDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        setAge(age - 1);
      } else {
        setAge(age);
      }
    } else {
      setAge(null);
    }
  };

  return (
    <div className="w-full py-10">
      <h1 className="text-5xl font-bold text-white">Create Account!</h1>
      <p className="font-medium text-lg text-gray-200 mt-4">
        Create your Free Account!
      </p>
      <div className="flex mt-8 gap-8">
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Name"
            type="text"
          />
        </div>

        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div className="flex mt-8 gap-8">
        <div className="w-1/2">
          <Calendar
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Select your birthdate"
            onChange={handleDateChange}
            value={birthDate}
            showIcon
            dateFormat="dd/mm/yy"
            inputStyle={{border : "none" , outline : "none"}}
            panelStyle={{backgroundColor : "white" , padding: "6px"}}
          />
          {age !== null && (
            <p className="text-white mt-2 pl-2">Your Age: {age}</p>
          )}
        </div>
        <div className="w-1/2">
          <select className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
            <option value="other">Prefer not to say</option>
          </select>
        </div>
      </div>
      <div className="flex mt-8 gap-8">
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
            placeholder="Confirm your password"
            type="password"
          />
        </div>
      </div>
      <div className="mt-8 flex justify-center items-center">
        <p className="font-semibold text-base text-white">Already have an account?</p>
        <button
          className="text-violet-500 text-base font-semibold ml-2"
          onClick={() => navigate("/")}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignUp;