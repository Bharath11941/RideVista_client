import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../common/Pagination";
import Loading from "../../loading/Loading";
const BookingListTable = ({ id, BookingList, cancelBooking, role }) => {
  const [bookingList, setBookingList] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const carsInSinglePage = bookingList.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(bookingList.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  useEffect(() => {
    setLoading(true);
    BookingList(id)
      .then((res) => {
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
  const openModal = (bookingId) => {
    setActiveModal(bookingId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  const handleCancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      const res = await cancelBooking(bookingId, reason);
      if (res?.status === 200) {
        setBookingList(res?.data?.bookingList);
        toast.success(res?.data?.message);
        setReason("");
        setActiveModal(null);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  const handleNavigate = (data) => {
    if (role === "user") {
      navigate("/bookingDetails", { state: { data } });
    } else if (role === "partner") {
      navigate("/partner/bookingDetails", { state: { data } });
    }
  };

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className={role === "user" ? "container mx-auto pb-20" : "container mx-auto"}>
          <h1 className="text-3xl px-3 mb-5 mt-5">My bookings</h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="pl-6 py-3">
                    Booking Id
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Car
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Pick Up
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Returl
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Total rent Paid
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Details
                  </th>
                  <th scope="col" className="pl-6 py-3">
                    Action
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
                      <td className="pl-6 py-4">{data?._id}</td>
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
                      <td className="pl-6 py-4">
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
                      <td className="pl-6 py-4">
                        <div className="text-base font-semibold">
                          {data?.returnLocation}
                        </div>
                        <div className="font-normal text-gray-500">
                          {new Date(data.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="pl-6 py-4">
                        <p className="text-lg font-bold">
                          ₹ {data?.totalBookingCharge}
                        </p>
                      </td>
                      <td className="pl-6 py-4">
                        <div className="flex items-center gap-1">
                          <div
                            className={`h-2.5 w-2.5 rounded-full  ${getStatusColor(
                              data?.bookingStatus
                            )}`}
                          ></div>
                          {getStatusText(data?.bookingStatus)}
                        </div>
                      </td>
                      <td className="pl-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleNavigate(data)}
                          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                          Details
                        </button>
                      </td>
                      <td className="pl-6 py-4">
                        {data?.bookingStatus === "Success" &&
                          !data?.cancelStatus && (
                            <button
                              type="button"
                              onClick={() => openModal(data?._id)}
                              className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            >
                              Cancel
                            </button>
                          )}
                        {data?.cancelStatus === "Pending" && (
                          <p className="text-red-700 font-semibold text-sm">
                            Cancel request Pending
                          </p>
                        )}
                        {data?.bookingStatus === "Cancelled" && (
                          <p className="text-red-700 font-semibold text-sm">
                            Booking Cancelled
                          </p>
                        )}
                        {data?.cancelStatus === "Rejected" && (
                          <p className="text-blue-700 font-semibold text-sm">
                            Cancel request rejected by partner
                          </p>
                        )}
                        {data?.bookingStatus === "Returned" && (
                          <p className="text-green-700 font-semibold text-sm">
                            Car returned
                          </p>
                        )}
                        {data?.bookingStatus === "Delivered" && (
                          <p className="text-green-700 font-semibold text-sm">
                            Car Delivered
                          </p>
                        )}
                      </td>
                      <div
                        id={`popup-modal-${data?._id}`}
                        tabIndex={-1}
                        className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${
                          activeModal === data?._id ? "" : "hidden"
                        }`}
                      >
                        <div className="relative w-full max-w-md max-h-full">
                          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                              type="button"
                              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
                              data-modal-hide={`popup-modal-${data?._id}`}
                              onClick={() => closeModal()}
                            >
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                              <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-start">
                              <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Reason for Cancel the booking
                              </label>
                              <textarea
                                id="message"
                                rows={4}
                                value={reason}
                                onChange={handleReasonChange}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your reason here..."
                              />
                              {role === "user" && <p className="text-red-600 mt-2 text-sm">
                                Note: Only 90% of the booking charge will be
                                credited to your wallet.
                              </p>}
                              <button
                                data-modal-hide={`popup-modal-${data?._id}`}
                                type="button"
                                onClick={() => handleCancelBooking(data?._id)}
                                className=" mt-2 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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
          {carsInSinglePage.length > 1 && (
            <Pagination
              totalPages={totalPages}
              numbers={numbers}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BookingListTable;
