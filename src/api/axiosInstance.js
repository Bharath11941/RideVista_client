import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const userBaseURL = baseURL;
const partnerBaseURL = `${baseURL}/partner`;
const adminBaseURL = `${baseURL}/admin`;


const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout:200000,
    timeoutErrorMessage:"Request Timeout... Please try again!.."
  })
  return instance
}

const attachToken = (req,tokenName) => {
  let authToken = localStorage.getItem(tokenName)
  if(authToken){
    req.headers.Autherization = `Bearer ${authToken}`
  }
  return req
}

//user Axios instance

export const userAxiosInstance = createAxiosInstance(userBaseURL)
userAxiosInstance.interceptors.request.use(async (req)=>{
  const modifiedReq = attachToken(req,'userToken')
  console.log(modifiedReq)
  return modifiedReq
})

export const partnerAxiosInstance = createAxiosInstance(partnerBaseURL)
partnerAxiosInstance.interceptors.request.use(async (req)=>{
  const modifiedReq = attachToken(req,'partnerToken')
  console.log(modifiedReq)
  return modifiedReq
})