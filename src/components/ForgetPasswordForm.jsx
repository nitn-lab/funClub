import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ForgetPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      
      const response = await axios.post("http://3.110.156.153:5000/api/v1/passwordReset", { email, password });
      if(response.status === 201){
        toast.success("Password reset successfully!!")
        navigate("/")
      }
    } catch (err) {
      toast.error( err.response.data.message)
    }
  };

  return (
    <div className="w-full h-full text-white px-6 xs:px-3 py-16 ">
      <h1 className="text-4xl font-semibold text-center">Forgot Password</h1>
      <p className="font-medium text-lg md:text-md mt-4 text-center">
        Please enter your email and new password.
      </p>
      <div className="mt-8 md:mt-6">
        <div>
          <input
            className="w-full border-2 rounded-lg p-2 mt-1 border-none outline-none placeholder-black bg-white text-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <input
            type="password"
            className="w-full border-2 rounded-lg p-2 mt-1 border-none outline-none placeholder-black bg-white text-black"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-4 flex flex-col gap-y-4">
          <button
            onClick={handleResetPassword}
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-main-gradient text-base font-base"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}