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
  const data = await partnerAxiosInstance.post('/googleLogin',{partnerEmail})
  return data
}
export const partnerForgetPassword = async (partnerEmail) => {
  const data = await partnerAxiosInstance.post('/partnerForget',{partnerEmail})
  return data
}
export const partnerResetPassword = async (id,email,password) => {
  const data = await partnerAxiosInstance.patch(`/partnerResetPass/${id}/${email}`,{password})
  return data
}
export const addCar =async (carFormdata) => {
  const data = await partnerAxiosInstance.post('/addCar',{...carFormdata})
  return data;
}

export const myCarsList = async (partnerId) => {
  const data = await partnerAxiosInstance.get(`/myCars/${partnerId}`)
  return data
}

export const editCarDetails = async (carId) => {
  const data = await partnerAxiosInstance.get(`/editcarDetails/${carId}`)
  return data
}

export const editCar = async (formData) => {
  console.log(formData,"api instance");
  const data = await partnerAxiosInstance.put(`/editCar`,{...formData})
  return data
}