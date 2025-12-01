import axios from "axios";

const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true,
    timeout:10000
})
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error); // pass error to your signup function
  }
);

export default axiosInstance