import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleCarDetails } from "../../api/adminApi";
import Loading from "../loading/Loading";

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
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="ml-64">
          <div className="bg-white p-4 shadow-xl rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Car Details</h2>
            </div>
            <hr className="border-t border-gray-300 mb-4" />
            <div className="bg-white max-w-md shadow-lg  rounded-lg overflow-hidden">
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
              </div>
              <div className="px-6 py-4 flex justify-end">
                <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mr-2">
                  Approve
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetails;
