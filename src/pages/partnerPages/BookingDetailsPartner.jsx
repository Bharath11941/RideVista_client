import { useLocation } from "react-router-dom";
import PartnerNavbar from "../../components/partnerComponents/PartnerNavbar";
import PartnerSidebar from "../../components/partnerComponents/dashboard/PartnerSidebar";
import { useState } from "react";
import DetailsPartner from "../../components/partnerComponents/dashboard/booking/DetailsPartner";

const BookingDetailsPartner = () => {
  const { state } = useLocation();
  let { data } = state;
  const [bookingData, setBookingData] = useState(data);

  return (
    <>
      <PartnerNavbar />
      <PartnerSidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <DetailsPartner
            bookingData={bookingData}
            setBookingData={setBookingData}
          />
        </div>
      </div>
    </>
  );
};

export default BookingDetailsPartner;
