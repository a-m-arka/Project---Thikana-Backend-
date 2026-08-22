import express from "express";
import upload from "../config/multer.js";
import * as postController from "../controllers/postController.js";

const router = express.Router();

router.post("/create-post/:propertyId", postController.createPost);
router.delete("/delete-post/:postId", postController.deletePost);
router.get("/posts", postController.getPublishedPosts);

export default router;
