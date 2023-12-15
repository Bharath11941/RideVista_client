import React from "react";
import AdminNavbar from "../../components/adminComponents/AdminNavbar";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import DashBoardBody from "../../components/adminComponents/dashBoard/DashBoardBody";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto w-full flex mt-5">
        <AdminSidebar />
        <DashBoardBody />
      </div>
    </>
  );
};

export default AdminDashboard;
