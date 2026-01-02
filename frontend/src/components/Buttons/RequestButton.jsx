import React,{useState} from 'react'
import log from "../../utils/logger"
import {useNavigate} from "react-router-dom"
import getOtpPage from '../../services/getOtpPage'
import {toast} from "react-hot-toast"

function RequestButton({title}) {

    const navigate=useNavigate()
    const [pressed,setPressed]=useState(false)

    const handleOnClickRequest=async()=>{
        setPressed(true)
        try {
            const respose=await getOtpPage()
            console.log(respose)
            if(respose?.success){
                const expiresAt =Date.now() + respose.data.expiresAt * 1000;
                console.log("expired at : ",expiresAt)
                localStorage.setItem("otpExpiresAt", expiresAt);
                toast.success(respose?.message)
                navigate(respose?.data?.redirectUrl)
            }
        } catch (error) {
            log.error("error in sending otp : ",error)
        } finally{
            setPressed(false)
        }
    }

    // if(pressed){

    // }
  return (
     <button disabled={pressed}
    onClick={handleOnClickRequest}
    className="mt-2 inline-flex items-center gap-2
             px-4 py-2 rounded-lg text-sm font-medium
             bg-yellow-400 text-gray-900
             hover:bg-yellow-500
             focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
             focus:ring-offset-white
             dark:bg-yellow-500 dark:text-gray-900
             dark:hover:bg-yellow-400
             dark:focus:ring-yellow-500 dark:focus:ring-offset-gray-900
             transition "
>
    {pressed ? "Sending OTP..." : title}

    </button>
  )
}

export default RequestButton