import React from "react";

const BookingDetails = ({ bookingData }) => {
  const startTimestamp = new Date(bookingData?.startDate).getTime();
  const endTimestamp = new Date(bookingData?.endDate).getTime();
  const dayDifference = (endTimestamp - startTimestamp) / (1000 * 3600 * 24);
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Success":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      case "Delivered":
        return "text-green-500";
      case "Returned":
        return "text-blue-500";
      default:
        return "text-gray-500";
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
  return (
    <div>
      <>
        <div className="flex flex-col items-center p-10 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="md:w-2/4">
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-72 md:rounded-none md:rounded-l-lg"
              src={bookingData?.car?.carImages[0]}
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center p-4  w-full leading-normal">
            <div className="flex justify-between">
              <h1 className="mb-2 uppercase text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {bookingData?.car?.carName}
              </h1>
            </div>
            <div className="flex justify-start gap-5">
              <p className="my-3 text-lg font-semibold">
                Booked User:
                <span> {bookingData?.user?.name}</span>
              </p>
            </div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Amount Paid: ₹ {bookingData?.totalBookingCharge}
            </h1>
            <p className="my-5 text-lg font-semibold">
              Booking Status:
              <span className={getStatusColor(bookingData?.bookingStatus)}>
                {getStatusText(bookingData?.bookingStatus)}
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
                    {new Date(bookingData?.endDate).toLocaleDateString("en-US", {
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
                    {bookingData?.pickUpLocation}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Return Location{" "}
                  </p>
                  <p className="text-black text-sm font-semibold">
                    {bookingData?.returnLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default BookingDetails;
