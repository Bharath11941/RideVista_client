import React from 'react'

const HomeCarCard = ({car}) => {
  const {
    carName,
    location,
    carImages,
  } = car;
  return (
    <div className="flex-shrink-0 pb-3 bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 rounded-md hover:bg-blue-100">
      <img
        src={carImages[0]}
        alt=""
        className="mx-auto object-cover h-40 w-80"
      />
      <div className="px-5 ">
        <div className="flex justify-between mr-1">
          <h3 className="text-gray-800 text-[27px] font-bold mb-[18px] mt-6 text-center md:text-start">
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
            <h3 className="text-gray-800 text-[15px] font-bold mb-[18px] mt-6 text-center pt-3 md:text-start">
              {location}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCarCard