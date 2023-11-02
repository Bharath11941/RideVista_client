import React from "react";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faGasPump,
  faGear,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const CheckOutPage = () => {
  return (
    <>
      <UserNavbar />
      <div className=" container mx-auto mt-10">
        <div className="grid grid-cols-12">
          <div className="md:col-span-8   col-span-12">
            <div className="grid grid-cols-12">
              <div className="md:col-span-6 col-span-12">
                <h1 className="text-2xl ml-4 font-bold">Car name</h1>
                <div className="card  bg-base-100 shadow-xl mb-9">
                  <figure className="px-10 pt-10 mb-5">
                    <img
                      src="/src/assets/images/car1.jpg"
                      alt="Shoes"
                      className="rounded-xl w-96 h-48 object-cover"
                    />
                  </figure>
                  <hr />
                  <div className="flex justify-between px-3 pt-6">
                    <div className="flex justify-between items-center gap-3">
                      <FontAwesomeIcon
                        icon={faGasPump}
                        style={{ color: "#3f83f8" }}
                      />
                      <p className="text-gray-700 font-medium text-lg">
                        Petrol
                      </p>
                    </div>
                    <div className="flex justify-between items-center gap-3">
                      <FontAwesomeIcon
                        icon={faGear}
                        style={{ color: "#3f83f8" }}
                      />
                      <p className="text-gray-700 font-medium text-lg">
                        Automatic
                      </p>
                    </div>
                    <div className="flex justify-between items-center gap-3">
                      <FontAwesomeIcon
                        icon={faCar}
                        style={{ color: "#3f83f8" }}
                      />
                      <p className="text-gray-700 font-medium text-lg">
                        Premium
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-3 mx-5">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ color: "#3f83f8" }}
                    />
                    <p className="text-gray-700 font-medium text-lg">
                      Kozhikode
                    </p>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="md:col-span-6 mt-20 sm:ml-10 col-span-12">
                <div className="container">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Pick Up Date{" "}
                      </p>
                      <p className="text-black text-sm font-semibold">23/04/23</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-start text-sm  font-medium">
                        Return date{" "}
                      </p>
                      <p className="text-black text-sm font-semibold">23/04/23</p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-center mb-4">
                    <p className="text-gray-600 text-sm font-medium">
                      Total days{" "} <span className="text-sm font-semibold">3</span>
                    </p>
                    
                  </div>
                  <hr />
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Pick Up Location{" "}
                      </p>
                      <p className="text-black text-sm font-semibold">Kochi</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Return Location{" "}
                      </p>
                      <p className="text-black text-sm font-semibold">Kollam</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 col-span-12 sm:ml-10 mt-8 bg-white">
            <div className="max-w-sm  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h1 className="text-xl font-semibold">Amount Details</h1>
              <div className="mt-3 flex mb-4 justify-between">
                <p className="text-gray-600  text-sm">Price / day :</p>
                <h2 className="text-sm font-bold">₹ 15000</h2>
              </div>
              <div className="mt-3 flex  mb-4 justify-between">
                <p className="text-gray-600  text-sm">Days selected :</p>
                <h2 className="text-sm font-bold">3 Days</h2>
              </div>
              <div className="mt-3 flex  mb-4 justify-between">
                <p className="text-gray-600  text-sm">Total Rent Amount :</p>
                <h2 className="text-sm font-bold">₹ 15000</h2>
              </div>
              <hr />
              <br />
              <br />
              <button
                type="button"
                className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default CheckOutPage;
