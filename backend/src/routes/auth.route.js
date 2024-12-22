const express = require("express")

const authController = require("../controllers/auth.controller")
const { isAuthenticated } = require("../middleware/auth.middleware.js")

const router = express.Router()

router.post("/signup", authController.signup)

router.post("/login", authController.login)

router.post("/logout", authController.logout)

router.put("/update-profile", isAuthenticated, authController.updateProfile)
router.get("/check", isAuthenticated, authController.checkAuth)

module.exports = router