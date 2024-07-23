import React, {useState} from "react";
import intrests from "./Interests";

const InterestForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleClick = (index) => {
    setSelectedItems((previousSelectedItems) => {
      if (previousSelectedItems.includes(index)) {
        return previousSelectedItems.filter((item) => item !== index);
      } else {
        return [...previousSelectedItems, index];
      }
    })
  }
  return (
    <div className="w-full h-full bg-white px-10 lg:px-4 py-10 mb-10  border-2 border-gray">
      <h1 className="text-5xl font-bold">Interest Details!</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Please Choose your Interests!!
      </p>
      <div className="intrests mt-8 grid grid-cols-3 gap-y-10 ">
        {intrests &&
          intrests.map((intrest, index) => {
            return (<div className="intrest-card card bg-base-100 w-[25rem]  shadow-xl cursor-pointer" key={index} onClick={() => handleClick(index)} style={{border : selectedItems.includes(index) ? "3px solid #be52c6" : "", padding : "5px" }}>
            
              <figure>
                <img
                  src={intrest.src}
                  alt="Shoes"
                  className="h-80 w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-semibold text-[#be52c6]">{intrest.type}</h2>
                
              </div>
            </div>)
          })}
      </div>
    </div>
  );
};

export default InterestForm;
