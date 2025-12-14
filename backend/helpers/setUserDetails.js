
const requiredFileds=[
    "fullname",
    "phone",
    "email",
    "isVerified",
    "isBlocked",
    "createdAt",
    "_id"
]
function setUserDetails(user){
    let userDetails={}
    for(let field of requiredFileds){
        if(user[field]){
            userDetails[field]=user[field]
        }
    }
    return userDetails
}

module.exports=setUserDetails