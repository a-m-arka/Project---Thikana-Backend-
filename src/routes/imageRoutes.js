import express from "express";
import upload from "../config/multer.js";
import * as imageController from "../controllers/imageController.js";

const router = express.Router();

router.post("/upload-image", upload.single("file"), imageController.uploadImage);
router.post("/upload-multiple-images", upload.array("files", 10), imageController.uploadMultipleImages);
router.delete("/delete-image", imageController.deleteImage);

export default router;
