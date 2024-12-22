const express = require("express")

const messageController = require("../controllers/message.controller")
const { isAuthenticated } = require("../middleware/auth.middleware.js")

const router = express.Router()

router.get("/users", isAuthenticated, messageController.getUsersForSidebar)
router.get("/:id", isAuthenticated, messageController.getMessages)
router.post("/send/:id", isAuthenticated, messageController.sendMessage)

module.exports = router