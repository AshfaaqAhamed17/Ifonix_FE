import axios from "axios";
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

const Signup: React.FC = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTogglePasswordVisibility = (field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: field === "showPassword" ? !prevData.showPassword : false,
      showConfirmPassword:
        field === "showConfirmPassword" ? !prevData.showConfirmPassword : false,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch here (e.g., show error message)
      console.error("Passwords do not match!");
      return;
    }

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint for signup
      // const response = await axios.post("YOUR_API_ENDPOINT", formData);
      // Handle successful signup here (e.g., show success message, redirect to login)
      console.log("Signup successful!");
      history("/"); // Redirect to the login page after successful signup
    } catch (error) {
      // Handle signup error here (e.g., show error message)
      console.error("Signup failed:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
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
                    <IconButton
                      onClick={() =>
                        handleTogglePasswordVisibility("showPassword")
                      }
                    >
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
            <TextField
              label="Confirm Password"
              type={formData.showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handleTogglePasswordVisibility("showConfirmPassword")
                      }
                    >
                      {formData.showConfirmPassword ? (
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
              Sign Up
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body1" align="center" gutterBottom>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </form>
    </Container>
  );
};

export default Signup;
