import { partnerAxiosInstance } from "./axiosInstance";

export const partnerSignup = async (signupData) => {
  console.log("signup service");
  const data = await partnerAxiosInstance.post("/signup", signupData);
  console.log(data, "data in service");
  return data;
};

export const partnerOtpVerification = async (otp, partnerId) => {
  console.log("front end api serivce");
  const data = await partnerAxiosInstance.post("/otp", { otp, partnerId });
  return data;
};
export const partnerResendOtp = async (partnerEmail) => {
  const data = await partnerAxiosInstance.post('/resendOtp',{partnerEmail})
  return data
}
export const partnerLoginVerificaton = async (loginData) => {
  const data = await partnerAxiosInstance.post("/login", loginData);
  return data;
};
export const partnerLoginWithGoogle = async (partnerEmail) => {
  console.log(partnerEmail);
  const data = await partnerAxiosInstance.post('/googleLogin',{partnerEmail})
  return data
}