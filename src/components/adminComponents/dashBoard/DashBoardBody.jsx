import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { adminReport, partnerList, usersList } from "../../../api/adminApi";
import { useState } from "react";
import LineChart from "./LineChart";
import Trending from "./Trending";

const DashBoardBody = () => {
  const [users, setUsers] = useState([]);
  const [partners, setPartners] = useState([]);
  const [reportData, setReportData] = useState({});
  useEffect(() => {
    usersList().then((res) => {
      setUsers(res?.data?.users);
    });
    partnerList().then((res) => {
      setPartners(res?.data?.partners);
    });
    adminReport().then((res) => {
      setReportData(res?.data);
      console.log(res?.data);
    });
  }, []);
  return (
    <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1">
          <div className="bg-white md:h-44 shadow-md  p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
              <article className="icontext flex items-center">
                <div className="ml-4 ">
                  <div className="flex gap-3">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      size="2xl"
                      style={{ color: "#3f83f8" }}
                    />
                    <h6 className="mb-2 text-lg font-semibold text-gray-800">
                      Total Earnings
                    </h6>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    ₹ {reportData?.totalRevenue?.totalEarnings || 0}
                  </span>
                  <span className="font-normal pl-1 text-gray-500">
                    from {reportData?.totalRevenue?.totalBookings || 0} bookings
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    earnings represent 20% of each booking
                  </p>
                </div>
              </article>
            </div>
          </div>
          <div className="col-span-1">
          <div className="bg-white md:h-44 shadow-md  p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
              <article className="icontext flex items-center">
                <div className="ml-4 ">
                  <div className="flex gap-3">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      size="2xl"
                      style={{ color: "#3f83f8" }}
                    />
                    <h6 className="mb-2 text-lg font-semibold text-gray-800">
                      Currnet month
                    </h6>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    ₹ {reportData?.currentMonthEarnings?.monthlyEarnings || 0}
                  </span>
                  <span className="font-normal pl-1 text-gray-500">
                    {`in ${reportData?.currentMonthName}`}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    earnings represent 20% of each booking
                  </p>
                </div>
              </article>
            </div>
          </div>
          <div className="col-span-1">
          <div className="bg-white md:h-44 shadow-md  p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
              <article className="icontext flex items-center">
                <div className="ml-4">
                  <div className="flex gap-3">
                    <FontAwesomeIcon
                      icon={faUser}
                      size="2xl"
                      style={{ color: "#3f83f8" }}
                    />
                    <h6 className="mb-2 text-lg font-semibold text-gray-800">
                      Total Users
                    </h6>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    0{users?.length}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    Join our community and connect with users!
                  </p>
                </div>
              </article>
            </div>
          </div>
          <div className="col-span-1">
          <div className="bg-white md:h-44 shadow-md  p-6 mb-4 rounded-lg transition-transform transform hover:scale-105">
              <article className="icontext flex items-center">
                <div className="ml-4">
                  <div className="flex gap-3">
                    <FontAwesomeIcon
                      icon={faUser}
                      size="2xl"
                      style={{ color: "#3f83f8" }}
                    />
                    <h6 className="mb-2 text-lg font-semibold text-gray-800">
                      Total Partners
                    </h6>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    0{partners?.length}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    Join our community and connect with partners!
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="md:w-2/3 mt-4 md:h-96 w-full">
            <LineChart
              usersByYear={reportData?.usersData}
              partnersByYear={reportData?.partnersData}
            />
          </div>
          <div className="md:w-1/3 h-96 w-full mt-6">
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Trending Cars
                </h5>
              </div>
              {reportData?.trendingCarsDetails && reportData?.trendingCarsDetails.length > 0 ? (
                reportData?.trendingCarsDetails.map((data) => (
                  <div
                    key={data?._id}
                  >
                    <Trending trendings={data} />
                  </div>
                ))
              ) : (
                <div className="bg-white p-4 rounded-md shadow-md">
                  <p className="text-gray-500">No trending cars found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardBody;
