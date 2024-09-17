import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import Dropdown from './MultiStepForms/Dropdown'; // Update path as necessary

const SignUp = ({ data, onInputChange }) => {
  const { username, email, birthdate, password, confirm_password, gender } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange({ ...data, [name]: value });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.value;
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB')
    onInputChange({ ...data, birthdate: formattedDate });
  };

  const handleDropdownChange = (selectedValue) => {
    onInputChange({ ...data, gender: selectedValue });
  };

  

  return (
    <div className="w-full py-5 text-primary-light">
      <h1 className="text-4xl font-bold text-primary-light dark:text-primary-dark xs:text-3xl">Create Account!</h1>
      <p className="font-medium text-lg text-primary-light dark:text-primary-dark mt-4 md:mt-2">Create your Free Account!</p>
      <div className="flex mt-5 md:mt-3 gap-8 xs:gap-4">
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Username"
            type="text"
            name="username"
            value={username || ''}
            onChange={handleChange}
          />
        </div>
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Email"
            type="email"
            name="email"
            value={email || ''}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex mt-5 md:mt-3 gap-8 xs:gap-4">
        <div className="w-1/2">
          <Calendar
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Birthdate"
            onChange={handleDateChange}
            value={birthdate ? new Date(birthdate.split('/').reverse().join('/')) : null}
            showIcon
            dateFormat="dd/mm/yy"
            inputStyle={{backgroundColor: "white", border: "none", outline: "none", color: "black"}}
            panelStyle={{backgroundColor: "white", padding: "6px"}}
          />
        </div>
        <div className="w-1/2">
          <Dropdown
           
            options={[
              "Male", "Female", "Transgender", "Prefer not to say"
            ]}
            value={gender || ''}
            onChange={handleDropdownChange}
          />
        </div>
      </div>
      <div className="flex mt-5 md:mt-3 gap-8 xs:gap-4">
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Password"
            type="password"
            name="password"
            value={password || ''}
            onChange={handleChange}
          />
        </div>
        <div className="w-1/2">
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
            placeholder="Confirm Password"
            type="password"
            name="confirm_password"
            value={confirm_password || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;