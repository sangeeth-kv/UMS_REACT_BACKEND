import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ToggleButton from "../../../features/toggleMode/toggleButton";
import { Eye, EyeOff } from "lucide-react";
import FormInputField from "../../../components/InputField/FormInputField";
import AuthFormButton from "../../../components/Buttons/AuthFormButton";
import AuthNavLink from "../../../components/NavLink/AuthNavLink";
import signupSchema from "../../../validation/signupSchema/signupSchema";
import signupUser from "../../../services/userSignup";
import { Toaster,toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../../api/API_ROUTES";


function UserSignup() {

  const {register,handleSubmit,setError,formState:{errors}}=useForm({resolver:yupResolver(signupSchema)})
  const[clicked,setClicked]=useState(false)
  const [show, setShow] = useState(false);
  const navigate=useNavigate();

  

  const onSubmit=async(data)=>{
    if(clicked)return;
    setClicked(true)
    try {
      const response = await signupUser(data);
      if(response.success){
        
        toast.success(response.message);
        setTimeout(() => navigate(API_ROUTES.SIGNIN), 1200);
      }else{
        if(response.errors){
          response.errors.forEach((err) => {
             setError(err.path, { message: err.message });
          });
        }else{
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally{
      setClicked(false)
    }
  }
  
  return (
    <>
      <div
        className="w-full min-h-screen flex items-center justify-center 
                      bg-blue-50 text-blue-900 
                      dark:bg-gray-900 dark:text-white"
      >
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
          <h3 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
            Sign up
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          {/* Fullname */}
          <FormInputField title="Fullname" type="text"   register={register("fullname")} error={errors.fullname?.message} />

          {/* Email */}
         <FormInputField title="Email" type="email" register={register("email")}  error={errors.email?.message}/>

          {/* Phone */}
          <FormInputField title="Phone Number" type="tel"    register={register("phone")}  error={errors.phone?.message}  />

          {/* Password */}
          <FormInputField title="Password" type={show?"text":"password"} icon={ 
          <span onClick={() => setShow((show) => !show)} className="cursor-pointer">
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>} register={register("password")}  error={errors.password?.message} />

          {/* Confirm Password */}
          <FormInputField title="Confirm Password" type="password" register={register("confirmPassword")}  error={errors.confirmPassword?.message} />

          {/* Button */}
          <AuthFormButton title={clicked?"Signing up...":"Sign Up"} disabled={clicked}/>
          <AuthNavLink title="You have already an account ?" link="/signin" navTitle="click here."/>
          </form>
        </div>

      </div>
    </>

  );
}

export default UserSignup;
