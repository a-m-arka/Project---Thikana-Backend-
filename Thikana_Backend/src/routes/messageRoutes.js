import express from "express";
import * as messageController from "../controllers/messageController.js";

const router = express.Router();

router.get("/conversations", messageController.listConversations);
router.get("/conversations/:otherUserId", messageController.getConversation);
router.patch(
  "/conversations/:otherUserId/read",
  messageController.readConversation,
);

export default router;
