import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import UserSignup from "./pages/users/userSignup/UserSignup"
import { useSelector } from "react-redux"
// import { useEffect } from "react"
import ToggleButton from "./features/toggleMode/toggleButton"
import { useEffect } from "react"
import UserSignin from "./pages/users/userLogin/UserSignin"
import { Toaster } from "react-hot-toast"
import log from "./utils/logger"
import useRefreshToken from "./hooks/useRefreshToken"
import DashBoard from "./pages/users/dashBoard/DashBoard"
import UsersPage from "./pages/users/usersPage/UsersPage"
import Headers from "./components/Header/Headers"
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes"
import HomeRedirect from "./components/HomeRedirect/HomeRedirect"
import {Navigate} from "react-router-dom";
import PublicRoutes from "./components/PublicRoutes/PublicRoutes"



function App() {

  const mode=useSelector((state)=>state.toggle.mode)
  const token=useSelector((state)=>state.auth.accessToken)
  const user=useSelector((state)=>state.auth.user)

  log.debug("AccesssTOken : ",token)

  log.debug("mode : ",mode)
  
  const isLoading=useRefreshToken(token)

  useEffect(() => {
  document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);
 
  log.debug(`user in APP.jsx: ${user}`)
  console.log("suer : ",user)

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
          <Toaster/>

          {token && <Headers/>}

        <Routes>

          <Route path="/" element={user ? <Navigate to="/dashboard"/>:<Navigate to="/signin"/>} />

          <Route path="/signup" element={<PublicRoutes><UserSignup/></PublicRoutes>}/>
          <Route path="/signin" element={<PublicRoutes><UserSignin/></PublicRoutes>}/>


          <Route path="/dashboard"  element={
            <ProtectedRoute>
              <DashBoard/>
            </ProtectedRoute>
          } />


          <Route path="/users" element={
          <ProtectedRoute>
            <UsersPage/>
          </ProtectedRoute>
        }/>

          
        </Routes>

        </>
  )
}

export default App
