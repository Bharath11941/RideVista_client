import { partnerAxiosInstance } from "./axiosInstance";

export const partnerSignup = async (signupData) => {
  const data = await partnerAxiosInstance.post("/signup", signupData);
  return data;
};

export const partnerOtpVerification = async (otp, partnerId) => {
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
  const data = await partnerAxiosInstance.put(`/editCar`,{...formData})
  return data
}
export const deleteSingleImage = async (imageUrl,carId) => {
  const data = await partnerAxiosInstance.patch('/deleteImage',{imageUrl,carId})
  return data
}
export const bookingsPartner = async (partnerId) => {
  const data = await partnerAxiosInstance.get(`/bookingsPartner/${partnerId}`)
  return data
}
export const cancelBookingPartner = async (bookingId,reason) => {
  const data = await partnerAxiosInstance.post('/cancelBooking',{bookingId,reason})
  return data
}

export const changeBookingStatus = async (status,bookingId,startDate,endDate,carId) => {
  const data = await partnerAxiosInstance.patch('/changeStatus',{status,bookingId,startDate,endDate,carId})
  return data
}
export const getReviews = async (carId) => {
  const data = await partnerAxiosInstance.get(`/getReviews/${carId}`)
  return data
}
export const allRequestCancel = async (partnerId) => {
  const data = await partnerAxiosInstance.get(`/cancelRequests/${partnerId}`)
  return data
}
export const cancelRequestApproval = async (bookingId,status) => {
  const data = await partnerAxiosInstance.patch('/approveCancel',{bookingId,status})
  return data
}
export const reportUser = async (partnerId,reason,userId) => {
  const data = await partnerAxiosInstance.patch('/reportUser',{partnerId,reason,userId})
  return data
}
export const updateProfileImage = async (partnerId,image,prevImg) => {
  const data = await partnerAxiosInstance.patch(`/profileImage`,{partnerId,image,prevImg})
  return data
}
export const updatePartner = async (formData) => {
  const data = await partnerAxiosInstance.put('/editProfile',formData)
  return data
}

export const partnerReport = async (partnerId) => await partnerAxiosInstance.get(`/report/${partnerId}`)