import { Navigate,useNavigate, Outlet} from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { axiosRefresh } from "../../api/axiosInstance";
// import { setAccessToken, setUser, updateUser } from "../../store/authSlice";
import Spinner from "../Spinner/Spinner";

export default function ProtectedRoute({ children }) {
  // const token = useSelector((state) => state.auth.accessToken);
  // // const user = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();
  // const navigate=useNavigate()

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {

  //   if(token){
  //       setLoading(false)
  //       return
  //   }

  //   async function refreshToken() {
  //     try {
  //       const res = await axiosRefresh.get("/refresh");
  //       dispatch(setAccessToken(res.data.data.accessToken));
  //       dispatch(setUser(res.data.data.user));
  //       dispatch(updateUser({isProfileCompleted:res.data.data.isProfileCompleted}))
  //     } catch (err) {
  //       // refresh failed → handled below
  //       console.error("Refresh token failed:", err);
  //       const message = err.response?.data?.message;
  //        if (message === "Session expired !")navigate("/signin", { replace: true });    
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (!token) {
  //     refreshToken();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [token, dispatch,navigate]);

  // if (loading) return <Spinner/>;

  // if (!token) return <Navigate to="/signin" replace />;

  // return children;

  return children ? children : <Outlet />;
}
