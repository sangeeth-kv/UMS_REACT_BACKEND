
import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/API_ROUTES";
import log from "../utils/logger";


async function forgotPassword() {
    try {
        const response=await axiosInstance.get(API_ROUTES.FORGOT_PASSWORD)
        return response.data
    } catch (error) {
        log.error(error)
        if(error.response){
            return error.response.data
        }else{
            return { success: false, message: "Network error" };
        }
    }
}

export default forgotPassword