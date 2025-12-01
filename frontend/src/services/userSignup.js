import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/API_ROUTES";

const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.SIGNUP, userData);
    // console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Signup error:", error);
    if(error.response){
        return error.response.data
    }else{
        return { success: false, message: "Network error" };
    }
  }
};

export default signupUser