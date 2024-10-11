import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import bell from '../screens/Global/icons/bell.png';
import tick from '../screens/Global/icons/tick.png';
import crown from '../screens/Global/icons/crown.png';
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
      <div className="flex items-center justify-between mx-3 py-5">
       
          <div className="flex items-center gap-x-1.5">
            <img
              src={user.profileImage}
              className="h-8 w-8 rounded-full"
            />

            <div className="flex items-center gap-1">
            <h2>{user.username}</h2>
            {user.role === 'creator' && <img src={tick} className="h-4"/>}
            {user.role === 'vip creator' && <img src={crown} className="h-4"/>}
            </div>
          </div>
        
        {/* <Typography variant="subtitle1" fontWeight={700} color="#0098e5">
            Pro Sidebar
          </Typography> */}

       <img src={bell} className="h-7"/>
      </div>
    </StyledSidebarHeader>
  );
};
