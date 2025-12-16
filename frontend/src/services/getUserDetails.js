import axiosInstance from "../api/axiosInstance";
import { API_ROUTES } from "../api/API_ROUTES";


async function getUserDetails() {
    const response = await axiosInstance.get(API_ROUTES.GET_USER_DETAILS)
    return response.data
}

export default getUserDetails