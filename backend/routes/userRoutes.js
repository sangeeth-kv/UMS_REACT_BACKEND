const express=require("express")
const router=express.Router()
const authController=require("../controller/userController/AuthController")
const authLimiter=require("../Middlewares/rateLimits")
const SignupValidator=require("../validators/signupValidators")
const validate=require("../Middlewares/validate")
const signinValidators = require("../validators/signinValidators")
const tokenController=require("../controller/tokenController/tokenController")
const verifyAccessToken = require("../Middlewares/verifyAccessToken")
const userController = require("../controller/userController/userController")

router.post("/signup",authLimiter,SignupValidator,validate,authController.verifySignup)
router.post("/signin",authLimiter,signinValidators,validate,authController.verifySignin)
router.get("/refresh",tokenController.getAccessToken)
router.get("/test",tokenController.test)
router.get("/users",verifyAccessToken,userController.getAllUsers)

module.exports=router