import { useEffect, useState } from "react";
import { HomeCarList } from "../../api/userApi";
const HomeCarCard = () => {
  const [carList, setCarList] = useState([]);
  useEffect(() => {
    HomeCarList()
      .then((res) => {
        setCarList(res?.data?.cars);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Our Featured Cars
      </h1>
      <div className="flex flex-wrap justify-center -mx-4">
        {carList.map((car) => (
          <div
            key={car._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4"
          >
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-4 pt-4">
                <img
                  src={car.carImages[0]}
                  alt="Car"
                  className="w-full h-48 object-cover object-center"
                />
              </figure>
              <div className="card-body text-center">
                <h2 className="text-xl font-semibold mb-2">{car.carName}</h2>
                <p className="text-gray-500 mb-2">Price: {car.price}</p>
                <p className="text-gray-500 mb-2">Location: {car.location}</p>
                <div className="flex justify-center mb-2">
                  {car.modelType} &nbsp;
                  {car.fuelType} &nbsp;
                  {car.transitionType}
                </div>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary">Rent Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCarCard;
