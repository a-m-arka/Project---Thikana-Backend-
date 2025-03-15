import bcrypt from "bcryptjs";
import userQueries from "../queries/userQueries.js";
import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (user) => {

    try{
        // check if user already exists
        const query1 = userQueries.findUserByEmail;
        const [result] = await pool.query(query1, [user.email]);
        if(result.length !== 0){
            return {success: false, message: 'User already exists'};
        }

        // create new user
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const query2 = userQueries.createUser;
        const values = [user.username, user.email, user.phone, hashedPassword];
        await pool.query(query2, values);
        return {success: true, message: 'User registered successfully'};
    }catch(error){
        console.error(error);
        return {success: false, message: 'Registration failed. Please try again'};
    }
};

export const loginUser = async (email, password) => {
    try{
        const query = userQueries.findUserByEmail;
        const [result] = await pool.query(query, [email]);
        if(result.length === 0){
            return {success: false, message: 'User not found'};
        }
        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return {success: false, message: 'Invalid password'};
        }
        const token = jwt.sign(
            {id: user.user_id, email: user.email},
            JWT_SECRET,
            {expiresIn: '1h'}
        )
        return {success: true, message: 'Login successful', token};
    }catch(error){
        console.error(error);
        return {success: false, message: 'Login failed. Please try again'};
    }
};

export const getUserFromToken = async (token) => {
    try{
        const trimmedToken = token.trim();
        const decodedToken = jwt.verify(trimmedToken, JWT_SECRET);
        const query = userQueries.getUserData;
        const [result] = await pool.query(query, [decodedToken.id]);
        if(result.length === 0){
            return {success: false, message: 'User not found'};
        }
        return {success: true, data: result[0]};
    }catch(error){
        console.error('Error details:', error.stack);
        return {success: false, message: 'Invalid token'};
    }
};