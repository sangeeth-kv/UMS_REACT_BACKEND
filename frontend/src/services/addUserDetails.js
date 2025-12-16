import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/API_ROUTES";
import log from "../utils/logger"

const addUserDetails= async (data)=>{
    try {
        const response=await axiosInstance.post(API_ROUTES.ADD_USER_DETAILS,data)
        return response.data
    } catch (error) {
       log.warn("Add user details Error : ",error)
       if(error.response){
            return error.response.data
        }else{
            return { success: false, message: "Network error" };
        }
    }

}

export default addUserDetails