import React, { useState,useEffect } from "react";
import { Mail, Trash2, Ban, CheckCircle } from "lucide-react";
import {useSearchParams} from "react-router-dom"
import getAllUsers from "../../../services/getAllUsers"
import useDebounce from "../../../hooks/useDebounce";
import { DEBOUNCE_DELAY, USER_LIMIT } from "../../../constants/constants";
import Spinner from "../../../components/Spinner/Spinner"
import SearchBar from "../../../components/SearchBar/SearchBar";
import EmptyState from "../../../components/EmptyState/EmptyState";
import ToolTip from "../../../components/ToolTip/ToolTip"
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal"

const USERS_PER_PAGE = 5;

function AdminUsers() {
  const [searchParams,setSearchParams]=useSearchParams()
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPage,setTotalPage]=useState(1)
  const [searchQuery,setSeachQuery]=useState("")
  const debounceSearchQuery=useDebounce(searchQuery,DEBOUNCE_DELAY)
  const [isConfirmed,setIsConfirmed]=useState(false)
  const [modalSelectedUser,setModalSelectedUser]=useState("")
  const [selectedField,setSelectedField]=useState()
  

  useEffect(()=>{
    getAllUsers(page,USER_LIMIT,debounceSearchQuery)
    .then((response)=>{
      console.log("response : ",response)
      setUsers(response.data.users)
      setTotalPage(response.data.totalPage)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[page,debounceSearchQuery])

  useEffect(()=>{
    setSearchParams({page})

  },[page,setSearchParams])


  const toggleBlock=(userId)=>{
    console.log("toggle block pressed.")
  }

  const deleteUser=(userId)=>{
    console.log("delete user presssed")
  }


  if(!users){
    return(<Spinner/>)
  }
  
  

  return (

    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

      {isConfirmed && <ConfirmationModal open={isConfirmed} onCancel={()=>setIsConfirmed(false)} message={`Do you really want to ${user.isBlocked?.userIsBlocked ? "unblock" : "block"} ${user.fullname}` } />}


      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Users
      </h1>

      <SearchBar setSeachQuery={setSeachQuery}/>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500 dark:text-gray-400 border-">
              <th className="p-3">#</th>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length===0?<EmptyState/>:users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                {/* Index */}
                <td className="p-3">
                  {index + 1}
                </td>

                {/* Avatar + Name */}
                <td className="p-3 flex items-center gap-3">
                  {user.avatarThumbStatus === "ready" && user?.avatar?.thumbnailUrl ? (
          <img
            src={user?.avatar?.thumbnailUrl}
            alt="avatar thumbnail"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : user?.avatar?.url ? (
          <img
            src={user?.avatar?.url}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user.fullname?.charAt(0).toUpperCase()}
          </div>
        )}
                  <span className="text-gray-800 dark:text-gray-200">
                    {user.fullname}
                  </span>
                </td>

                {/* Email */}
                <td className="p-3 text-gray-600 dark:text-gray-300">
                  {user.email}
                </td>

                {/* Actions */}
                <td className="p-3">
                  <div className="flex items-center justify-center gap-3">
                    {/* Email Icon */}
                    <button
                      title="Send Email"
                      className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                      <Mail className="w-4 h-4 text-blue-500" />
                    </button>

                    {/* Block / Unblock */}
                    <button
                      onClick={() => setIsConfirmed(true)}
                      className={`p-2 rounded ${
                        user.isBlocked.userIsBlocked
                          ? "hover:bg-green-100 dark:hover:bg-green-900"
                          : "hover:bg-yellow-100 dark:hover:bg-yellow-900"
                      }`}
                    >
                      {user.isBlocked.userIsBlocked ? (
                        <ToolTip content={`User is currenlty blocked,click here for unblock`} >
                          <CheckCircle  className="w-4 h-4 text-red-500" />
                        </ToolTip>
                        
                      ) : (
                        <ToolTip content={"Click here for block user"}>
                        <Ban className="w-4 h-4 text-yellow-500" />
                        </ToolTip>
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900"
                    >
                      <ToolTip content={"Delete user"}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                      </ToolTip>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* {currentUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-slate-700 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1 text-gray-700 dark:text-gray-300">
          {page} / {totalPage}
        </span>

        <button
          disabled={page === totalPage}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-slate-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminUsers;
