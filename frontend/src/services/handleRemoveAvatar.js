import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/API_ROUTES";
import log from "../utils/logger";

async function removeAvatar() {
    try {
        const response=await axiosInstance.delete(API_ROUTES.REMOVE_AVATAR)
        return response.data
    } catch (error) {
        log.error(`error in deleting avatar: ${error}`)
        if(error.response){
            return error.response.data
        }else{
            return { success: false, message: "Network error" };
        }
    }
}

export default removeAvatar