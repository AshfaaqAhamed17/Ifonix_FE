import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import PostDetails from "./pages/postdetails";
import UserProfile from "./pages/userprofile";
import Admin from "./pages/admin";

function App() {
  const isAuthenticated =
    localStorage.getItem("role") === "admin" ? true : false;
  console.log("isAuthenticated:", isAuthenticated);

  const isLoggedIn = localStorage.getItem("userId") ? true : false;
  console.log("isLoggedIn:", isLoggedIn);
  return (
    <>
      {/* Routes are handled here */}
      <BrowserRouter>
        <Routes>
          {/* Enable these routes only if user is logged in */}
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/user/:userId" element={<UserProfile />} />

              {/* Admin component for adim user only */}
              {isAuthenticated ? (
                // Show Admin component only for authenticated users
                <Route path="/admin" element={<Admin />} />
              ) : (
                // Redirect unauthenticated users to the home page
                <Route path="/admin" element={<Navigate to="/" />} />
              )}
            </>
          ) : (
            <>
              {/* Enable these routes is user is not logged in */}
              <Route path="/*" element={<Navigate to="/login" />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* Admin component for adim user only */}
              {isAuthenticated ? (
                // Show Admin component only for authenticated users
                <Route path="/admin" element={<Admin />} />
              ) : (
                // Redirect unauthenticated users to the home page
                <Route path="/admin" element={<Navigate to="/" />} />
              )}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
