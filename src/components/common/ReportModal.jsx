import React, { useState } from "react";
import { toast } from "react-toastify";

const ReportModal = ({ bookingData,reportApi,role }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [reason, setReason] = useState("");
  const handleReportOwner = async () => {
    if(role === "user"){
      const res = await reportApi(bookingData.partner._id,reason,bookingData.user);
    if (res?.status === 200) {
      toast.success(res?.data?.message);
      closeModal(null)
    }
    }else if(role === "partner"){
      const res = await reportApi(bookingData.partner,reason,bookingData.user._id)
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        closeModal(null)
      }
    }
    setReason("")
  };
  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  return (
    <>
      <button
        type="button"
        onClick={() => openModal("popup-modal")}
        className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Report owner
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
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {role === "user" ? "Report Owner" : "Report User"}
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
                onClick={handleReportOwner}
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

export default ReportModal;
