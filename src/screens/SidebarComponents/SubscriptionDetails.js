import React from "react";
import { FaCheck, FaLock } from "react-icons/fa";
import logo from '../assets/images/FUNCLUB logo.png';

const Subscription = () => {
    return (
        <div className="w-[95%] mx-auto font-gotham h-[96vh] md:h-[92vh] bg-black p-3 rounded-md md:w-full">
            

            {/* Subscription Plans */}
            <div className="grid grid-cols-4 gap-7 py-4">
                <div></div>
                <div className="text-center">
                    <div className="px-4 py-3 bg-gradient-to-r from-white to-[#724eae] rounded-lg flex justify-center items-center gap-x-1">
                    <img src={logo} className="w-7 h-8"/>
                        <h2 className="font-base text-xl"> Plus</h2>
                    </div>
                </div>
                <div className="text-center">
                    <div className="px-4 py-3  bg-gradient-to-r from-white to-[#e6af16] rounded-lg flex justify-center items-center gap-x-1">
                    <img src={logo} className="w-7 h-8"/>
                        <h2 className="font-base text-xl">Gold</h2>
                    </div>
                </div>
                <div className="text-center">
                    <div className="px-4 py-3 bg-gradient-to-r from-white to-[#8f939a] rounded-lg flex justify-center items-center gap-x-1">
                    <img src={logo} className="w-7 h-8"/>
                        <h2 className="font-base text-xl">Platinum</h2>
                    </div>
                </div>
            </div>

            {/* Features Table */}
           <div className="scrollable-div overflow-y-auto h-[calc(100vh-30vh)] md:h-[calc(100vh-33vh)]">
           
           <fieldset className="border border-gray-300 text-white px-6 rounded-md">
           <legend className="px-3 rounded-full text-black bg-white">Upgrade Your Likes</legend>
                <div className="flex items-center py-2">
                    <h3 className="font-base w-1/4">Unlimited Likes</h3>
                    <div className="flex justify-between w-3/4">
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                    </div>
                </div>
                <div className="flex items-center py-3">
                    <h3 className="font-base w-1/4">See Who Likes You</h3>
                    <div className="flex justify-between w-3/4">
                        <div className="flex-1 flex justify-center items-center"><FaLock className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                    </div>
                </div>
                <div className="flex items-center py-3">
                    <h3 className="font-base w-1/4">Priority Likes</h3>
                    <div className="flex justify-between w-3/4">
                        <div className="flex-1 flex justify-center items-center"><FaLock className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaLock className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                    </div>
                </div>
            </fieldset>
            
            <fieldset className="border border-gray-300 text-white px-6 rounded-md my-6">
            <legend className="px-3 rounded-full text-black bg-white">Enhance Your Experience</legend>
                <div className="flex items-center py-3">
                    <h3 className="font-base w-1/4">Unlimited Rewinds</h3>
                    <div className="flex justify-between w-3/4">
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                    </div>
                </div>
                <div className="flex items-center py-3">
                    <h3 className="font-base w-1/4">1 free boost per month</h3>
                    <div className="flex justify-between w-3/4">
                        <div className="flex-1 flex justify-center items-center"><FaLock className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                    </div>
                </div>
                <div className="flex items-center py-3">
                    <h3 className="font-base w-1/4">Message before matching</h3>
                    <div className="flex justify-between w-3/4">
                        <div className="flex-1 flex justify-center items-center"><FaLock className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaLock className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                    </div>
                </div>
            </fieldset>

            <fieldset className="border border-gray-300 text-white px-6 rounded-md">
            <legend className="px-3 rounded-full text-black bg-white">Take Control</legend>
                <div className="flex items-center py-3">
                    <h3 className="font-base w-1/4">Control your profile</h3>
                    <div className="flex justify-between w-3/4">
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                    </div>
                </div>
                <div className="flex items-center py-3">
                    <h3 className="font-base w-1/4">Control who sees you</h3>
                    <div className="flex justify-between w-3/4">
                        <div className="flex-1 flex justify-center items-center"><FaLock className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                    </div>
                </div>
                <div className="flex items-center py-3">
                    <h3 className="font-base w-1/4">Hide ads</h3>
                    <div className="flex justify-between w-3/4">
                        <div className="flex-1 flex justify-center items-center"><FaLock className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaLock className="text-xl" /></div>
                        <div className="flex-1 flex justify-center items-center"><FaCheck className="text-xl" /></div>
                    </div>
                </div>
            </fieldset>

            
           </div>
           {/* Pricing Options */}
           <div className="grid grid-cols-4 gap-4 pt-6 ">
           <div></div>
                <div className="text-center">
                    <button className="bg-gradient-to-r from-fuchsia-800 to-white hover:bg-gradient-to-r hover:from-white hover:to-fuchsia-800 text-white py-2 px-4 rounded-full">
                        Starting at ₹89
                    </button>
                </div>
                <div className="text-center">
                    <button className="bg-gradient-to-r from-[#e6af16] to-[#f9db89] hover:to-[#e6af16] hover:from-[#f9db89] text-white py-2 px-4 rounded-full">
                        Starting at ₹143
                    </button>
                </div>
                <div className="text-center">
                    <button className="bg-gradient-to-r 
                    to-gray-300 from-black hover:from-gray-300 hover:to-black text-white py-2 px-4 rounded-full">
                        Starting at ₹287
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subscription;