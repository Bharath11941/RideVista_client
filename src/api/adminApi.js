import { adminAxiosInstance } from "./axiosInstance";

export const adminLoginVerify = async (loginData) => {
  const data = await adminAxiosInstance.post("/login", loginData);
  return data;
};
export const usersList = async () => {
  const data = await adminAxiosInstance.get("/users");
  return data;
};
export const partnerList = async () => {
  const data = await adminAxiosInstance.get("/partners");
  return data;
};

export const carList = async () => {
  const data = await adminAxiosInstance.get('/cars')
  return data
}
export const singleCarDetails = async(carId) => {
  const data = await adminAxiosInstance.get(`/singleCarDetails/${carId}`)
  return data
}

export const userBlock = async (userId, status) => {
  const data = await adminAxiosInstance.patch("/blockUser", { userId, status });
  return data;
};

export const partnerBlock = async (partnerId, status) => {
  const data = await adminAxiosInstance.patch("/blockPartner", { partnerId, status });
  return data;
};

