import React from 'react';
import {useNavigate} from 'react-router-dom'

const ForgetPassword = () => {
    const navigate = useNavigate()
    return(
        <div className="w-full h-full bg-white px-10 xxs:px-4 py-20  border-2 border-gray">
    <h1 className="text-5xl font-bold">Forget Password!</h1>
    <p className="font-medium text-lg text-gray-500 mt-4">
      Please fill your Email to get reset password link!
    </p>
    <div className="mt-8 ">
      <div>
        <label className="text-lg font-medium">Email</label>
        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder="Email"
          type="email"
        />
      </div>
    </div>
    <div className="mt-8 flex flex-col gap-y-4">
          <button
            onClick={() => {
              navigate("/reset-password");
            }}
            className="active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-500 to-pink-500 text-white text-lg font-bold"
          >
            Reset Password
          </button>
        </div>
  </div>
    );
};

export default ForgetPassword;