import { useState } from "react";
import { reviewCar } from "../../../api/userApi";
import { toast } from "react-toastify";
import Rating from "react-rating-stars-component";

const ReviewModal = ({bookingData}) => {
  const [activeModal, setActiveModal] = useState(null);
  const [rating, setRating] = useState(1); // State to hold the rating
  const [reason, setReason] = useState("");
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  const getRatingMessage = (value) => {
    switch (value) {
      case 1:
        return "Very Bad";
      case 2:
        return "Bad";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };
  const getRatingColour = (value) => {
    switch (value) {
      case 1:
        return "text-red-500";
      case 2:
        return "text-orange-400";
      case 3:
        return "text-green-400";
      case 4:
        return "text-green-600";
      case 5:
        return "text-green-700";
      default:
        return "";
    }
  };
  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleChange = (newRating) => {
    setRating(newRating);
  };
  const handleReviewSubmit = async () => {
    try {
      const res = await reviewCar({
        carId: bookingData.car._id,
        userId: bookingData.user,
        rating: rating,
        reason: reason,
      });
      if (res?.status === 200) {
        toast.success(res?.data?.message);
      }
      setReason("");
      closeModal();
    } catch (error) {
      closeModal();
      console.log(error.message);
    }
  };
  return (
    <>
      <button
        onClick={() => openModal("popup-modal")}
        className="block text-white mt-3 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Review this car
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
              <h1 className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Rate this car
              </h1>
              <div className="flex  justify-start gap-3 items-center">
                <Rating
                  count={5} // Number of stars
                  value={rating} // Current value of the rating
                  size={30} // Size of the stars
                  onChange={handleChange} // Function to handle changes in the rating
                  isHalf={false} // Enable half star selections
                  activeColor="#FAC201" // Color when mouse hover or rating is active
                  color="#E5E7EB" // Inactive color of the stars
                />
                {rating !== 0 && (
                  <p
                    className={`font-bold text-sm text-ora ${getRatingColour(
                      rating
                    )}`}
                  >
                    {getRatingMessage(rating)}
                  </p>
                )}
              </div>

              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Review this car
              </label>
              <textarea
                id="message"
                rows={4}
                value={reason}
                required
                onChange={handleReasonChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your reason here..."
              />

              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={handleReviewSubmit}
                className="text-white-500 mt-2 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
