import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from 'primereact/calendar';
import Dropdown from './MultiStepForms/Dropdown'

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
    <div className="w-full py-5  text-primary-light dark:text-primary-dark">
      <h1 className="text-4xl font-bold text-primary-light dark:text-primary-dark xs:text-3xl">Create Account!</h1>
      <p className="font-medium text-lg text-primary-light dark:text-primary-dark mt-4 md:mt-2">
        Create your Free Account!
      </p>
      <div className="flex mt-5 md:mt-3 gap-8 xs:gap-4">
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Username"
            type="text"
          />
        </div>

        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Email"
          />
        </div>
      </div>
      <div className="flex mt-5 md:mt-3 gap-8 xs:gap-4">
        <div className="w-1/2">
          <Calendar
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Birthdate"
            onChange={handleDateChange}
            value={birthDate}
            showIcon
            dateFormat="dd/mm/yy"
            inputStyle={{backgroundColor : "white" ,border : "none" , outline : "none", color:"black"}}
            panelStyle={{backgroundColor : "white" , padding: "6px"}}
          />
          {age !== null && (
            <p className="text-white mt-2 pl-2">Your Age: {age}</p>
          )}
        </div>
        <div className="w-1/2">
          <Dropdown
            label=""
            options={[
              "Male", "Female", "Transgender", "Prefer not to say"
            ]}
          />
        </div>
      </div>
      <div className="flex mt-5 md:mt-3 gap-8 xs:gap-4">
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Confirm Password"
            type="password"
          />
        </div>
      </div>
      <div className="mt-5 md:mt-3 flex justify-center items-center">
        <p className="font-semibold text-base text-primary-light dark:text-primary-dark">Already have an account?</p>
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