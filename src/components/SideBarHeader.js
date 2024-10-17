import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import bell from '../screens/Global/icons/bell.png';
import tick from '../screens/Global/icons/tick.png';
import crown from '../screens/Global/icons/crown.png';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { Box } from '@mui/material';

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

// Mock notifications
const mockNotifications = [
  "You have a new message",
  "Your post was liked",
  "New comment on your photo",
  "You have a new follower",
  "You have a new follower",
  "You have a new follower",
  "You have a new follower",
  "You have a new follower",
  "You have a new follower",
];

export const SidebarHeader = ({ children, rtl, ...rest }) => {
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('jwtToken');

  const [user, setUser] = useState([]);

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [user, id]);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/userById/${id}`, {
        headers: { Authorization: `${token}` },
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
          <img src={user.profileImage} className="h-8 w-8 rounded-full" />
          <div className="flex items-center gap-1">
            <h2>{user.username}</h2>
            {user.role === 'creator' && <img src={tick} className="h-4" />}
            {user.role === 'vip creator' && <img src={crown} className="h-4" />}
          </div>
        </div>

        <Tooltip
          title={
            <Box className='scrollable-div' sx={{ p: 0.5, width: '200px', height:'150px', overflowY:'auto' }}>
              <ul style={{listStyleType: 'disc', paddingLeft: '20px', margin:0}}>
                {mockNotifications.map((notification, index) => (
                  <li key={index} className="text-sm py-1 hover:scale-105 cursor-pointer transition-all">{notification}</li>
                ))}
              </ul>
            </Box>
          }
          arrow
          placement="bottom"
          PopperProps={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -15], 
                },
              },
            ],
          }}
          componentsProps={{
            tooltip: {
              sx: {
                backgroundImage:'linear-gradient(to top right, #8b5cf6, #ec4899)',
                color: 'white',  // Tooltip text color
                boxShadow: 3,
                borderRadius: 1,
              },
            },
            arrow: {
              sx: {
                color:'linear-gradient(to top right, #8b5cf6, #ec4899)',
              },
            },
          }}
        >
          <IconButton>
            <img src={bell} className="h-7 cursor-pointer" />
          </IconButton>
        </Tooltip>
      </div>
    </StyledSidebarHeader>
  );
};