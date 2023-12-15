import PartnerNavbar from "../../components/partnerComponents/partnerCommon/PartnerNavbar";
import PartnerSidebar from "../../components/partnerComponents/dashboard/PartnerSidebar";
import BookingListTable from "../../components/userComponents/Booking/BookingListTable";
import { useSelector } from "react-redux";
import { bookingsPartner } from "../../api/partnerApi";
import { cancelBookingPartner } from "../../api/partnerApi";

const BookingListPartner = () => {
  const { partner } = useSelector((state) => state.partnerReducer);
  return (
    <>
      <PartnerNavbar />
      <div className="flex w-full mt-5">
        <PartnerSidebar />
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <BookingListTable
              id={partner._id}
              BookingList={bookingsPartner}
              cancelBooking={cancelBookingPartner}
              role="partner"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingListPartner;
