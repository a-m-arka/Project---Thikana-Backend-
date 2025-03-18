import { getUserFromToken, updateUserProfilePicture, findUserByEmail, updateUserDetails } from "../utils/userUtils.js";
import { uploadImage, deleteImage } from "../utils/cloudinaryUtils.js";

export const getUserService = async (token) => {
    const user = await getUserFromToken(token);
    if (!user) {
        return { success: false, message: "Invalid token" };
    }
    return { success: true, data: user };
};

export const  updateProfilePictureService = async (token, fileBuffer, fileName) => {
    try{
        const user = await getUserFromToken(token);
        if(!user){
            return {success: false, message: "Invalid token"};
        }
        if(user.profile_picture_cloudinary_id){
            const deleteResult = await deleteImage(user.profile_picture_cloudinary_id);
            if(!deleteResult.success){
                return {success: false, message: "Error deleting old profile picture", error: deleteResult.error};
            }
        }
        const uploadedImage = await uploadImage(fileBuffer, fileName);
        if(!uploadedImage.success){
            return {success: false, message: "Error uploading new profile picture", error: uploadedImage.error};
        }
        const updateResult = await updateUserProfilePicture(user.user_id, uploadedImage.result.secure_url, uploadedImage.result.public_id);
        if(!updateResult.success){
            return {success: false, message: "Error updating profile picture", error: updateResult.error};
        }
        return {success: true, message: "Profile picture updated successfully"};
    }catch(error){
        console.error("Error updating profile picture:", error);
        return {success: false, message: "Error updating profile picture", error};
    }
};

export const editProfileService = async (token, newData) => {
    try{
        const user = await getUserFromToken(token);
        if(!user){
            return {success: false, message: "Invalid token"};
        }
        const existingUser = await findUserByEmail(newData.email);
        if (existingUser) {
            return { success: false, message: "Email already exists" };
        }
        const updateResult = await updateUserDetails(user.user_id, newData);
        if(!updateResult.success){
            return {success: false, message: updateResult.message, error: updateResult.error};
        }
        return {success: true, message: updateResult.message};
    }
    catch(error){
        console.error("Error updating user details:", error);
        return {success: false, message: "Error updating user details", error};
    }
};