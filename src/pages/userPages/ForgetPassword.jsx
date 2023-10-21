import * as yup from "yup";
import { useFormik } from "formik";
import { userForgetPassword } from "../../api/userApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../../components/loading/Loading";


const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
  });
  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await userForgetPassword(values.email);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        navigate("/login");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formSchema,
      onSubmit,
    });

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto mt-24">
          <div className="flex flex-col items-center justify-center p-4 space-y-4 antialiased text-gray-900 bg-gray-100">
            <div className="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
              <h1 className="mb-6 text-3xl font-bold text-center">
                Don't worry
              </h1>
              <p className="text-center mx-12">
                We are here to help you recover your password. Enter the email
                address you used when you joined, and we'll send you
                instructions to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <input
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-medium text-center text-white bg-indigo-600 transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                  >
                    Send
                  </button>
                </div>
              </form>
              <div className="text-sm text-gray-600 items-center flex justify-between">
                <p className="text-gray-800 cursor-pointer hover:text-blue-500 inline-flex items-center ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back
                </p>
                <p className="hover:text-blue-500 cursor-pointer">Need help?</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;
