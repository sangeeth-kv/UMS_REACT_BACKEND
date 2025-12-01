require("dotenv").config();
const express=require("express")
const app=express()
const cors=require("cors")
const errorHandler=require("./Middlewares/ErrorHandler")
const userRoutes=require("./routes/userRoutes")
const requestLogger=require("./loggers/requestLogger")


app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(requestLogger)
app.use("/",userRoutes)

app.use(errorHandler);

module.exports=app