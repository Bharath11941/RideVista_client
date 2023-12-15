import React from "react";

const RentingProcess = () => {
  return (
    <div className="pt-36">
      <div >
        <h1 className="head_text mb-9 text-center">
          Our Renting <span className="text-blue-500">Process</span>
        </h1>
        <div className="text-center hidden md:block">
          <ul className="steps mx-auto">
            <li className="step w-48 step-primary" />
            <li className="step w-48 step-primary" />
            <li className="step w-48" />
          </ul>
        </div>
        <div className="text-center pl-32 md:hidden block">
          <ul className="steps mx-auto steps-vertical">
            <li className="step w-48 step-primary" />
            <li className="step w-48 step-primary" />
            <li className="step w-48" />
          </ul>
        </div>
        <div className="container flex flex-col mx-auto bg-white">
          <div className="w-full draggable">
            <div className="container flex flex-col items-center gap-16 mx-auto my-16">
              <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center gap-3  bg-white rounded-3xl shadow-main">
                  <span>
                    <svg
                      className="h-8 w-8 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <p className="text-2xl font-extrabold text-dark-grey-900">
                    Location
                  </p>
                  <p className="text-base leading-7 text-dark-grey-600">
                    Choose your location find your best car
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3  bg-white rounded-3xl shadow-main">
                  <span>
                    <svg
                      className="h-8 w-8 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <rect
                        x={3}
                        y={4}
                        width={18}
                        height={18}
                        rx={2}
                        ry={2}
                      />{" "}
                      <line x1={16} y1={2} x2={16} y2={6} />{" "}
                      <line x1={8} y1={2} x2={8} y2={6} />{" "}
                      <line x1={3} y1={10} x2={21} y2={10} />
                    </svg>
                  </span>
                  <p className="text-2xl font-extrabold text-dark-grey-900">
                    Date
                  </p>
                  <p className="text-base leading-7 text-dark-grey-600">
                    Select your pick up date and time to book your car
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3  bg-white rounded-3xl shadow-main">
                  <span>
                    <svg
                      className="h-8 w-8 text-blue-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <circle cx="7" cy="17" r="2" />{" "}
                      <circle cx="17" cy="17" r="2" />{" "}
                      <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                    </svg>
                  </span>
                  <p className="text-2xl font-extrabold text-dark-grey-900">
                    Car
                  </p>
                  <p className="text-base leading-7 text-dark-grey-600">
                    We wil deliver it directly to you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentingProcess;
