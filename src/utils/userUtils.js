import { pool } from "../config/db.js";
import userQueries from "../queries/userQueries.js";
import { verifyToken, hashPassword } from "./authUtils.js";

export const createUser = async (user) => {
    const query = userQueries.createUser;
    const hashedPassword = await hashPassword(user.password);
    const values = [user.username, user.email, user.phone, hashedPassword];
    await pool.query(query, values);
};

export const findUserByEmail = async (email) => {
    const query = userQueries.findUserByEmail;
    const [result] = await pool.query(query, [email]);
    return result.length > 0 ? result[0] : null;
};

export const getUserFromToken = async (token) => {
    try {
        const decodedToken = verifyToken(token);
        const query = userQueries.getUserData;
        const [result] = await pool.query(query, [decodedToken.id]);
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("Error details:", error.stack);
        return null;
    }
};

export const updateUserProfilePicture = async (userId, url, publicId) => {
    try {
        const query = userQueries.updateProfilePicture;
        await pool.query(query, [url, publicId, userId]);
        return { success: true, message: "Profile picture updated successfully." };
    } catch (error) {
        console.error("Error updating profile picture:", error);
        return { success: false, message: "Error updating profile picture.", error };
    }
};

export const updateUserDetails = async (userId, newData) => {
    try{
        const query = userQueries.updateUserDetails;
        const { name, email, phone, address } = newData;
        await pool.query(query, [name, email, phone, address, userId]);
        return { success: true, message: "User details updated successfully." };
    }catch(error){
        console.error("Error updating user details in database:", error);
        return { success: false, message: "Error updating user details in database.", error };
    }
};