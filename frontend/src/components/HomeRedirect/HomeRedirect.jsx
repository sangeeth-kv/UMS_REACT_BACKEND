import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import log from "../../utils/logger"


function HomeRedirect(){
    const user=useSelector((state)=>state.auth.accessToken)
    log.debug(`user got in the HomeRedirect : ${user}`)

    if(user){
        return <Navigate to="/dashboard" replace/>
    }else{
        return <Navigate to="/signin" replace/>
    }
}

export default HomeRedirect