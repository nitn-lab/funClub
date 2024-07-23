import React, { useState, useEffect } from "react";
import SignUp from "../../components/SignUp";
import BasicDetailsForm from "../../components/MultiStepForms/BasicDetailsForm";
import AdvanceForm from "../../components/MultiStepForms/AdvanceForm";
import PersonalityForm from "../../components/MultiStepForms/PersonalityForm";
import InterestForm from "../../components/MultiStepForms/InterestForm";
import LookingForForm from "../../components/MultiStepForms/LookingForForm";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar'

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const data = [
    {
      id: "SignUp",
      label : "Signup",
      component: <SignUp />,
    },
    {
      id: "BasicDetailsForm",
      label : "Basic Details",
      component: <BasicDetailsForm />,
    },
    {
      id: "AdvanceForm",
      label : "Advance Details",
      component: <AdvanceForm />,
    },
    {
      id: "PersonalityForm",
      label : "Personality Details",
      component: <PersonalityForm />,
    },
    {
      id: "InterestForm",
      label : "Interest Details",
      component: <InterestForm />,
    },
    {
      id: "LookingForForm",
      label : "Looking For Details",
      component: <LookingForForm />,
    },
  ];

  const [renderData, setRenderData] = useState(data);
  const [index, setIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (index === renderData.length - 1) {
        navigate("/Dashboard");
      } else {
        setIndex((idx) => idx + 1);
      }
    }, 1000);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setIndex((idx) => idx - 1);
  };

  return (
    <div className="flex w-full h-screen p-8 justify-center bg-gradient-to-tr from-violet-500 to-pink-500 ">
  
        <Sidebar steps={data} currentStep={index}/>
      
      <div className="w-1/2 bg-black">
        <div className="flex rounded-md">
          <div className="w-full items-center justify-center">
            {renderData[index].id === renderData[index].id
              ? renderData[index].component
              : null}

            {index === 0 && (
              <div className="flex justify-center">
                <button className="w-fit  active:scale-[.98] acitve:duration-75  ease-in-out transition-all py-2 px-6 rounded-xl   text-lg font-semibold flex  items-center justify-center gap-2 acitve:duration-75 hover:scale-[1.05] bg-white">
                  <img src="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_2217)'%3e%3cpath%20d='M3.54594%209.66905L2.989%2011.7482L0.953406%2011.7912C0.345063%2010.6629%200%209.37192%200%208.00005C0%206.67345%200.322625%205.42245%200.8945%204.32092H0.894938L2.70719%204.65317L3.50106%206.45455C3.33491%206.93895%203.24434%207.45895%203.24434%208.00005C3.24441%208.5873%203.35078%209.14995%203.54594%209.66905Z'%20fill='%23FBBB00'/%3e%3cpath%20d='M15.8602%206.50562C15.9521%206.98955%2016%207.48933%2016%208.00012C16%208.57287%2015.9398%209.13155%2015.8251%209.67046C15.4357%2011.5043%2014.4181%2013.1056%2013.0084%2014.2388L13.008%2014.2384L10.7253%2014.1219L10.4023%2012.1052C11.3377%2011.5566%2012.0687%2010.6981%2012.4537%209.67046H8.1759V6.50562H12.5161H15.8602Z'%20fill='%23518EF8'/%3e%3cpath%20d='M13.0081%2014.2382L13.0085%2014.2386C11.6375%2015.3406%209.89596%2015.9999%208.00015%2015.9999C4.95355%2015.9999%202.30477%2014.2971%200.953552%2011.7911L3.54608%209.66895C4.22168%2011.472%205.96102%2012.7555%208.00015%2012.7555C8.87662%2012.7555%209.69774%2012.5186%2010.4023%2012.105L13.0081%2014.2382Z'%20fill='%2328B446'/%3e%3cpath%20d='M13.1064%201.84175L10.5148%203.9635C9.78553%203.50769%208.92353%203.24438%208.00003%203.24438C5.91475%203.24438%204.14288%204.58678%203.50113%206.4545L0.894969%204.32088H0.894531C2.22597%201.75384%204.90816%200%208.00003%200C9.94112%200%2011.7209%200.691438%2013.1064%201.84175Z'%20fill='%23F14336'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_2217'%3e%3crect%20width='16'%20height='16'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e" />

                  <h5>Sign up with Google</h5>
                </button>
              </div>
            )}

            <div
              style={{ justifyContent: "space-between" }}
              className="flex px-4"
            >
              {index > 0 ? (
                <button
                  onClick={handleBack}
                  className="w-max active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 px-6 rounded-xl bg-white text-lg font-bold flex items-center justify-between gap-4"
                >
                  <IoIosArrowBack />
                  Back
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={handleSubmit}
                className="w-max active:scale-[.98] acitve:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 px-6 rounded-xl bg-white text-lg font-bold flex items-center justify-between gap-4"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : index === renderData.length - 1 ? (
                  "Submit"
                ) : (
                  "Next"
                )}
                {loading ? "" : <IoIosArrowForward />}
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
      </div>
    </div>
  );
};

export default Register;