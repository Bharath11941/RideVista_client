import { Routes, Route } from "react-router-dom";
import UserSignup from "../pages/userPages/UserSignup";
import Otp from "../pages/userPages/Otp";
import UserLogin from "../pages/userPages/UserLogin";
import UserHome from "../pages/userPages/UserHome";
import UserPublic from "./userPrivate/UserPublic";
import UserProtect from "./userPrivate/UserProtect";
import ForgetPassword from "../pages/userPages/ForgetPassword";
import ResetPassword from "../pages/userPages/ResetPassword";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route
        path="/signup"
        element={
          <UserPublic>
            <UserSignup />
          </UserPublic>
        }
      />
      <Route
        path="/otp"
        element={
          <UserPublic>
            <Otp />
          </UserPublic>
        }
      />
      <Route
        path="/login"
        element={
          <UserPublic>
            <UserLogin />
          </UserPublic>
        }
      />
      <Route
        path="/forgetPassword"
        element={
          <UserPublic>
            <ForgetPassword />
          </UserPublic>
        }
      />
      <Route
        path="/resetPassword/:id/:token"
        element={
          <UserPublic>
            <ResetPassword/>
          </UserPublic>
        }
      />
    </Routes>
  );
};

export default UserRoute;
