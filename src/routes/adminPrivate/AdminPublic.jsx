import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../reduxStore/slices/adminSlice";


const AdminPublic = (props) => {
  const dispatch = useDispatch()
  try {
    const token = localStorage.getItem("adminToken");
    console.log(token)
    console.log("hi from outside amdin public")
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        localStorage.removeItem("adminToken");
        dispatch(adminLogout());
        <Navigate to="/admin" />;
        toast.success("You need to login first")
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
