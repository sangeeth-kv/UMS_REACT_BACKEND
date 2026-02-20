import { API_ROUTES } from "../../api/API_ROUTES";
import axiosInstance from "../../api/axiosInstance";
import log from "../../utils/logger"


async function handleToggleBlock(reason,userId) {
    try {
        const res=await axiosInstance.patch(API_ROUTES.ADMIN_TOGGLE_BLOCK,{reason,userId})
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

export default  handleToggleBlock