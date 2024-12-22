const express = require("express")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const { connectDB } = require("./lib/db.js")
const cors = require("cors")
const authRoutes = require("./routes/auth.route.js")
const messageRoutes = require("./routes/message.route.js")

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",  // Allow requests from local host
    credentials: true  // Send cookies with response and request headers
}))  // Enable CORS for all routes

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT)
    connectDB().then(() =>
        console.log("MongoDB connected")
    )
        .catch((err) => console.error(err))
})