// import {useEffect} from "react";
import { useSelector } from "react-redux"


function DashBoard(){
    const user=useSelector((state)=>state.auth.user)

    if (!user) {
        return <p>Loading...</p>;  // or spinner
    }

    return(
        <div className="flex">
            <div className="">

            </div>

            <div>
                <h3>{user.fullname}</h3>
                <p>{user.email}</p>
            </div>
        </div>
    )
}

export default DashBoard