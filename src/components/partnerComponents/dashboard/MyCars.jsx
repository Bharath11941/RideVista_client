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
const Mycars = () => {
  const { _id } = useSelector((state) => state.partnerReducer.partner);
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carPerPage = 2;
  const lastIndex = currentPage * carPerPage;
  const firstIndex = lastIndex - carPerPage;
  const carsInSinglePage = cars.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(cars.length / carPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
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
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h1 className="text-2xl font-semibold mb-8">Cars</h1>
        {carsInSinglePage.map((car) => {
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
                      onClick={() => navigate('/partner/reviews',{state:{car}})}
                      className="flex bg-blue-500 items-center gap-2"
                    >
                      Get Reviews
                    </Button>
                  
                </div>
              </CardBody>
            </Card>
          );
        })}
        <Pagination totalPages={totalPages} numbers={numbers} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>
    </div>
  );
};

export default Mycars;
