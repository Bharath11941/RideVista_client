import { useNavigate } from "react-router-dom";

const CarCard = ({ car, values }) => {
  const navigate = useNavigate();
  const {
    _id,
    carName,
    location,
    fuelType,
    modelType,
    carImages,
    transitionType,
    price,
    totalRating,
    ratings
  } = car;
  return (
    <div className="flex-shrink-0 pb-3  bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 rounded-md hover:bg-blue-100">
      <img
        src={carImages[0]}
        alt=""
        className="mx-auto object-cover h-40 w-80 hover:scale-105 transition duration-500 cursor-pointer"
      />
      <div className="px-5 ">
        <div className="flex justify-between mr-1">
          <h3 className="text-gray-800 text-[27px] font-bold mb-[10px] mt-6 text-center md:text-start">
            {carName}
          </h3>

          <div className="flex items-center">
            <svg
              className="h-5 w-5 mt-3 mr-1 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 className="text-gray-800 text-[15px] font-bold mb-[10px] mt-6 text-center  md:text-start">
              {location}
            </h3>
          </div>
        </div>
        {ratings && totalRating && (<div className="flex justify-center mb-3 items-center">
          <svg
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
            {totalRating}
          </p>
          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
          <a
            href="#"
            className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
          >
            {ratings.length} reviews
          </a>
        </div>)}

        <div className="flex gap-4 items-center flex-wrap justify-center md:justify-start">
          <div className="flex gap-4 items-center">
            <div className="h-[5px] w-[5px] bg-gray-200 rounded-full" />
            <p className="text-gray-800  ">{modelType}</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="h-[5px] w-[5px] bg-gray-200 rounded-full" />
            <p className="text-gray-800  ">{transitionType}</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="h-[5px] w-[5px] bg-gray-200 rounded-full" />
            <p className="text-gray-800  ">{fuelType}</p>
          </div>
        </div>
        <div className="my-7 h-[1px]  bg-gray-200" />

        <div className="flex flex-col xl:flex-row justify-start xl:justify-between items-center gap-4">
          <h2 className="font-bold text-4xl text-black ">
            ₹{price}{" "}
            <span className="font-normal text-xl  text-gray-800 ">/day</span>
          </h2>
          <button
            onClick={() => navigate("/carDetails", { state: { car, values } })}
            className=" hover:scale-125 transition duration-500 cursor-pointer block w-full xl:w-fit bg-blue-500 hover:bg-blue-800 text-white rounded-full uppercase font-bold py-2 px-4 text-center text-decoration-none"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
