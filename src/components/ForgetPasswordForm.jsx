import React from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordForm() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full text-white px-6 xs:px-3 py-32 ">
      <h1 className="text-4xl font-semibold text-center">Forgot Password</h1>
      <p className="font-medium text-lg md:text-md mt-4 text-center">
        Please enter your email to get reset password link!
      </p>
      <div className="mt-8 md:mt-6">
        <div>
          <input
            className="w-full border-2 rounded-lg p-2.5 mt-1 border-none outline-none placeholder-black bg-white text-black"
            placeholder="Email"
          />
        </div>
       
      
        <div className="mt-5  flex flex-col gap-y-4">
          <button
            onClick={() => { navigate("/Dashboard"); }}
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-gradient-to-tr from-violet-500 to-pink-500  text-md font-bold"
          >
            Reset Password
          </button>
        </div>
        
      </div>
    </div>
  );
}