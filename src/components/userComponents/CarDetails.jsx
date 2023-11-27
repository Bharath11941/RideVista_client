
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "@material-tailwind/react";

const CarDetails = () => {
  const { state } = useLocation();

  const { car, values } = state;
  const navigate = useNavigate();

  return (
    <div className="mt-8 w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <div className="max-w-2xl mx-auto mt-3 mr-6">
          <Carousel className="rounded-xl">
            {car.carImages.map((image) => (
              <img
                key={car._id}
                src={image}
                alt="image 1"
                className="h-full w-full object-cover"
              />
            ))}
          </Carousel>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            {car.carName}
          </h1>
          {car.ratings && car.totalRating && (
            <div className="flex items-center justify-start my-3">
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
                {car.totalRating}
              </p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
              <p className="text-lg font-medium text-gray-900 underline hover:no-underline dark:text-white">
                {car.ratings.length} reviews
              </p>
            </div>
          )}
          <p className=" font-semibold text-2xl text-blue-500">
            ₹{car.price} / Day
          </p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas nam
            eaque unde voluptate velit? Maxime totam vel, ducimus excepturi nemo
            assumenda iusto quod deleniti numquam, alias quis aliquam atque ut!
          </p>

          <div className="mt-4">
            <p className="text-lg font-semibold">
              Owner: {car.partner[0].name}
            </p>
            <p className="text-lg font-semibold">Category: {car.modelType}</p>
            <p className="text-lg font-semibold">Fuel Type: {car.fuelType}</p>
            <p className="text-lg font-semibold">
              Transition: {car.transitionType}
            </p>
            <p className="text-lg font-semibold">Location: {car.location}</p>
          </div>
          <div className="ml-3">
            <button
              onClick={() => navigate("/checkOut", { state: { car, values } })}
              className="  bg-blue-500 hover:bg-blue-800  text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
