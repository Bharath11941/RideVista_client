import { useFormik } from "formik";
import { dateLocationFilter } from "../../validations/user/carFilterValidation.js";
import { filterCarsDateLocation } from "../../api/userApi.js";
const DateLocationForm = () => {
  const onSubmit = async () => {
    try {
     const res = await filterCarsDateLocation(values)
    } catch (error) {
      console.log(error.message);
    }
  };

  const { getFieldProps, values,errors, touched, handleSubmit } = useFormik({
    initialValues: {
      pickUpLocation: "",
      returnLocation: "",
      pickUpDate: "",
      returnDate: "",
    },
    validationSchema: dateLocationFilter,
    onSubmit,
  });
  console.log(values);
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <div className="relative bg-white px-10 sm:px-[76px] py-9 sm:py-[70px] mt-5 sm:-mt-[166px] min-h-[330px] shadow-lg rounded-xl flex flex-col gap-8">
          <div className="flex flex-col xl:flex-row gap-5">
            <div className="flex flex-col gap-2.5 w-full lg:w-2/3 mx-0 lg:mx-auto xl:w-[272px] max-w-full">
              <label htmlFor="Pick up location" className="text-gray-500">
                Pick up location
              </label>
              <div className="relative h-16 rounded-[4px]">
                <input
                  type="text"
                  id="pickUpLocation"
                  placeholder="Any location"
                  {...getFieldProps("pickUpLocation")}
                  className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px]
              border-gray-300 py-4 sm:py-[22px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
                />
                <img
                  src="/src/assets/Icons/location-icon.svg"
                  alt=""
                  className="absolute right-3 sm:right-[22px] top-1/2 -translate-y-1/2"
                />
              </div>
              {errors.pickUpLocation && touched.pickUpLocation && (
                <p className="text-red-600">{errors.pickUpLocation}</p>
              )}
            </div>

            <div className="flex flex-col gap-2.5 w-full lg:w-2/3 mx-0 lg:mx-auto xl:w-[272px] max-w-full">
              <label htmlFor="Pick up location" className="text-gray-500">
                Return location
              </label>
              <div className="relative h-16 rounded-[4px]">
                <input
                  type="text"
                  id="returnLocation"
                  placeholder="Any location"
                  {...getFieldProps("returnLocation")}
                  className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px]
              border-gray-300 py-4 sm:py-[22px] pl-4 sm:pl-[22px] pr-9 sm:pr-11 focus:ring-blue-500 focus:border-blue-500"
                />
                <img
                  src="/src/assets/Icons/location-icon.svg"
                  alt=""
                  className="absolute right-3 sm:right-[22px] top-1/2 -translate-y-1/2"
                />
              </div>
              {errors.returnLocation && touched.returnLocation && (
                <p className="text-red-600">{errors.returnLocation}</p>
              )}
            </div>

            <div className="flex flex-col gap-2.5 w-full lg:w-2/3 mx-0 lg:mx-auto xl:w-[272px] max-w-full">
              <label htmlFor="pick up date" className="text-gray-500">
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
              <label htmlFor="return date" className="text-gray-500">
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
          <button type="submit" className="px-5 sm:px-6 py-[14px] text-white sm:py-6 bg-blue-500 hover:border-black w-full lg:w-2/3 mx-0 lg:mx-auto">
            Find your car
          </button>
        </div>
      </form>
    </div>
  );
};

export default DateLocationForm;
