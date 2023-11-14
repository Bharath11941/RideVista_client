import { useFormik } from "formik";
import { useState } from "react";
import { carValidationSchema } from "../../../validations/partner/carValidation";
import { addCar } from "../../../api/partnerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../loading/Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const [certificate, setCertificate] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [carImage, setCarImage] = useState([]);
  const { _id } = useSelector((state) => state.partnerReducer.partner);
  const partnerId = _id;
  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await addCar({ ...values, certificate, carImage, partnerId });
      if (res?.status === 201) {
        setLoading(false);
        navigate("/partner/myCars");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error, "response in error");
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        carName: "",
        price: "",
        location: "",
        fuelType: "",
        transitionType: "",
        modelType: "",
      },
      validationSchema: carValidationSchema,
      onSubmit,
    });
  const handleCertificateFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file.type &&
      (file.type.startsWith("image/jpeg") || file.type.startsWith("image/png"))
    ) {
      setCertificateToBase(file);
    } else {
      toast.error("Invalid file type. Please select a valid image.");
      event.target.value = null;
    }
  };
  const setCertificateToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCertificate(reader.result);
    };
  };
  const handleCarImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const isValid = files.every(
      (file) =>
        file.type.startsWith("image/jpeg") ||
        file.type.startsWith("image/png") 
    );
    if (isValid) {
      setCarImageToBase(files);
    } else {
      toast.error("Invalid file type. Please select valid image files.");

      event.target.value = null;
    }
  };

  const setCarImageToBase = async (files) => {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        setCarImage((prev) => [...prev, reader.result]);
      };
    }
  };
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <h1 className="text-xl pb-2">Add car</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  name="carName"
                  value={values.carName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  placeholder="Car name"
                />
                {touched.carName && errors.carName && (
                  <div className="text-red-500 text-sm">{errors.carName}</div>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  placeholder="Price / day"
                />
                {touched.price && errors.price && (
                  <div className="text-red-500 text-sm">{errors.price}</div>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  placeholder="Car location"
                />
                {touched.location && errors.location && (
                  <div className="text-red-500 text-sm">{errors.location}</div>
                )}
              </div>
              <div className="mb-6">
                <select
                  name="fuelType"
                  value={values.fuelType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Choose a fuel type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                </select>
                {touched.fuelType && errors.fuelType && (
                  <div className="text-red-500 text-sm">{errors.fuelType}</div>
                )}
              </div>
              <div className="flex items-start mb-6">
                <select
                  name="transitionType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.transitionType}
                >
                  <option value="">Choose a transition type</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Manual">Electric</option>
                </select>
                {touched.transitionType && errors.transitionType && (
                  <div className="text-red-500 text-sm">
                    {errors.transitionType}
                  </div>
                )}
              </div>
              <div className="flex items-start mb-6">
                <select
                  name="modelType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.modelType}
                >
                  <option value="">Choose a Model</option>
                  <option value="Premium">Premium</option>
                  <option value="Medium">Medium</option>
                  <option value="Normal">Normal</option>
                </select>
                {touched.modelType && errors.modelType && (
                  <div className="text-red-500 text-sm">{errors.modelType}</div>
                )}
              </div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Registration certificate
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                onChange={handleCertificateFileChange}
                accept="image/*" // Allow only image files
                required
              />
              <div className="pb-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload Car images
                </label>
                <input
                  className="block w-full  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  accept="image/*" // Allow only image files
                  onChange={handleCarImagesChange}
                  multiple
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCar;
