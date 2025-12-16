

// import React,{useState} from 'react'
// import log from "../../utils/logger"

function NotCompletedProfile() {

    // const [addProfile,setAddProfile]=useState(false)

    const handleAddProfile=()=>{
        // setAddProfile(true)
    }

  return (
    <div className="mt-6 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-6 text-center bg-gray-50 dark:bg-gray-900">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Profile details not added yet
        </p>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Complete your profile to unlock all features
        </p>

        <button
          onClick={()=>handleAddProfile()}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          Add Profile
        </button>
      </div>
  )
}

export default NotCompletedProfile