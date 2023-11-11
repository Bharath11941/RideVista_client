
import { useEffect, useState } from "react";
import { HomeCarList } from "../../../api/userApi";
import HomeCarCard from "./HomeCarCard";

const CarsForRental = () => {
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
    <div className="pt-20 pb-32">
      <div className="wrapper">
        <h1 className="head_text mb-9 text-center">
          Cars for <span className="text-blue-500">Rental</span>
        </h1>
        <div className="flex flex-col flex-wrap md:ml-24 md:mr-16 md:flex-row gap-5 md:gap-16">
          {carList.map((car)=>(
            <HomeCarCard key={car._id} car={car}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarsForRental;
