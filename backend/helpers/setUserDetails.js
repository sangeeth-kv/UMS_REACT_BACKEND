
const requiredFileds=[
    "fullname",
    "phone",
    "email",
    "isVerified",
    "createdAt",
    "_id",
    "avatar",
    "avatarThumbStatus",
    "thumbnail",
    "role",
    "isBlocked",
    "isDeleted",
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