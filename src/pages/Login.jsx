import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";

import ApartmentIcon from "@mui/icons-material/Apartment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Swal from "sweetalert2";

import { login } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login({
        username,
        password,
      });

      localStorage.setItem(
        "token",
        response.token
      );

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome Back!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid Username or Password",
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background:
          "linear-gradient(135deg,#3B82F6,#1E293B,#0F172A)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 5,
          width: 420,
          borderRadius: 5,

          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.10)",

          border:
            "1px solid rgba(255,255,255,0.2)",

          boxShadow:
            "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <Box textAlign="center" mb={2}>
          <ApartmentIcon
            sx={{
              fontSize: 60,
              color: "#fff",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="#fff"
          gutterBottom
        >
          Hostel Management
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="#E2E8F0"
          mb={3}
        >
          Sign in to continue
        </Typography>

        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          InputLabelProps={{
            style: {
              color: "#E2E8F0",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          type={
            showPassword
              ? "text"
              : "password"
          }
          InputLabelProps={{
            style: {
              color: "#E2E8F0",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <VisibilityOff
                      sx={{
                        color: "#fff",
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        color: "#fff",
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleLogin}
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: 3,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "16px",

            background:
              "linear-gradient(45deg,#2563EB,#3B82F6)",

            "&:hover": {
              background:
                "linear-gradient(45deg,#1D4ED8,#2563EB)",
            },
          }}
        >
          Sign In
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;