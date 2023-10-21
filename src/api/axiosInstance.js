import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASE_URL;
const userBaseURL = baseURL;
const partnerBaseURL = `${baseURL}/partner`;
const adminBaseURL = `${baseURL}/admin`;

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 200000,
    timeoutErrorMessage: "Request Timeout... Please try again!..",
  });
  return instance;
};

const attachToken = (req, tokenName) => {
  let authToken = localStorage.getItem(tokenName);
  if (authToken) {
    req.headers.Autherization = `Bearer ${authToken}`;
  }
  return req;
};

//user request interceptor

export const userAxiosInstance = createAxiosInstance(userBaseURL);
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "userToken");
  return modifiedReq;
});

export const partnerAxiosInstance = createAxiosInstance(partnerBaseURL);
partnerAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "partnerToken");
  return modifiedReq;
});

export const adminAxiosInstance = createAxiosInstance(adminBaseURL);
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "adminToken");
  return modifiedReq;
});

// response intercepter


userAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);

adminAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);

partnerAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error)
);

const handleAxiosError = (error, navigate) => {

  const errorMessage = error.response
    ? error.response.data.message
    : "An error occurred while request.";

  if (error.response) {
    if (error.response.status === 404) {
      toast.error("404 - Resource Not Found");
      navigate("/PageNotFound");
    } else if (error.response.status === 500) {
      toast.error("500 - Internal Server Error");
    } else {
      toast.error(errorMessage);
    }
  } else {
    toast.error(errorMessage);
  }
};
