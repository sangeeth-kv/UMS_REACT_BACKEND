
function checkIsBlocked(user){
    if(user.isBlocked===true){
        return  true
    }else{
        return false
    }
}

module.exports=checkIsBlocked