import React from "react";
import PartnerNavbar from "../../components/partnerComponents/partnerCommon/PartnerNavbar";
import PartnerSidebar from "../../components/partnerComponents/dashboard/PartnerSidebar";
import AddCar from "../../components/partnerComponents/dashboard/AddCarForm";

const AddCarPage = () => {
  return (
    <>
      <PartnerNavbar />
      <div className="mx-auto w-full flex mt-5">
        <PartnerSidebar />
        <AddCar />
      </div>
    </>
  );
};

export default AddCarPage;
