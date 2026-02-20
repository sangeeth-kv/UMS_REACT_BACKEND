import {useLocation} from "react-router-dom"
import logoutUser from "../../services/logoutUser";
import { clearAccessToken, clearUser } from "../../store/authSlice";
import {useDispatch} from "react-redux"

const AdminHeader = () => {
    const location=useLocation()
    const heading=location.pathname.split("/")[2].toUpperCase()
    const dispatch=useDispatch()

    const handleLogout=async () => {
       console.log("logout clicked")
        const res=await logoutUser()
        console.log(res)
        dispatch(clearAccessToken())
        dispatch(clearUser())
        window.location.replace("/signin");
    }
  return (
    <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
        {heading} 
      </h1>

      <button onClick={handleLogout} className="text-sm px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
