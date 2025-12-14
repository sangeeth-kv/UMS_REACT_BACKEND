import axiosInstance from "../api/axiosInstance";


async function getAllUsers() {
    const response = await axiosInstance.get("/users")
    console.log("response got in the getAllUsers funtion : ",response)
    return response.data
}

export default getAllUsers