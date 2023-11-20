import AdminNavbar from "../../components/adminComponents/AdminNavbar";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import CarListTable from "../../components/adminComponents/CarListTable";

const CarListPage = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto flex mt-5">
        <AdminSidebar />
        <CarListTable />
      </div>
    </>
  );
};

export default CarListPage;
