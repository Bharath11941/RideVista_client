import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { carList } from "../../api/adminApi";
import Pagination from "../common/Pagination";

const CarListTable = () => {
  const [cars, setCars] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const carPerPage = 3;

  useEffect(() => {
    carList()
      .then((res) => {
        setCars(res?.data?.cars);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const filteredCars = !searchInput
    ? cars
    : cars.filter((car) =>
        car.carName.toLowerCase().includes(searchInput.toLowerCase())
      );
  const lastIndex = currentPage * carPerPage;
  const firstIndex = lastIndex - carPerPage;
  const carsInSinglePage = filteredCars.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredCars.length / carPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  return (
    <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="relative  shadow-md sm:rounded-lg">
          <h1 className="text-3xl pt-2">Cars List</h1>
          <div className="flex items-center justify-end py-4 bg-white dark:bg-gray-800">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                value={searchInput}
                onChange={handleInputChange}
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for Cars"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Car Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Owner Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Transition Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Fuel Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Verification
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {carsInSinglePage.map((car) => (
                <tr
                  key={car?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img
                      className="w-24 h-24 rounded-full" // Adjust the width and height as needed
                      src={car?.carImages[0]}
                      alt="User"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {car?.carName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{car?.partnerId.name}</td>
                  <td className="px-6 py-4">{car?.transitionType}</td>
                  <td className="px-6 py-4">{car?.fuelType}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {car?.verificationStatus === "Pending" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />
                      )}
                      {car?.verificationStatus === "Pending" && (
                        <span>Pending</span>
                      )}

                      {car?.verificationStatus === "Approved" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
                      )}
                      {car?.verificationStatus === "Approved" && (
                        <span>Approved</span>
                      )}

                      {car?.verificationStatus === "Rejected" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />
                      )}
                      {car?.verificationStatus === "Rejected" && (
                        <span>Rejected</span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {car?.verificationStatus === "Pending" ? (
                        <Link
                          to={`/admin/carDetails/${car?._id}`}
                          className="bg-green-500 text-white font-medium py-2 px-4 rounded-full hover:bg-green-600 inline-block"
                        >
                          Verify Car
                        </Link>
                      ) : (
                        <>
                          {car?.verificationStatus === "Approved" && (
                            <Link
                              to={`/admin/carDetails/${car?._id}`}
                              className="bg-green-500 text-white font-medium py-2 px-4 rounded-full hover:bg-green-600 inline-block"
                            >
                              Car Details
                            </Link>
                          )}
                          {car?.verificationStatus === "Rejected" && (
                            <Link
                              to={`/admin/carDetails/${car?._id}`}
                              className="bg-red-500 text-white font-medium py-2 px-4 rounded-full hover:bg-red-600 inline-block"
                            >
                              Car Details
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
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
    </div>
  );
};

export default CarListTable;
