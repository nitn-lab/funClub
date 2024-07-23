import React, { useState } from "react";
import SignUp from "../../components/SignUp";
import BasicDetailsForm from "../../components/MultiStepForms/BasicDetailsForm";
import AdvanceForm from "../../components/MultiStepForms/AdvanceForm";
import PersonalityForm from "../../components/MultiStepForms/PersonalityForm";
import InterestForm from "../../components/MultiStepForms/InterestForm";
import LookingForForm from "../../components/MultiStepForms/LookingForForm";
import logo from "../../assets/images/FUNCLUB logo.png";

const Register = () => {
  const data = [
    {
      id: "SignUp",
      component: <SignUp />,
    },
    {
      id: "BasicDetailsForm",
      component: <BasicDetailsForm />,
    },
    {
      id: "AdvanceForm",
      component: <AdvanceForm />,
    },
    {
      id: "PersonalityForm",
      component: <PersonalityForm />,
    },
    {
      id: "InterestForm",
      component: <InterestForm />,
    },
    {
      id: "LookingForForm",
      component: <LookingForForm />,
    },
  ];

  const [renderData, setRenderData] = useState(data);
  const [index, setIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (index === renderData.length - 1) {
      console.timeLog("last");
    } else {
      setIndex((idx) => idx + 1);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setIndex((idx) => idx - 1);
  };

  return (
    <div className="flex w-full bg-white ">
      <div className="w-full h-full items-center justify-center">
        {renderData[index].id === renderData[index].id
          ? renderData[index].component
          : null}
        <div
          style={{ justifyContent: "space-between" }}
          className="flex px-10 py-20"
        >
          {index > 0 && (
            <button
              onClick={handleBack}
              className="w-1/3 active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-500 to-pink-500 text-white text-lg font-bold"
            >
              Back
            </button>
          )}
          
          <button
            onClick={handleSubmit}
            className="w-1/3 active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-500 to-pink-500 text-white text-lg font-bold"
          >
            {index === renderData.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
      {/* <div className="hidden relative  lg:flex  w-1/2 items-center justify-center  bg-gradient-to-tr from-violet-500 to-pink-500">
        <div className="lg:flex w-full  bg-white/10 backdrop-blur-lg rounded-full items-center justify-center">
          <img src={logo} width={250} height={250} />
          <h1 className="text-5xl font-bold">FUN CLUB</h1>
        </div>
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
      </div> */}
    </div>
  );
};

export default Register;
