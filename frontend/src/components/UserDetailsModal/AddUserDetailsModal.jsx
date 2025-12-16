import React,{useState} from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import profileDetailsSchema from "../../validation/schemas/profileDetailsSchema";
import addUserDetails from "../../services/addUserDetails";
import { Toaster,toast } from "react-hot-toast";
import {updateUser} from "../../store/authSlice"
import {useDispatch} from "react-redux"



function AddUserDetailsModal({ onClose }) {

  const [loading,setLoading]=useState(false)
  const {register,handleSubmit,setError,formState:{errors},}=useForm({resolver:yupResolver(profileDetailsSchema)})
  const dispatch=useDispatch()

  const submitHandler=async(data)=>{
     try {
      setLoading(true);

      const response = await addUserDetails(data);
      console.log("resss : ",response)

      if (response.success) {
        toast.success(response.message);
        dispatch(updateUser({isProfileCompleted:response.data.profile}))
        onClose();
      } else if (response.errors) {
        response.errors.forEach(err => {
          setError(err.path, { message: err.message });
        });
      }
    } catch (err) {
      toast.error("Something went wrong",err);
    } finally {
      setLoading(false);
    }
  }


 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl relative animate-scaleIn">

      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b pb-3 border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Add Profile Details
        </h3>
       
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <X className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Gender
          </label>
          <p className="text-xs text-red-500 mt-1">
               Gender can be set only once. Make sure it’s correct before saving.
            </p>
          <select
  {...register("gender")}
  className="w-full rounded-lg border px-3 py-2
             bg-white dark:bg-gray-800
             border-gray-300 dark:border-gray-600
             text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option
    value=""
    className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  >
    Select gender
  </option>

  <option
    value="male"
    className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  >
    Male
  </option>

  <option
    value="female"
    className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  >
    Female
  </option>

  <option
    value="other"
    className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  >
    Other
  </option>
</select>

           

          {errors.gender && (
            <p className="text-xs text-red-500 mt-1">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date of Birth
          </label>
          <p className="text-xs text-red-500 mt-1">
               Date of Birth can be set only once. Make sure it’s correct before saving.
            </p>
          <input
            type="date"
            {...register("dateOfBirth")}
            className="w-full rounded-lg border bg-transparent px-3 py-2
                       border-gray-300 dark:border-gray-600
                       text-gray-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
            
          {errors.dateOfBirth && (
            <p className="text-xs text-red-500 mt-1">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Blood Group
          </label>
          <p className="text-xs text-red-500 mt-1">
              Blood group can be set only once. Make sure it’s correct before saving.
            </p>
          <select
  {...register("bloodGroup")}
  className="w-full rounded-lg border px-3 py-2
             bg-white dark:bg-gray-800
             border-gray-300 dark:border-gray-600
             text-gray-800 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="" className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100">
    Select blood group
  </option>

  {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
    <option
      key={bg}
      value={bg}
      className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    >
      {bg}
    </option>
  ))}
</select>

          
        </div>

        {/* Address */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/40">
          <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Address
          </p>

          <div className="grid grid-cols-2 gap-3">
            {["place", "city", "state", "pincode"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                {...register(`address.${field}`)}
                className="rounded-lg border bg-transparent px-3 py-2
                           border-gray-300 dark:border-gray-600
                           text-gray-800 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-5 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border
                       border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-600
                       text-white hover:bg-blue-700
                       disabled:opacity-60 transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

      </form>
    </div>
  </div>
);

}

export default AddUserDetailsModal;
