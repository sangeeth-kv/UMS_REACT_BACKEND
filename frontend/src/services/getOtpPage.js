import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/API_ROUTES";
import log from "../utils/logger"
async function getOtpPage() {
    try {
        const response=await axiosInstance.post(API_ROUTES.GET_OTP_PAGE)
        return response.data
    } catch (error) {
        log.error(error)
    }
}

export default getOtpPage