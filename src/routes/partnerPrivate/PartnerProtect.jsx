import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PartnerProtect = (props) => {
  try {
    const token = localStorage.getItem("partnerToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // eslint-disable-next-line react/prop-types
        return props.children;
      } else {
        return <Navigate to="/partner/login" />;
      }
    } else {
      return <Navigate to="/partner/login" />;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default PartnerProtect;
