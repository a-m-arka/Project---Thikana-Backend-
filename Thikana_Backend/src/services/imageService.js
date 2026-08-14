import * as imageUtils from "../utils/cloudinaryUtils.js";

export const uploadImage = async (fileBuffer, fileName) => {
    try {
        const result = await imageUtils.uploadImage(fileBuffer, fileName);
        return result;
    } catch (error) {
        throw new Error("Error uploading image to Cloudinary");
    }
};

export const uploadMultipleImages = async (files) => {
    try {
        const result = await imageUtils.uploadMultipleImages(files);
        return result;
    } catch (error) {
        throw new Error("Error uploading images");
    }
};

export const deleteImage = async (public_id) => {
    try {
        const result = await imageUtils.deleteImage(public_id);
        return result;
    } catch (error) {
        throw new Error("Error deleting image from Cloudinary");
    }
};