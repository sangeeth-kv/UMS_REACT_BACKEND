import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
// import {useDispatch} from "react-redux";
// import {clearAccessToken,clearUser} from "../../../store/authSlice";
import  {useForm} from "react-hook-form";
import { Eye, EyeOff, Form } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import FormInputField from "../../../components/InputField/FormInputField";
import { forgotPasswordSchema } from "../../../validation/schemas/forgotPasswordSchema";
import verifyForgotPassword from "../../../services/verifyForgotPassword";
// import logoutUser from "../../../services/logoutUser";

function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate();

    // const dispatch=useDispatch()

    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(forgotPasswordSchema)})
    const [show, setShow] = useState(false);

    const [loading, setLoading] = useState(false);


    console.log("toke in : ",token)



    useEffect(() => {
    if (!token) {
      navigate("/not-found");
    }
    }, [token, navigate]);

    

    const onSubmit=async (data) => {

        try{
            setLoading(true)
            console.log("data : ",data)
            const response=await verifyForgotPassword(data,token)
            console.log("response data in handleSubmit : ",response)
            if(response.success){
                toast.success(response.message)
                navigate("/signin",{ replace: true })
            }else{
                toast.error(response.message)
            }

        }catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }

        
    }


    if(loading){
        return <Spinner/>
    }

  return (
     <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Reset Password
          </h1>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
            Enter your new password below
          </p>  

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <FormInputField 
                title=""
                register={register("password")}
                error={errors.password?.message}
                type={show ? "text" : "password"}
                icon={
                    <span
                      onClick={() => setShow((show) => !show)}
                      className="cursor-pointer"
                    >
                      {show ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                }
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <FormInputField 
                title=""
                register={register("confirmPassword")}
                error={errors.confirmPassword?.message}
                type={show ? "text" : "password"}
                icon={
                    <span
                      onClick={() => setShow((show) => !show)}
                      className="cursor-pointer"
                    >
                      {show ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                }

                />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

        </div>
      </div>
  )
}

export default ResetPassword