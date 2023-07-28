import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./pages/home";

function ProtectedUserRoute() {
  const history = useNavigate();

  const [parent, _setParent] = useState(
    localStorage.getItem("role") === "user" ? true : null
  );

  return parent ? <Home /> : history("/");
}
export default ProtectedUserRoute;
