import React from "react";
import AdminNavbar from "../../components/adminComponents/AdminNavbar";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import BookingDetails from "../../components/adminComponents/BookingDetails";
import { useLocation } from "react-router-dom";

const BookingDetailsPage = () => {
  const { state } = useLocation();
  let { data } = state;
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto flex mt-5">
        <AdminSidebar />
        <BookingDetails bookingData={data} />
      </div>
    </>
  );
};

export default BookingDetailsPage;
