import React from "react";
import PartnerNavbar from "../../components/partnerComponents/PartnerNavbar";
import PartnerSidebar from "../../components/partnerComponents/dashboard/PartnerSidebar";
import BookingListTable from "../../components/userComponents/BookingListTable";
import { useSelector } from "react-redux";
import { bookingsPartner } from "../../api/partnerApi";
import { cancelBookingPartner } from "../../api/partnerApi";

const BookingListPartner = () => {
  const { partner } = useSelector((state) => state.partnerReducer);
  return (
    <>
      <PartnerNavbar />
      <PartnerSidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <BookingListTable id={partner._id} BookingList={bookingsPartner} cancelBooking={cancelBookingPartner} role="partner" />
        </div>
      </div>
    </>
  );
};

export default BookingListPartner;
