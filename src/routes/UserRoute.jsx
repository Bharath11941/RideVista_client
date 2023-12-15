import { Routes, Route } from "react-router-dom";
import UserSignup from "../pages/userPages/UserSignup";
import Otp from "../pages/userPages/Otp";
import UserLogin from "../pages/userPages/UserLogin";
import UserHome from "../pages/userPages/UserHome";
import UserPublic from "./userPrivate/UserPublic";
import UserProtect from "./userPrivate/UserProtect";
import ForgetPassword from "../pages/userPages/ForgetPassword";
import ResetPassword from "../pages/userPages/ResetPassword";
import PageNotFound from "../components/error/PageNotFound";
import AllCars from "../pages/userPages/AllCars";
import SingleCarDetails from "../pages/userPages/SingleCarDetails";
import BookingSuccessPage from "../pages/userPages/BookingSuccessPage";
import CheckOutPage from "../pages/userPages/CheckOutPage";
import BookingList from "../pages/userPages/BookingList";
import ProfilePage from "../pages/userPages/ProfilePage";
import BookingDetailsUser from "../pages/userPages/BookingDetailsUser";
import WalletHistoryPage from "../pages/userPages/WalletHistoryPage";
import Error500 from "../components/error/500";
import ChatPage from "../pages/userPages/ChatPage";
import UserContactPage from "../pages/userPages/UserContactPage";
import AboutPage from "../pages/userPages/AboutPage";

const UserRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/contact" element={<UserContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/allCars" element={<AllCars />} />
      <Route path="/carDetails" element={<SingleCarDetails />} />
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
            <ResetPassword />
          </UserPublic>
        }
      />
      <Route
        path="/checkOut"
        element={
          <UserProtect>
            <CheckOutPage />
          </UserProtect>
        }
      />
      <Route
        path="/bookingSuccess"
        element={
          <UserProtect>
            <BookingSuccessPage />
          </UserProtect>
        }
      />
      <Route
        path="/bookingList"
        element={
          <UserProtect>
            <BookingList />
          </UserProtect>
        }
      />
      <Route
        path="/profile"
        element={
          <UserProtect>
            <ProfilePage />
          </UserProtect>
        }
      />
      <Route
        path="/bookingDetails"
        element={
          <UserProtect>
            <BookingDetailsUser />
          </UserProtect>
        }
      />
      <Route
        path="/walletHistory"
        element={
          <UserProtect>
            <WalletHistoryPage />
          </UserProtect>
        }
      />
      <Route
        path="/chat"
        element={
          <UserProtect>
            <ChatPage />
          </UserProtect>
        }
      />

      <Route path="*" element={<PageNotFound />} />
      <Route path="/pageNotFound" element={<PageNotFound />} />
      <Route path="/error-500" element={<Error500 />} />
    </Routes>
  );
};

export default UserRoute;
