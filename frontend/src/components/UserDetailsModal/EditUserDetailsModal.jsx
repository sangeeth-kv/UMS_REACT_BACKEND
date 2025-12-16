

import React,{useState,useEffect} from 'react'
import {useForm} from "react-hook-form";
import {yupResolver } from "@hookform/resolvers/yup"
import profileDetailsSchema from '../../validation/schemas/profileDetailsSchema';
import Spinner from '../Spinner/Spinner';
import getUserDetails from '../../services/getUserDetails';
import log from "../../utils/logger"
import { X } from "lucide-react";
import {toast,Toaster} from "react-hot-toast"
import addEditedUserDetails from '../../services/addEditedUserDetails';

function EditUserDetailsModal({onClose}) {

  const [details,setDetails]=useState()
  const [isLoading,setIsLoading]=useState(false)
  const {register,handleSubmit,reset,setError,watch,formState:{errors},}=useForm({resolver:yupResolver(profileDetailsSchema),})


  useEffect( ()=>{

     getUserDetails()
     .then((res)=>{
        console.log("response in edit user details modal : ",res)
        setDetails(res.data.userProfile)
     })
     .catch((err)=>{
        log.error(err)
     })

  },[])

  useEffect(() => {
  if (details?.profile) {
    reset({
      gender: details.profile.gender || "",
      dateOfBirth: details.profile.dateOfBirth
        ? details.profile.dateOfBirth.split("T")[0]
        : "",
      bloodGroup: details.profile.bloodGroup || "",
      address: {
        place: details.profile.address?.place || "",
        city: details.profile.address?.city || "",
        state: details.profile.address?.state || "",
        pincode: details.profile.address?.pincode || "",
      },
    });
  }
}, [details, reset]);


  const onSubmit=async (data)=>{
    try {
        setIsLoading(true)
        console.log("called on submit : ",data)
        const response=await addEditedUserDetails(data)
        console.log("response in the edit user modal : ",response)
        if (response.success) {
                toast.success(response.message);
                onClose();
              } else if (response.errors) {
                response.errors.forEach(err => {
                  setError(err.path, { message: err.message });
                });
        }
    } catch (error) {
        toast.error("Something went wrong",error); 
    }finally{
        setIsLoading(false)
    }
  }


  if(!details){
    return <Spinner/>
  }

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center 
                  bg-black/40 backdrop-blur-sm p-4">
    <div className="relative w-full max-w-3xl 
                    bg-white dark:bg-gray-800 
                    rounded-3xl shadow-2xl p-8">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-full
                   hover:bg-gray-100 dark:hover:bg-gray-700
                   transition"
      >
        <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Header */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Edit Profile
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Update your personal information
        </p>
        <p className="text-sm text-red-500 dark:text-red-400 mt-1">
          You can't change the Date of Birth, Gender, Blood Group
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

        {/* Gender (Read-only) */}
        {/* Read-only Info Section */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

  {/* Gender */}
  <div>
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
      Gender
    </p>
    <div className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700/50
                    text-gray-800 dark:text-gray-200 font-medium">
      {watch("gender") || "—"}
    </div>
    <input type="hidden" {...register("gender")} />
  </div>

  {/* DOB */}
  <div>
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
      Date of Birth
    </p>
    <div className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700/50
                    text-gray-800 dark:text-gray-200 font-medium">
      {watch("dateOfBirth") || "—"}
    </div>
    <input type="hidden" {...register("dateOfBirth")} />
  </div>

  {/* Blood Group */}
  <div>
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
      Blood Group
    </p>
    <div className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700/50
                    text-gray-800 dark:text-gray-200 font-medium">
      {watch("bloodGroup") || "—"}
    </div>
    <input type="hidden" {...register("bloodGroup")} />
  </div>

</div>


        {/* Address */}
       <div
  className="rounded-2xl border border-gray-200 dark:border-gray-700
             bg-gray-50 dark:bg-gray-900/40
             px-6 py-7"
>
  <h4 className="font-semibold text-gray-800 dark:text-gray-200
                 mb-6 text-lg">
    Address
  </h4>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

    {/* Place */}
    <div className="space-y-1.5">
      <label className="block text-sm font-medium
                         text-gray-600 dark:text-gray-400">
        Place
      </label>
      <input
        {...register("address.place")}
        placeholder="Enter place"
        className="input w-full p-2
                   rounded-xl
                   bg-white dark:bg-gray-800
                   border border-gray-300 dark:border-gray-600
                   focus:ring-2 focus:ring-blue-500
                   dark:focus:ring-blue-400  dark:text-gray-100"
      />
      {errors.address?.place && (
        <p className="text-xs text-red-500">
          {errors.address.place.message}
        </p>
      )}
    </div>

    {/* City */}
    <div className="space-y-1.5">
      <label className="block text-sm font-medium
                         text-gray-600 dark:text-gray-400">
        City
      </label>
      <input
        {...register("address.city")}
        placeholder="Enter city"
        className="input w-full p-2
                   rounded-xl
                   bg-white dark:bg-gray-800
                   border border-gray-300 dark:border-gray-600
                   focus:ring-2 focus:ring-blue-500
                   dark:focus:ring-blue-400  dark:text-gray-100 "
      />
      {errors.address?.city && (
        <p className="text-xs text-red-500">
          {errors.address.city.message}
        </p>
      )}
    </div>

    {/* State */}
    <div className="space-y-1.5">
      <label className="block text-sm font-medium
                         text-gray-600 dark:text-gray-400">
        State
      </label>
      <input
        {...register("address.state")}
        placeholder="Enter state"
        className="input w-full p-2
                   rounded-xl
                   bg-white dark:bg-gray-800
                   border border-gray-300 dark:border-gray-600
                   focus:ring-2 focus:ring-blue-500
                   dark:focus:ring-blue-400  dark:text-gray-100"
      />
      {errors.address?.state && (
        <p className="text-xs text-red-500">
          {errors.address.state.message}
        </p>
      )}
    </div>

    {/* Pincode */}
    <div className="space-y-1.5">
      <label className="block text-sm font-medium
                         text-gray-600 dark:text-gray-400">
        PIN Code
      </label>
      <input
        {...register("address.pincode")}
        placeholder="Enter pincode"
        className="input w-full p-2
                   rounded-xl
                   bg-white dark:bg-gray-800
                   border border-gray-300 dark:border-gray-600
                   focus:ring-2 focus:ring-blue-500
                   dark:focus:ring-blue-400  dark:text-gray-100"
      />
      {errors.address?.pincode && (
        <p className="text-xs text-red-500">
          {errors.address.pincode.message}
        </p>
      )}
    </div>

  </div>
</div>


        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          {/* <button
            type="reset"
            className="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Reset
          </button> */}

          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-blue-600 text-white
                       hover:bg-blue-700 shadow-md hover:shadow-lg transition">
            {isLoading ? "Save" : "saving"}
          </button>
        </div>

      </form>
    </div>
  </div>
);


}

export default EditUserDetailsModal