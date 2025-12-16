

import React,{useEffect,useState} from 'react'
import Spinner from '../Spinner/Spinner'
import getUserDetails from '../../services/getUserDetails'
import log from "../../utils/logger"
import DetailsRow from '../DetailsRow/DetailsRow'
import MoreDetails from './MoreDetails'
import NotCompletedProfile from './NotCompletedProfile'


function UserDetailsModal({onClick}) {

    const [user,setUser]=useState()

    useEffect(()=>{
        getUserDetails()
        .then((res)=>{
            log.debug(`response got inthe getUserDetailsModal : ${res}`)
            console.log(res)
            setUser(res.data.userProfile)
        })
        .catch((err)=>{
            log.error(err)
        })
    },[])

    if(!user){
        return <Spinner/>
    }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClick}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {/* Avatar */}
        <div className="flex justify-center">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-xl font-semibold text-center mt-3 text-gray-800 dark:text-white">
          {user.fullname}
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400">
          {user.email}
        </p>

        {/* Details */}

      {user.profile.isProfileCompleted ? <MoreDetails user={user.profile}/> : <NotCompletedProfile/>}

      </div>
    </div>
)}



export default UserDetailsModal