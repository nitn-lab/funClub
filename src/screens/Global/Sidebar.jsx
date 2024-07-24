import React, {useEffect} from "react";
import { Box, Typography } from "@mui/material";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import { SidebarHeader } from "../../components/SideBarHeader";
import { useNavigate } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import VideocamIcon from '@mui/icons-material/Videocam';
import PaidIcon from '@mui/icons-material/Paid';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SecurityIcon from '@mui/icons-material/Security';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CollectionsIcon from '@mui/icons-material/Collections';
import AssignmentIcon from '@mui/icons-material/Assignment';


function  Sidebarr(props) {
  const Theme = "light" | "dark";

  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [theme, setTheme] = React.useState("light");
 

  const handleClick = () => {
    const data = "chats"
    props.sendData(data)
  }



  const themes = {
    light: {
      sidebar: {
        backgroundColor: "#ffffff",
        color: "#607489",
      },
      menu: {
        menuContent: "#fbfcfd",
        icon: "#0098e5",
        hover: {
          backgroundColor: "#c5e4ff",
          color: "#44596e",
        },
        disabled: {
          color: "#9fb6cf",
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: "#0b2948",
        color: "#8ba1b7",
      },
      menu: {
        menuContent: "#082440",
        icon: "#59d0ff",
        hover: {
          backgroundColor: "#00458b",
          color: "#b6c8d9",
        },
        disabled: {
          color: "#3e5e7e",
        },
      },
    },
  };

  // hex to rgba converter
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div
      style={{
        display : "flex",
        direction: "ltr",
        height : "100vh"
      }}
    >
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
          
        }}
      >
     
        <SidebarHeader style={{ marginTop: "16px" }} />
        <div style={{ flex: 1, marginBottom: "2px" }}>
          {/* <div style={{ padding: "0 24px", marginBottom: "8px" }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px", color: 'black'}}
            >
              Home
            </Typography>
          </div>
          <div style={{ padding: "0 24px", marginBottom: "8px" }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px", color: 'black'}}
            >
              Live
            </Typography>
          </div>
          <div style={{ padding: "0 24px", marginBottom: "8px" }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px", color: 'black'}}
            >
              Nearby
            </Typography>
          </div>
          <div style={{ padding: "0 24px", marginBottom: "8px" }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px", color: 'black'}}
            >
              Feeds
            </Typography>
          </div>
          <div style={{ padding: "0 24px", marginBottom: "8px" }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px", color: 'black'}}
            >
              Suggestions
            </Typography>
          </div>
          <div style={{ padding: "0 24px", marginBottom: "8px" }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px", color: 'black'}}
            >
              Chat
            </Typography>
          </div>
           */}
          <Menu>
            <MenuItem icon={<HomeIcon />}> Home </MenuItem>
            <MenuItem icon={<VideocamIcon />}> Live </MenuItem>
            <MenuItem icon={<LocationOnIcon />}> Nearby </MenuItem>
            <MenuItem icon={<GridViewRoundedIcon />}> Feeds </MenuItem>
            <MenuItem icon={<LightbulbIcon />}> Suggestion </MenuItem>
            <MenuItem icon={<QuestionAnswerIcon />} onClick = {handleClick}> Chats </MenuItem>
            <MenuItem icon={<PaidIcon />}> Subscription details </MenuItem>
            <MenuItem icon={<CollectionsIcon />}> Collections </MenuItem>
            <MenuItem icon={<AccountCircleIcon />}> My Profile </MenuItem>
            <MenuItem icon={<SecurityIcon/>}> Platform Privacy Policy </MenuItem>
            <MenuItem icon={<AssignmentIcon />}> Terms & Condition </MenuItem>
            <MenuItem icon={<SettingsIcon />}> Settings </MenuItem>
            <MenuItem icon={<HelpIcon />}> Help & Support </MenuItem>
            <MenuItem icon={<LogoutIcon />}> Sign Out </MenuItem>
          </Menu>
        </div>
      </Sidebar>
      
    </div>
  );
}

export default Sidebarr;
