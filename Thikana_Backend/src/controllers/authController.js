import UserModel from "../models/userModel.js";
import { loginUser, registerUser } from "../services/authService.js";

export const register = async (req, res) => {
    const { username, email, phone, password, confirmPassword } = req.body;

    if (!username || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!/^01[3-9]\d{8}$/.test(phone)) {
        return res.status(400).json({ message: 'Invalid Bangladeshi phone number' });
    }

    /*

    /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/

    Explanation: The password string must contain at least 8 characters, 
    including at least 1 uppercase letter, 1 lowercase letter, 1 number, 
    and 1 specialcharacter from @$!%*?&. 

    */

    if (!/^.{8}$/.test(password)) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long'
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = new UserModel({ username, email, phone, password });

    try {
        const response = await registerUser(user);
        if (response.success) {
            console.log('New user registered successfully');
            return res.status(201).json({ message: response.message });
        }
        return res.status(400).json({ message: response.message });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Registration failed. Internal Server Error' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const response = await loginUser(email, password);
        if(response.success){
            console.log('User logged in successfully');
            return res.status(200).json({ message: response.message, token: response.token });
        }
        return res.status(400).json({ message: response.message });
    }catch(error){
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Login failed. Internal Server Error' });
    }
};