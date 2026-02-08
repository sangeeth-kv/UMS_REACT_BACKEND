import axios from "axios";
import store from "../app/store";
import log from "../utils/logger";
import {toast} from "react-hot-toast"
import { clearAccessToken, clearUser, setAccessToken } from "../store/authSlice";
// import { clearAccessToken, setAccessToken } from "../store/authSlice";

const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true,
    timeout:10000
})

const axiosRefresh = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials:true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state=store.getState()
    console.log("stateeeeE: ",state)
    log.debug(`state got from axisos instance : ${state.auth.accessToken}`)
    const token = state.auth.accessToken;; 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     console.log("error consoled : ",error)
//     // If access token expired (401 Unauthorized) AND it's not already retried
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         // Call backend /refresh to get new access token
//         const refreshResponse = await axiosRefresh.get("/refresh");

//         console.log("this is working  ::: : :: : : ")

//         const newAccessToken = refreshResponse.data.data.accessToken;

//         // Update redux with new token
//         store.dispatch({
//           type: "auth/setAccessToken",
//           payload: newAccessToken,
//         });

//         // Update axios header
//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

//         // Retry original request
//         return axiosInstance(originalRequest);

//       } catch (refreshError) {
//         log.error(refreshError)
//         // // Optional: Logout user
//         // store.dispatch({ type: "auth/clearAccessToken" });
//         // store.dispatch({ type: "auth/clearUser" });

//         // window.location.href = "/sigin";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("🚨 Axios Error Interceptor Hit");
    console.log("Status:", error.response?.status);
    console.log("Message:", error.response?.data);
    console.log("Original URL:", error.config?.url);
    const originalRequest = error.config;
    if (!error.response) return Promise.reject(error);

    if(error.response?.data?.message=="Too many requests, please try after 5 minutes"){
      toast.error("Too many requests, please try after 5 minutes")
    }
    // if(error.response?.data?.message=="Otp has expired request for new otp"){
    //   // toast.error("Too many requests, please try after 5 minutes")
    //   toast.error(error.response?.data?.message)
    // }

    // Do not attempt to refresh for refresh endpoint or already retried
    if (originalRequest._retry || originalRequest.url?.includes("/refresh")) {
      return Promise.reject(error);
    }

    // Either check for specific error code or general 401
    const isExpired = error.response.status === 401 && error.response.data?.message === "TOKEN_EXPIRED";

    if (isExpired) {  
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosRefresh.get("/refresh");
        const newAccessToken = refreshResponse.data.data.accessToken;
        store.dispatch(setAccessToken(newAccessToken));
        axiosInstance.defaults.headers.common["Authorization"] =`Bearer ${newAccessToken}`;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // logout and redirect
        store.dispatch(clearAccessToken());
        store.dispatch(clearUser());
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }

    // if (error.response?.status === 401 && error.response.data?.message!=="TOKEN_EXPIRED"){
    //   store.dispatch(clearAccessToken());
    //   store.dispatch(clearUser());
    //   window.location.href = "/signin";
    // }

    const isAuthRoute =originalRequest.url?.includes("/signin") || originalRequest.url?.includes("/signup");
    if (isAuthRoute) {
      return Promise.reject(error);
    }
  

    if (
      error.response?.status === 401 &&
      ["TOKEN_BLACKLISTED", "INVALID_TOKEN", "SESSION_REVOKED"].includes( error.response.data?.message)
    ) {
      store.dispatch(clearAccessToken());
      store.dispatch(clearUser());
      window.location.href = "/signin";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);



export default axiosInstance
export {axiosRefresh}