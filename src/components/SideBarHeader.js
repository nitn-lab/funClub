import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from 'axios';
// import { Typography } from './Typography';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const StyledLogo = styled.div`
  width: 45px;
  min-width: 45px;
  height: 45px;
  min-height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  ${(props) =>
    props.rtl
      ? `
      margin-left: 10px;
      margin-right: 4px;
      `
      : `
      margin-right: 10px;
      margin-left: 4px;
      `}
`;

export const SidebarHeader = ({ children, rtl, ...rest }) => {
  const id = localStorage.getItem('id');
const token = localStorage.getItem('jwtToken');

const [user, setUser] = useState([]);

useEffect(() => {
  if (id) {
    fetchUserData(id);
  }
}, [id]);

const fetchUserData = async (id) => {

  try {
    const response = await axios.get (`${BASE_URL}/api/v1/userById/${id}`, {
      headers: { Authorization:  `${token} `},
    });

    setUser(response.data.data);
  } catch (error) {
    console.error('Failed to fetch user data', error);

  }
};
  return (
    <StyledSidebarHeader {...rest}>
      <div className="flex items-center justify-between">
        <StyledLogo rtl={rtl}>
          <div className="flex items-center gap-x-2 ml-3">
            <img
              src={user.profileImage}
              className="h-10 w-10 rounded-full"
            />

            <h2>{user.username}</h2>
          </div>
        </StyledLogo>
        {/* <Typography variant="subtitle1" fontWeight={700} color="#0098e5">
            Pro Sidebar
          </Typography> */}

        <div className="bg-main-gradient p-1 rounded-full mr-2">
        <NotificationsIcon />
        </div>
      </div>
    </StyledSidebarHeader>
  );
};
