import React, { useEffect, useState } from "react";
import logo from "../assets/images/FUNCLUB logo.png";
import userData from "./mock-data.json";
import ChatScreen from "./ChatScreen";
import 'react-responsive-modal/styles.css';
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";


const Chats = () => {
  const navigate = useNavigate();
  const [receiver, setReceiver] = useState();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const handlePopup = () => {
    setOpen(!open);
  }
  useEffect(() => {
    setUsers(userData);
  }, []);

  const handleWindow = (user) => {
    localStorage.setItem("receiver", JSON.stringify(user));
    if (window.innerWidth < 768) {
      navigate(`/chat/${user._id}`);
    }
  };

  return (
    <>
      <div className="flex">
      <div className="sm:hidden w-full">
          <ChatScreen />
        </div>
        <div
          className=" w-96 bg-[#6f72ba] h-svh
           text-white sm:w-full pb-2 overflow-y-auto"
          id="user-list"
        >
          <div className="flex gap-2 items-center p-4 bg-[#5c5fa1] ">
            <img src={logo} alt="FunClub" className="w-12 " />
            <h2 className="text-xl font-semibold italic">FUNCLUB</h2>
          </div>

          {users &&
            users.length > 0 &&
            users.map((user) => {
              return (
                <div
                  className="flex gap-8 xs:gap-3 items-center pb-3 hover:bg-[#f43f7a]  transition-all py-3 px-6 cursor-pointer xs:px-2"
                  onClick={() => {
                    setReceiver(user);
                    handleWindow(user);
                    setOpen(true);
                  }}
                >
                  <div className="relative">
                    <img
                      src={
                        user.profile_url === ""
                          ? `https://avatar.iran.liara.run/username?username=${user.firstname}+${user.lastname}`
                          : user.profile_url
                      }
                      alt="user"
                      className="rounded-full h-14 w-14 object-cover "
                    />
                    <div className="online-status h-3 w-3  bg-[#05fc4f] rounded-full absolute top-1"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user.firstname}</h3>
                    <p className="text-gray-200 xs:hidden">Last seen</p>
                  </div>
                </div>
              );
            })}
        </div>

        
      </div>
      <Popup open={open} handlePopup={handlePopup} logo={logo}/>
    </>
  );
};

export default Chats;
