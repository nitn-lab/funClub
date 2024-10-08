import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Suggestions = () => {
  const [data, setData] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]); 
  const token = localStorage.getItem("jwtToken"); 
  const loggedInUserId = localStorage.getItem("id");
  const navigate = useNavigate() 

  useEffect(() => {
    const fetchUsersAndFollowedList = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/users`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if(res.status === 403){
          localStorage.removeItem("jwtToken")
        }
        const userRes = await axios.get(`${BASE_URL}/api/v1/userById/${loggedInUserId}`, {
          headers: {
            Authorization: `${token}`, 
          },
        });
        const followedUsersList = userRes.data.data.following;
        const filteredData = res.data.data
          .filter(user =>
            ["creator", "verified creator", "vip creator"].includes(user.role) && user._id !== loggedInUserId
          )
          .slice(0, 6);
        setData(filteredData);
        setFollowedUsers(followedUsersList);
      } catch (error) {
        console.error("Error fetching users or followed list:", error);
      }
    };
    fetchUsersAndFollowedList();
  }, [loggedInUserId, token]);

  const toggleFollow = async (id, isFollowing) => {
    try {
      const endpoint = isFollowing
        ? `${BASE_URL}/api/v1/unfollow/${id}`
        : `${BASE_URL}/api/v1/follow/${id}`;

      const res = await axios.put(endpoint, {}, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setFollowedUsers(prev =>
        isFollowing
          ? prev.filter(userId => userId !== id)
          : [...prev, id]
      );
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };
  const isUserFollowing = (userId) => {
    return followedUsers.includes(userId);
  };

  return (
    <div className="font-light">
      <h2 className="font-medium text-lg text-primary-dark mt-2 mb-2">
        Suggested for you
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {data && data.length > 0 && data.map((item) => {
          const isFollowing = isUserFollowing(item._id);
          return (
            <div key={item._id} className="bg-primary-dark rounded-md py-1 hover:scale-[1.01] cursor-pointer text-primary-light" onClick={() => navigate(`/dashboard/user/${item._id}`)}>
              <div className="flex-col items-center justify-center">
                <div className="ml-6">
                  <img
                    src={item.profileImage}
                    alt={item.username}
                    className="object-cover h-14 bg-black w-14 rounded-full"
                  />
                </div>
                <h3 className="text-base mx-3 my-0.5 font-medium text-center truncate">
                  {item.username}
                </h3>
              </div>
              <div className="flex justify-center">
                <div
                  className="flex w-fit items-center bg-main-gradient text-white rounded-md px-2 py-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFollow(item._id, isFollowing);
                  }}
                >
                  {isFollowing ? (
                    <DoneAllIcon style={{ fontSize: "1rem" }} />
                  ) : (
                    <GroupAddIcon style={{ fontSize: "1rem" }} />
                  )}
                  <span className="ml-1 text-sm">
                    {isFollowing ? "Following" : "Follow"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Suggestions;