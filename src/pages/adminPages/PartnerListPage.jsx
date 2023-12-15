import AdminNavbar from "../../components/adminComponents/AdminNavbar";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import PartnerList from "../../components/adminComponents/PartnerList";
const PartnerListPage = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto w-full flex mt-5">
      <AdminSidebar />
      <PartnerList />
      </div>
    </>
  );
};

export default PartnerListPage;
