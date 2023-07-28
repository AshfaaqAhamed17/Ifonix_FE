import { useState } from "react";
import { Navigate } from "react-router-dom";
import Admin from "./pages/admin";

function ProtectedRoute() {
  const [admin, _setAdmin] = useState(
    localStorage.getItem("role") === "admin" ? true : false
  );

  return admin ? <Admin /> : <Navigate to="/" />;
}

export default ProtectedRoute;
