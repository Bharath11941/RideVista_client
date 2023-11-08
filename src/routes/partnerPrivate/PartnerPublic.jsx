import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { partnerLogout } from "../../reduxStore/slices/partnerSlice";
import { toast } from "react-toastify";
const PartnerPublic = (props) => {
  const dispatch = useDispatch()
  try {
    const token = localStorage.getItem("partnerToken");
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        return <Navigate to="/partner" />;
      } else {
        localStorage.removeItem("partnerToken")
        dispatch(partnerLogout())
        toast.success("You must login first");
        <Navigate to="/partner/login" />;
        return props.children;
      }
    } else {
      <Navigate to="/partner/login" />;
      return props.children;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default PartnerPublic;
