import { useLocation } from "react-router-dom";
import UserNavbar from "../../components/userComponents/UserNavbar";
import UserFooter from "../../components/userComponents/UserFooter";
import { useState } from "react";
import Rating from "react-rating-stars-component";

const BookingDetailsUser = () => {
  const { state } = useLocation();
  const { data } = state;
  const [bookingData, setBookingData] = useState(data);
  const [activeModal, setActiveModal] = useState(null);
  const [rating, setRating] = useState(0); // State to hold the rating
  const [reason, setReason] = useState("");
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const startTimestamp = new Date(data.startDate).getTime();
  const endTimestamp = new Date(data.endDate).getTime();
  const dayDifference = (endTimestamp - startTimestamp) / (1000 * 3600 * 24);
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500"; // Apply the color class for 'Pending' status
      case "Success":
        return "text-green-500"; // Apply the color class for 'Success' status
      case "Cancelled":
        return "text-red-500"; // Apply the color class for 'Cancelled' status
      case "Delivered":
        return "text-blue-500"; // Apply the color class for 'Delivered' status
      case "Returned":
        return "text-indigo-500"; // Apply the color class for 'Returned' status
      default:
        return "text-gray-500"; // Apply a default color or 'Unknown status' color
    }
  };

  const getStatusText = (status) => {
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
        return "Car returned";
      default:
        return "Unknown status";
    }
  };
  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleChange = (newRating) => {
    // Update the rating when a new value is selected
    setRating(newRating);
  };
  console.log(rating);
  return (
    <>
      <UserNavbar />
      <div className="container mx-auto mt-10 pb-40">
        <div className="flex flex-col items-center p-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="md:w-2/4">
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-72 md:rounded-none md:rounded-l-lg"
              src={bookingData.car.carImages[0]}
              alt=""
            />
            <button
              onClick={() => openModal("popup-modal")}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Toggle modal
            </button>
            <div
              id="popup-modal"
              tabIndex={-1}
              className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${
                activeModal === "popup-modal" ? "" : "hidden"
              }`}
            >
              <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
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
                    <Rating
                      count={5} // Number of stars
                      value={rating} // Current value of the rating
                      size={30} // Size of the stars
                      onChange={handleChange} // Function to handle changes in the rating
                      isHalf={false} // Enable half star selections
                      activeColor="#FAC201" // Color when mouse hover or rating is active
                      color="#E5E7EB" // Inactive color of the stars
                    />

                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Rate this car
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={reason}
                      onChange={handleReasonChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your reason here..."
                    />

                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-gray-500 mt-2 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center p-4  w-full leading-normal">
            <h1 className="mb-2 uppercase text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {bookingData.car.carName}
            </h1>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Amount Paid: ₹ {bookingData.totalBookingCharge}
            </h1>
            <p className="my-5 text-lg font-semibold">
              Booking Status:
              <span className={getStatusColor(bookingData.bookingStatus)}>
                {getStatusText(bookingData.bookingStatus)}
              </span>
            </p>
            <div className="container">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Pick Up Date{" "}
                  </p>
                  <p className="text-black text-sm font-semibold">
                    {new Date(bookingData.startDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-start text-sm  font-medium">
                    Return date{" "}
                  </p>
                  <p className="text-black text-sm font-semibold">
                    {new Date(bookingData.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex justify-center my-4">
                <p className="text-gray-600 text-sm font-medium">
                  Total days selected{" "}
                  <span className="text-sm font-semibold">{dayDifference}</span>
                </p>
              </div>
              <hr />
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Pick Up Location{" "}
                  </p>
                  <p className="text-black text-sm font-semibold">
                    {bookingData.pickUpLocation}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Return Location{" "}
                  </p>
                  <p className="text-black text-sm font-semibold">
                    {bookingData.returnLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default BookingDetailsUser;
