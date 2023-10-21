import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const UserPublic = (props) => {
  try {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        return <Navigate to="/" />;
      } else {
        <Navigate to="/login" />;
        return props.children;
      }
    } else {
      <Navigate to="/login" />;
      return props.children;
    }
  } catch (error) {
    console.log(error.message);
  }
};
export default UserPublic;
