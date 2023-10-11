import { useFormik } from "formik";
import { userSchema } from "../../validations/user/userSignupValidation";
import { userSignup } from "../../api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserSignup = () => {
  const navigate = useNavigate();
  async function onSubmit() {
    try {
      const res = await userSignup(values);

      console.log(res);
      if (res?.status === 201) {
        const { user, otpId } = res.data;
        toast(res?.data?.status);
        navigate("/otp", { state: { userEmail: user.email, otpId: otpId,userId:user._id } });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.status);
    }
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      },
      validationSchema: userSchema,
      onSubmit,
    });
  return (
    <div className="min-h-screen py-40">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url('/images/car2.jpg')" }}
          >
            <h1 className="text-white text-3xl mb-3">Welcome to RideVista</h1>
            <div>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                suspendisse aliquam varius rutrum purus maecenas ac
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">User Register</h2>
            <p className="mb-4">
              Create your account. It’s free and only takes a minute
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border border-gray-400 rounded-lg shadow-md py-2 px-4 w-full"
                />
                {errors.name && touched.name && (
                  <p className="text-red-600">{errors.name}</p>
                )}
              </div>
              <div className="mt-5">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border border-gray-400 rounded-lg shadow-md py-2 px-4 w-full"
                />
                {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border border-gray-400 rounded-lg shadow-md py-2 px-4 w-full"
                />
                {errors.mobile && touched.mobile && (
                  <p className="text-red-600">{errors.mobile}</p>
                )}
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border border-gray-400 rounded-lg shadow-md py-2 px-4 w-full"
                />
                {errors.password && touched.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="cpassword"
                  value={values.cpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border border-gray-400 rounded-lg shadow-md py-2 px-4 w-full"
                />
                {errors.cpassword && touched.cpassword && (
                  <p className="text-red-600">{errors.cpassword}</p>
                )}
              </div>
              <div className="mt-5">
                <button className="w-full bg-purple-500 py-3 text-center text-white rounded-lg shadow-md">
                  Register Now
                </button>
              </div>
              <div className="mt-3">
                <p>Already have an account? <Link to="/login" className="text-purple-500">Login</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
