const express=require("express")
const router=express.Router()
const authController=require("../controller/userController/AuthController")
const authLimiter=require("../Middlewares/rateLimits")
const SignupValidator=require("../validators/signupValidators")
const validate=require("../Middlewares/validate")

router.post("/signup",authLimiter,SignupValidator,validate,authController.verifySignup)

module.exports=router