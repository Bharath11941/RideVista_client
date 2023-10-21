import { Navigate } from "react-router-dom";

import React from "react";
import jwtDecode from "jwt-decode";

const AdminProtect = (props) => {
  try {
    const token = localStorage.getItem("adminToken");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // eslint-disable-next-line react/prop-types
        return props.children;
      } else {
        return <Navigate to="/admin" />;
      }
    } else {
      return <Navigate to="/admin" />;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default AdminProtect;
