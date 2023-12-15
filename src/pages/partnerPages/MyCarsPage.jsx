import PartnerSidebar from "../../components/partnerComponents/dashboard/PartnerSidebar";
import PartnerNavbar from "../../components/partnerComponents/partnerCommon/PartnerNavbar";
import Mycars from "../../components/partnerComponents/dashboard/MyCars";
const MyCarsPage = () => {
  return (
    <>
      <PartnerNavbar />
      <div className="mx-auto w-full flex mt-5">
        <PartnerSidebar />
        <Mycars />
      </div>
    </>
  );
};

export default MyCarsPage;
