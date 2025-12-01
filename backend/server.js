const app=require("./app")
const connectDB = require("./config/connectDB")

const PORT=process.env.PORT || 3001

connectDB();

app.listen(PORT,()=>{
    console.log(`Server running on port http://localhost:${PORT}`)
})

