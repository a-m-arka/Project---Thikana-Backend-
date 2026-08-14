import { findUserByEmail, createUser } from "../utils/userUtils.js";
import { verifyPassword, generateToken } from "../utils/authUtils.js";

export const registerUser = async (user) => {
    try {
        const existingUser = await findUserByEmail(user.email);
        if (existingUser) {
            return { success: false, message: "User already exists" };
        }

        await createUser(user);
        return { success: true, message: "User registered successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Registration failed. Please try again" };
    }
};

export const loginUser = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return { success: false, message: "User not found" };
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid password" };
        }

        const token = generateToken(user);
        return { success: true, message: "Login successful", token };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Login failed. Please try again" };
    }
};