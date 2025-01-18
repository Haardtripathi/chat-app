// const express = require("express")
// require("dotenv").config()
// const cookieParser = require("cookie-parser")
// const { connectDB } = require("./lib/db.js")
// const cors = require("cors")
// const authRoutes = require("./routes/auth.route.js")
// const messageRoutes = require("./routes/message.route.js")
// const { app, io, server } = require("./lib/socket.js")
// const path = require("path")


// const PORT = process.env.PORT
// app.use(express.json())
// app.use(cookieParser())

// app.use(cors({
//     origin: "http://localhost:5173",  // Allow requests from local host
//     credentials: true  // Send cookies with response and request headers
// }))  // Enable CORS for all routes

// app.use("/api/auth", authRoutes)
// app.use("/api/messages", messageRoutes)
// console.log("LOC:", express.static(path.join(__dirname)))

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")))

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
//     })
// }

// server.listen(PORT, () => {
//     console.log("Server is running on port ", PORT)
//     connectDB().then(() =>
//         console.log("MongoDB connected")
//     )
//         .catch((err) => console.error(err))
// })

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, io, server } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173", // Allow requests from localhost
        credentials: true, // Allow cookies with requests
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
    connectDB()
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error(err));
});
