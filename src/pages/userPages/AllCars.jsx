import UserNavbar from "../../components/userComponents/UserNavbar";
import UserFooter from "../../components/userComponents/UserFooter";
import SelectedDateLocation from "../../components/userComponents/AllCars/SelectedDateLocation";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CarCard from "../../components/userComponents/CarCard";
import { faCar, faBars } from "@fortawesome/free-solid-svg-icons"; // Import the car icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterSideBar from "../../components/userComponents/AllCars/FilterSideBar";
import Loading from "../../components/loading/Loading";
import Pagination from "../../components/common/Pagination";
const AllCars = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { filterCars, values } = location.state;

  const [cars, setCars] = useState(filterCars);

  const [currentPage, setCurrentPage] = useState(1);
  const carPerPage = 3;
  const lastIndex = currentPage * carPerPage;
  const firstIndex = lastIndex - carPerPage;
  const carsInSinglePage = cars.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(cars.length / carPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    let sortedCars = [...cars];
    if (selectedValue === "acend") {
      sortedCars.sort((a, b) => a.price - b.price); // Sorting from low to high
    } else if (selectedValue === "decend") {
      sortedCars.sort((a, b) => b.price - a.price); // Sorting from high to low
    }

    setCars(sortedCars);
  };
  return (
    <>
      <UserNavbar />
      <div className=" mx-auto flex mt-5">
        <div className=" w-1/4 hidden shadow-lg md:flex rounded-md mt-5">
          <div className="p-4 w-full">
            <FilterSideBar setCars={setCars} filterCars={filterCars} />
          </div>
        </div>
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
          <div className="drawer flex justify-end  md:hidden z-10">
            <input
              id="my-drawer"
              type="checkbox"
              className="drawer-toggle w-10 h-10"
            />
            <div className="drawer-content flex justify-end pb-6">
              <FontAwesomeIcon
                className="w-10 h-10"
                size="2xl"
                icon={faBars}
                style={{ color: "#3f85f8" }}
              />
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="p-4 w-80 min-h-full bg-white text-base-content">
                <FilterSideBar
                  setCars={setCars}
                  filterCars={filterCars}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>

          <SelectedDateLocation selectedData={values} setLoading={setLoading} />
          <div className="container flex items-baseline justify-between pl-4 mb-4">
            <h4 className="text-3xl mt-5 font-bold text-gray-900">
              Available cars
            </h4>

            <select
              className="select select-bordered w-[100px]  "
              onChange={handleSelectChange}
            >
              <option disabled selected>
                Price
              </option>
              <option value="acend">Low - High</option>
              <option value="decend">High - low</option>
            </select>
          </div>
          {loading ? (
            <div className=" flex h-[300px] sm:h-[600px] items-center justify-center">
              <div className="spinnerouter">
                <Loading />
              </div>
            </div>
          ) : cars.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[364px]">
              <FontAwesomeIcon
                icon={faCar}
                beatFade
                size="2xl"
                className="h-32 w-32"
                style={{ color: "#3f83f8" }}
              />
              <p className="text-center text-2xl mt-5 font-bold text-gray-600">
                No cars available
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carsInSinglePage &&
                carsInSinglePage.map((car) => (
                  <CarCard key={car._id} car={car} values={values} />
                ))}
            </div>
          )}
          {totalPages > 1  && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              numbers={numbers}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>

      <UserFooter />
    </>
  );
};

export default AllCars;
