import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleCarDetails, verifyCar } from "../../api/adminApi";
import Loading from "../loading/Loading";
import { toast } from "react-toastify";

const CarDetails = () => {
  const { carId } = useParams();
  const [loading, setLoading] = useState();
  const [car, setCar] = useState();
  useEffect(() => {
    setLoading(true);
    singleCarDetails(carId)
      .then((res) => {
        setLoading(false);
        setCar(res?.data?.car);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, [carId]);
  const handleApprove = async () => {
    try {
      setLoading(true);
      const res = await verifyCar(carId, "approve");
      if (res?.status === 200) {
        setCar(res?.data?.car);
        toast.success(res?.data?.succMessage);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  const handleReject = async () => {
    try {
      setLoading(true);
      const res = await verifyCar(carId, "reject");
      if (res?.status === 200) {
        setCar(res?.data?.car);
        toast.error(res?.data?.errMessage);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
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
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
          <div className="bg-white p-4 shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Car Details</h2>
            </div>
            <hr className="border-t border-gray-300 mb-4" />

            <div className="contaier grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="container bg-white max-w-md shadow-lg rounded-lg overflow-hidden">
                <img
                  src={car?.carImages[0]}
                  alt="Car Image"
                  className="w-full h-48 object-cover object-center"
                />
                <div className="px-6 py-4">
                  <h2 className="text-xl text-center font-semibold mb-2">
                    {car?.carName}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <strong>Location:</strong> {car?.location}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Model:</strong> {car?.modelType}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Transmission:</strong> {car?.transtionType}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Fuel Type:</strong> {car?.fuelType}
                  </p>
                  <p className="text-gray-700">
                    <strong>Owner Name:</strong> {car?.partnerId?.name}
                  </p>
                  <p>
                    <strong>Verification status:</strong>{" "}
                    <span
                      className={`pl-3 text-1xl ${
                        car?.verificationStatus === "Approved"
                          ? "text-green-500"
                          : car?.verificationStatus === "Rejected"
                          ? "text-red-500"
                          : car?.verificationStatus === "Pending"
                          ? "text-blue-500"
                          : "text-gray-700"
                      }`}
                    >
                      {car?.verificationStatus}
                    </span>
                  </p>
                </div>
                <div className="px-6 py-4 flex justify-end">
                  {car?.verificationStatus === "Pending" && (
                    <>
                      <button
                        onClick={handleApprove}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={handleReject}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="container">
                <div className="container text-center">
                  <h2 className="text-2xl font-extrabold  dark:text-white">
                    Car document
                  </h2>
                </div>
                {/* <div className="container "> */}
                <img
                  className="h-auto p-2 w-full"
                  src={car?.certificate}
                  alt="image description"
                />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetails;
