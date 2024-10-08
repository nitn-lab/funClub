import React, { useEffect, useState } from "react";
import logo from "../../assets/images/FUNCLUB logo.png";
import ChatScreen from "./ChatScreen";
import "react-responsive-modal/styles.css";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Chats = ({ showChatScreen }) => {
  const navigate = useNavigate();
  const [receiver, setReceiver] = useState();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [chatScreen, setChatScreen] = useState(false);
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('jwtToken');
  const [following, setFollowing] = useState([])

  const handlePopup = () => {
    setOpen(!open);
  };

  const handleWindow = (user) => {
    localStorage.setItem("receiver", JSON.stringify(user))
    setChatScreen(true);
    if (window.innerWidth < 768) {
      navigate(`/dashboard/chat/${user._id}`);
    }
  };

  useEffect(() => {
    const loggedInUser = async () => {
      try{
        const res = await axios.get(`${BASE_URL}/api/v1/userById/${id}`, {
          headers: { authorization: `${token}` },
        });
        setFollowing(res.data.data.following);
      }
      catch (err) {
        console.log('Error fetching user data', err);
      }
    }
    loggedInUser();
  }, [id, token])

  useEffect(() => {
    if (following && following.length > 0) {
      const fetchUsers = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/v1/users`, {
            headers: { authorization: `${token}` },
          });
          const data = res.data.data.filter((user) => {
            return following.includes(user._id);
          });
          setUsers(data)
        }
        catch (err) {
          console.log('Error fetching users', err)
        }
      }
      fetchUsers();
    }
  }, [following, token])

  return (
    <>
      <div className="flex items-start rounded-md">
        {!showChatScreen && chatScreen && (
          <button
            className="text-white bg-main-gradient text-sm rounded-full p-1"
            onClick={() => setChatScreen(false)}
          >
            <CloseIcon />
          </button>
        )}
       
        {chatScreen ? (
          <div className={`sm:hidden w-full  z-50 `}>
            <ChatScreen showChatScreen={showChatScreen} />
          </div>
        ) : (
          <div className="sm:hidden w-full text-black"></div>
        )}
        <div
          className="chats scrollable-div w-[350px] bg-black  h-[100vh]
           text-white sm:w-full pb-2 overflow-y-auto  shadow-lg"
          id="user-list"
        >
          <div className="flex gap-2 items-center px-4 py-2 bg-fuchsia-800">
            <img src={logo} alt="FunClub" className="w-12 " />
            <h2 className="text-xl font-medium italic">CHATS</h2>
          </div>

          {users &&
            users.length > 0 &&
            users.map((user) => {
              return (
                <div
                  className="flex gap-8 xs:gap-3 items-center pb-3 hover:bg-fuchsia-800 hover:scale-105  transition-all py-3 px-6 cursor-pointer"
                  onClick={() => {
                    setReceiver(user);
                    handleWindow(user);
                    setOpen(true);
                  }}
                >
                  <div className="relative">
                    <img
                      src={
                        user.profileImage === ""
                          ? `https://avatar.iran.liara.run/username?username=${user.firstname}+${user.lastname}`
                          : user.profileImage
                      }
                      alt="user"
                      className="rounded-full h-12 w-12 object-cover "
                    />
                    <div className="online-status h-3 w-3  bg-[#05fc4f] rounded-full absolute top-1"></div>
                  </div>
                  <div>
                    <h3 className="font-base text-base">{user.username}</h3>
                    <p className="text-gray-200 text-sm font-light">Last seen</p>
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
