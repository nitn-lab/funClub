import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full text-white px-6 xs:px-3 py-6 ">
      <h1 className="text-4xl font-semibold text-center">Welcome Back</h1>
      <p className="font-medium text-lg md:text-md mt-4 text-center">
        Welcome back! Please enter your details
      </p>
      <div className="mt-8 md:mt-6">
        <div>
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white text-black"
            placeholder="Email"
          />
        </div>
        <div className="mt-5 md:mt-3">
          
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 focus:outline-violet-500 focus:ring-violet-500 placeholder-black bg-white text-black"
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="mt-5 flex justify-between items-center">
          <div>
            <input type="checkbox" id="remember" className="bg-white"/>
            <label className="ml-2 font-medium text-base md:text-sm" htmlFor="remember">
              Remember for now
            </label>
          </div>
          <button
            className="font-medium text-base md:text-sm text-violet-500"
            onClick={() => { navigate('/forget-password'); }}
          >
            Forget Password?
          </button>
        </div>
        <div className="mt-5  flex flex-col gap-y-4">
          <button
            onClick={() => { navigate("/Dashboard"); }}
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-gradient-to-tr from-violet-500 to-pink-500  text-md font-bold"
          >
            Sign In
          </button>
        </div>
        <div className="mt-5 flex justify-center items-center">
          <p className="font-medium text-base md:text-sm">Don't have an account?</p>
          <button
            onClick={() => { navigate("/register"); }}
            className="text-violet-500 text-base md:text-sm font-medium ml-2"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}