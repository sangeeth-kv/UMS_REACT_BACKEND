const userModel=require("../model/userModel")
const logger=require("../config/logger")
const setUserDetails = require("./setUserDetails")



async function findAllUsers(page,limit,searchQuery) {
  
    let skip=(page-1)*limit
     let match = {
    role: "user",
  };

  if (searchQuery) {
    match.$or = [
      { fullname: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
    ];
  }

    const [users,totalUsers]=await Promise.all([
        userModel.find(match).skip(skip).limit(limit).lean(),
        userModel.countDocuments({role:"user"})
    ])
    logger.debug(`users got in findAllUsers : ${users.length}`)

    const allUsers=users.map((user)=>setUserDetails(user))
    return {allUsers,totalUsers,totalPages: Math.ceil(totalUsers / limit),currentPage: page}
}

module.exports=findAllUsers