import React from "react";
import { Box, Typography } from "@mui/material";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { SidebarHeader } from "../../components/SideBarHeader";
function Sidebarr() {
  const Theme = "light" | "dark";

  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [theme, setTheme] = React.useState("light");

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
        display: "flex",
        height: "100%",
        direction: "ltr",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        breakPoint="md"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <SidebarHeader style={{ marginBottom: "24px", marginTop: "16px" }} />
        <div style={{ flex: 1, marginBottom: "32px" }}>
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
            <MenuItem> Home </MenuItem>
            <MenuItem> Live </MenuItem>
            <MenuItem> Nearby </MenuItem>
            <MenuItem> Feeds </MenuItem>
            <MenuItem> Suggestion </MenuItem>
            <MenuItem> Chats </MenuItem>
            <MenuItem> Subscription details </MenuItem>
            <MenuItem> Collections </MenuItem>
            <MenuItem> My Profile </MenuItem>
            <MenuItem> Platform Privacy Policy </MenuItem>
            <MenuItem> Terms & Condition </MenuItem>
            <MenuItem> Settings </MenuItem>
            <MenuItem> Help & Support </MenuItem>
            <MenuItem> Sign Out </MenuItem>
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
}

export default Sidebarr;
