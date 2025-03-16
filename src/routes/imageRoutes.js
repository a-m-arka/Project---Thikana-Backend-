import express from "express";
import upload from "../config/multer.js";
import { uploadImageController, deleteImageController } from "../controllers/imageController.js";

const router = express.Router();

router.post("/upload_image", upload.single("file"), uploadImageController);
router.delete("/delete_image", deleteImageController);

export default router;
