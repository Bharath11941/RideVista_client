import React from "react";

const SelectedDateLocation = () => {
  return (
      <div className="relative bg-white px-10 sm:px-[76px] py-5  shadow-lg rounded-xl flex flex-col gap-8">
        <div className="flex flex-col xl:flex-row gap-5">
          <div className="flex flex-col gap-2.5 w-full lg:w-2/3 mx-0 lg:mx-auto xl:w-[272px] max-w-full">
            <label htmlFor="Pick up location" className="text-gray-500">
              Pick up location
            </label>
            <div className="relative h-10 rounded-[4px]">
              <input
                type="text"
                id=""
                placeholder="Any location"
                className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px]
              border-gray-300 py-4 sm:py-[22px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
              />
              <img
                src="/src/assets/Icons/location-icon.svg"
                alt=""
                className="absolute right-3 sm:right-[22px] top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full lg:w-2/3 mx-0 lg:mx-auto xl:w-[272px] max-w-full">
            <label htmlFor="Pick up location" className="text-gray-500">
              Return location
            </label>
            <div className="relative h-10 rounded-[4px]">
              <input
                type="text"
                id=""
                placeholder="Any location"
                className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px]
              border-gray-300 py-4 sm:py-[22px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
              />
              <img
                src="/src/assets/Icons/location-icon.svg"
                alt=""
                className="absolute right-3 sm:right-[22px] top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full lg:w-2/3 mx-0 lg:mx-auto xl:w-[272px] max-w-full">
            <label htmlFor="pick up date" className="text-gray-500">
              Pick up Date
            </label>
            <div className="relative h-10 rounded-[4px]">
              <input
                type="date"
                id=""
                placeholder="22/12/23"
                className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px]
              border-gray-300 py-4 sm:py-[22px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
              />
              {/* <img src="/src/assets/Icons/calendar-icon.svg" alt="" className="absolute right-3 sm:right-[22px] top-1/2 -translate-y-1/2" /> */}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full lg:w-2/3 mx-0 lg:mx-auto xl:w-[272px] max-w-full">
            <label htmlFor="return date" className="text-gray-500">
              Return date
            </label>
            <div className="relative h-10 rounded-[4px]">
              <input
                type="date"
                id=""
                placeholder="31/12/223"
                className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px]
              border-gray-300 py-4 sm:py-[22px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
              />
              {/* <img src="/src/assets/Icons/calendar-icon.svg" alt="" className="absolute right-3 sm:right-[22px] top-1/2 -translate-y-1/2" /> */}
            </div>
          </div>
        </div>
        <button className="px-5 sm:px-6 py-[10px] text-white sm:py-3 bg-blue-500 hover:border-black w-full  mx-0 lg:mx-auto">
          Find your car
        </button>
      </div>
  );
};

export default SelectedDateLocation;
