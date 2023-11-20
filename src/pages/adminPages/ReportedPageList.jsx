import React from "react";
import AdminNavbar from "../../components/adminComponents/AdminNavbar";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import ReportedList from "../../components/common/ReportedList";
import { useLocation } from "react-router-dom";
const ReportedPageList = () => {
  const {state} = useLocation()
  const data = state
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto flex mt-5">
      <AdminSidebar />
      <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <ReportedList data={data}/>
        </div>
      </div>
      </div>
    </>
  );
};

export default ReportedPageList;
