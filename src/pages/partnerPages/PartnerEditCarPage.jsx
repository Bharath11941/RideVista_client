import EditCar from "../../components/partnerComponents/dashboard/EditCar";
import PartnerSidebar from "../../components/partnerComponents/dashboard/PartnerSidebar";
import PartnerNavbar from "../../components/partnerComponents/PartnerNavbar";

const PartnerEditCarPage = () => {
  return (
    <>
      <PartnerNavbar />
      <div className="mx-auto flex mt-5">
        <PartnerSidebar />
        <EditCar />
      </div>
    </>
  );
};

export default PartnerEditCarPage;
