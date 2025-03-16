import cloudinary from "../config/cloudinary.js"; 

export const uploadImage = async (fileBuffer, fileName) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto', public_id: fileName },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(fileBuffer);
        });
        return { success: true, message: 'Image uploaded successfully', result: result };
    } catch (error) {
        console.error('Error uploading image to Cloudinary', error);
        return { success: false, message: 'Error uploading image to Cloudinary', error: error };
    }
};

export const deleteImage = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return { success: true, message: 'Image deleted successfully', result: result };
    } catch (error) {
        console.error('Error deleting image from Cloudinary', error);
        return { success: false, message: 'Error deleting image from Cloudinary', error: error };
    }
};

