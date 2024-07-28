import React from "react";
import LoginForm from "../../components/LoginForm";
import logo from "../../assets/images/FUNCLUB logo.png";

const Login = () => {
  return (
    <div className="relative h-screen w-screen">
      <img
        src="https://images.pond5.com/pink-neon-heart-sign-reflection-footage-167595258_iconl.jpeg"
        className="w-full h-full object-cover bg-no-repeat"
      />
      <div className="absolute top-0 xs:p-3 p-20 w-full h-full">
        <div className="flex backdrop-blur-lg rounded-lg bg-white/10 h-full xs:h-[75%] xs:mt-20">
          <div className="flex items-center justify-center w-1/2 md:w-full h-full ">
            <LoginForm />
          </div>
          <div className="md:hidden relative flex w-1/2 items-center h-full">
            <div className="flex w-full items-center justify-center text-white">
              <img src={logo} className="w-44 animate-bounce" />
              <div>
                <h1 className="text-4xl font-bold">FUN CLUB</h1>
                <h3 className="text-xl font-semibold mt-2.5 text-center italic">
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