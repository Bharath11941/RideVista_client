import { useEffect } from "react";
import PartnerNavbar from "../../components/partnerComponents/PartnerNavbar";
import PartnerSidebar from "../../components/partnerComponents/dashboard/PartnerSidebar";
import ReviewListTable from "../../components/partnerComponents/dashboard/booking/ReviewListTable";
import { useLocation } from "react-router-dom";
import { getReviews } from "../../api/partnerApi";
import { useState } from "react";

const ReviewsList = () => {
  const { state } = useLocation();
  const [carData, setCarData] = useState({});
  const { car } = state;
  useEffect(() => {
    getReviews(car._id)
      .then((res) => {
        console.log(res, "from useeff");
        setCarData(res?.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <PartnerNavbar />
      <div className="mx-auto flex mt-5">
        <PartnerSidebar />
        <ReviewListTable car={carData} />
      </div>
    </>
  );
};

export default ReviewsList;
