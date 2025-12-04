import express from "express"
import dotenv from "dotenv"
import path from 'path'
import { app, server } from "./socket/socket.js"
const port = process.env.port || 5000
dotenv.config()

import connectToMongodb from "./db/connecttodb.js"
import authRoute from "./routes/authRoute.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoute.js"
import friendRequestRoutes from "./routes/friendRequestRoute.js"

const __dirname = path.resolve();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/friend-requests", friendRequestRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})

server.listen(port, () => {
  connectToMongodb();
  console.log(`Example app listening on port ${port}`)
})
