import React, { useState, useEffect } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Data from "./Videos.json";

const Suggestions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(Data);
  }, []);

  return (
    <div className="">
      <h2 className="font-semibold text-lg text-primary-light dark:text-primary-dark mt-4 mb-2">Suggestions</h2>
      <div className="grid grid-cols-2 gap-3">
      {data &&
        data.length > 0 &&
        data.map((item) => {
          return (
            <div className="bg-primary-light dark:bg-primary-dark rounded-md py-1.5 hover:scale-[1.01] cursor-pointer dark:text-primary-light text-primary-dark">
              <div className="pl-5">
              <img
                src={item.profileImage}
                alt={item.username}
                className="object-cover h-16 w-16 rounded-full"
              />
              </div>
              <h3 className="text-base my-0.5 font-medium text-center">{item.username}</h3>
              <div className="pl-[1.13rem]">
              <button className="  bg-main-gradient text-white rounded-md px-2 py-1">
                <GroupAddIcon style={{ fontSize: "1rem" }} />
                <span className="ml-1 text-sm">Follow</span>
              </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Suggestions;
