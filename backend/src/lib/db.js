const mongoose = require("mongoose")
require("dotenv").config()

module.exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Mongodb error:", error)
    }
} 