import React from "react";
import { Box, Typography } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { SidebarHeader } from "../../components/SideBarHeader";
import {  NavLink } from "react-router-dom";
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
import home from '../Global/icons/home-button.png'
import live from '../Global/icons/live-tv.png'
import nearby from '../Global/icons/nearby.png'


function Sidebarr(props) {
  const Theme = "light" | "dark";

  const [toggled, setToggled] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [theme, setTheme] = React.useState("light");

  const themes = {
    light: {
      sidebar: {
        backgroundColor: "#000000",
        color: "#ffffff",
       
      },
      menu: {
        menuContent: "#000000",
        icon: "#000000",
        hover: {
          backgroundColor: "#c493e2",
          color: "#ffffff",
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
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div
      style={{
        display: "flex",
        direction: "ltr",
      }}
      className=" h-[96vh] md:h-[87vh]"
    >
      <Sidebar
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
        <SidebarHeader style={{ marginTop: "10px", marginLeft:"10px" }} />
        <div style={{ flex: 1, marginBottom: "2px" }}>
          <Menu
            menuItemStyles={{
              button: {
                "&.active": {
                  backgroundColor: "#c4b678",
                },
                "&:hover": {
                  
                  color: "black",
                  marginLeft: "6px",
                  marginRight: "6px",
                  borderRadius : "5px"
                },
              },
            }}
          >
            <MenuItem component={<NavLink to="/dashboard" end/>} icon={<Box component="img" src={home} alt={home}/>}> Home </MenuItem>
            <MenuItem component={<NavLink to="/dashboard/live" end/>} icon={<Box component="img" src={live} alt={live}/>}> Live </MenuItem>
            <MenuItem component={<NavLink to="/dashboard/nearby" end/>} icon={<Box component="img" src={nearby} alt={nearby}/>}> Nearby </MenuItem>
            <MenuItem component={<NavLink to="/dashboard/feeds" end/> } icon={<GridViewRoundedIcon />}> Feeds </MenuItem>
            <MenuItem component={<NavLink to="/dashboard/suggestions" end/> } icon={<LightbulbIcon />}> Suggestions </MenuItem>
            <MenuItem component={<NavLink to="/dashboard/chats" end/> } icon={<QuestionAnswerIcon />}>
              Chats <span className="bg-main-gradient text-sm rounded-full px-1 py-0.5 ml-3">11</span>
            </MenuItem>
            <MenuItem icon={<PaidIcon />}> Subscription details </MenuItem>
            <MenuItem icon={<CollectionsIcon />}> Collections </MenuItem>
            <MenuItem component={<NavLink to="/dashboard/profile" end/> } icon={<AccountCircleIcon />}> My Profile </MenuItem>
            <MenuItem icon={<SecurityIcon />}> Platform Privacy Policy </MenuItem>
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