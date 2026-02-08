import React from 'react'
import {Navigate,Outlet} from "react-router-dom"
import {useSelector} from "react-redux"
import Spinner from "../../components/Spinner/Spinner"

function RoleProtectedRoutes({allowedRoles,children}) {
    const {user,isAuthInitialized }=useSelector((state)=>state.auth)


    
    if (!isAuthInitialized) {
      return <Spinner />;
    }
    
    
    if(!user || !allowedRoles.includes(user.role)){
        return <Navigate to="/unauthorized" replace />;
    }

  return children?children:<Outlet/>
}

export default RoleProtectedRoutes