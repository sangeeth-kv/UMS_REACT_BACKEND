import { useEffect,useState } from "react";
import {axiosRefresh} from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../store/authSlice";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"

function  useRefreshToken(token) {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(true)

    useEffect(() => {

        if (token) return 

        async function refresh() {
            try {
                const response = await axiosRefresh.get("/refresh");
                console.log("response : ",response)
                if (response.data.success) {
                    dispatch(setAccessToken(response.data.data.accessToken));
                    dispatch(setUser(response.data.data.user))
                }else if(response.data.message){
                    toast.error(response.data.message)
                }
            } catch (err) {
                console.error("Refresh failed:", err);
                const message = err.response?.data?.message;

                if (message === "Session expired !") {
                    // toast.error(message);
                    navigate("/signin");
                } else {
                    toast.error(message || "Refresh failed");
                }

            }finally{
                setLoading(false)
            }
        }

        refresh();
    }, [dispatch,navigate]);
    return loading
}

export default useRefreshToken;
