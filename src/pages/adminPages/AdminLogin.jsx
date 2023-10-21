import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { adminLoginSchema } from "../../validations/admin/adminLoginSchema";
import { adminLoginVerify } from "../../api/adminApi";
import { adminLogin } from "../../reduxStore/slices/adminSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const res = await adminLoginVerify(values)
      if (res?.status === 200) {
        const { token, userName } = res.data;

        localStorage.setItem("adminToken", token);
        dispatch(
          adminLogin({
            token: token,
            admin: userName,
          })
        );
        toast.success(res?.data?.message);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  }


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: adminLoginSchema,
      onSubmit,
    });
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Admin Login now!</h1>
          <p className="py-6">
            Welcome to the Car Rental Admin login page. Please provide your
            credentials to access the admin dashboard.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered"
                required
              />
              {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input input-bordered"
                required
              />
              {errors.password && touched.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
