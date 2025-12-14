import {useEffect,useState} from "react"
import getAllUsers from "../../../services/getAllUsers"




function UsersPage(){

    const [users,setUsers]=useState([])

    useEffect( ()=>{
        
        getAllUsers()
        .then((response)=>{
            console.log("response got in userpage : ",response)
            setUsers(response.data.users)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    if(!users){
        return(<h1>loading...</h1>)
    }

    return (
        <div>
          {users.map((user) => (
            <h3 key={user._id}>{user.fullname}</h3>
          ))}
        </div>
    )

}
export default UsersPage