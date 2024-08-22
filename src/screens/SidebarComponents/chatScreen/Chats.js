import React, { useEffect, useState } from "react";
import logo from "../../assets/images/FUNCLUB logo.png";
import userData from "./mock-data.json";
import ChatScreen from "./ChatScreen";
import "react-responsive-modal/styles.css";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import CloseIcon from "@mui/icons-material/Close";

const Chats = ({ showChatScreen }) => {
  const navigate = useNavigate();
  const [receiver, setReceiver] = useState();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [chatScreen, setChatScreen] = useState(false);

  const handlePopup = () => {
    setOpen(!open);
  };
  useEffect(() => {
    setUsers(userData);
  }, []);

  const handleWindow = (user) => {
    localStorage.setItem("receiver", JSON.stringify(user));
    setChatScreen(true);
    if (window.innerWidth < 768) {
      navigate(`/dashboard/chat/${user._id}`);
    }
  };

  return (
    <>
      <div className="flex items-start rounded-md">
        {!showChatScreen && chatScreen && (
          <button
            className="text-white bg-main-gradient text-sm rounded-full p-1 mr-2"
            onClick={() => setChatScreen(false)}
          >
            <CloseIcon />
          </button>
        )}
        {chatScreen ? (
          <div className="sm:hidden w-full bg-main-gradient z-50 border-r-2 border-gray-400">
            <ChatScreen />
          </div>
        ) : (
          <div className="sm:hidden w-full"></div>
        )}
        <div
          className="chats scrollable-div w-[350px] bg-gradient-to-tl from-violet-500 to-pink-500  h-[96vh]
           text-white sm:w-full pb-2 overflow-y-auto"
          id="user-list"
        >
          <div className="flex gap-2 items-center px-4 py-2.5 bg-[#9759e9]">
            <img src={logo} alt="FunClub" className="w-12 " />
            <h2 className="text-xl font-semibold italic">CHATS</h2>
          </div>

          {users &&
            users.length > 0 &&
            users.map((user) => {
              return (
                <div
                  className="flex gap-8 xs:gap-3 items-center pb-3 hover:bg-[#9759e9]  transition-all py-3 px-6 cursor-pointer"
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
                    <p className="text-gray-200">Last seen</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Popup open={open} handlePopup={handlePopup} logo={logo} />
    </>
  );
};

export default Chats;
