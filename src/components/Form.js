import React from "react";
import { useNavigate } from "react-router-dom";
export default function Form() {
  const navigate = useNavigate();
  return (
    // rounded-3xl
    <div className="w-full h-vh bg-white px-10 py-20  border-2 border-gray">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome back! please enter your details
      </p>
      <div className="mt-8 ">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
          />
        </div>
        <div className="mt-8 ">
          <label className="text-lg font-medium">Password</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input type="checkbox" id="remenber" />
            <label className="ml-2 font-medium text-base" for="remember">
              remember for now
            </label>
          </div>
          <button className="font-medium text-base text-violet">
            Forget Password
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            onClick={() => {
              navigate("/interest");
            }}
            className="active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-500 to-pink-500 text-white text-lg font-bold"
          >
            Sign In
          </button>
          {/* <button className="flex rounded-xl py-3 border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all">
            Sign Up
          </button> */}
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Don't have an account?</p>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="text-violet-500 text-base font-medium ml-2"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
