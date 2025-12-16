import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import UserSignup from "./pages/users/userSignup/UserSignup"
import { useSelector } from "react-redux"
// import { useEffect } from "react"
import ToggleButton from "./features/toggleMode/toggleButton"
import { useEffect,lazy,Suspense } from "react"
import UserSignin from "./pages/users/userLogin/UserSignin"
import { Toaster } from "react-hot-toast"
import log from "./utils/logger"
// import useRefreshToken from "./hooks/useRefreshToken"
// import DashBoard from "./pages/users/dashBoard/DashBoard"
const DashBoard = lazy(()=>import("./pages/users/dashBoard/DashBoard"))
const UserPage=lazy(()=>import ("./pages/users/usersPage/UsersPage"))
import Headers from "./components/Header/Headers"
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes"
import HomeRedirect from "./components/HomeRedirect/HomeRedirect"
import {Navigate} from "react-router-dom";
import PublicRoutes from "./components/PublicRoutes/PublicRoutes"
import Spinner from "./components/Spinner/Spinner"
import Footer from "./components/Footer/Footer"



function App() {

  const mode=useSelector((state)=>state.toggle.mode)
  const token=useSelector((state)=>state.auth.accessToken)

  log.debug("AccesssTOken : ",token)

  log.debug("mode : ",mode)


  useEffect(() => {
  document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);


  return (
    <>
          <Toaster/>

          {token && <Headers/>}

        <Routes>

          <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />} />

          <Route path="/signup" element={<PublicRoutes><UserSignup/></PublicRoutes>}/>
          <Route path="/signin" element={<PublicRoutes><UserSignin/></PublicRoutes>}/>


          <Route path="/dashboard"  element={
            <ProtectedRoute>
              <Suspense fallback={<Spinner/>}>
                <DashBoard/>
              </Suspense>
            </ProtectedRoute>
          } />


          <Route path="/users" element={
          <ProtectedRoute>
            <Suspense fallback={<Spinner/>}>
              <UserPage/>
            </Suspense>
          </ProtectedRoute>
        }/>

          
        </Routes>

        {token && <Footer/>}

        </>
  )
}

export default App
