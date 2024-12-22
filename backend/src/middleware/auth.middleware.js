const jwt = require("jsonwebtoken")
const User = require("../models/user.model.js")

module.exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(201).json({ message: "Invalid  token provided" })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(400).json({ message: "No user found" })
        }

        req.user = user
        next()
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}