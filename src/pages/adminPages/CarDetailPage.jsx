import AdminNavbar from "../../components/adminComponents/AdminNavbar";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import CarDetails from "../../components/adminComponents/CarDetails";


const CarDetailPage = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto flex mt-5">
      <AdminSidebar />
      
      <CarDetails />
      </div>
    </>
  );
};

export default CarDetailPage;
