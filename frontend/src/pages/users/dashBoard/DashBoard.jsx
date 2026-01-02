import {lazy,Suspense,useState} from "react";
import { useSelector } from "react-redux"
import Spinner from "../../../components/Spinner/Spinner";
import Tooltip from "../../../components/ToolTip/ToolTip";
import RequestButton from "../../../components/Buttons/RequestButton";

const UserDetailsModal = lazy(() =>
  import("../../../components/UserDetailsModal/UserDetailsModal")
);

const AddUserDetailsModal = lazy(() =>
  import("../../../components/UserDetailsModal/AddUserDetailsModal")
);

const EditUserDetailsModal = lazy(() =>
  import("../../../components/UserDetailsModal/EditUserDetailsModal")
);
// import addUserDetails from "../../../services/addUserDetails";
// import log from "../../../utils/logger"



function DashBoard(){
    const user=useSelector((state)=>state.auth.user)
    const isProfileCompleted=useSelector((state)=>state.auth.user.isProfileCompleted)
    const [isMore,setIsMore]=useState(false)
    const [isAddDetails,setAddDetails]=useState(false)
    const [isEditDetails,setEditDetails]=useState(false)
    console.log(isMore);
    
   

    if (!user) {
        return <Spinner/>;  // or spinner
    }

    

    return(
         <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

            <Suspense fallback={<Spinner />}>
                {isMore && <UserDetailsModal onClick={() => setIsMore(false)} />}
                {isAddDetails && <AddUserDetailsModal onClose={() => setAddDetails(false)} />}
                {isEditDetails && <EditUserDetailsModal onClose={() => setEditDetails(false)} />}
            </Suspense>

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
            <Tooltip position="bottom" content={`view more details about ${user.fullname} `}>
                <span onClick={()=>setIsMore(true)} className=" cursor-pointer inline-block mt-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    View More details
                </span>
            </Tooltip>
            {isProfileCompleted ? <Tooltip position="bottom" content="Edit the current details"><span onClick={()=>setEditDetails(true)} className="inline-block mt-2 px-3 py-1 ml-2 text-sm rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              Edit details
            </span> </Tooltip> :<Tooltip position="bottom" content="Add more details"> <span onClick={()=>setAddDetails(true)} className="inline-block mt-2 px-3 py-1 ml-2 text-sm rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-blue-300">
              Add more details
            </span></Tooltip>} 
          </div>
        </div>

        {/* Extra Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Account Status
            </h4>

            <p className={`font-medium ${
                user.isVerified === "verified"
                    ? "text-green-600 dark:text-green-400"
                    : user.isVerified === "requested"
                    ? "text-yellow-500 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
            }`}>

                
            

              {user.isVerified === "verified"? "User is verified by Admin": user.isVerified === "requested"? "Verification request sent": "User is not verified by Admin"}
            </p>


                {user.isVerified === "not_verified" && (<Tooltip position="bottom" content="Request for user verification through email "><RequestButton title="Request Verification"/></Tooltip>)}

            
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