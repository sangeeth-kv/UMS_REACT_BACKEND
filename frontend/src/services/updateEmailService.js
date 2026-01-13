import log from "../utils/logger"
import axiosInstance from "../api/axiosInstance";
import {API_ROUTES} from "../api/API_ROUTES"
async function updateEmail(email) {
    try {
        const res=await axiosInstance.post(API_ROUTES.UPDATE_EMAIL,email)
        return res.data
    } catch (error) {
        log.error("Error in the update email : ",error)
        if(error.response){
            return error.response.data
        }else{
            return { success: false, message: "Network error" };
        }        
    }
}

export default updateEmail