import { API_ROUTES } from "../../api/API_ROUTES";
import axiosInstance from "../../api/axiosInstance";
import log from "../../utils/logger"

async function getDashboard() {
    try {
        const res=await axiosInstance.get(API_ROUTES.ADMIN_GETDASHBOARD)
        return res.data
    } catch (error) {
        log.error("Error in the get dashboard : ",error)
        if(error.response){
            return error.response.data
        }else{
            return { success: false, message: "Network error" };
        }
    }

}

export default getDashboard