import { faCar, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { partnerReport } from "../../../../api/partnerApi";
import { useSelector } from "react-redux";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import Loading from "../../../loading/Loading";

const DashboardHome = () => {
  const { _id } = useSelector((state) => state.partnerReducer.partner);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState({});
  useEffect(() => {
    setLoading(true);
    partnerReport(_id)
      .then((res) => {
        setLoading(false);
        setReportData(res?.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, []);
  return (
    <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
      <div className="p-4 border-2 h-[610px] border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {loading ? (
          <div className="inset-0 flex w-full aspect-[2] items-center justify-center">
            <div className="spinnerouter">
              <Loading />
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
              <div className="col-span-1 grid">
                <div className="bg-white shadow-md  p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
                  <article className="icontext flex items-center">
                    <div className="ml-4 ">
                      <div className="flex gap-3">
                        <FontAwesomeIcon
                          icon={faDollarSign}
                          className="text-2xl text-blue-500" // Use the 'text' and 'text-2xl' classes to control size and color
                        />
                        <h6 className="mb-2 text-lg font-semibold text-gray-800">
                          Total Earnings
                        </h6>
                      </div>
                      <span className="text-2xl font-bold text-purple-600">
                        ₹ {reportData?.totalRevenue?.totalEarnings || 0}
                      </span>
                      <span className="font-normal pl-1 text-gray-500">
                        from {reportData?.totalRevenue?.totalBookings || 0}{" "}
                        bookings
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        earnings represent 80% of each booking
                      </p>
                    </div>
                  </article>
                </div>
              </div>
              <div className="col-span-1 grid">
                <div className="bg-white shadow-md p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
                  <article className="icontext flex items-center">
                    <div className="ml-4 ">
                      <div className="flex gap-3">
                        <FontAwesomeIcon
                          icon={faDollarSign}
                        
                          className="text-2xl text-blue-500"
                        />
                        <h6 className="mb-2 text-lg font-semibold text-gray-800">
                          Currnet month
                        </h6>
                      </div>
                      <span className="text-2xl font-bold text-purple-600">
                        ₹{" "}
                        {reportData?.currentMonthEarnings?.monthlyEarnings || 0}
                      </span>
                      <span className="font-normal pl-1 text-gray-500">
                        {`in ${reportData?.currentMonthName || ""}`}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        earnings represent 80% of each booking
                      </p>
                    </div>
                  </article>
                </div>
              </div>

              <div className="col-span-1 grid">
                <div className="bg-white shadow-md p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
                  <article className="icontext flex items-center">
                    <div className="ml-4">
                      <div className="flex gap-3">
                        <FontAwesomeIcon
                          icon={faDollarSign}
                          className="text-2xl text-blue-500"
                        />
                        <h6 className="mb-2 text-lg font-semibold text-gray-800">
                          Today revenue
                        </h6>
                      </div>
                      <span className="text-2xl font-bold text-purple-600">
                        ₹ {reportData?.todayRevenue?.todayEarnings || 0}
                      </span>
                      <span className="font-normal pl-1 text-gray-500">
                        from {reportData?.todayRevenue?.todayBookings || 0}{" "}
                        bookings
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        earnings represent 80% of each booking
                      </p>
                    </div>
                  </article>
                </div>
              </div>
              <div className="col-span-1 grid">
                <div className="bg-white shadow-md p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
                  <article className="icontext flex items-center">
                    <div className="ml-4">
                      <div className="flex gap-3">
                        <FontAwesomeIcon
                          icon={faCar}
                          className="text-2xl text-blue-500"
                        />
                        <h6 className="mb-2 text-lg font-semibold text-gray-800">
                          Total Cars
                        </h6>
                      </div>
                      <span className="text-2xl font-bold text-purple-600">
                        {reportData?.cars?.length || 0}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        Join our community and connect with cars!
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="md:w-2/3 md:h-96 w-full">
                <LineChart salesData={reportData?.salesData} />
              </div>

              <div className="md:w-1/3 h-96 w-full mt-4">
                <PieChart count={reportData?.bookingStatusCounts} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
