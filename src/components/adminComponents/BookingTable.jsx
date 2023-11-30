
import Loading from "../loading/Loading";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import { totalBookings } from "../../api/adminApi";


const BookingTable = () => {
  const [bookingList, setBookingList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const dataPerPage = 5;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const carsInSinglePage = bookingList.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(bookingList.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
      totalBookings().then((res) => {
        setLoading(false);
        setBookingList(res?.data?.bookingList);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, []);

  function getStatusColor(status) {
    switch (status) {
      case "Pending":
        return "bg-yellow-500"; // Example yellow color
      case "Success":
        return "bg-green-500"; // Example green color
      case "Cancelled":
        return "bg-red-500"; // Example red color
      case "Delivered":
        return "bg-green-500";
      case "Returned":
        return "bg-blue-500";
      default:
        return "bg-gray-500"; // Default color
    }
  }

  function getStatusText(status) {
    switch (status) {
      case "Pending":
        return "Payment not done";
      case "Success":
        return "Ready to deliver";
      case "Cancelled":
        return "Booking cancelled";
      case "Delivered":
        return "Car delivered";
      case "Returned":
        return "Car Returned";
      default:
        return "Unknown Status";
    }
  }
 
 
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="container mx-auto ">
          <h1 className="text-3xl px-3 mb-5 mt-5">My bookings</h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Booking Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Car
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pick Up
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Return
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total rent Paid
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {carsInSinglePage && carsInSinglePage.length > 0 ? (
                  bookingList &&
                  carsInSinglePage.map((data) => (
                    <tr
                      key={data?._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{data?._id}</td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={data?.car?.carImages[0]}
                          alt="Jese image"
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {data?.car?.carName}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <div className="text-base font-semibold">
                          {data?.pickUpLocation}
                        </div>
                        <div className="font-normal text-gray-500">
                          {new Date(data?.startDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-base font-semibold">
                          {data?.returnLocation}
                        </div>
                        <div className="font-normal text-gray-500">
                          {new Date(data?.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-lg font-bold">
                          ₹ {data?.totalBookingCharge}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <div
                            className={`h-2.5 w-2.5 rounded-full  ${getStatusColor(
                              data?.bookingStatus
                            )}`}
                          ></div>
                          {getStatusText(data?.bookingStatus)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => navigate("/admin/bookingDetails", { state: { data } })}
                          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                          Details
                        </button>
                      </td>
                      
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white dark:bg-gray-800">
                    <td colSpan="7" className="py-12 text-center">
                      <h1 className="text-xl font-semibold">No bookings</h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
            <Pagination
              totalPages={totalPages}
              numbers={numbers}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
     
        </div>
      )}
    </>
  );
};

export default BookingTable;
