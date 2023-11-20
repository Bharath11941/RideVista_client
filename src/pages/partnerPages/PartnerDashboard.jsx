import React from "react";
import PartnerSidebar from "../../components/partnerComponents/dashboard/PartnerSidebar";
import PartnerNavbar from "../../components/partnerComponents/PartnerNavbar";
import DashboardHome from "../../components/partnerComponents/dashboard/home/DashboardHome";

const PartnerDashboard = () => {
  return (
    <>
      <PartnerNavbar />
      <div className="mx-auto flex mt-5">
        <PartnerSidebar />
        <DashboardHome />
      </div>
    </>
  );
};

export default PartnerDashboard;
