import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { carBooking, verifyPayment } from "../../api/userApi";
import {
  faCar,
  faGasPump,
  faGear,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadScript } from "../../utils/razorpay/loadScript";
import Loading from "../loading/Loading";
import { userLogin } from "../../reduxStore/slices/userSlice";

const CheckOut = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [walletChecked, setWalletChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user,token } = useSelector((state) => state.userReducer);
  const { car, values } = state;
  const startDate = values.pickUpDate;
  const endDate = values.returnDate;
  const pickUpLocation = values.pickUpLocation;
  const returnLocation = values.returnLocation;

  const startTimestamp = new Date(values.pickUpDate).getTime();
  const endTimestamp = new Date(values.returnDate).getTime();
  const dayDifference = (endTimestamp - startTimestamp) / (1000 * 3600 * 24);
  const totalAmount = dayDifference * car.price;
  const rezorpayKey = import.meta.env.VITE_RAZORPAY_KEY
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await carBooking({
        ...car,
        startDate,
        endDate,
        totalAmount,
        pickUpLocation,
        returnLocation,
        userId: user._id,
        walletChecked,
      });
      if (walletChecked) {
        toast.success(res?.data?.message);
        dispatch(userLogin({user:res?.data?.user,token}))
        navigate("/bookingSuccess", {
          state: {
            orderDetails: res?.data?.bookingDetails,
            CarDetails: res?.data?.carDetails,
          },
        });
      } else {
        razorpayPayment(res?.data?.bookingData);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const razorpayPayment = async (bookingData) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay sdk failed lodad");
      return;
    }
    setLoading(false);
    var options = {
      key:rezorpayKey , // Enter the Key ID generated from the Dashboard
      amount: bookingData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: bookingData.currency,
      name: "Ride Vista",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: bookingData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response) => {
        try {
          const res = await verifyPayment(response, {
            ...bookingData,
            carId: car._id,
            startDate: startDate,
            endDate: endDate,
          });
          if (res?.status === 200) {
            toast.success(res?.data?.message);
            navigate("/bookingSuccess", {
              state: {
                orderDetails: res?.data?.bookingDetails,
                CarDetails: res?.data?.carDetails,
              },
            });
          }
        } catch (error) {
          toast.error(error.response?.data?.message);
          console.log(error);
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const handleWalletUsed = (e) => {
    setWalletChecked(e.target.checked);
  };

  return (
    <>
      <div className=" container pb-40 mx-auto mt-10 mb-52 dark:border-gray-700 shadow border border-gray-200">
        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="spinnerouter">
              <Loading />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-12 mb-20">
              <div className="md:col-span-8   col-span-12">
                <div className="grid grid-cols-12">
                  <div className="md:col-span-6 col-span-12">
                    <h1 className="text-2xl ml-4 uppercase hover:text-blue-500 font-bold">
                      {car.carName}
                    </h1>
                    <div className="card h-96 bg-base-100 shadow-xl mb-9">
                      <figure className="px-10 pt-10 mb-5">
                        <img
                          src={car?.carImages[0]}
                          alt="car image"
                          className="rounded-xl w-96 h-48 object-cover hover:scale-125 transition duration-500 cursor-pointer"
                        />
                      </figure>
                      <hr />
                      <div className="flex  justify-between px-3 pt-6">
                        <div className="flex justify-between items-center gap-3">
                          <FontAwesomeIcon
                            icon={faGasPump}
                            style={{ color: "#3f83f8" }}
                          />
                          <p className="text-gray-700 font-medium text-lg">
                            {car?.fuelType}
                          </p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                          <FontAwesomeIcon
                            icon={faGear}
                            style={{ color: "#3f83f8" }}
                          />
                          <p className="text-gray-700 font-medium text-lg">
                            {car?.transitionType}
                          </p>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                          <FontAwesomeIcon
                            icon={faCar}
                            style={{ color: "#3f83f8" }}
                          />
                          <p className="text-gray-700 font-medium text-lg">
                            {car?.modelType}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center items-center my-3 gap-3 mx-6">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          style={{ color: "#3f83f8" }}
                        />
                        <p className="text-gray-700 font-medium text-lg">
                          {car?.location}
                        </p>
                      </div>
                      <hr />
                    </div>
                  </div>
                  <div className="md:col-span-6  mt-20 sm:ml-10 col-span-12">
                    <div className="container">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">
                            Pick Up Date{" "}
                          </p>
                          <p className="text-black text-sm font-semibold">
                            {values?.pickUpDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-start text-sm  font-medium">
                            Return date{" "}
                          </p>
                          <p className="text-black text-sm font-semibold">
                            {values?.returnDate}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="flex justify-center my-4">
                        <p className="text-gray-600 text-sm font-medium">
                          Total days{" "}
                          <span className="text-sm font-semibold">
                            {dayDifference}
                          </span>
                        </p>
                      </div>
                      <hr />
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">
                            Pick Up Location{" "}
                          </p>
                          <p className="text-black text-sm font-semibold">
                            {values?.pickUpLocation}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm font-medium">
                            Return Location{" "}
                          </p>
                          <p className="text-black text-sm font-semibold">
                            {values?.returnLocation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 col-span-12 sm:ml-10 mt-8 bg-white">
                <div className="  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <h1 className="text-xl font-semibold">Amount Details</h1>
                  <div className="mt-3 flex mb-4 justify-between">
                    <p className="text-gray-600  text-sm">Price / day :</p>
                    <h2 className="text-sm font-bold">₹ {car?.price}</h2>
                  </div>
                  <div className="mt-3 flex  mb-4 justify-between">
                    <p className="text-gray-600  text-sm">Days selected :</p>
                    <h2 className="text-sm font-bold">{dayDifference}</h2>
                  </div>
                  <div className="mt-3 flex  mb-4 justify-between">
                    <p className="text-gray-600  text-sm">
                      Total Rent Amount :
                    </p>
                    <h2 className="text-sm font-bold">₹ {totalAmount}</h2>
                  </div>
                  <hr />
                  <br />
                  <div className="flex justify-end ">
                    <h1 className="font-bold text-2xl mb-2 text-black">
                      ₹ {totalAmount}
                    </h1>
                  </div>
                  {user?.wallet >= totalAmount && (
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={walletChecked}
                          onChange={handleWalletUsed}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
                        >
                          Use wallet payment
                        </label>
                      </div>
                      <p>wallet balance: ₹ {user?.wallet}</p>
                    </div>
                  )}
                  <button
                    onClick={handleSubmit}
                    className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
            <div className="p-5 container mx-auto">
              <div className="bg-white shadow-md rounded-lg p-5">
                <h2 className="text-2xl mb-3">Terms &amp; Conditions</h2>
                <div className="text-gray-700">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Eligendi possimus cumque atque architecto, dolorum nisi
                    iusto ab aliquid voluptate deleniti nulla modi magni,
                    doloremque tempora expedita maxime aliquam earum ratione
                    assumenda. Placeat a rerum labore, accusamus quaerat quia
                    neque blanditiis aut, vero, possimus obcaecati soluta dolore
                    recusandae. Laudantium itaque, sequi eum natus obcaecati
                    veritatis aliquam animi quam quidem, corrupti culpa rerum
                    aspernatur mollitia, fuga quia!
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CheckOut;
