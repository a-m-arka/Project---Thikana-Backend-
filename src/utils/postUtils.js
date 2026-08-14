import { pool } from "../config/db.js";
import postQueries from "../queries/postQueries.js";

export const createPost = async (propertyId, userId, postType) => {
    const query = postQueries.createPost;
    const values = [propertyId, userId, postType];

    try {
        const [result] = await pool.query(query, values);
        return { success: true, message: "Post created successfully", result };
    } catch (error) {
        console.error('Error adding post in database:', error);
        return { success: false, message: 'Error adding post in database', error: error };
    }
};

export const deletePost = async (postId) => {
    const query = postQueries.deletePost;
    const values = [postId];

    try {
        await pool.query(query, values);
        return { success: true, message: 'Post deleted successfully' };
    } catch (error) {
        console.error('Error deleting post from database:', error);
        return { success: false, message: 'Error deleting post from database', error: error };
    }
};

export const checkPropertyPosted = async (propertyId) => {
    const query = postQueries.checkPropertyPosted;
    const values = [propertyId];

    try {
        const [result] = await pool.query(query, values);
        return { success: true, posted: result.length > 0 };
    } catch (error) {
        console.error('Error checking if property has been posted:', error);
        return { success: false, message: 'Error checking if property has been posted', error: error };
    }
};

export const checkPostExists = async (postId) => {
    const query = postQueries.checkPostExists;
    const values = [postId];

    try {
        const [result] = await pool.query(query, values);
        return { success: true, exists: result.length > 0 };
    } catch (error) {
        console.error('Error checking if post exist in database:', error);
        return { success: false, message: 'Error checking if post exist in database', error: error };
    }
};

export const getPostUser = async (postId) => {
    const query = postQueries.getPostUser;
    const values = [postId];

    try {
        const [result] = await pool.query(query, values);
        return { success: true, userId: result[0].user_id };
    } catch (error) {
        console.error('Error fetching user of the post from database:', error);
        return { success: false, message: 'Error fetching user of the post from database', error: error };
    }
};