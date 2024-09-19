import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { urlencoded } from "express"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import messageRoute from "./routes/message.route.js"
import { app, server } from "./socket/socket.js";
import path from "path"

dotenv.config()

// const app = express()
const PORT = process.env.PORT  || 3000

const __dirname = path.resolve();

// app.get("/",(_,res) => {
//     return res.status(200).json({
//         message : "I am comming from backend",
//         success:true
//     }) 
// })

app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))
const corsOptions = {
    origin : "http://localhost:5173",
    credentials:true,
}
app.use(cors(corsOptions))

// all api router :

app.use("/api/v1/user", userRoute)
app.use("/api/v1/post", postRoute)
app.use("/api/v1/message", messageRoute)

app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*",(req,res) => {
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})


server.listen(PORT,()=>{
    connectDB()
    console.log(`Server listen at port ${PORT}`)
})