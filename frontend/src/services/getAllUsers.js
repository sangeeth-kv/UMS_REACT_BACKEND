import axiosInstance from "../api/axiosInstance";
import log from "../utils/logger"


async function getAllUsers(page=1,limit=5,seachQuery) {
    try {
        const response = await axiosInstance.get(`/users?page=${page}&limit=${limit}&searchQuery=${seachQuery}`)
        console.log("response got in the getAllUsers funtion : ",response)
        if(response.data.success){
            return response.data
        }else if(response.data.data){
            return response.data
        }
    } catch (error) {
        log.error(error)
    }
}

export default getAllUsers