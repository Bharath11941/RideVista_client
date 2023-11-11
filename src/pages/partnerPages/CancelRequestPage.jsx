import React from "react";
import PartnerNavbar from "../../components/partnerComponents/PartnerNavbar";
import PartnerSidebar from "../../components/partnerComponents/dashboard/PartnerSidebar";
import CancelRequests from "../../components/partnerComponents/dashboard/CancelRequests";

const CancelRequestPage = () => {
  return (
    <>
      <PartnerNavbar />
      <PartnerSidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h1 className="text-3xl px-3 mb-5 mt-5">Cancel Requests</h1>
          <CancelRequests />
        </div>
      </div>
    </>
  );
};

export default CancelRequestPage;
