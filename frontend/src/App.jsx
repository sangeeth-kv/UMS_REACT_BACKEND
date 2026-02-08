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
const SettingsPage=lazy(()=>import("./pages/users/settingsPage/SettingsPage"))
const ResetPassword=lazy(()=>import("./pages/users/ResetPassword/ResetPassword"))
// import Headers from "./components/Header/Headers"
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes"
import HomeRedirect from "./components/HomeRedirect/HomeRedirect"
import {Navigate} from "react-router-dom";
import PublicRoutes from "./components/PublicRoutes/PublicRoutes"
import Spinner from "./components/Spinner/Spinner"
// import Footer from "./components/Footer/Footer"
// import OtpPage from "./pages/users/otpPage/OtpPage"
const OtpPage=lazy(()=>import ("./pages/users/otpPage/OtpPage"))
import Layout from "./components/Layout/Layout"
import RoleProtectedRoutes from "./components/RoleProtectedRoutes/RoleProtectedRoutes"
// import ResetPassword from "./pages/users/ResetPassword/ResetPassword"
import NotFoundPage from "./pages/404Page/404Page"
import AuthInitializer from "./components/AuthInitializer/AuthInit"
import AdminDashBoard from "./pages/admin/AdminDashBoard/AdminDashBoard"
import AdminLoginPage from "./pages/admin/AdminLogin/AdminLoginPage"
import AdminUsers from "./pages/admin/AdminUsers/AdminUsers"
import AdminSettings from "./pages/admin/AdminSettings/AdminSettings"
import AdminLayout from "./components/Layout/AdminLayout"




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

          {/* {token && <Headers/>} */}

          

        <AuthInitializer>

        <Routes>

          <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />} />

          <Route path="/signup" element={<PublicRoutes><UserSignup/></PublicRoutes>}/>
          <Route path="/signin" element={<PublicRoutes><UserSignin/></PublicRoutes>}/>

          <Route path="/not-found" element={<NotFoundPage/>}/>



          <Route path="/dashboard"  element={
            <ProtectedRoute>
              <Layout>
              <Suspense fallback={<Spinner/>}>
                <DashBoard/>
              </Suspense>
              </Layout> 
            </ProtectedRoute>
          } />


          <Route path="/users" element={
          <ProtectedRoute>
            <Layout>
            <Suspense fallback={<Spinner/>}>
              <UserPage/>
            </Suspense>
            </Layout>
          </ProtectedRoute>
        }/>


          <Route path="/otp" element={
            <ProtectedRoute>
              <Layout>
              <Suspense fallback={<Spinner/>}>
              <OtpPage/>
              </Suspense>
              </Layout>
            </ProtectedRoute>
          }/>

          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <Suspense fallback={<Spinner/>}>
                <SettingsPage/>
                </Suspense>
              </Layout>
            </ProtectedRoute>
          }/>


          <Route path="/chat" element={
            <ProtectedRoute>
              <Layout>
                <div className="mt-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
                    Service is currently unavailable!!
                  </h1>
                </div>
              </Layout>
            </ProtectedRoute>
          }/>


          <Route path="/reset-password/:token" element={
            <ProtectedRoute>
              <Layout>
                <Suspense fallback={<Spinner/>}>
                  <ResetPassword/>
                </Suspense>
              </Layout>
            </ProtectedRoute>
          }/>




          {/* /admin side */}

          {/* Admin Public */}
          <Route path="/admin/signin" element={<AdminLoginPage />} />

          {/* Admin Protected */}
          <Route element={<ProtectedRoute />}>
        <Route element={<RoleProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashBoard/>} />
            <Route path="users" element={<AdminUsers/>} />
            <Route path="settings" element={<p>settings page</p>} />
          </Route>
        </Route>
      </Route>

          
        </Routes>
        </AuthInitializer>

        {/* {token && <Footer/>} */}

        </>
  )
}

export default App
