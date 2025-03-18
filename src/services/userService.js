import * as userUtils from "../utils/userUtils.js";
import { uploadImage, deleteImage } from "../utils/cloudinaryUtils.js";
import { verifyPassword } from "../utils/authUtils.js";

export const getUserService = async (token) => {
    const user = await userUtils.getUserFromToken(token);
    if (!user) {
        return { success: false, message: "Invalid token" };
    }
    return { success: true, data: user };
};

export const  updateProfilePictureService = async (token, fileBuffer, fileName) => {
    try{
        const user = await userUtils.getUserFromToken(token);
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
        const result = await userUtils.updateUserProfilePicture(user.user_id, uploadedImage.result.secure_url, uploadedImage.result.public_id);
        return result;
    }catch(error){
        console.error("Error updating profile picture:", error);
        return {success: false, message: "Error updating profile picture", error};
    }
};

export const editProfileService = async (token, newData) => {
    try{
        const user = await userUtils.getUserFromToken(token);
        if(!user){
            return {success: false, message: "Invalid token"};
        }
        const existingUser = await userUtils.findUserByEmail(newData.email);
        if (existingUser) {
            return { success: false, message: "Email already exists" };
        }
        const result = await userUtils.updateUserDetails(user.user_id, newData);
        return result;
    }
    catch(error){
        console.error("Error updating user details:", error);
        return {success: false, message: "Error updating user details", error};
    }
};

export const changePasswordService = async (token, oldPassword, newPassword) => {
    try{
        const user = await userUtils.getUserFromToken(token);
        if(!user){
            return {success: false, message: "Invalid token"};
        }
        const isOldPasswordValid = await verifyPassword(oldPassword, user.password);
        if(!isOldPasswordValid){
            return {success: false, message: "Invalid old password"};
        }
        const result = await userUtils.changePassword(user.user_id, newPassword);
        return result;
    }catch(error){
        console.error("Error changing password:", error);
        return {success: false, message: "Error changing password", error};
    }
};