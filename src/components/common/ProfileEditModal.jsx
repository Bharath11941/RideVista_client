import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { updateUser } from "../../api/userApi";
import { updatePartner } from "../../api/partnerApi";

const ProfileEditModal = ({ data, setData, role }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(20)
      .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
      .required("Required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
    mobile: yup
      .number("Phone number must be a 10 digit number")
      .positive()
      .integer()
      .test("len", "Phone number should be a 10 digit number", (val) =>
        /^\d{10}$/.test(val)
      )
      .required("Required"),
  });

  const onSubmit = async () => {
    if (role === "user") {
      const res = await updateUser(values);
      setData(res?.data?.userData);
    } else if (role === "partner") {
      const res = await updatePartner(values);
      setData(res?.data?.partnerData);
    }
    setActiveModal(null);
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: data?.name,
        email: data?.email,
        mobile: data?.mobile,
      },
      validationSchema: validationSchema,
      onSubmit,
      enableReinitialize: true,
    });
  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  return (
    <>
      {loading ? (
        <div className="flex">
          <span className="loading loading-spinner text-info"></span>
          <span className="loading loading-spinner text-info"></span>
          <span className="loading loading-spinner text-info"></span>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => openModal("popup-modal")}
          className="text-white mt-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          edit
        </button>
      )}
      <div
        id="popup-modal"
        tabIndex={-1}
        className={`fixed top-16 left-16 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${
          activeModal === "popup-modal" ? "" : "hidden"
        }`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() => closeModal()}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-start">
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required=""
                />
                {errors.name && touched.name && (
                  <p className="text-red-600">{errors.name}</p>
                )}
                <div className="flex justify-between mt-2">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <FontAwesomeIcon
                    data-tooltip-target="tooltip-light"
                    data-tooltip-style="light"
                    icon={faExclamation}
                    size="lg"
                    style={{ color: "#ff0040" }}
                  />
                  <div
                    id="tooltip-light"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-red-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
                  >
                    Email cannot be changed
                    <div className="tooltip-arrow" data-popper-arrow="" />
                  </div>
                </div>

                <input
                  type="text"
                  name="email"
                  value={values.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required=""
                  disabled // Add the disabled attribute
                />
                {/* <div className="text-gray-500 text-sm mt-1">
                This field is disabled for editing. Email cannot be changed.
              </div> */}
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required=""
                />
                {errors.mobile && touched.mobile && (
                  <p className="text-red-600">{errors.mobile}</p>
                )}

                <button
                  data-modal-hide="popup-modal"
                  type="submit"
                  className="text-white-500 mt-2 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditModal;
