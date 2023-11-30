import { useFormik } from "formik";
import { dateLocationFilter } from "../../validations/user/carFilterValidation.js";
import { filterCarsDateLocation } from "../../api/userApi.js";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";

import { useEffect, useState } from "react";
import useGoogleMap from "../coustomHook/useGoogleMap.jsx";

const DateLocationForm = ({ dateRef }) => {
  const { isLoaded } = useGoogleMap();

  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpError, setPickUpError] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [returnError, setReturnError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      if (!pickUpLocation.trim()) {
        setPickUpError("PickUp location is required");
        return;
      }
      if (!returnLocation.trim()) {
        setReturnError("return location is required");
        return;
      }
      const res = await filterCarsDateLocation({
        ...values,
        pickUpLocation,
        returnLocation,
      });
      if (res?.status === 200) {
        navigate("/allCars", {
          state: {
            filterCars: res?.data?.cars,
            values: { ...values, pickUpLocation, returnLocation },
          },
        });
      }
      setPickUpLocation("");
      setReturnLocation("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const { getFieldProps, values, errors, touched, handleSubmit } = useFormik({
    initialValues: {
      pickUpDate: "",
      returnDate: "",
    },
    validationSchema: dateLocationFilter,
    onSubmit,
  });
  const handleAutoComplete = (id, setValue) => {
    if (isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById(id),
        {
          componentRestrictions: { country: "IN" },
          types: ["(cities)"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        // const firstName = place.formatted_address.split(",")[0];
        setValue(place.name);
        setPickUpError("");
        setReturnError("");
      });
    }
  };
  useEffect(() => {
    handleAutoComplete("pickUpLocation", setPickUpLocation);
  }, [isLoaded]);
  useEffect(() => {
    handleAutoComplete("returnLocation", setReturnLocation);
  }, [isLoaded]);

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <div className="relative bg-white px-10 sm:px-[76px] py-9 sm:py-[70px] mt-5 sm:-mt-[166px] min-h-[330px] shadow-lg rounded-xl flex flex-col gap-8">
          <div className="flex flex-col xl:flex-row gap-5">
            <div className="flex flex-col gap-2.5 w-full lg:w-2/3 mx-0 lg:mx-auto xl:w-[272px] max-w-full">
              <label htmlFor="Pick up location" className="text-blue-500">
                Pick up location
              </label>
              <div className="relative h-16 rounded-[4px]">
                {isLoaded && (
                  <Autocomplete>
                    <input
                      type="text"
                      ref={dateRef}
                      id="pickUpLocation"
                      placeholder="Any location"
                      value={pickUpLocation}
                      onChange={(e) => setPickUpLocation(e.target.value)}
                      className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px]
              border-gray-300 py-4 sm:py-[22px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </Autocomplete>
                )}
                <img
                  src="/src/assets/Icons/location-icon.svg"
                  alt=""
                  className="absolute right-3 sm:right-[22px] top-1/2 -translate-y-1/2"
                />
              </div>
              {pickUpError && <p className="text-red-500">{pickUpError}</p>}
            </div>

            <div className="flex flex-col gap-2.5 w-full lg:w-2/3 mx-0 lg:mx-auto xl:w-[272px] max-w-full">
              <label htmlFor="Pick up location" className="text-blue-500">
                Return location
              </label>
              <div className="relative h-16 rounded-[4px]">
                {isLoaded && (
                  <Autocomplete>
                    <input
                      type="text"
                      id="returnLocation"
                      placeholder="Any location"
                      value={returnLocation}
                      onChange={(e) => setReturnLocation(e.target.value)}
                      className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px]
                border-gray-300 py-4 sm:py-[22px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </Autocomplete>
                )}
                <img
                  src="/src/assets/Icons/location-icon.svg"
                  alt=""
                  className="absolute right-3 sm:right-[22px] top-1/2 -translate-y-1/2"
                />
              </div>
              {returnError && <p className="text-red-600">{returnError}</p>}
            </div>

            <div className="flex flex-col gap-2.5 w-full lg:w-2/3 mx-0 lg:mx-auto xl:w-[272px] max-w-full">
              <label htmlFor="pick up date" className="text-blue-500">
                Pick up Date
              </label>
              <div className="relative h-16 rounded-[4px]">
                <input
                  type="date"
                  id="pickUpDate"
                  placeholder="22/12/23"
                  min={new Date().toISOString().split("T")[0]}
                  {...getFieldProps("pickUpDate")}
                  className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px]
              border-gray-300 py-4 sm:py-[22px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.pickUpDate && touched.pickUpDate && (
                <p className="text-red-600">{errors.pickUpDate}</p>
              )}
            </div>

            <div className="flex flex-col gap-2.5 w-full lg:w-2/3 mx-0 lg:mx-auto xl:w-[272px] max-w-full">
              <label htmlFor="return date" className="text-blue-500">
                Return date
              </label>
              <div className="relative h-16 rounded-[4px]">
                <input
                  type="date"
                  id="returnDate"
                  min={values.pickUpDate}
                  placeholder="31/12/223"
                  {...getFieldProps("returnDate")}
                  className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px]
              border-gray-300 py-4 sm:py-[22px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.returnDate && touched.returnDate && (
                <p className="text-red-600">{errors.returnDate}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="px-5 sm:px-6 py-[14px] text-white sm:py-6 bg-blue-500 hover:border-black w-full lg:w-2/3 mx-0 lg:mx-auto"
          >
            Find your car
          </button>
        </div>
      </form>
    </div>
  );
};

export default DateLocationForm;
