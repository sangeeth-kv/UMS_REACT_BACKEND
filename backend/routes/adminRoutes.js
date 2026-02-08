const express=require("express")
const adminController = require("../controller/adminController/adminController")
const requireRole = require("../Middlewares/roleMiddleware")
const router=express.Router()


router.get("/dashboard",adminController.getDashboard)



module.exports=router