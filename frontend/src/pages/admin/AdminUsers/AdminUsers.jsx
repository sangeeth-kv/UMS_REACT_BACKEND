import React, { useState,useEffect,useReducer } from "react";
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
import handleToggleBlock from "../../../services/adminServices/handleToggleBlock";
import ReasonModal from "../../../components/ReasonModal/ReasonModal";
import handleDeleteUser from "../../../services/adminServices/deleteUser";
import {toast} from "react-hot-toast"

const USERS_PER_PAGE = 5;

function AdminUsers() {
  const [searchParams,setSearchParams]=useSearchParams()
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPage,setTotalPage]=useState(1)
  const [searchQuery,setSeachQuery]=useState("")
  const debounceSearchQuery=useDebounce(searchQuery,DEBOUNCE_DELAY)
  const [isConfirmed,setIsConfirmed]=useState(false)
  const [modalSelectedUser,setModalSelectedUser]=useState({userName:"",userId:""})
  const [selectedField,setSelectedField]=useState("")
  const [isReasonModalOpen,setReasonModal]=useState(false)
  const [refreshKey, setRefreshKey]=useState(0)

  

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
  },[page,debounceSearchQuery,refreshKey])

  useEffect(()=>{
    setSearchParams({page})

  },[page,setSearchParams])


  


  const toggleBlock=async(reason)=>{
   try {
      console.log("toggle block pressed.",reason,modalSelectedUser.userId)
      const response=await handleToggleBlock(reason,modalSelectedUser.userId)
    
      console.log(response)
      if(response.success){
        toast.success(response.message)
        setRefreshKey(prev => prev + 1);
      }else{
        toast.error(response.message)
      }
      
   } catch (error) {
      console.log(error)
   }finally{
    setModalSelectedUser({userName:"",userId:""})
    setSelectedField("")
   }
  }

  const deleteUser=async(reason)=>{
    console.log("delete user presssed",modalSelectedUser.userId,reason)
    try {
      const res=await handleDeleteUser(reason,modalSelectedUser.userId)
      console.log(res)
      
      if(res.success){
        toast.success(res.message)
        setRefreshKey(prev=>prev+1)
      }else{
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }


  if(!users){
    return(<Spinner/>)
  }
  
  console.log("selected field : ",selectedField)
  console.log("selected user : ",modalSelectedUser.userName)

  return (

    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

      {isConfirmed && selectedField==="block" ? <ConfirmationModal open={isConfirmed} onCancel={()=>{
        setIsConfirmed(false)
        // setModalSelectedUser({userName:"",userId:""})
        // setSelectedField("")
        }} message={`Do you really want to ${selectedField} ${modalSelectedUser.userName}` } danger={true} onConfirm={()=>{
          setReasonModal(true)
        }} />:selectedField==="unblock"?<ConfirmationModal open={isConfirmed} onCancel={()=>setIsConfirmed(false)}
        message={`Do you really want to ${selectedField} ${modalSelectedUser.userName}` }
        danger={true}
        onConfirm={()=>toggleBlock("")}/>:<ConfirmationModal open={isConfirmed} onCancel={()=>setIsConfirmed(false)}
        message="Do you realy want to Delete user ?"
        danger={true}
        onConfirm={()=>setReasonModal(true)}/>}

      {isReasonModalOpen && selectedField==="block" && <ReasonModal open={isReasonModalOpen} title={`${selectedField.slice(0,1).toUpperCase().concat(selectedField.slice(1))} ${modalSelectedUser.userName} `}
      onCancel={()=>setReasonModal(false)}
      placeholder={`Why are you blocking ${modalSelectedUser.userName}?`}
      confirmText="Continue"
      onConfirm={toggleBlock}
      />}
      {isReasonModalOpen && selectedField==="delete" && <ReasonModal open={isReasonModalOpen} title={`${selectedField.slice(0,1).toUpperCase().concat(selectedField.slice(1))} ${modalSelectedUser.userName} `}
      onCancel={()=>setReasonModal(false)}
      placeholder={`Why are you deleting ${modalSelectedUser.userName}?`}
      confirmText="Continue"
      onConfirm={deleteUser}
      />}


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
  {users.length === 0 ? (
    <EmptyState />
  ) : (
    users.map((user, index) => {
      const isDeleted = user.isDeleted?.userIsDeleted;
      const isBlocked = user.isBlocked?.userIsBlocked;

      return (
        <tr
          key={user._id}
          className={`border-b dark:border-slate-700
            ${isDeleted
              ? "bg-gray-100 dark:bg-slate-900 opacity-60"
              : "hover:bg-gray-50 dark:hover:bg-slate-700"}
          `}
        >
          {/* Index */}
          <td className="p-3">{index + 1}</td>

          {/* Avatar + Name */}
          <td className="p-3 flex items-center gap-3">
            {user.avatarThumbStatus === "ready" &&
            user?.avatar?.thumbnailUrl ? (
              <img
                src={user.avatar.thumbnailUrl}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : user?.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {user.fullname?.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {user.fullname}
              </p>

              {isDeleted && (
                <span className="text-xs text-red-500">
                  Deleted
                </span>
              )}
            </div>
          </td>

          {/* Email */}
          <td className="p-3 text-gray-600 dark:text-gray-300">
            {user.email}
          </td>

          {/* Actions */}
          <td className="p-3">
            <div className="flex items-center justify-center gap-3">

              {/* Email */}
              <button
                disabled={isDeleted}
                className={`p-2 rounded
                  ${isDeleted
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-blue-100 dark:hover:bg-blue-900"}
                `}
              >
                <ToolTip content={isDeleted ? "User deleted" : "Send Email"}>
                  <Mail className="w-4 h-4 text-blue-500" />
                </ToolTip>
              </button>

              {/* Block / Unblock (disabled for deleted users) */}
              {!isDeleted && (
                <button
                  onClick={() => {
                    setIsConfirmed(true);
                    setModalSelectedUser({
                      userName: user.fullname,
                      userId: user._id
                    });
                    setSelectedField(isBlocked ? "unblock" : "block");
                  }}
                  className={`p-2 rounded
                    ${isBlocked
                      ? "hover:bg-green-100 dark:hover:bg-green-900"
                      : "hover:bg-yellow-100 dark:hover:bg-yellow-900"}
                  `}
                >
                  {isBlocked ? (
                    <ToolTip content="Unblock user">
                      <CheckCircle className="w-4 h-4 text-red-500" />
                    </ToolTip>
                  ) : (
                    <ToolTip content="Block user">
                      <Ban className="w-4 h-4 text-yellow-500" />
                    </ToolTip>
                  )}
                </button>
              )}

              {/* Delete */}
              <button
                disabled={isDeleted}
                onClick={() => {
                  if (!isDeleted) {
                    setIsConfirmed(true);
                    setModalSelectedUser({
                      userName: user.fullname,
                      userId: user._id
                    });
                    setSelectedField("delete");
                  }
                }}
                className={`p-2 rounded
                  ${isDeleted
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-red-100 dark:hover:bg-red-900"}
                `}
              >
                <ToolTip content={isDeleted ? "User already deleted" : "Delete user"}>
                  <Trash2
                    className={`w-4 h-4 ${
                      isDeleted ? "text-gray-400" : "text-red-500"
                    }`}
                  />
                </ToolTip>
              </button>

            </div>
          </td>
        </tr>
      );
    })
  )}
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
