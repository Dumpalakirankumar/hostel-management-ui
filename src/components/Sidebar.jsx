import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Hostels",
      path: "/hostels",
    },
    {
      name: "Rooms",
      path: "/rooms",
    },
    {
      name: "Beds",
      path: "/beds",
    },
    {
      name: "Residents",
      path: "/residents",
    },
    {
      name: "Payments",
      path: "/payments",
    },
    {
      name: "Reports",
      path: "/reports",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#0F172A",
          color: "#FFFFFF",
          borderRight: "none",
        },
      }}
    >
      <Toolbar />

      <Box
        sx={{
          textAlign: "center",
          py: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          HMS
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.name}
            onClick={() =>
              navigate(item.path)
            }
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 2,

              "&:hover": {
                backgroundColor:
                  "#1E293B",
              },
            }}
          >
            <ListItemText
              primary={item.name}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;