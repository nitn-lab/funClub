import React from "react";

const Sidebar = ({ steps, currentStep }) => {
  return (
    <div className="w-1/3 h-full">
    <img src="https://media.istockphoto.com/id/1445815190/vector/modern-gradient-colorful-heart-shape-logo-vector-design-element.jpg?s=612x612&w=0&k=20&c=NMrKHQHEefP6A8llcvmh6rmCikDlB1NRLEQUggMOVWs=" className="relative h-[100%]"/>
      <ul className="absolute top-20 text-white px-12 text-xl tracking-wide">
        {steps.map((step, index) => (
          <li key={index} className={`py-2 ${index <= currentStep ? 'text-[#41beff]' : 'text-white'}`}>
            <div className="flex items-center">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-[#41beff] text-white' : 'bg-white text-black'}`}>
                {index + 1}
              </span>
              <span className="ml-3">{step.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;