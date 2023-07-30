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
import axios from "axios";
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

  const handleTogglePasswordVisibility = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Here you can handle the login process using your API endpoint or authentication logic
    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint for login
      const response = await axios.post(
        "http://localhost:1100/api/v1/auth/login",
        data
      );
      // Handle successful login here (e.g., show success message, redirect to login)
      if (response) {
        console.log("Login successful!");
        console.log(
          "Login response userId:",
          JSON.stringify(response.data.userId)
        );
        console.log("Login response:", JSON.stringify(response.data));
        if (response.data.role === "admin") {
          history("/admin");
        } else if (response.data.role === "user") {
          history("/"); // Redirect to the login page after successful signup
        }
        localStorage.setItem("userName", response.data.userName);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userId", response.data.userId);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed!",
          text: "Invalid credentials!",
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
      // Handle login error here (e.g., show error message)
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
