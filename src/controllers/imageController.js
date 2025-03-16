import { uploadImageService, deleteImageService } from "../services/imageService.js";

export const uploadImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileBuffer = req.file.buffer;
        const fileName = `uploads/${Date.now()}-${req.file.originalname}`;

        const result = await uploadImageService(fileBuffer, fileName);

        res.status(200).json({ message: "Image uploaded successfully", url: result.secure_url, publicId: result.public_id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteImageController = async (req, res) => {
    try {
        const { publicId } = req.body;
        if (!publicId) {
            return res.status(400).json({ message: "Public ID is required" });
        }

        const result = await deleteImageService(publicId);

        res.status(200).json({ message: "Image deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};