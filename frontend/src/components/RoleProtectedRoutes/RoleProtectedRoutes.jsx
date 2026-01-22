import React from 'react'
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux"

function RoleProtectedRoutes({allowedRoles,children}) {
    const user=useSelector((state)=>state.auth.user)
    
    if(!user || !allowedRoles.includes(user.role)){
        return <Navigate to="/unauthorized" replace />;
    }

  return children
}

export default RoleProtectedRoutes