import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { carValidationSchema } from "../../../validations/partner/carValidation";
import { addCar } from "../../../api/partnerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../loading/Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import useGoogleMap from "../../coustomHook/useGoogleMap";


const AddCar = () => {
  const { isLoaded } = useGoogleMap();
  const [certificate, setCertificate] = useState([]);
  const [location, setLocation] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [loading, setLoading] = useState(false);
  // Separate error states for certificate and car images
  const [certificateError, setCertificateError] = useState(null);
  const [carImagesError, setCarImagesError] = useState(null);
  const navigate = useNavigate();
  const [carImage, setCarImage] = useState([]);
  const { _id } = useSelector((state) => state.partnerReducer.partner);
  const partnerId = _id;

  const onSubmit = async () => {
    try {
      setLoading(true);
      if(!location.trim()){
        setErrorLocation("Location required")
        return
      }
      if (certificate.length === 0) {
        setCertificateError("Please select a certificate file.");
        setLoading(false); // Stop loading
        return;
      }
      if (carImage.length === 0) {
        setCarImagesError("Please select at least one image for the car.");
        setLoading(false);
        return;
      }
      const res = await addCar({ ...values, certificate, carImage, partnerId,location });
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
      setCertificateError(null);
    } else {
      setCertificateError("Invalid file type. Please select a valid image.");
      setCertificate([]);
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
        file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
    );
    if (isValid) {
      setCarImageToBase(files);
      setCarImagesError(null); // Clear error if files are valid
    } else {
      setCarImagesError("Invalid file type. Please select valid image files.");
      setCarImage([]);

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
  useEffect(() => {
    if (isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("location"),
        {
          componentRestrictions: { country: "IN" },
          types: ["(cities)"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const firstName = place.formatted_address.split(",")[0];
        setLocation(firstName);
        setErrorLocation("");

      });
    }
  }, [isLoaded]);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
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
                {isLoaded && (
                  <Autocomplete >
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      placeholder="Car location"
                    />
                  </Autocomplete>
                )}

                {errorLocation && (
                  <div className="text-red-500 text-sm">{errorLocation}</div>
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
              <div className="flex items-start mb-3">
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
              </div>
              {touched.transitionType && errors.transitionType && (
                <div className="text-red-500 text-sm">
                  {errors.transitionType}
                </div>
              )}
              <div className="flex items-start mb-3">
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
              </div>
              {touched.modelType && errors.modelType && (
                <div className="text-red-500 text-sm">{errors.modelType}</div>
              )}
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
              />
              {certificateError && (
                <div className="text-red-500 text-sm">{certificateError}</div>
              )}
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
                />
                {carImagesError && (
                  <div className="text-red-500 text-sm">{carImagesError}</div>
                )}
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
