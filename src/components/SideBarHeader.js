import styled from "@emotion/styled";
import React from "react";
// import { Typography } from './Typography';

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

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
      <div style={{ display: "flex", alignItems: "center" }}>
        <StyledLogo rtl={rtl}>
          <div className="avatar">
            <div className="rounded-full ">
              <img src="https://images.pexels.com/photos/2318543/pexels-photo-2318543.jpeg?auto=compress&cs=tinysrgb&w=600" />
            </div>
          </div>
          
        </StyledLogo>
        {/* <Typography variant="subtitle1" fontWeight={700} color="#0098e5">
            Pro Sidebar
          </Typography> */}
          <h2 className="text-black">Name</h2>
      </div>
    </StyledSidebarHeader>
  );
};
