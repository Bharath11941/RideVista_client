import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
function UserProtect(props) {
  try {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // eslint-disable-next-line react/prop-types
        return props.children;
      } else {
        toast.success("You must login first")
        return <Navigate to="/login" />;
      }
    } else {
      toast.success("You must login first")
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default UserProtect;
