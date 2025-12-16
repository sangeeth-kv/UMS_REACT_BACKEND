const userModel=require("../model/userModel")
const UserProfile=require("../model/userProfile")
const logger=require("../config/logger");
const { hashPassword } = require("./passwordHelper");


async function saveUser(user){

    const hashedPassword=await hashPassword(user.password)

    try {
        const newUser = await userModel.create({
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            password: hashedPassword
        });

        await UserProfile.create({
            userId: newUser._id
        });

        return newUser

    } catch (error) {
        if (error.code === 11000) {
            error.statusCode = 409;  // conflict
            error.message = "Email or phone already exists";
        }

        throw error;
    }
}

module.exports=saveUser