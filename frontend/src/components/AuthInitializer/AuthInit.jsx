// components/AuthInitializer.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosRefresh } from "../../api/axiosInstance";
import { setAccessToken, setAuthInitialized, setUser, updateUser } from "../../store/authSlice";
// import { useLocation } from "react-router-dom";

export default function AuthInitializer({ children }) {
    //  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);

//    const isPublicRoute =
//     location.pathname.startsWith("/signin") ||
//     location.pathname.startsWith("/signup") ||
//     location.pathname.startsWith("/admin/signin");

  useEffect(() => {

    
    if (token) {
        dispatch(setAuthInitialized());
        return
    }

    async function initAuth() {
      try {
        const res = await axiosRefresh.get("/refresh");
        console.log("called!!!")
        console.log("res :  in refresh  : ",res)
        dispatch(setAccessToken(res.data.data.accessToken));
        dispatch(setUser(res.data.data.user));
        dispatch(updateUser({ isProfileCompleted: res.data.data.isProfileCompleted }));
      } catch {
        // silent fail (user is logged out)
      }finally{
        dispatch(setAuthInitialized());
      }
    }

    initAuth();
  }, [token, dispatch]);

  return children;
}
