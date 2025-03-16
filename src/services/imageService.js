import { uploadImage, deleteImage } from "../utils/cloudinaryUtils.js";

export const uploadImageService = async (fileBuffer, fileName) => {
    try {
        const result = await uploadImage(fileBuffer, fileName);
        return result;
    } catch (error) {
        throw new Error("Error uploading image to Cloudinary");
    }
};

export const deleteImageService = async (public_id) => {
    try {
        const result = await deleteImage(public_id);
        return result;
    } catch (error) {
        throw new Error("Error deleting image from Cloudinary");
    }
};