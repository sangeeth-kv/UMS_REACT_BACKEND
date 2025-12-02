import React, { useState } from "react";
import  {useForm} from "react-hook-form";
import FormInputField from "../../../components/InputField/FormInputField";
import { Eye, EyeOff, Form } from "lucide-react";
import AuthFormButton from "../../../components/Buttons/AuthFormButton";
import AuthNavLink from "../../../components/NavLink/AuthNavLink";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../../validation/schemas/signinSchema";
import log from "../../../utils/logger"
import signinUser from "../../../services/usreSignin";
import toast from "react-hot-toast";

function UserSignin() {
  const {register,handleSubmit,setError,formState:{errors}}=useForm({resolver:yupResolver(signInSchema)})
  const [show, setShow] = useState(false);
  const [clicked,setClicked]=useState(false)

  const onSubmit=async (data)=>{

    try{

      log.debug("hitied on sumbit in signin : ",data)
      if(clicked)return;
      setClicked(true)
      const response=await signinUser(data)
      if(response.success){
        toast.success(response.message)
      }else{
        if(response.errors){
          response.errors.forEach((err)=>{
            setError(err.path, { message: err.message });
          })
        }else{
          toast.error(response.message);
        }
      }
    }catch(error){
      log.error("signin error : ",error)
      toast.error("Something went wrong!");
    }finally{
      setClicked(false)
    }
  }


  return (
    <div
      className="w-full min-h-screen flex items-center justify-center 
                      bg-blue-50 text-blue-900 
                      dark:bg-gray-900 dark:text-white"
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
          Sign in
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <FormInputField title="Email" type="text" register={register("email")} error={errors.email?.message} />
        <FormInputField
          register={register("password")}
          error={errors.password?.message}
          title="Password"
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

        <AuthFormButton title="Login" disabled={clicked} />
        </form>
        <AuthNavLink
          title="Don't have an account ?"
          link="/signup"
          navTitle="click here."
        />

      </div>
    </div>
  );
}

export default UserSignin;
