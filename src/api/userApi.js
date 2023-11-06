

import { userAxiosInstance } from "./axiosInstance";

export const userSignup = async (signupData) => {
  const data = await userAxiosInstance.post("/signup", signupData);
  return data;
};

export const otpVerification = async (otp, otpId, userId) => {
  const data = await userAxiosInstance.post("/otp", { otp, userId });
  return data;
};
export const clientResendOtp = async ( userEmail) => {
  console.log(userEmail,"from userApi");
  const data = await userAxiosInstance.post("/resendOtp", { userEmail });
  return data;
};
export const loginVerificaton = async (loginData) => {
  console.log(loginData,"from instance");
  const data = await userAxiosInstance.post("/login", loginData);
  return data;
};

export const userLoginWithGoogle = async (userEmail) => {
  console.log(userEmail);
  const data = await userAxiosInstance.post('/googleLogin',{userEmail})
  return data
}

export const userForgetPassword = async (userEmail) => {
  const data = await userAxiosInstance.post('/forgetPassword',{userEmail})
  return data
}
export const userResetPassword = async(id,email,password) => {
  const data = await userAxiosInstance.put(`/resetPassword/${id}/${email}`,{password})
  return data
}

export const HomeCarList = async () => {
  const data = await userAxiosInstance.get('/homeCarList')
  return data;
}
export const allCarList = async () => {
  const data = await userAxiosInstance.get('/allCars')
  return data;
}

export const getCarDetails = async (carId) => {
  const data = await userAxiosInstance.get(`/carDetails/${carId}`)
  return data;
}

export const carBooking = async (bookingData) => {
  const data = await userAxiosInstance.post('/carBooking',bookingData)
  return data;
}
export const verifyPayment = async (response,bookingData) => {
  const data = await userAxiosInstance.post('/verifyPayment',{response,bookingData})
  return data;
}
export const filterCarsDateLocation = async (formData) => {
  const data = await userAxiosInstance.post('/filterCars',formData)
  return data;
}
