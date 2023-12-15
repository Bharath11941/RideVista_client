

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
  const data = await userAxiosInstance.post("/resendOtp", { userEmail });
  return data;
};
export const loginVerificaton = async (loginData) => {
  const data = await userAxiosInstance.post("/login", loginData);
  return data;
};

export const userLoginWithGoogle = async (userEmail) => {
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
export const updateProfileImage = async (userId,image,prevImg) => {
  const data = await userAxiosInstance.patch(`/profileImage`,{userId,image,prevImg})
  return data
}
export const updateUser = async (formData) => {
  const data = await userAxiosInstance.put('/editProfile',formData)
  return data
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
export const reviewListUser = async (carId) => {
  const data = await userAxiosInstance.get(`/reviews/${carId}`)
  return data
}
export const myBookings = async (userId) => {
  const data = await userAxiosInstance.get(`/myBookings/${userId}`)
  return data
}
export const cancelBookingUser = async (bookingId,reason) => {
  const data = await userAxiosInstance.post('/cancelBooking',{bookingId,reason})
  return data
}

export const getUserDetails = async (userId) => {
  const data = await userAxiosInstance.get(`/userDetails/${userId}`)
  return data
}

export const reviewCar = async (reviewData) => {
  const data = await userAxiosInstance.put('/reviewCar',reviewData)
  return data
}
export const reportCarOwner = async (ownerId,reason,userId) => {
  const data = await userAxiosInstance.patch('/reportOwner',{ownerId,reason,userId})
  return data
}