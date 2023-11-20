import React from "react";
import PartnerNavbar from "../../components/partnerComponents/PartnerNavbar";
import PartnerSidebar from "../../components/partnerComponents/dashboard/PartnerSidebar";
import CancelRequests from "../../components/partnerComponents/dashboard/booking/CancelRequests";


const CancelRequestPage = () => {
  return (
    <>
      <PartnerNavbar />
      <div className="mx-auto flex mt-5">
      <PartnerSidebar />
      <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h1 className="text-3xl px-3 mb-5 mt-5">Cancel Requests</h1>
          <CancelRequests />
        </div>
      </div>
      </div>
    </>
  );
};

export default CancelRequestPage;
