const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../lib/utils")
const cloudinary = require("../lib/cloudinary")

module.exports.signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        if (!fullName || !email || !password) {
            res.status(400).json({ message: "All credentials required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({ message: "User created successfully", _id: newUser._id, fullName: newUser.fullName, email: newUser.email }
            )
        }
        else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


module.exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        generateToken(user._id, res)

        return res.status(200).json({

            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })

    }
}

module.exports.logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out correctly" })
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })

    }
}


module.exports.updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body
        const userId = req.user._id

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" })
        }
        console.log("ABC Profile")
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        console.log(uploadResponse)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

        return res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}