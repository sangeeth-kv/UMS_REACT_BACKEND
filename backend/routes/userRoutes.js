const express=require("express")
const router=express.Router()
const authController=require("../controller/userController/AuthController")
const authLimiter=require("../Middlewares/rateLimits")
const SignupValidator=require("../validators/signupValidators")
const validate=require("../Middlewares/validate")
const signinValidators = require("../validators/signinValidators")

router.post("/signup",authLimiter,SignupValidator,validate,authController.verifySignup)
router.post("/signin",authLimiter,signinValidators,validate,authController.verifySignin)

module.exports=router