import React from "react";
import LoginForm from "../../components/LoginForm";
import logo from "../../assets/images/FUNCLUB logo.png";

const Login = () => {
  return (
    <div className="h-screen">
      <img
        src="https://images.pond5.com/pink-neon-heart-sign-reflection-footage-167595258_iconl.jpeg"
        className="w-[100%] h-[100%] object-cover  bg-no-repeat relative"
      />
      <div className="absolute top-0  p-20 w-full h-screen ">
     <div className="flex  backdrop-blur-lg rounded-lg bg-white/10">
     <div className=" flex items-center justify-center w-1/2 md:w-full ">
          <LoginForm />
        </div>
        <div className="md:hidden relative flex  w-1/2 items-center ">
          <div className="flex w-full mx-5 h-1/2 items-center justify-center text-white">
            <img src={logo} className="w-52  animate-bounce" />
            <div>
              <h1 className="text-5xl font-bold">FUN CLUB</h1>
              <h3 className="text-xl font-semibold mt-2.5  text-center italic">
                Make Friends, Have Fun
              </h3>
            </div>
          </div>
        </div>
     </div>
      </div>
    </div>
  );
};

export default Login;
