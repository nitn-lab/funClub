import React from "react";
import SignUp from "../../components/SignUp";
import InterestForm from "../../components/Interest";
import iStockTiret from "../../iStockTiret.jpg";
const Interest = () => {
  return (
    <div className="flex w-full">
      <div className="w-full h-full flex items-center justify-center">
        <InterestForm />
      </div>
      <div className="hidden relative lg:flex items-center justify-center bg-gray-200"/>
      {/* <div className="w-1/2 bg-gradient-to-tr from-violet-500 to-pink-500 items-center justify-center">
        <img
          src={iStockTiret}
          alt="Snow"
          style={{height: "700px" }}
        />
      </div> */}

      {/* <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce" /> */}
      {/* <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" /> */}
      {/* </div> */}
    </div>
  );
};

export default Interest;
