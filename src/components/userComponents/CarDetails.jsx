import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { carBooking, verifyPayment } from "../../api/userApi";
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
  function loadScript(src){
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = ()=>{
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  const razorpayPayment = async (bookingData) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if(!res){
      toast.error("Razorpay sdk failed lodad")
      return
    }
    var options = {
      "key": 'rzp_test_pkUbv7xbv5KNrA', // Enter the Key ID generated from the Dashboard
      "amount": bookingData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": bookingData.currency,
      "name": "Ride Vista",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": bookingData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async  (response) =>{
          try {
            const res = await verifyPayment(response,{...bookingData,carId:car._id,startDate:startDate,endDate:endDate})
            if(res?.status === 200){
              toast.success(res?.data?.message)
              navigate("/bookingSuccess",{state:{orderDetails:res?.data?.bookingDetails,CarDetails:res?.data?.carDetails}})
            }
          } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error)
          }
      },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
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
          {/* <div className="flex">
            <div className="flex h-12 mt-6 ">
              <div className="relative " data-te-input-wrapper-init>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  className=" bg-black peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-blue-500 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="Select a date"
                />
                <label
                  htmlFor="floatingInput"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-blue-500 dark:peer-focus:text-primary"
                ></label>
              </div>
            </div>
            <div className="flex h-12 mt-6 ">
              <div className="relative " data-te-input-wrapper-init>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  min={startDate}
                  className=" bg-black peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-blue-500 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="Select a date"
                />
                <label
                  htmlFor="floatingInput"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-blue-500 dark:peer-focus:text-primary"
                ></label>
              </div>
            </div>
          </div>
          <h1 className="mt-8 ml-3 font-bold">TOTAL = ₹ {totalAmount}</h1>

          {bookingMessage && !startDate && !endDate && (
            <p className="mt-4 text-red-500">{bookingMessage}</p>
          )} */}
          <div className="ml-3">
            <button
              onClick={handleSubmit}
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
