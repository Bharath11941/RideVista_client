import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { myCarsList } from "../../../api/partnerApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "../../common/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
const Mycars = () => {
  const { _id } = useSelector((state) => state.partnerReducer.partner);
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const carPerPage = 2;
  const navigate = useNavigate();
  const partnerId = _id;
  useEffect(() => {
    myCarsList(partnerId)
      .then((res) => {
        setCars(res?.data?.cars);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response?.status) {
          navigate("/partner/login");
          toast.error(error.response?.data?.message);
        }
      });
  }, []);
  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
    setCurrentPage(1)
  }

  const filteredData = !searchInput ? cars : cars.filter((car) => car.carName.toLowerCase().includes(searchInput.toLowerCase()))
  const lastIndex = currentPage * carPerPage;
  const firstIndex = lastIndex - carPerPage;
  const carsInSinglePage = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / carPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-8">Cars</h1>
          <div className="flex items-center justify-end  bg-white dark:bg-gray-800">
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
                id="table-search-Cars"
                value={searchInput}
                onChange={handleInputChange}
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for cars"
              />
            </div>
          </div>
        </div>
        {filteredData.length === 0 && (
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
      )}

        { filteredData.length > 0 && carsInSinglePage.map((car) => {
          return (
            <Card className="w-full max-w-[80rem] mb-6 flex-row" key={car._id}>
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
              >
                <img
                  src={car.carImages[0]}
                  alt="card-image"
                  className="h-96 w-96 object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography
                  variant="h2"
                  color="gray"
                  className="mb-4 uppercase"
                >
                  {car.carName}
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  Price / day : {car.price} RS
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  Location : {car.location}
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  Model : {car.modelType}
                </Typography>
                <Typography color="gray" className="mb-8 font-normal">
                  {car.transitionType} || {car.fuelType}
                </Typography>

                <div className="flex justify-start gap-3">
                  <Link
                    to={`/partner/editCar/${car._id}`}
                    className="inline-block"
                  >
                    <Button
                      variant="text"
                      className="flex bg-blue-500 items-center gap-2"
                    >
                      Edit car
                    </Button>
                  </Link>
                  <Button
                    variant="text"
                    onClick={() =>
                      navigate("/partner/reviews", { state: { car } })
                    }
                    className="flex bg-blue-500 items-center gap-2"
                  >
                    Get Reviews
                  </Button>
                </div>
              </CardBody>
            </Card>
          );
        })}
        {filteredData.length > carPerPage && (
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

export default Mycars;
