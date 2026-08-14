import * as postUtils from "../utils/postUtils.js";
import * as userUtils from "../utils/userUtils.js";
import * as propertyUtils from "../utils/propertyUtils.js";


export const createPost = async (token, propertyId, postType) => {
    try {
        const user = await userUtils.getUserFromToken(token);
        if (!user) {
            return { success: false, message: "Invalid token" };
        }
        const propertyOwnershipResponse = await propertyUtils.checkUserPropertyOwnership(user.user_id, propertyId);
        if (!propertyOwnershipResponse.success) {
            return propertyOwnershipResponse;
        }
        if (!propertyOwnershipResponse.ownership) {
            return { success: false, message: "User doesn't have such property" };
        }
        const checkPropertyPostedResponse = await postUtils.checkPropertyPosted(propertyId);
        if(!checkPropertyPostedResponse.success){
            return checkPropertyPostedResponse;
        }
        if(checkPropertyPostedResponse.posted){
            return { success: false, message: "This property has already been posted" };
        }
        const createPostResponse = await postUtils.createPost(propertyId, user.user_id, postType);
        return createPostResponse;
    } catch (error) {
        console.error("Error creating post:", error);
        return { success: false, message: "Error creating post", error: error };
    }
};

export const deletePost = async (token, postId) => {
    try {
        const user = await userUtils.getUserFromToken(token);
        if (!user) {
            return { success: false, message: "Invalid token" };
        }
        const checkExistResponse = await postUtils.checkPostExists(postId);
        if (!checkExistResponse.success) {
            return checkExistResponse;
        }
        if (!checkExistResponse.exists) {
            return { success: false, message: "No such post exists" };
        }
        const getPostUserResponse = await postUtils.getPostUser(postId);
        if (!getPostUserResponse.success) {
            return getPostUserResponse;
        }
        const postUserId = getPostUserResponse.userId;
        if (postUserId !== user.user_id) {
            return { success: false, message: "User does not have such post" };
        }
        const deletePostResponse = await postUtils.deletePost(postId);
        return deletePostResponse;
    } catch (error) {
        console.error("Error deleting post:", error);
        return { success: false, message: "Error deleting post", error: error };
    }
};