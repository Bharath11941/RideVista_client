import { Navigate } from "react-router-dom";
import React from "react";
import jwtDecode from "jwt-decode";

const AdminPublic = (props) => {
  try {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        return <Navigate to="/dashboard" />;
      } else {
        <Navigate to="/admin" />;
        return props.children;
      }
    } else {
      <Navigate to="/admin" />;
      return props.children;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default AdminPublic;
