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
      <div className="mx-auto flex mt-5">
        <PartnerSidebar />
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <DetailsPartner
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetailsPartner;
