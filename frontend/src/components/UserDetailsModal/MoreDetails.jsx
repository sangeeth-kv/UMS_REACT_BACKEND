import React from 'react'
import DetailsRow from '../DetailsRow/DetailsRow'
import Spinner from '../Spinner/Spinner'
import dayjs from "dayjs"

function MoreDetails({user}) {

    if(!user){
        return <Spinner/>
    }

  return (
    <div className="mt-6 space-y-4 text-sm">
          <DetailsRow label="Gender" value={user.gender} />
          <DetailsRow label="Date of Birth" value={dayjs(user.dateOfBirth).format("DD MMM YYYY")} />
          <DetailsRow label="Blood Group" value={user.bloodGroup} />

          {/* Address */}
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Address
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {user.address.place}, {user.address.city}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {user.address.state} - {user.address.pincode}
            </p>
          </div>
        </div> 
  )
}

export default MoreDetails