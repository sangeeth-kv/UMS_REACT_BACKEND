import axiosInstance from "../api/axiosInstance";


async function getAllUsers(page=1,limit=5) {
    const response = await axiosInstance.get(`/users?page=${page}&limit=${limit}`)
    console.log("response got in the getAllUsers funtion : ",response)
    return response.data
}

export default getAllUsers