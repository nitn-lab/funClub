import styled from "@emotion/styled";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { Typography } from './Typography';

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
  return (
    <StyledSidebarHeader {...rest}>
      <div className="flex items-center justify-between">
        <StyledLogo rtl={rtl}>
          <div className="flex items-center gap-x-2">
            <img
              src="https://images.pexels.com/photos/2318543/pexels-photo-2318543.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="h-10 w-10 rounded-full"
            />

            <h2>Name</h2>
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
