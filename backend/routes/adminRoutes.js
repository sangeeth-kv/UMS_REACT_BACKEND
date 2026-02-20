const express=require("express")
const adminController = require("../controller/adminController/adminController")
const requireRole = require("../Middlewares/roleMiddleware")
const verifyAccessToken=require("../Middlewares/verifyAccessToken")
const router=express.Router()


router.get("/dashboard",verifyAccessToken,requireRole,adminController.getDashboard)
router.patch("/toggle-block",verifyAccessToken,requireRole,adminController.toggleBlock)
router.patch("/delete-user",verifyAccessToken,requireRole,adminController.deleteUser)



module.exports=router