

import React from 'react'
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux"
import log from "../../utils/logger"

function PublicRoutes({children}) {

    const {user,accessToken}=useSelector((state)=>state.auth)
    log.debug(`user: ${user} and Access : ${accessToken}`)
    
    if(user&&accessToken){
        return <Navigate to="/dashboard"/>
    }

    return children
}

export default PublicRoutes