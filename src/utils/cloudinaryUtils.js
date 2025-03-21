import cloudinary from "../config/cloudinary.js"; 

export const uploadImage = async (fileBuffer, fileName) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto", public_id: fileName },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(fileBuffer);
        });
        return { success: true, message: "Image uploaded successfully", result };
    } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
        return { success: false, message: "Error uploading image to Cloudinary", error };
    }
};

export const uploadMultipleImages = async (files) => {
    try {
        const uploadPromises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const fileName = `uploads/${Date.now()}-${file.originalname}`;
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "auto", public_id: fileName },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(file.buffer);
            });
        });

        const results = await Promise.all(uploadPromises);

        return {
            success: true,
            message: "Images uploaded successfully",
            results: results.map((result) => ({
                url: result.secure_url,
                publicId: result.public_id,
            })),
        };
    } catch (error) {
        console.error("Error uploading images to Cloudinary", error);
        return { success: false, message: "Error uploading images to Cloudinary", error };
    }
};

export const deleteImage = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return { success: true, message: "Image deleted successfully", result };
    } catch (error) {
        console.error("Error deleting image from Cloudinary", error);
        return { success: false, message: "Error deleting image from Cloudinary", error };
    }
};

export const deleteMultipleImages = async (publicIds) => {
    try {
        const deletePromises = publicIds.map((publicId) => 
            cloudinary.uploader.destroy(publicId)
        );

        const results = await Promise.all(deletePromises);

        return { 
            success: true, 
            message: "Images deleted successfully", 
            results 
        };
    } catch (error) {
        console.error("Error deleting multiple images from Cloudinary", error);
        return { success: false, message: "Error deleting images from Cloudinary", error };
    }
};

