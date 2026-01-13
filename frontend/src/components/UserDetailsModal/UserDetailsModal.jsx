

import React,{useEffect,useState} from 'react'
import Spinner from '../Spinner/Spinner'
import getUserDetails from '../../services/getUserDetails'
import log from "../../utils/logger"
import DetailsRow from '../DetailsRow/DetailsRow'
import MoreDetails from './MoreDetails'
import NotCompletedProfile from './NotCompletedProfile'


function UserDetailsModal({onClick,setAddDetails}) {

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
          {user.avatarThumbStatus === "ready" && user.thumbnail ? (
          <img
            src={user.thumbnail}
            alt="avatar thumbnail"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : user.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user.fullname?.charAt(0).toUpperCase()}
          </div>
        )}
        </div>

        {/* Name */}
        <h2 className="text-xl font-semibold text-center mt-3 text-gray-800 dark:text-white">
          {user.fullname}
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400">
          {user.email}
        </p>

        {/* Details */}

      {user.profile.isProfileCompleted ? <MoreDetails user={user.profile}/> : <NotCompletedProfile setAddDetails={setAddDetails}/>}

      </div>
    </div>
)}



export default UserDetailsModal