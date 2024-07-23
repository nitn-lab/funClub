import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Calendar} from 'primereact/calendar'

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="w-full py-10 pr-12">
        <h1 className="text-5xl font-bold text-white">Create Account!</h1>
        <p className="font-medium text-lg text-white  mt-8">
          Create your Free Account!
        </p>
        <div className="flex mt-8 gap-8">
          <div className="w-1/2">
            <input
              className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
              placeholder="Name"
              type="text"
            />
          </div>

          <div className="w-1/2">
            <input
              className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="flex mt-8 gap-8">
          <div className="w-1/2">
            <Calendar
              className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white"
              placeholder="Age"
              type="number"
              showIcon
              inputStyle={{border : "none", outline : "none"}}
              panelStyle={{backgroundColor : "white", padding : "6px"}}
            />
          </div>
          <div className=" w-1/2">
            <div>
              <select className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 ">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="female">Transgender</option>
                <option value="other">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex mt-8 gap-8">
          <div className="w-1/2">
            <input
              className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <div className="w-1/2">
            <input
              className="w-full border-2  rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black"
              placeholder="Enter your password"
              type="password"
            />
          </div>
        </div>
        {/* <div className="mt-8 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remenber" />
              <label className="ml-2 font-medium text-base" for="remember">
                remember for now
              </label>
            </div>
            <button className="font-medium text-base text-violet">
              Forget Password
            </button>
          </div> */}
        <div className="mt-8 flex justify-center items-center">
          <p className="font-semibold text-base text-white">Already have an account?</p>
          <button
            className="text-violet-500 text-base font-semibold ml-2"
            onClick={() => {
              navigate("/");
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
