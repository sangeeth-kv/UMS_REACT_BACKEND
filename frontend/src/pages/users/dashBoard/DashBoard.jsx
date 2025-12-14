// import {useEffect} from "react";
import { useSelector } from "react-redux"


function DashBoard(){
    const user=useSelector((state)=>state.auth.user)

    if (!user) {
        return <p>Loading...</p>;  // or spinner
    }

    return(
         <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Dashboard
        </h1>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex items-center gap-6">
          
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {user.fullname?.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {user.fullname}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {user.email}
            </p>
            <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              Logged In
            </span>
          </div>
        </div>

        {/* Extra Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Account Status
            </h4>

            <p
              className={`font-medium ${
                user.isVerified
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {user.isVerified ? "User is verified by Admin" : "User is not verified by Admin"}
            </p>
        </div>


          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Account Created
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
  {new Date(user.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</p>
          </div>

        </div>
      </div>
    </div>
    )
}

export default DashBoard