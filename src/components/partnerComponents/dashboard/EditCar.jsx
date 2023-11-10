import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { carValidationSchema } from "../../../validations/partner/carValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSingleImage, editCar, editCarDetails } from "../../../api/partnerApi";
import Loading from "../../loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faTrash } from "@fortawesome/free-solid-svg-icons";


const EditCar = () => {
  const [certificate, setCertificate] = useState([]);
  const [certificateImg, setCertificateImg] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [carImage, setCarImage] = useState([]);
  const { carId } = useParams();
  const [car, setCar] = useState({});
  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await editCar({ ...values, certificate, carImage, carId });
      if (res?.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
        navigate("/partner/myCars");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };
  useEffect(() => {
    editCarDetails(carId)
      .then((res) => {
        setCar(res?.data?.car);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        carName: car.carName,
        price: car.price,
        location: car.location,
        fuelType: car.fuelType,
        transitionType: car.transitionType,
        modelType: car.modelType,
      },
      validationSchema: carValidationSchema,
      onSubmit,
      enableReinitialize: true,
    });
  const handleCertificateFileChange = (event) => {
    setCertificateImg(event.target.files[0]);
    const file = event.target.files[0];
    setCertificateToBase(file);
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
    setCarImageToBase(files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    const allImages = [...newImages, ...car.carImages];
    setSelectedImages(allImages);
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
  const handleDeleteImage = async (imageSrc) => {
    try {
      setLoading(true)
      const res = await deleteSingleImage(imageSrc,car._id)
      if(res.status === 200){
        toast.success(res?.data?.message)
        setCar(res?.data?.updatedData)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  }
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
            <h1 className="text-xl pb-2">Edit car</h1>
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
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="certificate_input"
                >
                  Upload Registration certificate
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="certificate_input_help"
                  id="certificate_input"
                  type="file"
                  onChange={handleCertificateFileChange}
                  accept="image/*" // Allow only image files
                  required
                />
                <div className="w-60 h-auto pb-5">
                  {certificateImg && certificateImg instanceof Blob ? (
                    <div>
                      <img
                        src={URL.createObjectURL(certificateImg)} 
                        alt="Car Registration Certificate"
                        className="mt-2 max-w-full h-auto"
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={car.certificate}
                        alt="Car Registration Certificate"
                        className="mt-2 max-w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="certificate_input"
                >
                  Upload Car images
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="certificate_input_help"
                  id="certificate_input"
                  type="file"
                  onChange={handleCarImagesChange}
                  accept="image/*" // Allow only image files
                  required
                  multiple
                />
                <div className="w-60 h-auto overflow-x-auto flex space-x-2">
                  {selectedImages.length > 0
                    ? selectedImages.map((imageURL, index) => (
                        <div key={index}>
                          <img
                            src={imageURL}
                            alt={`Car Image ${index + 1}`}
                            className="max-w-full h-auto"
                          />
                        </div>
                      ))
                    : car.carImages &&
                      car.carImages.map((imageURL, index) => (
                        <div key={index}>
                          <img
                            src={imageURL}
                            alt={`Car Image ${index + 1}`}
                            className="max-w-full h-auto"
                          />
                          <p onClick={()=>{handleDeleteImage(imageURL)}}>
                            <FontAwesomeIcon
                              className="w-5 h-5"
                              icon={faTrash}
                              style={{ color: "#e70d23" }}
                            />
                          </p>
                        </div>
                      ))}
                </div>
              </div>

              <button
                type="submit"
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default EditCar;
