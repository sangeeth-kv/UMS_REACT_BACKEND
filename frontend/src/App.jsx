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

function App() {

  const mode=useSelector((state)=>state.toggle.mode)
  log.debug("mode : ",mode)

  useEffect(() => {
  document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);


  return (
      <BrowserRouter>
          <Toaster/>
        <Routes>
          <Route path="/signup" element={<UserSignup/>}/>
          <Route path="/signin" element={<UserSignin/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
