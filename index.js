import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

//Connecting to MongoDB database
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongodb")
    }catch(error){
        throw error;
    }
};

//Checking connection status
mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected")
})

//middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) =>{
    const errorStatus = err.status || 500
    const erroMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: erroMessage,
        stack: err.stack,
    })
})


app.listen(6996, ()=>{
    connect()
    console.log("Connected to backend. Port ID: 6996")
})
