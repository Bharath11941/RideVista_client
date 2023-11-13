import { useLocation } from "react-router-dom";
import UserNavbar from "../../components/userComponents/UserNavbar";
import UserFooter from "../../components/userComponents/UserFooter";
import { useState } from "react";
import DetailsUser from "../../components/userComponents/Booking/DetailsUser";

const BookingDetailsUser = () => {
  const { state } = useLocation();
  const { data } = state;
  const [bookingData] = useState(data);

  return (
    <>
      <UserNavbar />
      <div className="container mx-auto mt-10 pb-40">
        <DetailsUser bookingData={bookingData} />
      </div>
      <UserFooter />
    </>
  );
};

export default BookingDetailsUser;
