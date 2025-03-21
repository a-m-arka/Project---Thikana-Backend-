import * as propertyUtils from "../utils/propertyUtils.js";
import * as cloudinaryUtils from "../utils/cloudinaryUtils.js";
import * as userUtils from "../utils/userUtils.js";

export const registerProperty = async (token, property, files) => {
    try{
        const user = await userUtils.getUserFromToken(token);
        if(!user) {
            return {success: false, message: "Invalid token"};
        }
        const uploadImageResponse = await cloudinaryUtils.uploadMultipleImages(files);
        if(!uploadImageResponse.success) {
            return uploadImageResponse;
        }
        const addPropertyResponse = await propertyUtils.addNewProperty(user.user_id, property);
        if(!addPropertyResponse.success) {
            return addPropertyResponse;
        }
        const propertyId = addPropertyResponse.propertyId;
        for(const image of uploadImageResponse.results) {
            const addImageResponse = await propertyUtils.addPropertyImage(propertyId, image.url, image.publicId);
            if(!addImageResponse.success) {
                return addImageResponse;
            }
        }
        return {success: true, message: "Property registered successfully"};
    }catch(error){
        console.error("Error registering property:", error);
        return {success: false, message: "Error registering property", error: error};
    }
};

export const deleteProperty = async (token, propertyId) => {
    try{
        const user = await userUtils.getUserFromToken(token);
        if(!user) {
            return {success: false, message: "Invalid token"};
        }
        const ownershipResponse = await propertyUtils.checkUserPropertyOwnership(user.user_id, propertyId);
        if(!ownershipResponse.success){
            return ownershipResponse;
        }
        if(!ownershipResponse.ownership){
            return {success: false, message: "User doesn't have such property"};
        }
        const imageIdResponse = await propertyUtils.getPropertyImageIds(propertyId);
        if(!imageIdResponse.success) {
            return imageIdResponse;
        }
        const publicIds = imageIdResponse.imageIds;
        const deleteImagesResponse = await cloudinaryUtils.deleteMultipleImages(publicIds);
        if(!deleteImagesResponse.success) {
            return deleteImagesResponse;
        }
        const deletePropertyResponse = await propertyUtils.deleteProperty(propertyId);
        return deletePropertyResponse;
    }catch(error){
        console.error("Error deleting property:", error);
        return {success: false, message: "Error deleting property", error: error};
    }
};

export const updatePropertyDetails = async (token, propertyId, newData) => {
    try{
        const user = await userUtils.getUserFromToken(token);
        if(!user) {
            return {success: false, message: "Invalid token"};
        }
        const ownershipResponse = await propertyUtils.checkUserPropertyOwnership(user.user_id, propertyId);
        if(!ownershipResponse.success){
            return ownershipResponse;
        }
        if(!ownershipResponse.ownership){
            return {success: false, message: "User doesn't have such property"};
        }
        const updateResponse = await propertyUtils.updateProperty(propertyId, newData);
        return updateResponse;
    }catch(error){
        console.error("Error updating property:", error);
        return {success: false, message: "Error updating property", error: error};
    }
};

export const addNewPropertyImages = async (token, propertyId, files) => {
    try{
        const user = await userUtils.getUserFromToken(token);
        if(!user) {
            return {success: false, message: "Invalid token"};
        }
        const ownershipResponse = await propertyUtils.checkUserPropertyOwnership(user.user_id, propertyId);
        if(!ownershipResponse.success){
            return ownershipResponse;
        }
        if(!ownershipResponse.ownership){
            return {success: false, message: "User doesn't have such property"};
        }
        const countResponse = await propertyUtils.countPropertyImages(propertyId);
        if(!countResponse.success){
            return countResponse;
        }
        if(files.length + countResponse.imageCount > 10){
            return {success: false, message: "At most 10 images per property allowed"};
        }
        const uploadImageResponse = await cloudinaryUtils.uploadMultipleImages(files);
        if(!uploadImageResponse.success) {
            return uploadImageResponse;
        }
        for(const image of uploadImageResponse.results) {
            const addImageResponse = await propertyUtils.addPropertyImage(propertyId, image.url, image.publicId);
            if(!addImageResponse.success) {
                return addImageResponse;
            }
        }
        return {success: true, message: "New property images added successfully"};
    }catch(error){
        console.error("Error adding new property images:", error);
        return {success: false, message: "Error adding new property images", error: error};
    }
};

export const deletePropertyImages = async (token, propertyId, imageIds) => {
    try{
        const user = await userUtils.getUserFromToken(token);
        if(!user) {
            return {success: false, message: "Invalid token"};
        }
        const propertyOwnershipResponse = await propertyUtils.checkUserPropertyOwnership(user.user_id, propertyId);
        if(!propertyOwnershipResponse.success){
            return propertyOwnershipResponse;
        }
        if(!propertyOwnershipResponse.ownership){
            return {success: false, message: "User doesn't have such property"};
        }
        for(const imageId of imageIds){
            const imageOwnershipResponse = await propertyUtils.checkPropertyImageOwnership(propertyId, imageId);
            if(!imageOwnershipResponse.success){
                return imageOwnershipResponse;
            }
            if(!imageOwnershipResponse.ownership){
                return {success: false, message: `This property doesn't have a image with id ${imageId}`};
            }
        }
        const deleteFromCloudResponse = await cloudinaryUtils.deleteMultipleImages(imageIds);
        if(!deleteFromCloudResponse.success){
            return deleteFromCloudResponse;
        }
        for(const imageId of imageIds){
            const deleteFromDbResponse = await propertyUtils.deletePropertyImage(imageId);
            if(!deleteFromDbResponse.success){
                return deleteFromDbResponse;
            }
        }
        return {success: true, message: "Property images deleted successfully"};
    }catch(error){
        console.error("Error deleting property images:", error);
        return {success: false, message: "Error deleting property images", error: error};
    }
};

export const getUserProperties = async (token) => {
    try{
        const user = await userUtils.getUserFromToken(token);
        if(!user) {
            return {success: false, message: "Invalid token"};
        }
        const propertiesResponse = await propertyUtils.getAllPropertiesOfUser(user.user_id);
        if(!propertiesResponse.success) {
            return propertiesResponse;
        }
        return {success: true, properties: propertiesResponse.properties};
    }catch(error){
        console.error("Error fetching user properties:", error);
        return {success: false, message: "Error fetching user properties", error: error};
    }
};