// src/components/Navbar.jsx

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

const Navbar = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#1E293B",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Hostel Management System
        </Typography>

        <Button
          color="inherit"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;