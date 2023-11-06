import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "@material-tailwind/react";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";

const CarDetails = () => {
  const { state } = useLocation();

  const {car,values} = state
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.userReducer)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingMessage, setBookingMessage] = useState("");
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    calculateTotalAmount(e.target.value, endDate);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    calculateTotalAmount(startDate, e.target.value);
  };

  const calculateTotalAmount = (start, end) => {
    if (start && end && car.price) {
      const startTimestamp = new Date(start).getTime();
      const endTimestamp = new Date(end).getTime();
      const dayDifference =
        (endTimestamp - startTimestamp) / (1000 * 3600 * 24);
      const total = dayDifference * car.price;
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  };

  const handleSubmit = async () => {
    try {
      if (totalAmount > 0) {
        const bookedDateRanges = car.bookingDates;
        const selectedStartDate = new Date(startDate).getTime();
        const selectedEndDate = new Date(endDate).getTime();
        let isDateAvailable = true;
        for (const bookedDate of bookedDateRanges) {
          const bookedStart = new Date(bookedDate.startDate).getTime();
          const bookedEnd = new Date(bookedDate.endDate).getTime();
          if (
            (selectedStartDate >= bookedStart &&
              selectedStartDate <= bookedEnd) ||
            (selectedEndDate >= bookedStart && selectedEndDate <= bookedEnd)
          ) {
            isDateAvailable = false;
            break;
          }
        }
        if(isDateAvailable){
          const res = await carBooking({...car,startDate,endDate,totalAmount,userId:user._id})
          razorpayPayment(res?.data?.bookingData)
          
        }else{
          toast.error("These dates are already booked.Please select another dates")
        }
      } else {
        setBookingMessage("Please select the Date");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };
  
  
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
          <p className=" font-semibold text-2xl text-blue-500">
            ₹{car.price} / Day
          </p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas nam
            eaque unde voluptate velit? Maxime totam vel, ducimus excepturi nemo
            assumenda iusto quod deleniti numquam, alias quis aliquam atque ut!
          </p>

          <div className="mt-4">
            <p className="text-lg font-semibold">Owner: {car.partner[0].name}</p>
            <p className="text-lg font-semibold">Category: {car.modelType}</p>
            <p className="text-lg font-semibold">Fuel Type: {car.fuelType}</p>
            <p className="text-lg font-semibold">
              Transition: {car.transitionType}
            </p>
            <p className="text-lg font-semibold">Location: {car.location}</p>
          </div>
          <div className="ml-3">
            <button
              onClick={() => navigate('/checkOut',{state:{car,values}})}
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
