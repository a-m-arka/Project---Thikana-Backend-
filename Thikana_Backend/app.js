import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { checkConnection } from "./src/config/db.js";
import createAllTables from "./src/utils/dbUtils.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import imageRoutes from "./src/routes/imageRoutes.js";
import propertyRoutes from "./src/routes/propertyRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import configureSocketServer from "./src/socket.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);
const clientOrigin = process.env.CLIENT_URL || "http://localhost:5173";
const io = new Server(httpServer, {
  cors: { origin: clientOrigin, methods: ["GET", "POST", "PATCH"] },
});

app.use(cors({ origin: clientOrigin }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/post", postRoutes);
app.use("/api/messages", messageRoutes);

configureSocketServer(io);

httpServer.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  try {
    await checkConnection();
    await createAllTables();
  } catch (error) {
    console.error("Failed to initialize database", error);
  }
});
