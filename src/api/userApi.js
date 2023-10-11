

import { userAxiosInstance } from "./axiosInstance";

export const userSignup = async (signupData) => {
  console.log("signup service");
  const data = await userAxiosInstance.post("/signup", signupData);
  console.log(data, "data in service");
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

