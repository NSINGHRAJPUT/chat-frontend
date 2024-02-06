import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Protected(props) {
  const cookie = new Cookies();
  const token = cookie.get("token");
  if (!token) {
    return <Navigate to="/login"></Navigate>;
  }
  return <>{props.children}</>;
}

export default Protected;
