import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Signup from "./pages/signup";
import Login from "./pages/login";
import PostDetails from "./pages/postdetails";
import UserProfile from "./pages/userprofile";
import Admin from "./pages/admin";

function App() {
  const isAuthenticated =
    localStorage.getItem("role") === "admin" ? true : false;
  console.log("isAuthenticated:", isAuthenticated);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />F
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/user/:userId" element={<UserProfile />} />

          {isAuthenticated ? (
            // Show Admin component only for authenticated users
            <Route path="/admin" element={<Admin />} />
          ) : (
            // Redirect unauthenticated users to the home page
            <Route path="/admin" element={<Navigate to="/" />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
