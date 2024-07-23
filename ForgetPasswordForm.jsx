import React from "react";

export default function ForgetPasswordForm() {

  return (
   
    <div className="w-full h-vh bg-white px-10 xxs:px-4 ">
      <h1 className="text-5xl font-semibold">Forgot Password!!</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Enter your Email to get reset password link
      </p>
      <div className="mt-8 ">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
          />
        </div>
        
        
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            className="active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-500 to-pink-500 text-white text-lg font-bold"
          >
            Reset Password
          </button>
          {/* <button className="flex rounded-xl py-3 border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all">
            Sign Up
          </button> */}
        </div>
        
      </div>
    </div>
  );
}
