import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import NearbyPeople from "./NearbyComponent/NearbyPeople.json";

const Feeds = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(NearbyPeople);
  }, []);

  return (
    <div
      className="scrollable-div text-white w-[35rem] xs:w-full overflow-y-auto
     mx-auto h-[96vh] md:h-[87vh]"
    >
      {data &&
        data.length > 0 &&
        data.map((item) => {
          return (
            <div className="bg-black p-4 xs:px-2 rounded-md mb-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-x-3 items-center">
                  <img
                    src="https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="h-12 w-12 rounded-full border-2 border-[#9c8fd0] p-1"
                  />
                  <h3>{item.username}</h3>
                </div>
                <button className="border-2 border-white py-1 px-2.5 rounded-lg bg-main-gradient hover:scale-[1.03] mr-1 ">
                  Follow
                </button>
              </div>
              <img
                src={item.profile_url}
                className="w-full h-96 mt-6 xs:mt-4 mb-3 rounded-md border-2 border-gray-200"
              />
              <div className="flex gap-x-5 items-center ml-2">
                <FavoriteBorderIcon style={{ fontSize: "2rem" }} />
                <ModeCommentOutlinedIcon style={{ fontSize: "1.8rem" }} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Feeds;
