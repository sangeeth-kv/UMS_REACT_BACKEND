import {useEffect,useState} from "react"
import {useSearchParams} from "react-router-dom"
import getAllUsers from "../../../services/getAllUsers"
import Spinner from "../../../components/Spinner/Spinner";
import SearchBar from "../../../components/SearchBar/SearchBar";
import useDebounce from "../../../hooks/useDebounce";
import EmptyState from "../../../components/EmptyState/EmptyState";
import {useSelector} from "react-redux"
import { DEBOUNCE_DELAY, USER_LIMIT } from "../../../constants/constants";






function UsersPage(){

    const [searchParams, setSearchParams] = useSearchParams();

    const [users,setUsers]=useState([])
    const [page,setPage]=useState(Number(searchParams.get("page")) || 1)
    const [totalPage,setTotalPage]=useState(1)
    const [searchQuery,setSeachQuery]=useState("")
    const email=useSelector((state)=>state.auth.user.email)
    console.log("SeachQueury : ",searchQuery)

    const debounceSearchQuery=useDebounce(searchQuery,DEBOUNCE_DELAY)
console.log("debounce search query : ",debounceSearchQuery)


    useEffect( ()=>{
        
        getAllUsers(page,USER_LIMIT,debounceSearchQuery)
        .then((response)=>{
            console.log("response got in userpage : ",response)
            setUsers(response.data.users)
            setTotalPage(response.data.totalPage)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[page,debounceSearchQuery])

    useEffect(() => {
        setSearchParams({ page });
    }, [page, setSearchParams]);

    if(!users){
        return(<Spinner/>)
    }

    return (
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white  mb-6">
          Users
        </h2>
        
      <SearchBar setSeachQuery={setSeachQuery}/>

        {/* Users List */}
 <div className="grid gap-4 mt-2">
  {users.length===0 && (
  <EmptyState
    title="No users found"
    description="Try changing your search query"
  />
)}
  {users.length>0&&users.filter(user=>user.email!==email).map((user) => (
    <div
      key={user._id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center justify-between"
    >
      {/* Left section: Avatar + Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        {user?.avatarThumbStatus === "ready" && user?.avatar?.thumbnailUrl ? (
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

        {/* User info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {user.fullname}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>

      {/* Verification Status */}
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          user.isVerified === "verified"
            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            : user.isVerified === "requested"
            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
        }`}
      >
        {user.isVerified === "verified"
          ? "Verified"
          : user.isVerified === "requested"
          ? "Verification Requested"
          : "Not Verified"}
      </span>
    </div>
  ))}
</div>


        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 
                       text-gray-700 dark:text-gray-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Prev
          </button>

          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Page {page} of {totalPage}
          </span>

          <button
            disabled={page === totalPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 
                       text-gray-700 dark:text-gray-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      </div>

    )

}
export default UsersPage