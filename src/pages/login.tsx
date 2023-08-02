// Login page to handle user login

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../api";
import Swal from "sweetalert2";

function Login() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Handle the login process
    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };
      const response = await api.post("/auth/login", data);
      if (response) {
        console.log("Login successful!");
        console.log(
          "Login response userId:",
          JSON.stringify(response.data.userId)
        );
        console.log("Login response:", JSON.stringify(response.data));
        if (response.data.role === "admin") {
          history("/admin"); // Redirect to admin page
        } else if (response.data.role === "user") {
          history("/"); // Redirect to home page
        }
        localStorage.setItem("userName", response.data.userName);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userId", response.data.userId);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed!",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Invalid credentials!",
        showConfirmButton: false,
        timer: 2000,
      });
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Container maxWidth="sm" className="">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type={formData.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {formData.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Login
              </Button>
            </Grid>
          </Grid>
          <Typography variant="body1" align="center" gutterBottom>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </form>
      </Container>
    </div>
  );
}

export default Login;
