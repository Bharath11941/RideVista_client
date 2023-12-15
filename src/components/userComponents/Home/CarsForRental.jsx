import { useEffect, useState } from "react";
import { HomeCarList } from "../../../api/userApi";
import HomeCarCard from "./HomeCarCard";
import HomeCardShimmer from "../Shimmer/HomeCardShimmer";

const CarsForRental = ({ dateRef }) => {
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
      <div >
        <h1 className="head_text mb-9 text-center">
          Cars for <span className="text-blue-500">Rental</span>
        </h1>
        {carList && carList.length > 0 ? (
          <div className="flex flex-col justify-center flex-wrap md:ml-14 lg:ml-24 lg:mr-10 md:flex-row gap-3 md:gap-5 lg:gap-8 xl:gap-16">
            {carList.map((car) => (
              <div key={car._id} onClick={() => dateRef.current.focus()} >
                <HomeCarCard car={car} />
              </div>
            ))}
          </div>
        ) : (
          <HomeCardShimmer />
        )}
      </div>
    </div>
  );
};

export default CarsForRental;
